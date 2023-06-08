import "./globals.css";
import { Inter } from "next/font/google";

import { Providers } from "./providers";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Button from "@/components/Button";
import Head from "next/head";
import { GuestHeader, UserHeader } from "@/widgets/Header";
import { getSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nextjs/ with keycloak",
  description: "Nextjs app with keycloak auth",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className} suppressHydrationWarning={true}>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
