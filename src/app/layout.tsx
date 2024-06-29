import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NotesContextProvider } from "@/context/NotesContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Keep",
  description: "",
  icons:{
    icon:'/favicon.ico'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NotesContextProvider>{children}</NotesContextProvider>
      </body>
    </html>
  );
}
