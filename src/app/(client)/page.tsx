import { Metadata } from "next";
import Home from "@/components/pages/home";
import { APP_NAME, WEB_URL } from "@/data/constants";

export const metadata: Metadata = {
  title: `Free Online Tools | ${APP_NAME}`,
  description:
    "A growing collection of useful web tools — fast, free, and no sign-up required. Access converters, generators, and text tools.",
  alternates: {
    canonical: WEB_URL,
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: APP_NAME,
    url: WEB_URL,
    description: metadata.description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${WEB_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Home />
    </>
  );
}
