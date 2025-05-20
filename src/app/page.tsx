'use client';
import UnicornStudioBackground from "@/components/UnicornStudioBackground";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";
import services from "@/data/services.json";
import { useRef, useEffect } from 'react';
import { animateHeroTitle, animateBaselineText } from '@/lib/animations';

export default function Home() {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  

  useEffect(() => {
    if (!h1Ref.current) return;
    const words = h1Ref.current.querySelectorAll('.hero-word') as NodeListOf<HTMLElement>;
    animateHeroTitle(words);
  }, []);

  return (
    <>
      <div className="min-h-screen relative flex items-center">
        <UnicornStudioBackground />
        <section id="hero" className="relative z-10 w-full">
          <div className="max-w-3xl pl-8 md:pl-24 py-24 flex flex-col gap-6">
            <div className="text-left space-y-6">
              <div className="text-white text-lg font-light">Ne faites
                <span className="text-orange-500">.com</span> tout le monde
              </div>
              <h1 ref={h1Ref} className="text-4xl md:text-5xl font-bold italic text-white leading-[100%]">
                <span className="font-medium hero-word">Votre</span> <span className="hero-word">présence</span> <span className="hero-word">en</span> <span className="hero-word">ligne</span><br />
                <span className="font-medium hero-word">sur</span> <span className="font-medium hero-word">mesure</span>
              </h1>
              <p className="text-base md:text-xs text-gray-200 max-w-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius elementum tristique. Duis cursus, mi quis viverra ut commodo diam libero vitae erat.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4 items-center">
                <Button size="lg" variant="orange">
                  Réserver un appel <Phone className="w-5 h-5 ml-2" />
                </Button>
                <Link href="/contact" className="flex items-center gap-2 text-base font-bold text-white no-underline">
                  Nous contacter <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* Services Section */}
      <section id="services" className="relative flex justify-center bg-white py-32 min-h-[100vh]">
        <div className="flex w-full max-w-7xl gap-16">
          {/* Fixed Left Block */}
          <div className="w-full max-w-md">
            <div className="sticky top-[120px] flex flex-col gap-6 bg-white rounded-2xl p-8 shadow-md border border-gray-100">
              <h2 className="text-4xl font-bold text-black">Nos services</h2>
              <p className="text-gray-500 text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius elementum tristique. Duis cursus, mi quis viverra ut commodo diam libero vitae erat.</p>
              <Button size="lg" variant="orange">
                Réserver un appel <Phone className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
          {/* Services Cards */}
          <div className="flex-1 flex flex-col gap-8">
            {services.map((service, idx) => (
              <ServiceCard key={idx} {...service} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
