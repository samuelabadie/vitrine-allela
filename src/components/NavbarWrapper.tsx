'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function NavbarWrapper() {
  const pathname = usePathname();
  const isContactPage = pathname.startsWith('/contact');

  if (isContactPage) return null;
  return <Navbar />;
} 