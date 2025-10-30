import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Navbar from "./components/Navbar";
import '~/assets/styles/globals.css';

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lovecare Minitask",
  description: "Copyright @Jonathan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable}`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
