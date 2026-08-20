import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./styles/globals.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Manoj | Software Developer",
  description:
    "Portfolio of a software developer focused on modern applications, performance, and polished UX.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: "rgba(18, 18, 18, 0.95)",
              color: "#F8FAFC",
              border: "1px solid rgba(201, 168, 76, 0.35)",
              backdropFilter: "blur(12px)",
              fontSize: "14px",
              fontWeight: 500,
              padding: "12px 18px",
              borderRadius: "10px",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
            },
            success: {
              iconTheme: {
                primary: "#E2C974",
                secondary: "#0A0A0A",
              },
            },
          }}
        />
      </body>
      <GoogleAnalytics gaId="G-42YG5KZ52D" />
    </html>
  );
}
