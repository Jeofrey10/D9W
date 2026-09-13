import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "D9W German Language Institution · German Courses in Madurai, A1 to C2",
  description:
    "Learn German in Madurai with D9W German Language Institution. Expert-led courses from A1 to C2, online and offline. Prepare for Goethe exams, study, and work in Germany with individual guidance from experienced tutors.",
  keywords: [
    "German language course Madurai",
    "learn German Madurai",
    "German classes Madurai",
    "German course A1 to C1",
    "Goethe exam preparation",
    "German language institute Tamil Nadu",
    "study in Germany preparation",
    "D9W German",
  ],
  openGraph: {
    title: "D9W German Language Institution · Madurai",
    description:
      "Expert-led German language courses from A1 to C2 in Madurai. Online and offline learning with individual guidance. Prepare for study and work in Germany.",
    type: "website",
    locale: "en_IN",
    siteName: "D9W German Language Institution",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
