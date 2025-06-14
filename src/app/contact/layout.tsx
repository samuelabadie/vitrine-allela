import type { Metadata } from "next";
import NavbarWrapper from "@/components/NavbarWrapper";

export const metadata: Metadata = {
  title: "Contact - Allela",
  description: "Contactez-nous pour votre projet",
};

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavbarWrapper />
      {children}
    </>
  );
} 