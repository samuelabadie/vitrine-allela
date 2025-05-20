'use client';

import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const scrollToServices = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-50">
      <style jsx>{`
        .blur-gradient {
          position: relative;
          isolation: isolate;
          width: 100%;
          max-width: 100%;
        }
        .blur-gradient::before {
          content: "";
          position: absolute;
          inset: -30%;
          background: linear-gradient(to bottom,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 0.8) 50%,
            rgba(0, 0, 0, 0) 100%);
          filter: blur(40px);
          z-index: -1;
          transform: translateZ(0);
        }
      `}</style>
      <div className="blur-gradient w-full max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-8 rounded-full">
        {/* Logo/Text */}
        <div className="flex items-center gap-3">
          <Image src="/assets/icons/white-logo.svg" alt="Logo" width={48} height={48} className="h-6 w-auto" />
        </div>
        <div className="flex items-center gap-4 pr-2 text-white text-md font-medium">
          <a href="#services" onClick={scrollToServices} className="hover:text-orange-500 transition-colors duration-300">Services</a>
          <div className="h-4 w-[1px] bg-white/30 rounded-full"></div>
          <Link href="/contact" className="hover:text-orange-500 transition-colors duration-300">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 