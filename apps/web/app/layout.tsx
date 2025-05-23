import type { Metadata } from "next";
import "@repo/ui/styles.css";
import "./globals.css"
import { ToastContainer } from 'react-toastify';
import { ImageKitProvider } from '@imagekit/next';

export const metadata: Metadata = {
  title: "invite",
  description: "Generated by invite",
};

const setInitialTheme = `
  (function() {
    try {
      const theme = localStorage.getItem('theme');
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (_) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
          <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
      </head>
      <body className="bg-slate-100 text-black dark:bg-black dark:text-white">
      <ImageKitProvider urlEndpoint={process.env.imagekit_URL}>
        {children}
        <ToastContainer />
      </ImageKitProvider>
      
      </body>
    </html>
  );
}
