import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const dmSans = localFont({
  variable: "--font-body",
  src: [
    {
      path: "../public/DMSans-VariableFont_opsz,wght.ttf",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../public/DMSans-Italic-VariableFont_opsz,wght.ttf",
      weight: "100 900",
      style: "italic",
    },
  ],
  display: "swap",
});

const ivyoraDisplay = localFont({
  variable: "--font-subtitle",
  src: [
    {
      path: "../public/IvyOraDisplay-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/IvyOraDisplay-RegularItalic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  title: "COLORAU | Coro Misto",
  description:
    "Site oficial do COLORAU, coletivo coral contemporaneo de Belo Horizonte. Quando vozes se encontram, algo acontece.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${dmSans.variable} ${ivyoraDisplay.variable} antialiased`}>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
