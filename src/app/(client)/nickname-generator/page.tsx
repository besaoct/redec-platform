import NicknameGenerator from "@/components/pages/fun-tools/nickname-generator";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Nickname Generator | Redec",
  description: "Create unique and fun nicknames based on your vibe",
};

export default function NicknameGeneratorPage() {
  return (
    <Suspense fallback={<></>}>
      <NicknameGenerator />
    </Suspense>
  );
}
