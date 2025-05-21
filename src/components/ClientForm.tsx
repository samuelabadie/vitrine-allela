'use client';

import { useState } from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FormData {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  website: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  requirements: string;
  additionalInfo: string;
}

const initialFormData: FormData = {
  companyName: '',
  contactName: '',
  email: '',
  phone: '',
  website: '',
  projectType: '',
  budget: '',
  timeline: '',
  description: '',
  requirements: '',
  additionalInfo: '',
};

const steps = [
  { id: 1, title: 'Informations de l\'entreprise' },
  { id: 2, title: 'Informations de contact' },
  { id: 3, title: 'Détails du projet' },
  { id: 4, title: 'Description du projet' },
];

export default function ClientForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Échec de la soumission');
      
      setSubmitStatus('success');
      setFormData(initialFormData);
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Informations de l'entreprise</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom de l'entreprise *
                </label>
                <Input
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  placeholder="Entrez le nom de votre entreprise"
                />
              </div>
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                  Site web
                </label>
                <Input
                  id="website"
                  name="website"
                  type="url"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://exemple.com"
                />
              </div>
            </div>
          </section>
        );
      case 2:
        return (
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Informations de contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom du contact *
                </label>
                <Input
                  id="contactName"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  required
                  placeholder="Nom complet"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="email@entreprise.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Numéro de téléphone
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+33 6 00 00 00 00"
                />
              </div>
            </div>
          </section>
        );
      case 3:
        return (
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Détails du projet</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-1">
                  Type de projet *
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                >
                  <option value="">Sélectionnez le type de projet</option>
                  <option value="web-development">Développement Web</option>
                  <option value="mobile-app">Application Mobile</option>
                  <option value="e-commerce">E-commerce</option>
                  <option value="branding">Branding</option>
                  <option value="other">Autre</option>
                </select>
              </div>
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                  Budget *
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                >
                  <option value="">Sélectionnez votre budget</option>
                  <option value="under-10k">Moins de 10 000€</option>
                  <option value="10k-25k">10 000€ - 25 000€</option>
                  <option value="25k-50k">25 000€ - 50 000€</option>
                  <option value="50k-100k">50 000€ - 100 000€</option>
                  <option value="over-100k">Plus de 100 000€</option>
                </select>
              </div>
              <div>
                <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-1">
                  Délai souhaité *
                </label>
                <select
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                >
                  <option value="">Sélectionnez le délai</option>
                  <option value="asap">Dès que possible</option>
                  <option value="1-3-months">1-3 mois</option>
                  <option value="3-6-months">3-6 mois</option>
                  <option value="6-12-months">6-12 mois</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
            </div>
          </section>
        );
      case 4:
        return (
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Description du projet</h3>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description du projet *
              </label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Décrivez votre projet en détail..."
                className="min-h-[120px]"
              />
            </div>
            <div>
              <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-1">
                Exigences spécifiques
              </label>
              <Textarea
                id="requirements"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                placeholder="Listez les exigences ou fonctionnalités spécifiques..."
                className="min-h-[120px]"
              />
            </div>
            <div>
              <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-1">
                Informations complémentaires
              </label>
              <Textarea
                id="additionalInfo"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                placeholder="Toute autre information que vous souhaitez partager..."
                className="min-h-[120px]"
              />
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Formulaire de Contact</h2>
        
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step.id
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step.id}
                </div>
                <span className="text-xs mt-2 text-gray-600">{step.title}</span>
              </div>
            ))}
          </div>
          <div className="relative mt-4">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2">
              <div
                className="absolute top-0 left-0 h-full bg-orange-500 transition-all duration-300"
                style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
              />
            </div>
          </div>
        </div>
        
        {submitStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg">
            Merci pour votre message ! Nous vous recontacterons dans les plus brefs délais.
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
            Une erreur est survenue lors de l'envoi du formulaire. Veuillez réessayer.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {renderStep()}

          <div className="flex justify-between pt-6">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="default"
                onClick={prevStep}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Précédent
              </Button>
            )}
            <div className="ml-auto">
              {currentStep < steps.length ? (
                <Button
                  type="button"
                  variant="orange"
                  onClick={nextStep}
                  className="flex items-center gap-2"
                >
                  Suivant
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="orange"
                  disabled={isSubmitting}
                  className="min-w-[200px]"
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer le formulaire'}
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 