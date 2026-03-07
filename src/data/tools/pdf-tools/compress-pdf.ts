import { Minimize2 } from "lucide-react";

export const COMPRESS_PDF_CONTENT = {
  title: "Compress PDF",
  description: "Reduce PDF file size without significantly losing quality",
  comingSoonMessage: "Compress PDF is Coming Soon",
  comingSoonDescription: "We're developing an intelligent compression algorithm to help you shrink your PDFs for easier sharing.",
  about: [
    "The Compress PDF tool will allow you to reduce the file size of your PDF documents while maintaining an optimal balance of quality and size. This is essential for meeting email attachment limits, saving storage space, and speeding up document uploads.",
    "You will be able to choose between different compression levels—ranging from extreme compression to high-quality settings. As with all our PDF tools, the compression process is performed entirely within your browser for complete document security."
  ],
  features: [
    { title: "Smart Compression", description: "Reduces size while preserving text and image clarity." },
    { title: "Multiple Levels", description: "Choose the right balance of size vs. quality." },
    { title: "Instant Results", description: "See exactly how much space you've saved." },
    { title: "Browser Security", description: "Processing happens locally; no files are uploaded." }
  ],
  steps: [
    { step: "1", title: "Upload PDF", description: "Select the large PDF file you want to compress." },
    { step: "2", title: "Choose Level", description: "Select your preferred level of compression." },
    { step: "3", title: "Shrink & Save", description: "Download your new, smaller PDF document instantly." }
  ],
  icon: Minimize2
};
