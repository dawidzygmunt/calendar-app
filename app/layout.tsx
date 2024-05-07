import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ProvidersWraper from "@/providers/providers-wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Calendar Next",
  description: "Please work",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ProvidersWraper>
        <body className={inter.className}>{children}</body>
      </ProvidersWraper>
    </html>
  );
}
