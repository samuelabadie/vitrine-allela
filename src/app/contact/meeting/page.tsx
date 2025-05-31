import Link from 'next/link';
import CalendlyWidget from '@/components/CalendlyWidget';

export default function MeetingPage() {
  return (
    <div className="min-h-screen w-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/contact" className="block mb-8 text-gray-900 hover:text-orange-500 transition-colors duration-300">
          ← Retour à la page de contact
        </Link>
        <CalendlyWidget />
      </div>
    </div>
  );
} 