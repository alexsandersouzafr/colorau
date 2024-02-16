import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Colorau",
  description: "Celebrando a diversidade através da música!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(poppins.variable, "flex h-screen flex-col")}>
        <div className="h-32 w-full bg-[url('/capa.png')] bg-contain bg-repeat" />
        <div className="w-full max-w-5xl flex-1 m-auto">{children}</div>
        <div className="flex h-20 w-full items-center justify-center bg-colorau-azul bg-contain bg-repeat text-white">
          Colorau 2024
        </div>
      </body>
    </html>
  );
}
