import type { Metadata } from "next";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Allela - Votre présence en ligne sur mesure",
  description: "Ne faites.com tout le monde",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavbarWrapper />
      {children}
      <Footer />
    </>
  );
} 