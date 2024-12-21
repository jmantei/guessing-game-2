import localFont from "next/font/local";
import Head from "next/head";

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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta property="og:title" content="Guessing Game 2" />
        <meta
          property="og:description"
          content="Keeping score for the fun family card game."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://guessinggame2.webthesite.com"
        />
        <meta property="og:site_name" content="Guessing Game 2" />
        <meta name="twitter:card" content="Guessing Game 2" />
      </Head>
      <body className={`${inter.className}`}>
        <Suspense fallback={<Spinner />}>{children}</Suspense>
      </body>
    </html>
  );
}
