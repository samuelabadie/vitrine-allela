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
    <div className="p-[1px] rounded-2xl max-w-2xl bg-gradient-to-br from-[#EBEBEB] to-[#C4C4C4] transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
      <div className="bg-white/80 rounded-[inherit] p-8 mx-auto shadow-sm transition-all duration-300 hover:bg-white/90 ">
        <div className="flex flex-col md:flex-row items-center gap-6 mb-6 pointer-events-none">
          <div className="flex-shrink-0 pointer-events-none">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-4 flex items-center justify-center pointer-events-none" style={{ width: '60px', height: '60px' }}>
              <Image src={icon} alt="icon" width={30} height={30} className="pointer-events-none md:w-12 md:h-12"/>
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-black pointer-events-none text-center md:text-left">{title}</h2>
        </div>
        <div className="flex flex-wrap md:gap-4 gap-2 mb-6 pointer-events-none justify-center md:justify-start">
          {badges.map((badge) => (
            <div key={badge.label} className="relative flex items-center pointer-events-none">
              <Badge topRightIcon={badge.icon} className="pointer-events-none">
                {badge.label}
              </Badge>
            </div>
          ))}
        </div>
        <div className="md:text-sm text-xs text-gray-500 mb-6 pointer-events-none text-center md:text-left">
          {description}
        </div>
        <div className="flex justify-center md:justify-start">
          <a href="#" className="text-base font-bold text-black flex items-center gap-2 hover:text-orange-500 transition-colors duration-300 group">
            En savoir plus <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </div>
  );
} 