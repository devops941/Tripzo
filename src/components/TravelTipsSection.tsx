import React from 'react';
import { FileText, HeartPulse, Coins } from 'lucide-react';

interface TipCard {
  title: string;
  description: string;
  icon: React.ElementType;
}

const tips: TipCard[] = [
  {
    title: 'Visa Information',
    description:
      'Check visa requirements before traveling, ensuring a smooth entry and compliance with destination regulations.',
    icon: FileText,
  },
  {
    title: 'Health and Safety Tips',
    description:
      'Prioritize health, stay hydrated, follow safety guidelines, and maintain personal hygiene for a secure journey.',
    icon: HeartPulse,
  },
  {
    title: 'Currency and Tipping',
    description:
      'Familiarize with local currency, consider customary tipping practices for respectful and seamless travel experiences.',
    icon: Coins,
  },
];

export default function TravelTipsSection() {
  return (
    <section className="w-full py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-14">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-zinc-900 tracking-tight">
            Travel Tips
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#003DB8] to-[#00D9FF] rounded-full mt-3" />
        </div>

        {/* 3 Floating Cards with Circular Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-8 pt-8">
          {tips.map((tip, idx) => {
            const Icon = tip.icon;
            return (
              <div
                key={idx}
                className="relative bg-white rounded-2xl p-8 pt-14 text-center border border-zinc-100 shadow-[0_10px_35px_-10px_rgba(0,61,184,0.08)] hover:shadow-[0_20px_45px_-10px_rgba(0,61,184,0.16)] hover:-translate-y-1.5 transition-all duration-300 group"
              >
                {/* Floating Circular Icon Badge at Top */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-[#003DB8] via-[#0047D4] to-[#002f8f] p-[2.5px] shadow-[0_8px_25px_rgba(0,61,184,0.35)] group-hover:scale-105 group-hover:shadow-[0_12px_30px_rgba(0,217,255,0.4)] transition-all duration-300">
                  <div className="w-full h-full rounded-full border border-[#00D9FF]/80 flex items-center justify-center text-white">
                    <Icon className="w-8 h-8 text-[#00D9FF]" strokeWidth={2.2} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-serif font-bold text-zinc-900 mb-3 group-hover:text-[#003DB8] transition-colors">
                  {tip.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed font-normal">
                  {tip.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
