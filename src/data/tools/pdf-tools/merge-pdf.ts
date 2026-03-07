import { Combine } from "lucide-react";

export const MERGE_PDF_CONTENT = {
  title: "Merge PDF",
  description: "Combine multiple PDF documents into a single file easily",
  comingSoonMessage: "Merge PDF is Coming Soon",
  comingSoonDescription: "We're building a powerful, secure, and fast way to combine your PDF files directly in your browser.",
  about: [
    "Our Merge PDF tool will allow you to combine multiple PDF documents into one single file. This is perfect for organizing project files, combining reports, or bringing together different sections of a document.",
    "You'll be able to drag and drop your files, reorder them as needed, and generate a new document in seconds. All processing will happen locally in your browser, ensuring your sensitive documents never leave your device."
  ],
  features: [
    { title: "Browser-side Merging", description: "Documents are processed locally for maximum privacy." },
    { title: "Drag & Drop", description: "Easily upload files from your computer." },
    { title: "Custom Order", description: "Arrange your PDF pages in any sequence you want." },
    { title: "Fast & Lightweight", description: "No server-side uploads or wait times." }
  ],
  steps: [
    { step: "1", title: "Select Files", description: "Choose the PDF files you want to merge from your device." },
    { step: "2", title: "Arrange Order", description: "Drag and drop thumbnails to set the perfect document order." },
    { step: "3", title: "Merge & Download", description: "Click 'Merge' and save your unified PDF instantly." }
  ],
  icon: Combine
};
