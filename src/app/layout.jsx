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
  description: "Keeping score for the fun family card game.",
  openGraph: {
    title: "Guessing Game 2",
    description: "Keeping score for the fun family card game.",
    url: "https://playguessinggame.com/",
    siteName: "Guessing Game 2",
    type: "website",
    images: [
      {
        url: "https://playguessinggame.com/",
        width: 1114,
        height: 512,
        alt: "Guessing Game Logo",
      },
    ],
  },
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
