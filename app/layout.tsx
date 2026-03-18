import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";

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
  metadataBase: new URL("https://colorau.art"),
  title: "COLORAU",
  description:
    "Site oficial do COLORAU, coletivo coral contemporâneo de Belo Horizonte.",
  openGraph: {
    type: "website",
    url: "https://colorau.art",
    siteName: "COLORAU",
    title: "COLORAU",
    description:
      "Site oficial do COLORAU, coletivo coral contemporâneo de Belo Horizonte.",
    images: [
      {
        url: "/Foto-113.jpg",
        width: 1200,
        height: 630,
        alt: "COLORAU - coletivo coral contemporâneo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "COLORAU | Coro Misto",
    description:
      "Site oficial do COLORAU, coletivo coral contemporâneo de Belo Horizonte.",
    images: ["/Foto-113.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${dmSans.variable} ${ivyoraDisplay.variable} antialiased`}>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
