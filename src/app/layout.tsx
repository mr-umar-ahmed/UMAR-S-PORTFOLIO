import type { Metadata, Viewport } from "next";
import SmoothScrollProvider from "@/context/SmoothScrollProvider";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Umar Ahmed | Elite Software Engineer & Founder",
  description: "Computer Science student, full-stack developer, and startup founder, crafting high-performance, local-first applications. NIT CSE Class of '2027.",
  keywords: [
    "Umar Ahmed",
    "Full-Stack Developer",
    "Software Engineer",
    "Startup Founder",
    "MedX Laboratory",
    "NIT CSE",
    "Computer Science",
    "Web3 Security",
    "Local-first architectures",
    "React Developer",
    "Next.js",
    "Awwwards Portfolio"
  ],
  authors: [{ name: "Umar Ahmed" }],
  openGraph: {
    title: "Umar Ahmed | Elite Software Engineer & Founder",
    description: "Computer Science student, full-stack developer, and startup founder, crafting high-performance, local-first applications. NIT CSE Class of '2027.",
    url: "https://github.com/mr-umar-ahmed/UMAR-S-PORTFOLIO",
    siteName: "Umar Ahmed Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Umar Ahmed | Elite Software Engineer & Founder",
    description: "Computer Science student, full-stack developer, and startup founder. NIT CSE Class of '2027.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased select-none bg-background text-white overflow-x-hidden">
        <div className="noise-overlay" />
        <SmoothScrollProvider>
          <CustomCursor />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
