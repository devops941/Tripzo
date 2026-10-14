'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Compass, MapPin, Smile, Globe } from 'lucide-react';
import BookingSection from '@/components/BookingSection';
import ArticleSection from '@/components/ArticleSection';
import Footer from '@/components/Footer';

interface SlideItem {
  src: string;
  alt: string;
  badge?: string;
  headline: string;
  subline: string;
}

const defaultSlides: SlideItem[] = [
  {
    src: '/image_one.png',
    alt: 'Travel Destination 1',
    badge: 'CURATED JOURNEYS',
    headline: 'travel, worldclass',
    subline: 'The real voyage of discovery consists not in seeking new landscapes, but in having new eyes.',
  },
  {
    src: '/image_two.png',
    alt: 'Travel Destination 2',
    badge: 'EXOTIC ESCAPES',
    headline: 'unforgettable journeys',
    subline: 'Discover pristine coastlines, secluded islands, and breathtaking natural wonders with Tripzo.',
  },
  {
    src: '/image_three.png',
    alt: 'Travel Destination 3',
    badge: 'LUXURY RETREATS',
    headline: 'explore the wild peaks',
    subline: 'Experience alpine heights, thrilling treks, and serene valleys crafted for true explorers.',
  },
  {
    src: '/image_four.png',
    alt: 'Travel Destination 4',
    badge: 'TIMELESS MEMORIES',
    headline: 'rich heritage & culture',
    subline: 'Immerse yourself in authentic ancient architecture, vibrant traditions, and unforgettable memories.',
  },
];

