import type { Metadata } from "next";
import "@repo/ui/styles.css";
// import "../../app/globals.css"
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "10MinDesign",
  description: "Design Digital Invitations in Minutes with 10MinDesign",
  icons: {
    icon: "/logo-bg.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-slate-100 text-black dark:bg-black dark:text-white">
      <SessionProvider>{children}</SessionProvider>
    </div>
  );
}
