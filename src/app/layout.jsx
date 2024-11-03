import localFont from "next/font/local";
import "./globals.css";

import Main from "@/layouts/Main";

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
        <Main centered>{children}</Main>
      </body>
    </html>
  );
}
