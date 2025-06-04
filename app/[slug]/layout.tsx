import React from "react";
import type { Metadata } from "next";

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  return {
    title: `Resuma | ${params.slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())}'s Resume`,
  };
}

const ResumePageLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      {children}
    </div>
  );
};

export default ResumePageLayout;
