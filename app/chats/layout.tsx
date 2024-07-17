import type { Metadata } from "next";
import "./globals.css";
import { ChatHeader } from "@/libs/chat-header";


export const metadata: Metadata = {
  title: "Chat App",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <ChatHeader />
        {children}
      </body>
    </html>
  );
}
