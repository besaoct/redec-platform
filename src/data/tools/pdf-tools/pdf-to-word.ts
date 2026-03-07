import { FileType } from "lucide-react";

export const PDF_TO_WORD_CONTENT = {
  title: "PDF to Word",
  description: "Convert PDF documents into editable Microsoft Word files",
  comingSoonMessage: "PDF to Word is Coming Soon",
  comingSoonDescription: "We're working on a high-fidelity conversion engine to turn your PDFs into editable documents.",
  about: [
    "The PDF to Word converter will allow you to transform non-editable PDF files into fully customizable Word documents (.docx). This tool is essential for reusing text, updating reports, or editing legacy documents without starting from scratch.",
    "We are focusing on preserving the original layout, fonts, and images as accurately as possible. Like all our tools, the conversion will be optimized for speed and privacy, handling your documents with care."
  ],
  features: [
    { title: "Layout Preservation", description: "Keep your document's original formatting intact." },
    { title: "Editable Text", description: "Convert scanned or static text into modifiable content." },
    { title: "Image Extraction", description: "High-quality images are carried over to the Word file." },
    { title: "Secure Conversion", description: "Your documents are processed safely and privately." }
  ],
  steps: [
    { step: "1", title: "Upload PDF", description: "Select the PDF document you need to edit." },
    { step: "2", title: "Process", description: "Our engine analyzes and converts the document structure." },
    { step: "3", title: "Download Word", description: "Get your new .docx file and start editing immediately." }
  ],
  icon: FileType
};
