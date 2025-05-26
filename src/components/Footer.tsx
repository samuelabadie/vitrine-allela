import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image src="/assets/icons/white-logo.svg" alt="Logo" width={48} height={48} className="h-6 w-auto" />
        </div>
        <div className="flex items-center gap-8 text-white/80 text-sm">
          <Link href="/contact" className="hover:text-white transition-colors duration-300">
            Contact
          </Link>
          <span>© 2025 Allela. Tous droits réservés.</span>
        </div>
      </div>
    </footer>
  );
} 