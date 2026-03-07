import { Image as ImageIcon } from "lucide-react";

export const IMAGE_TO_PDF_CONTENT = {
  title: "Image to PDF",
  description: "Convert your photos and images into professional PDF documents",
  comingSoonMessage: "Image to PDF is Coming Soon",
  comingSoonDescription: "We're building a fast, high-quality way to turn your images into perfectly formatted PDF files.",
  about: [
    "The Image to PDF converter will let you take one or more images (JPG, PNG, WebP, and more) and wrap them into a single PDF document. This is ideal for scanning documents with your phone, creating portfolios, or sending multiple photos in a single file.",
    "You will be able to adjust page sizes, margins, and image orientation before generating your PDF. Everything happens locally in your browser, so your images are never sent to a server, ensuring total privacy."
  ],
  features: [
    { title: "Multi-format Support", description: "Works with JPG, PNG, GIF, BMP, and WebP." },
    { title: "Batch Conversion", description: "Combine multiple images into one PDF at once." },
    { title: "Page Customization", description: "Set orientation, margins, and page sizes." },
    { title: "High Quality", description: "Maintains the original resolution of your images." }
  ],
  steps: [
    { step: "1", title: "Upload Images", description: "Select or drag the images you want to convert." },
    { step: "2", title: "Customize", description: "Reorder images and adjust the PDF page settings." },
    { step: "3", title: "Convert & Download", description: "Generate your PDF and save it to your device." }
  ],
  icon: ImageIcon
};