export default function Home() {
  const [slides, setSlides] = useState<SlideItem[]>(defaultSlides);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Fetch dynamic slides from MongoDB
  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.settings?.slides?.length > 0) {
          const mapped = data.settings.slides.map((s: any, idx: number) => ({
            src: s.image,
            alt: `Travel Destination ${idx + 1}`,
            badge: s.badge || 'CURATED JOURNEYS',
            headline: s.title || 'travel, worldclass',
            subline: s.description || 'The real voyage of discovery consists not in seeking new landscapes.',
          }));
          setSlides(mapped);
        }
      })
      .catch(err => {
        console.error('Failed to load dynamic slides from MongoDB:', err);
      });
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  return (
    <main className="w-full bg-white text-zinc-900">
      {/* Hero Slideshow Section - Full Width & Height with Dynamic Effects */}
      <section
        id="home"
        aria-label="Image Slideshow"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative w-full h-[88vh] min-h-[580px] max-h-[920px] overflow-hidden group select-none"
      >
        {/* Slides */}
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={slide.src}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
            >
              {/* Full Bleed Cover Image with subtle continuous Ken Burns motion */}
              <div className={`w-full h-full ${isActive ? 'animate-kenburns' : ''}`}>
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  unoptimized
                  sizes="100vw"
                  className="object-cover object-center w-full h-full"
                />
              </div>

              {/* Natural subtle dark gradient overlay for optimal text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/25 to-black/35" />

              {/* Centered Editorial Typography with dynamic fade-in slide-up */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-8 max-w-4xl mx-auto z-10 pointer-events-none">
                <span className={`inline-block text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#00D9FF] mb-3 transition-all duration-700 delay-100 ${
                  isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  {slide.badge || 'Curated Journeys'}
                </span>
                <h1 className={`text-4xl sm:text-6xl md:text-7xl font-serif tracking-normal text-white drop-shadow-lg lowercase transition-all duration-700 delay-200 ${
                  isActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'
                }`}>
                  {slide.headline}
                </h1>
                <p className={`mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-white/95 max-w-2xl font-light tracking-wide drop-shadow leading-relaxed transition-all duration-700 delay-300 ${
                  isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>
                  {slide.subline}
                </p>
              </div>
            </div>
          );
        })}

        {/* Dynamic Slide Timer Progress Bar at top of hero */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-20 overflow-hidden">
          <div
            key={currentIndex}
            className={`h-full bg-gradient-to-r from-[#003DB8] via-[#00D9FF] to-white ${
              !isPaused ? 'animate-slide-progress' : 'w-full opacity-60'
            }`}
          />
        </div>

        {/* Left Arrow (Thin & elegant with micro hover glow) */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous slide"
          className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center text-white/75 hover:text-white transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.6)] focus:outline-none"
        >
          <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10 stroke-[1.5]" />
        </button>

        {/* Right Arrow (Thin & elegant with micro hover glow) */}
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center text-white/75 hover:text-white transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.6)] focus:outline-none"
        >
          <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10 stroke-[1.5]" />
        </button>

        {/* Bottom Dot Indicators with Smooth Expanding Pill */}
        <div className="absolute bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/25 backdrop-blur-md border border-white/10">
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`transition-all duration-500 rounded-full focus:outline-none ${currentIndex === index
                ? 'w-7 h-1.5 bg-gradient-to-r from-white to-[#00D9FF] shadow-sm'
                : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/80'
                }`}
            />
          ))}
        </div>
      </section>

      {/* Feature Highlights Section - Matching Reference UI in Tripzo Theme */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {/* Card 1: 50,000+ Abroad Trips */}
          <div className="group flex flex-col items-center text-center p-8 sm:p-10 rounded-2xl bg-white border border-zinc-100 shadow-[0_10px_30px_rgba(0,61,184,0.06)] hover:shadow-[0_20px_40px_rgba(0,61,184,0.12)] hover:-translate-y-1.5 transition-all duration-300">
            {/* Custom Outline Vector Illustration */}
            <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-[#F8FAFF] border border-[#003DB8]/10 group-hover:scale-105 group-hover:border-[#003DB8]/30 transition-all duration-300">
              <svg
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-14 h-14 text-[#003DB8] group-hover:text-[#00D9FF] transition-colors stroke-[2.2]"
              >
                {/* Traveler with Hood/Backpack Outline */}
                <circle cx="32" cy="22" r="10" stroke="currentColor" strokeWidth="2.5" />
                <path d="M26 22a6 6 0 0 1 12 0" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                <circle cx="28.5" cy="20" r="1" fill="currentColor" />
                <circle cx="35.5" cy="20" r="1" fill="currentColor" />
                <path d="M30 24.5q2 1.5 4 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path
                  d="M19 46c0-7.5 5.5-12 13-12s13 4.5 13 12v6H19v-6z"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                <path d="M27 34v18M37 34v18" stroke="currentColor" strokeWidth="2" strokeDasharray="2 2" />
                <path d="M16 40h-2a3 3 0 0 0-3 3v7h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M48 40h2a3 3 0 0 1 3 3v7h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>

            <h3 className="text-2xl sm:text-[26px] font-serif font-bold text-zinc-900 leading-snug">
              50,000+
              <span className="block font-serif font-medium text-xl sm:text-[22px] text-zinc-800 mt-0.5">
                Abroad Trips
              </span>
            </h3>

            <p className="mt-3.5 text-xs sm:text-sm text-zinc-500 leading-relaxed max-w-xs font-normal">
              For the last decade, Tripzo has organized more than 50,000 international and domestic dream itineraries.
            </p>
          </div>

          {/* Card 2: Handcrafted Experiences */}
          <div className="group flex flex-col items-center text-center p-8 sm:p-10 rounded-2xl bg-white border border-zinc-100 shadow-[0_10px_30px_rgba(0,61,184,0.06)] hover:shadow-[0_20px_40px_rgba(0,61,184,0.12)] hover:-translate-y-1.5 transition-all duration-300">
            {/* Custom Location Map Pin Outline Vector */}
            <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-[#F8FAFF] border border-[#003DB8]/10 group-hover:scale-105 group-hover:border-[#003DB8]/30 transition-all duration-300">
              <svg
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-14 h-14 text-[#003DB8] group-hover:text-[#00D9FF] transition-colors stroke-[2.2]"
              >
                {/* Elegant Pin with Target Heart */}
                <path
                  d="M32 10c-8.284 0-15 6.716-15 15 0 10.5 15 29 15 29s15-18.5 15-29c0-8.284-6.716-15-15-15z"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="32" cy="24" r="6" stroke="currentColor" strokeWidth="2.2" />
                <ellipse cx="32" cy="56" rx="14" ry="3" stroke="currentColor" strokeWidth="1.8" strokeDasharray="3 3" />
              </svg>
            </div>

            <h3 className="text-2xl sm:text-[26px] font-serif font-bold text-zinc-900 leading-snug">
              Handcrafted
              <span className="block font-serif font-medium text-xl sm:text-[22px] text-zinc-800 mt-0.5">
                Experiences
              </span>
            </h3>

            <p className="mt-3.5 text-xs sm:text-sm text-zinc-500 leading-relaxed max-w-xs font-normal">
              Each and every itinerary is customized and curated according to the personal taste of our travelers.
            </p>
          </div>

          {/* Card 3: Extremely Happy Travellers */}
          <div className="group flex flex-col items-center text-center p-8 sm:p-10 rounded-2xl bg-white border border-zinc-100 shadow-[0_10px_30px_rgba(0,61,184,0.06)] hover:shadow-[0_20px_40px_rgba(0,61,184,0.12)] hover:-translate-y-1.5 transition-all duration-300">
            {/* Smiling Guide/Adventurer Outline Vector */}
            <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-[#F8FAFF] border border-[#003DB8]/10 group-hover:scale-105 group-hover:border-[#003DB8]/30 transition-all duration-300">
              <svg
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-14 h-14 text-[#003DB8] group-hover:text-[#00D9FF] transition-colors stroke-[2.2]"
              >
                {/* Explorer Hat & Smile Outline */}
                <path d="M22 18h20a5 5 0 0 1 5 5v1H17v-1a5 5 0 0 1 5-5z" stroke="currentColor" strokeWidth="2.2" />
                <path d="M12 24h40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <path
                  d="M20 24v7a12 12 0 0 0 24 0v-7"
                  stroke="currentColor"
                  strokeWidth="2.2"
                />
                <circle cx="27" cy="29" r="1.2" fill="currentColor" />
                <circle cx="37" cy="29" r="1.2" fill="currentColor" />
                <path d="M28 34q4 3 8 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path
                  d="M18 48c0-5 6-8 14-8s14 3 14 8v5H18v-5z"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                <path d="M30 40l2 6 2-6" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            </div>

            <h3 className="text-2xl sm:text-[26px] font-serif font-bold text-zinc-900 leading-snug">
              Extremely Happy
              <span className="block font-serif font-medium text-xl sm:text-[22px] text-zinc-800 mt-0.5">
                Travellers
              </span>
            </h3>

            <p className="mt-3.5 text-xs sm:text-sm text-zinc-500 leading-relaxed max-w-xs font-normal">
              Tripzo holds a proud record of 99.4% customer satisfaction with over 15,000+ verified positive reviews.
            </p>
          </div>
        </div>
      </section>

      {/* Welcome to Tripzo Section - Matching Reference UI */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
        <div className="max-w-5xl">
          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-serif font-bold text-zinc-900 tracking-tight leading-tight">
            Welcome to Tripzo
          </h2>

          <div className="mt-6 space-y-4 text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
            <p>
              Tripzo Pvt. Ltd built on this strong foundation aims to provide great customer satisfaction and an exemplary holiday experience. Planning a once in a lifetime holiday or a yearly corporate retreat? No problem! Tripzo can get you what you want and in the minimal time. One of the best destination management companies, it has the experience and infrastructure to handle any customer demand. In addition to destination management, Tripzo also plans corporate tours, incentive trips, college/school excursions, business travel, arranges car/railway &amp; hotel bookings and much, much more.
            </p>
            <p>
              Discover what makes Tripzo and its offerings distinct from the rest of the pack and indispensable to its customers.
            </p>
          </div>
        </div>
      </section>

      {/* Editorial & Travel Guide Content Section */}


      {/* Booking and Stay Connected Section with map_image.png background */}
      <BookingSection />

      {/* Footer Matching Reference */}
      <Footer />
    </main>
  );
}


