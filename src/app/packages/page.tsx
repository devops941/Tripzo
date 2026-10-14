'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin,
  Banknote,
  CreditCard,
  Building2,
  Wine,
  Users2,
  HeartHandshake,
  User,
  UserCheck,
} from 'lucide-react';
import Footer from '@/components/Footer';
import TravelTipsSection from '@/components/TravelTipsSection';
import FaqSection from '@/components/FaqSection';

export default function PackagesPage() {
  const essentialTips = [
    {
      icon: Banknote,
      text: 'ATMs widespread in Bangalore, limited in villages.',
    },
    {
      icon: CreditCard,
      text: 'Credit cards widely accepted in Bangalore city.',
    },
    {
      icon: Building2,
      text: 'Banks widespread in Bangalore, scarce in villages.',
    },
    {
      icon: Wine,
      text: 'The legal drinking age in Bangalore is 21 years.',
    },
    {
      icon: Users2,
      text: 'Bangalore residents are known for their hospitality.',
    },
  ];

  const attractions = [
    { name: 'Bangalore Palace' },
    { name: 'Cubbon Park' },
    { name: 'Tipu Sultan Palace' },
    { name: 'Vidhana Soudha' },
    { name: 'ISKCON Temple' },
    { name: 'Lalbagh Botanical Garden' },
    { name: 'National Gallery of Modern Arts' },
    { name: 'Visvesvaraya Industrial and Technological Museum' },
  ];

  return (
    <main className="w-full min-h-screen pt-24 bg-[#FAFAFA] text-zinc-800">
      {/* Top Header Bar */}
      <section className="bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Title & Tag */}
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-[42px] font-serif font-bold text-zinc-900 tracking-tight leading-tight">
                Bangalore Tour Packages
              </h1>

              <div className="flex items-center gap-2 mt-2 text-[#003DB8] text-sm font-semibold">
                <MapPin className="w-4 h-4 fill-[#003DB8]" />
                <span>India&apos;s Garden City</span>
              </div>
            </div>

            {/* Right: CTA Action Buttons */}
            <div className="flex items-center gap-3 self-start md:self-center">
              <Link
                href="/contact"
                className="px-6 py-2.5 rounded-full bg-[#003DB8] border border-[#00D9FF]/80 hover:bg-[#002f8f] active:scale-95 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
              >
                Book Now
              </Link>
              <Link
                href="#all-packages"
                className="px-6 py-2.5 rounded-full bg-[#003DB8] border border-[#00D9FF]/80 hover:bg-[#002f8f] active:scale-95 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
              >
                View All Packages
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Showcase Section: Image Showcase (Left) + Travel Brand Box & Essential Tips (Right) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Landmark Showcase Image (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="relative w-full h-[360px] sm:h-[480px] md:h-[520px] rounded-2xl overflow-hidden shadow-lg border border-zinc-200">
              <Image
                src="/bangalore_park.jpg"
                alt="Cubbon Park - Bangalore"
                fill
                unoptimized
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover object-center"
              />
            </div>

            {/* Sub-caption bar with Tripzo themed button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
              <p className="text-sm font-semibold text-zinc-700">
                <span className="font-bold text-zinc-900">World&apos;s Fastest Developing City:</span> Bangalore
              </p>
              <Link
                href="#all-packages"
                className="px-5 py-2 rounded-full bg-[#003DB8] border border-[#00D9FF]/80 hover:bg-[#002f8f] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
              >
                View All Packages
              </Link>
            </div>
          </div>

          {/* Right Column: Travel Brand Fast Facts & Essential Tips (4 Cols) */}
          <div className="lg:col-span-4 space-y-8">
            {/* South India's No.1 Travel Brand Box */}
            <div className="bg-[#F8F9FB] border border-zinc-200/80 rounded-2xl p-6 shadow-sm">
              <h2 className="text-base font-serif font-bold text-zinc-800 border-b border-zinc-200 pb-3 mb-5">
                South India&apos;s No.1 Travel Brand
              </h2>

              <div className="grid grid-cols-2 gap-5 text-left">
                {/* Fact 1 */}
                <div>
                  <h4 className="text-sm font-bold text-zinc-900 leading-snug">Cubbon Park</h4>
                  <p className="text-[11px] text-zinc-500 mt-0.5">Green Heart of Bangalore</p>
                </div>

                {/* Fact 2 */}
                <div>
                  <h4 className="text-sm font-bold text-zinc-900 leading-snug">Bangalore</h4>
                  <p className="text-[11px] text-zinc-500 mt-0.5">Pub Capital of India</p>
                </div>

                {/* Fact 3 */}
                <div>
                  <h4 className="text-sm font-bold text-zinc-900 leading-snug">
                    Lalbagh Botanical Garden
                  </h4>
                  <p className="text-[11px] text-zinc-500 mt-0.5">
                    Botanical Masterpiece of Bangalore
                  </p>
                </div>

                {/* Fact 4 */}
                <div>
                  <h4 className="text-sm font-bold text-zinc-900 leading-snug">
                    Kannada, English, Tamil, Hindi
                  </h4>
                  <p className="text-[11px] text-zinc-500 mt-0.5">Languages Speaking</p>
                </div>
              </div>
            </div>

            {/* Essential Tips for Travelling to Bangalore */}
            <div className="space-y-4">
              <h3 className="text-lg font-serif font-bold text-zinc-900">
                Essential Tips for Travelling to Bangalore
              </h3>

              <div className="space-y-3">
                {essentialTips.map((tip, idx) => {
                  const Icon = tip.icon;
                  return (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#003DB8] text-[#00D9FF] flex items-center justify-center shadow-xs">
                        <Icon className="w-4 h-4" />
                      </div>
                      <p className="text-xs text-zinc-600 leading-tight">{tip.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bangalore - Visitors Statistics Section */}
      <section className="bg-white border-y border-zinc-200 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 mb-8 sm:mb-12">
            Bangalore – Visitors Statistics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Map Silhouette Vector (2 Cols) */}
            <div className="md:col-span-2 flex justify-center">
              <svg viewBox="0 0 100 100" className="w-24 h-24 text-zinc-800 fill-current opacity-90">
                <path d="M40,15 Q55,10 65,25 Q75,35 70,50 Q65,65 55,80 Q45,85 35,75 Q20,65 25,50 Q20,35 30,25 Z" />
              </svg>
            </div>

            {/* Annually Metric (3 Cols) */}
            <div className="md:col-span-3 border-l-2 border-[#003DB8] pl-6 space-y-4">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                Annually
              </span>
              <p className="text-3xl sm:text-4xl font-extrabold text-zinc-900 font-sans tracking-tight">
                3,70,00,000
              </p>
              <div className="flex items-center gap-6 pt-2">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-[#003DB8]" />
                  <div>
                    <span className="text-[10px] text-zinc-400 uppercase block font-semibold">Male</span>
                    <span className="text-sm font-bold text-zinc-800">51%</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-[#00D9FF]" />
                  <div>
                    <span className="text-[10px] text-zinc-400 uppercase block font-semibold">Female</span>
                    <span className="text-sm font-bold text-zinc-800">49%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* By Purpose Breakdown (3 Cols) */}
            <div className="md:col-span-3 border-l-2 border-zinc-200 pl-6 space-y-5">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                By Purpose
              </span>

              {/* Couples */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-3">
                  <HeartHandshake className="w-6 h-6 text-[#003DB8]" />
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900">Couples</h4>
                    <p className="text-[11px] text-zinc-500">For Newlywed Vacations</p>
                  </div>
                </div>
                <div className="w-full bg-zinc-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[#003DB8] h-full w-[65%]" />
                </div>
              </div>

              {/* Family */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-3">
                  <Users2 className="w-6 h-6 text-[#003DB8]" />
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900">Family</h4>
                    <p className="text-[11px] text-zinc-500">For Family Vacations</p>
                  </div>
                </div>
                <div className="w-full bg-zinc-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[#00D9FF] h-full w-[80%]" />
                </div>
              </div>
            </div>

            {/* Top Tourist Attractions (4 Cols) */}
            <div className="md:col-span-4 border-l-2 border-zinc-200 pl-6 space-y-4">
              <h3 className="text-base font-serif font-bold text-zinc-900">
                Top Tourist Attractions
              </h3>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                {attractions.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#003DB8] mt-1.5 flex-shrink-0" />
                    <span className="text-xs text-zinc-700 leading-tight font-medium hover:text-[#003DB8] transition-colors cursor-pointer">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Travel Tips Section */}
      <TravelTipsSection />

      {/* FAQs Section */}
      <FaqSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
