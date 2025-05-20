'use client';

import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="w-full flex justify-center sticky top-10 z-50">
      <div className="w-full max-w-7xl flex items-center justify-between px-8 py-3 bg-white/80 backdrop-blur-md rounded-full" style={{ boxShadow: 'none' }}>
        {/* Logo/Text */}
        <div className="flex items-center gap-3">
          <Image src="/assets/icons/black-logo.svg" alt="Logo" width={48} height={48} className="h-6 w-auto" />
        </div>
        <div className="flex items-center gap-4 pr-2 text-black text-md font-medium">
          <Link href="#services">Services</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 