import Image from 'next/image';
import { Badge } from './ui/badge';

interface BadgeData {
  label: string;
  icon?: string;
}

interface ServiceCardProps {
  icon: string;
  title: string;
  badges: BadgeData[];
  description: string;
}

export default function ServiceCard({ icon, title, badges, description }: ServiceCardProps) {
  return (
    <div className="p-[2px] rounded-2xl bg-gradient-to-br from-[#EBEBEB] to-[#C4C4C4]">
      <div className="bg-white/80 rounded-[inherit] p-8 max-w-3xl mx-auto shadow-sm">
        <div className="flex items-center gap-6 mb-6">
          <div className="flex-shrink-0">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-4 flex items-center justify-center" style={{ width: 80, height: 80 }}>
              <Image src={icon} alt="icon" width={48} height={48} />
            </div>
          </div>
          <h2 className="text-3xl font-semibold text-black">{title}</h2>
        </div>
        <div className="flex flex-wrap gap-6 mb-6">
          {badges.map((badge) => (
            <div key={badge.label} className="relative flex items-center">
              <Badge topRightIcon={badge.icon}>
                {badge.label}
              </Badge>
            </div>
          ))}
        </div>
        <div className="text-sm text-gray-500 mb-6">
          {description}
        </div>
        <div>
          <a href="#" className="text-base font-bold text-black flex items-center gap-2 hover:underline">
            En savoir plus <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </div>
  );
} 