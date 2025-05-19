import UnicornStudioBackground from "@/components/UnicornStudioBackground";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen relative flex items-center">
      <UnicornStudioBackground />
      <main className="relative z-10 w-full">
        <div className="max-w-3xl pl-8 md:pl-24 py-24 flex flex-col gap-6">
          <div className="text-left space-y-6">
            <div className="text-white text-lg font-light">
              <span className="text-orange-500 font-bold">Nefaites.com</span> tout le monde
            </div>
            <h1 className="text-4xl md:text-5xl font-bold italic text-white leading-[100%]">
              <span className="font-medium">Votre</span> présence en ligne<br /><span className="font-medium">sur mesure</span>
            </h1>
            <p className="text-base md:text-xs text-gray-200 max-w-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius elementum tristique. Duis cursus, mi quis viverra ut commodo diam libero vitae erat.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 items-center">
              <Button size="lg" variant="orange" className="flex items-center gap-2 text-base font-bold px-8 py-6 rounded-full shadow-orange-500/30 shadow-md">
                Réserver un appel <Phone className="w-5 h-5 ml-2" />
              </Button>
              <Link href="/contact" className="flex items-center gap-2 text-base font-bold text-white no-underline">
                Nous contacter <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
