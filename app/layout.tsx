import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { LocomotiveScrollProvider } from "@/components/locomotive-scroll-provider";
import { PageTransition } from "@/components/page-transition";

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

const siteTitle =
  "COLORAU — coletivo coral contemporâneo em Belo Horizonte";
const siteDescription =
  "Site oficial do COLORAU, coletivo coral contemporâneo em Belo Horizonte. Conheça o coro e saiba como participar.";

export const metadata: Metadata = {
  metadataBase: new URL("https://colorau.art"),
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://colorau.art",
    siteName: "COLORAU",
    description: siteDescription,
    images: [
      {
        url: "/og-thumb.jpg",
        width: 1200,
        height: 630,
        alt: "COLORAU — coral contemporâneo de vozes plurais em Belo Horizonte; visite colorau.art",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-thumb.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" data-colorau-theme="pending">
      <body className={`${dmSans.variable} ${ivyoraDisplay.variable} antialiased`}>
        <ThemeProvider>
          <LocomotiveScrollProvider />
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">
              <PageTransition>{children}</PageTransition>
            </main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
