import "./globals.css";

import localFont from "next/font/local";

const auxilia = localFont({
  src: [
    {
      path: "../../public/fonts/auxilia.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/auxilia-bold.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-auxilia",
});

export const metadata = {
  title: "Get Awake - Bravoure",
  description: "It's up to you now.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={auxilia.variable}>{children}</body>
    </html>
  );
}
