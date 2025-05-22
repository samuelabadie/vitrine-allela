'use client';

import { useState } from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
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
  additionalInfo: string;
}

interface FormErrors {
  companyName?: string;
  contactName?: string;
  email?: string;
  phone?: string;
  website?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  description?: string;
}

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone: string): boolean => {
  if (!phone) return true; // Phone is optional
  const phoneRegex = /^(\+33|0)[1-9](\d{2}){4}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

const validateWebsite = (website: string): boolean => {
  if (!website) return true; // Website is optional
  const websiteRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/;
  return websiteRegex.test(website);
};

const validateForm = (formData: FormData): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.companyName.trim()) {
    errors.companyName = 'Le nom de l&apos;entreprise est requis';
  }

  if (!formData.contactName.trim()) {
    errors.contactName = 'Le nom du contact est requis';
  }

  if (!formData.email.trim()) {
    errors.email = 'L&apos;email est requis';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Format d&apos;email invalide';
  }

  if (formData.phone && !validatePhone(formData.phone)) {
    errors.phone = 'Format de numéro de téléphone invalide (ex: +33 6 00 00 00 00)';
  }

  if (formData.website && !validateWebsite(formData.website)) {
    errors.website = 'Format d&apos;URL invalide';
  }

  if (!formData.projectType) {
    errors.projectType = 'Le type de projet est requis';
  }

  if (!formData.timeline) {
    errors.timeline = 'Le délai est requis';
  }

  if (!formData.description.trim()) {
    errors.description = 'La description du projet est requise';
  }

  return errors;
};

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
  additionalInfo: '',
};

const steps = [
  { id: 1, title: 'Informations de l&apos;entreprise' },
  { id: 2, title: 'Informations de contact' },
  { id: 3, title: 'Détails du projet' },
  { id: 4, title: 'Description du projet' },
];

export default function ClientForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
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
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateStep = (step: number): boolean => {
    const stepErrors: FormErrors = {};
    let isValid = true;

    switch (step) {
      case 1:
        if (!formData.companyName.trim()) {
          stepErrors.companyName = 'Le nom de l&apos;entreprise est requis';
          isValid = false;
        }
        if (formData.website && !validateWebsite(formData.website)) {
          stepErrors.website = 'Format d&apos;URL invalide';
          isValid = false;
        }
        break;
      case 2:
        if (!formData.contactName.trim()) {
          stepErrors.contactName = 'Le nom du contact est requis';
          isValid = false;
        }
        if (!formData.email.trim()) {
          stepErrors.email = 'L&apos;email est requis';
          isValid = false;
        } else if (!validateEmail(formData.email)) {
          stepErrors.email = 'Format d&apos;email invalide';
          isValid = false;
        }
        if (formData.phone && !validatePhone(formData.phone)) {
          stepErrors.phone = 'Format de numéro de téléphone invalide';
          isValid = false;
        }
        break;
      case 3:
        if (!formData.projectType) {
          stepErrors.projectType = 'Le type de projet est requis';
          isValid = false;
        }
        if (!formData.timeline) {
          stepErrors.timeline = 'Le délai est requis';
          isValid = false;
        }
        break;
      case 4:
        if (!formData.description.trim()) {
          stepErrors.description = 'La description du projet est requise';
          isValid = false;
        }
        break;
    }

    setErrors(prev => ({ ...prev, ...stepErrors }));
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

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
      setErrors({});
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Informations de l&apos;entreprise</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom de l&apos;entreprise *
                </label>
                <Input
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  placeholder="Entrez le nom de votre entreprise"
                  className={errors.companyName ? 'border-red-500' : ''}
                />
                {errors.companyName && (
                  <p className="mt-1 text-sm text-red-500">{errors.companyName}</p>
                )}
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
                  className={errors.website ? 'border-red-500' : ''}
                />
                {errors.website && (
                  <p className="mt-1 text-sm text-red-500">{errors.website}</p>
                )}
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
                  className={errors.contactName ? 'border-red-500' : ''}
                />
                {errors.contactName && (
                  <p className="mt-1 text-sm text-red-500">{errors.contactName}</p>
                )}
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
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
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
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                )}
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
                  className={`w-full rounded-md border ${errors.projectType ? 'border-red-500' : 'border-gray-200'} bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2`}
                >
                  <option value="">Sélectionnez le type de projet</option>
                  <option value="creation-video">Création vidéo</option>
                  <option value="creation-identite">Création d&apos;identité</option>
                  <option value="creation-site-web">Création de site web</option>
                  <option value="animation-presentation">Animation et présentation</option>
                  <option value="other">Autre (décrivez votre projet)</option>
                </select>
                {errors.projectType && (
                  <p className="mt-1 text-sm text-red-500">{errors.projectType}</p>
                )}
              </div>
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                  Budget
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className={`w-full rounded-md border ${errors.budget ? 'border-red-500' : 'border-gray-200'} bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2`}
                >
                  <option value="">Sélectionnez votre budget</option>
                  <option value="under-2k">Moins de 2 000€</option>
                  <option value="2k-5k">2 000 - 5 000€</option>
                  <option value="5k-7.5k">5 000€ - 7 500€</option>
                  <option value="7.5k-10k">7 500€ - 10 000€</option>
                  <option value="over-10k">Plus de 10 000€</option>
                </select>
                {errors.budget && (
                  <p className="mt-1 text-sm text-red-500">{errors.budget}</p>
                )}
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
                  className={`w-full rounded-md border ${errors.timeline ? 'border-red-500' : 'border-gray-200'} bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2`}
                >
                  <option value="">Sélectionnez le délai</option>
                  <option value="asap">Dès que possible</option>
                  <option value="1-3-months">1-3 mois</option>
                  <option value="3-6-months">3-6 mois</option>
                  <option value="6-12-months">6-12 mois</option>
                  <option value="flexible">Flexible</option>
                </select>
                {errors.timeline && (
                  <p className="mt-1 text-sm text-red-500">{errors.timeline}</p>
                )}
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
                className={`min-h-[120px] ${errors.description ? 'border-red-500' : ''}`}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">{errors.description}</p>
              )}
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
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Prendre contact</h2>
        <p className="text-sm text-gray-500 mb-12 max-w-sm">Remplissez ce formulaire pour nous présenter votre projet. Nous vous recontacterons dans les plus brefs délais pour organiser un appel.</p>
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
            Une erreur est survenue lors de l&apos;envoi du formulaire. Veuillez réessayer.
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