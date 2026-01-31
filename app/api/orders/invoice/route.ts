import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import PDFDocument from "pdfkit";

export const runtime = "nodejs";

function buildInvoicePdf(order: any): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: "A4", margin: 50 });
      const chunks: Buffer[] = [];

      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));

      doc.fontSize(20).text("Roboway Technologies", { align: "left" });
      doc.fontSize(12).text("Invoice", { align: "left" });
      doc.moveDown();

      doc.fontSize(10).text(`Order ID: ${order.orderId}`);
      doc.text(`Date: ${new Date(order.createdAt).toLocaleString()}`);
      doc.moveDown();

      doc.fontSize(12).text("Customer Info");
      doc.fontSize(10)
        .text(`Name: ${order.customerInfo.fullName}`)
        .text(`Email: ${order.customerInfo.email}`)
        .text(`Phone: ${order.customerInfo.phone}`)
        .text(`Address: ${order.customerInfo.address}`);

      doc.moveDown();
      doc.fontSize(12).text("Print Details");
      doc.fontSize(10)
        .text(`Material: ${order.printConfig.material}`)
        .text(`Infill: ${order.printConfig.infillDensity}%`)
        .text(`Volume: ${order.printConfig.volume.toFixed(2)} cm³`)
        .text(`Weight: ${order.printConfig.weight.toFixed(2)} g`)
        .text(`Price/Gram: ${order.printConfig.pricePerGram} BDT`);

      doc.moveDown();
      doc.fontSize(12).text("Total");
      doc.fontSize(16).text(`${order.printConfig.totalPrice.toFixed(2)} BDT`, {
        align: "left",
      });

      doc.moveDown();
      doc.fontSize(10).fillColor("gray").text("Thank you for your order.");

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

export async function GET(req: NextRequest) {
  try {
    const orderId = req.nextUrl.searchParams.get("orderId");
    if (!orderId) {
      return NextResponse.json({ error: "orderId is required" }, { status: 400 });
    }

    await connectDB();
    const order = await Order.findOne({ orderId }).lean();
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const pdfBuffer = await buildInvoicePdf(order);
    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="invoice-${orderId}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Invoice generation error:", error);
    return NextResponse.json({ error: "Failed to generate invoice" }, { status: 500 });
  }
}
