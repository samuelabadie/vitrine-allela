'use client';

import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="w-full flex justify-center sticky top-10 z-50">
      <div className="w-full max-w-7xl flex items-center justify-between px-8 py-3 bg-white/80 backdrop-blur-md rounded-full" style={{ boxShadow: 'none' }}>
        {/* Logo/Text */}
        <div className="flex items-center gap-3">
          {/* If you want to use an image logo, uncomment below and comment out the text */}
          <Image src="/assets/icons/black-logo.svg" alt="Logo" width={48} height={48} className="h-6 w-auto" />
        </div>
        {/* Links */}
        <div className="flex items-center gap-8 pr-2">
          <Link href="#services" className="text-black text-lg font-medium">Services</Link>
          <Link href="/contact" className="text-black text-lg font-medium">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 