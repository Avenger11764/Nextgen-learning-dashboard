import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NEURAL_DASH | Next-Gen Student Dashboard",
  description: "Futuristic Next-Gen learning analytics platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-bg-dark text-on-surface">
        {children}
      </body>
    </html>
  );
}
