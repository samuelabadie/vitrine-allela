import ClientForm from '@/components/ClientForm';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="min-h-screen md:h-screen w-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center overflow-y-auto md:overflow-hidden">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-0">
        <Link href="/" className="md:absolute hidden md:block md:mb-0 top-8 md:left-8 text-gray-900 hover:text-orange-500 transition-colors duration-300">
          Retourner à l&apos;accueil
        </Link>
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Le choix du roi</h1>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="w-full md:w-2/3">
            <ClientForm />
          </div>
          <div className="text-orange-500 font-bold text-2xl">OU</div>
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-sm">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Réserver un appel</h2>
              <p className="text-sm text-gray-500 mb-8 max-w-sm">Si vous préférez nous expliquer votre projet de vive voix, vous pouvez réserver un appel directement :</p>
              <a href="https://calendly.com/your-link" target="_blank" rel="noopener noreferrer">
                <button className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-full transition-colors duration-200">
                  Réserver un appel
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 