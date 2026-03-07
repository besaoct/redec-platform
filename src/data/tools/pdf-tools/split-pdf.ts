import { Scissors } from "lucide-react";

export const SPLIT_PDF_CONTENT = {
  title: "Split PDF",
  description: "Extract pages or split one PDF into multiple files",
  comingSoonMessage: "Split PDF is Coming Soon",
  comingSoonDescription: "We're developing a seamless way to extract specific pages or ranges from your PDF documents safely.",
  about: [
    "Our Split PDF tool will give you the flexibility to take a large document and break it down into smaller, more manageable parts. Whether you need to extract a single page or split a document by ranges, we've got you covered.",
    "Security is our priority—all splitting operations will take place within your browser. Your files are never uploaded to any server, keeping your data completely private and under your control."
  ],
  features: [
    { title: "Page Extraction", description: "Pick specific pages to save as a new PDF." },
    { title: "Range Splitting", description: "Split documents into multiple files by custom ranges." },
    { title: "Instant Preview", description: "See thumbnails of pages before you split them." },
    { title: "Privacy First", description: "Local processing means your files stay on your device." }
  ],
  steps: [
    { step: "1", title: "Upload PDF", description: "Drop your PDF file into the upload area to get started." },
    { step: "2", title: "Select Method", description: "Choose to extract individual pages or split by ranges." },
    { step: "3", title: "Split & Save", description: "Process your document and download the new files immediately." }
  ],
  icon: Scissors
};
