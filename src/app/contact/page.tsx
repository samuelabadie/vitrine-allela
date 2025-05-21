import ClientForm from '@/components/ClientForm';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Réserver un appel
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Remplissez ce formulaire pour nous présenter votre projet. Nous vous recontacterons dans les plus brefs délais pour organiser un appel.
          </p>
        </div>
        <ClientForm />
      </div>
    </div>
  );
} 