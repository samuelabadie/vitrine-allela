import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ServiceCard from '@/components/ServiceCard';
import services from '@/data/services.json';

export default function AllComponentsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-12">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">All Components</h1>

        {/* Button Variants */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Button Variants</h2>
          <div className="flex flex-wrap gap-4 mb-4">
            <Button variant="default">Default</Button>
            <Button variant="link">Link</Button>
            <Button variant="orange">Orange</Button>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon" aria-label="icon only">
              <span className="material-icons">star</span>
            </Button>
          </div>
        </section>

        {/* Badge Variants */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Badge Variants</h2>
          <div className="flex gap-4 items-center">
            <Badge>Default</Badge>
            <Badge variant="orange">Orange</Badge>
            <Badge topRightIcon="/assets/icons/short-icon.svg">Badge with Icon</Badge>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Card</h2>
          <div className="space-y-12">
            {services.map((service, idx) => (
              <ServiceCard key={idx} {...service} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
} 