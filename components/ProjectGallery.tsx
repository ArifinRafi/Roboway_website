import Image from "next/image";

export default function ProjectGallery({ images }: { images?: string[] }) {
  const validImages = (images || []).filter((src) => Boolean(src));
  if (validImages.length === 0) return null;
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {validImages.map((src) => (
        <div
          key={src}
          className="relative aspect-[16/9] overflow-hidden rounded-lg border border-white/10 bg-white/5"
        >
          <Image src={src} alt="Project image" fill className="object-cover" />
        </div>
      ))}
    </div>
  );
}


