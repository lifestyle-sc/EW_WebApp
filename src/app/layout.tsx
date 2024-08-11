import * as React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RootProviders from "./RootProviders";

const inter = Inter({ subsets: ["latin"] });

//const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

export const metadata: Metadata = {
  title: "HydroSentinel : Dashboard",
  description: "Your no 1 early warning system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  

  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <RootProviders>
        {children}
        </RootProviders>
        </body>
    </html>
  );
}
