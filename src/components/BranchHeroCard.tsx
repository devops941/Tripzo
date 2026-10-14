'use client';

import Image from 'next/image';

interface BranchHeroCardProps {
  companyName?: string;
  addressLines?: string[];
  phoneNumber?: string;
  phoneLink?: string;
  email?: string;
  imageSrc?: string;
}

export default function BranchHeroCard({
  companyName = "Tripzo Private Limited",
  addressLines = [
    "Jayam Towers,",
    "HIG 38, Above DBS Bank,",
    "80 Feet Road, Annanagar,",
    "Madurai – 20",
  ],
  phoneNumber = "+91 9940882200",
  phoneLink = "tel:+919940882200",
  email = "mail@tripzo.in",
  imageSrc = "/madurai_branch.jpg",
}: BranchHeroCardProps) {
  return (
    <section className="w-full bg-white py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-5xl mx-auto min-h-[380px] sm:min-h-[460px] md:min-h-[500px] flex items-center">
          {/* Photo on the right side */}
          <div className="w-full md:w-[70%] ml-auto h-[320px] sm:h-[400px] md:h-[480px] relative rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={imageSrc}
              alt="Madurai Cultural Heritage"
              fill
              unoptimized
              priority
              sizes="(max-width: 768px) 100vw, 70vw"
              className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
            />
            {/* Subtle contrast gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent md:hidden" />
          </div>

          {/* Overlapping Info Card on the left (Dark Navy styling matching user screenshot) */}
          <div className="relative md:absolute left-0 top-1/2 -translate-y-1/2 z-10 w-full md:w-[48%] mt-[-40px] md:mt-0">
            <div className="bg-[#1C2C48] text-white p-7 sm:p-9 md:p-11 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.35)] border border-white/10 space-y-5">
              {/* Company Title */}
              <h2 className="text-2xl sm:text-3xl md:text-[32px] font-serif font-bold text-[#F4B400] tracking-tight leading-snug">
                {companyName}
              </h2>

              {/* Address */}
              <address className="not-italic text-sm sm:text-base text-zinc-200 leading-relaxed space-y-0.5 font-normal">
                {addressLines.map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </address>

              {/* Contact details */}
              <div className="pt-2 space-y-2 border-t border-white/15">
                <a
                  href={phoneLink}
                  className="block text-sm sm:text-base font-semibold text-white hover:text-[#00D9FF] transition-colors"
                >
                  {phoneNumber}
                </a>
                <a
                  href={`mailto:${email}`}
                  className="block text-sm sm:text-base text-zinc-300 hover:text-[#00D9FF] transition-colors"
                >
                  {email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
