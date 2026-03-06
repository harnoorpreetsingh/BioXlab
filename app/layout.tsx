import { Geist } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Loader from "./loading";
import { InitialLoader } from "@/components/initial-loader";
import NavbarWrapper from "@/wrappers/NavbarWrapper";
import FooterWrapper from "@/wrappers/FooterWrapper";
import TopbarWrapper from "@/wrappers/TopbarWrapper";
import { Slide, ToastContainer } from "react-toastify";
import { AuthProvider } from "@/providers/AuthProvider";
import NextAuthProvider from "@/providers/SessionProvider";
import { CartProvider } from "@/providers/CartProvider";
import { CartContainer } from "@/common/Cart/CartContainer";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "BioXLab - Medical Laboratory",
  description:
    "BioXLab is a modern lab test booking platform where users can schedule medical tests, track appointments, and securely access their reports online.",
  icons: {
    icon: "/assests/images/Logo-compressed_Webpifier.webp",
    shortcut: "/assests/images/Logo-compressed_Webpifier.webp",
    apple: "/assests/images/Logo-compressed_Webpifier.webp",
  },
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground" cz-shortcut-listen="true">
        <NextAuthProvider>
          <InitialLoader />
          {/* Topbar */}
          <TopbarWrapper />
          <AuthProvider>
            {/* Header */}
            <NavbarWrapper />
            {/* Children */}
            <CartProvider>
              <Suspense fallback={<Loader />}>{children}</Suspense>

              {/* <CartContainer /> */}
            </CartProvider>
            {/* Footer */}
            <FooterWrapper />
          </AuthProvider>
        </NextAuthProvider>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
          theme="dark"
          transition={Slide}
        />
        {/* <- Add Toaster here */}
      </body>
    </html>
  );
}
