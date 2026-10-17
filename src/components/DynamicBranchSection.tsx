'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSettings } from '@/lib/useSettings';

export default function DynamicBranchSection({ city }: { city?: string }) {
  const { phoneNumber, phoneLink, email, branches } = useSettings();
  const [selected, setSelected] = useState(0);

  // Update selected city whenever the city prop or branches change
  useEffect(() => {
    if (city && branches.length > 0) {
      const idx = branches.findIndex(b => b.cityName.toLowerCase() === city.toLowerCase());
      if (idx !== -1) setSelected(idx);
    }
  }, [city, branches]);

  if (branches.length === 0) return null;

  const branch = branches[selected];

  return (
    <section className="w-full bg-white py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Branch Card */}
        <div className="relative max-w-5xl mx-auto min-h-[380px] sm:min-h-[460px] md:min-h-[500px] flex items-center">
          {/* Photo */}
          <div className="w-full md:w-[70%] ml-auto h-[320px] sm:h-[400px] md:h-[480px] relative rounded-2xl overflow-hidden shadow-2xl">
            {branch.image ? (
              <Image
                src={branch.image}
                alt={branch.cityName}
                fill
                unoptimized
                priority
                sizes="(max-width: 768px) 100vw, 70vw"
                className="object-cover object-center grayscale"
              />
            ) : (
              <div className="w-full h-full bg-zinc-100 flex items-center justify-center">
                <span className="text-zinc-400 text-sm">No image uploaded</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent md:hidden" />
          </div>

          {/* Info Card */}
          <div className="relative md:absolute left-0 top-1/2 -translate-y-1/2 z-10 w-full md:w-[48%] mt-[-40px] md:mt-0">
            <div className="bg-[#1C2C48] text-white p-7 sm:p-9 md:p-11 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.35)] border border-white/10 space-y-5">
              <h2 className="text-2xl sm:text-3xl md:text-[32px] font-serif font-bold text-[#F4B400] tracking-tight leading-snug">
                Tripzo – {branch.cityName}
              </h2>

              <address className="not-italic text-sm sm:text-base text-zinc-200 leading-relaxed font-normal whitespace-pre-line">
                {branch.address}
              </address>

              <div className="pt-2 space-y-2 border-t border-white/15">
                <a href={phoneLink} className="block text-sm sm:text-base font-semibold text-white hover:text-[#00D9FF] transition-colors">
                  {phoneNumber}
                </a>
                <a href={`mailto:${email}`} className="block text-sm sm:text-base text-zinc-300 hover:text-[#00D9FF] transition-colors">
                  {email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* City-specific articles */}
        {branch.articles && branch.articles.length > 0 && (
          <div className="mt-12 sm:mt-16 max-w-5xl space-y-10 sm:space-y-12">
            {branch.articles.map((article: { heading: string; content: string }, idx: number) => (
              <article key={idx} className="space-y-3.5">
                <h2 className="text-2xl sm:text-3xl md:text-[32px] font-serif font-bold text-zinc-900 tracking-tight leading-snug">
                  {article.heading}
                </h2>
                <div className="space-y-3 text-xs sm:text-sm md:text-[14.5px] text-zinc-600 leading-relaxed font-normal">
                  {article.content.split('\n\n').map((para: string, pIdx: number) => (
                    <p key={pIdx}>{para}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
