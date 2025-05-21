import type { Metadata } from "next";

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
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
} 