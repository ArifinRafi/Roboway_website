import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

// STL volume utilities (assumes STL units are millimeters)
type Vec3 = { x: number; y: number; z: number };

const MM3_TO_CM3 = 1 / 1000;

const signedVolumeOfTriangle = (p1: Vec3, p2: Vec3, p3: Vec3) =>
  (p1.x * (p2.y * p3.z - p2.z * p3.y) -
    p1.y * (p2.x * p3.z - p2.z * p3.x) +
    p1.z * (p2.x * p3.y - p2.y * p3.x)) / 6;

const triangleArea = (p1: Vec3, p2: Vec3, p3: Vec3) => {
  const ax = p2.x - p1.x;
  const ay = p2.y - p1.y;
  const az = p2.z - p1.z;
  const bx = p3.x - p1.x;
  const by = p3.y - p1.y;
  const bz = p3.z - p1.z;
  const cx = ay * bz - az * by;
  const cy = az * bx - ax * bz;
  const cz = ax * by - ay * bx;
  return 0.5 * Math.sqrt(cx * cx + cy * cy + cz * cz);
};

const isBinaryStl = (buffer: ArrayBuffer) => {
  if (buffer.byteLength < 84) return false;
  const view = new DataView(buffer);
  const triangleCount = view.getUint32(80, true);
  const expectedSize = 84 + triangleCount * 50;
  return expectedSize === buffer.byteLength;
};

const parseBinaryStlVolumeMm3 = (buffer: ArrayBuffer) => {
  const view = new DataView(buffer);
  const triangleCount = view.getUint32(80, true);
  let offset = 84;
  let volume = 0;
  let area = 0;

  for (let i = 0; i < triangleCount; i += 1) {
    // skip normal (12 bytes)
    offset += 12;

    const p1 = {
      x: view.getFloat32(offset, true),
      y: view.getFloat32(offset + 4, true),
      z: view.getFloat32(offset + 8, true),
    };
    offset += 12;
    const p2 = {
      x: view.getFloat32(offset, true),
      y: view.getFloat32(offset + 4, true),
      z: view.getFloat32(offset + 8, true),
    };
    offset += 12;
    const p3 = {
      x: view.getFloat32(offset, true),
      y: view.getFloat32(offset + 4, true),
      z: view.getFloat32(offset + 8, true),
    };
    offset += 12;

    volume += signedVolumeOfTriangle(p1, p2, p3);
    area += triangleArea(p1, p2, p3);
    // skip attribute byte count (2 bytes)
    offset += 2;
  }

  return { volumeMm3: Math.abs(volume), areaMm2: area };
};

const parseAsciiStlVolumeMm3 = (text: string) => {
  const vertexRegex = /vertex\s+([-\d.eE]+)\s+([-\d.eE]+)\s+([-\d.eE]+)/g;
  const vertices: Vec3[] = [];
  let match: RegExpExecArray | null;
  while ((match = vertexRegex.exec(text))) {
    vertices.push({
      x: parseFloat(match[1]),
      y: parseFloat(match[2]),
      z: parseFloat(match[3]),
    });
  }

  let volume = 0;
  let area = 0;
  for (let i = 0; i + 2 < vertices.length; i += 3) {
    volume += signedVolumeOfTriangle(vertices[i], vertices[i + 1], vertices[i + 2]);
    area += triangleArea(vertices[i], vertices[i + 1], vertices[i + 2]);
  }
  return { volumeMm3: Math.abs(volume), areaMm2: area };
};

const calculateStlVolumeCm3 = async (file: File) => {
  const buffer = await file.arrayBuffer();
  const result = isBinaryStl(buffer)
    ? parseBinaryStlVolumeMm3(buffer)
    : parseAsciiStlVolumeMm3(new TextDecoder().decode(buffer));
  return {
    volumeCm3: result.volumeMm3 * MM3_TO_CM3,
    areaMm2: result.areaMm2,
  };
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files =
      (formData.getAll("files") as File[]).length > 0
        ? (formData.getAll("files") as File[])
        : (formData.getAll("file") as File[]);
    const expectedCount = parseInt(formData.get("fileCount") as string);
    if (expectedCount && files.length !== expectedCount) {
      return NextResponse.json(
        { error: "Some files did not upload. Please try again." },
        { status: 400 }
      );
    }
    const material = formData.get("material") as string;
    const density = parseFloat(formData.get("density") as string);
    const pricePerGram = parseFloat(formData.get("pricePerGram") as string);
    const infillDensity = parseFloat(formData.get("infillDensity") as string);
    const wallCount = parseInt(formData.get("wallCount") as string) || 2;

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Calculate volume (STL parsed for accuracy; OBJ falls back)
    let baseVolume = 0;
    let surfaceAreaMm2 = 0;
    const fileNames: string[] = [];
    for (const file of files) {
      const fileName = file.name.toLowerCase();
      if (!fileName.endsWith(".stl")) {
        return NextResponse.json(
          { error: "OBJ volume calculation is not supported yet. Please upload STL." },
          { status: 400 }
        );
      }
      const result = await calculateStlVolumeCm3(file);
      baseVolume += result.volumeCm3;
      surfaceAreaMm2 += result.areaMm2;
      fileNames.push(file.name);
    }
    
    // Adjust for infill density (0% = hollow, 100% = solid)
    // Add shell estimate using surface area and a default wall thickness.
    const nozzleWidthMm = 0.4;
    const wallThicknessMm = Math.max(1, wallCount) * nozzleWidthMm;
    const shellVolumeCm3 = (surfaceAreaMm2 * wallThicknessMm) * MM3_TO_CM3;
    const innerVolumeCm3 = Math.max(0, baseVolume - shellVolumeCm3);
    const infillVolumeCm3 = innerVolumeCm3 * (infillDensity / 100);
    const actualVolume =
      infillDensity >= 100 ? baseVolume : Math.min(baseVolume, shellVolumeCm3 + infillVolumeCm3);
    
    // Calculate weight using material density
    const weight = actualVolume * density;
    
    // Calculate total price
    const totalPrice = weight * pricePerGram;

    return NextResponse.json({
      material,
      volume: actualVolume,
      weight,
      pricePerGram,
      totalPrice,
      fileNames,
    });
  } catch (error) {
    console.error("Error calculating price:", error);
    return NextResponse.json(
      { error: "Failed to calculate price" },
      { status: 500 }
    );
  }
}

