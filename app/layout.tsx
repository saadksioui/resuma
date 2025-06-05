import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"


const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Resuma | Create & Share Your Resume Instantly",
  description: "Resuma is a modern resume builder that lets you create, customize, and share your professional resume with a single link.",
  keywords: [
    "Resuma",
    "resume builder",
    "online resume",
    "CV generator",
    "job application",
    "one link resume",
    "personal branding",
    "professional profile"
  ],
  authors: [{ name: "Saad Ksioui", url: "https://saadksioui.pro/" }],
  openGraph: {
    title: "Resuma | Create & Share Your Resume Instantly",
    description: "Create your resume in minutes and share it with a simple link. Fast, elegant, and user-friendly.",
    url: "https://resuma.app",
    siteName: "Resuma",
    images: [
      {
        url: "https://resuma.app/resuma-logo.svg", // Replace with your real image URL
        width: 1200,
        height: 630,
        alt: "Resuma - Share Your Resume with One Link",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resuma | One-Link Resume Builder",
    description: "Build and share your resume online with a single, easy-to-share link using Resuma.",
    images: ["https://resuma.app/resuma-logo.svg"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${interSans.variable} antialiased`}
      >
          {children}
          <Analytics />
      </body>
    </html>
  );
}
