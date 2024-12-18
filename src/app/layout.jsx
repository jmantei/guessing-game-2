import localFont from "next/font/local";
import "./reset.css";
import "./globals.css";

import Spinner from "@/components/Spinner";

import { Suspense } from "react";

const inter = localFont({
  src: "../fonts/Inter-VariableFont_opsz,wght.ttf",
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Guessing Game 2",
  description: "A score keeper for the fun family card game.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Suspense fallback={<Spinner />}>{children}</Suspense>
      </body>
    </html>
  );
}
