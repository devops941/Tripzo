'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Clock, Banknote, CheckCircle2, ChevronDown, Phone, Mail } from 'lucide-react';
import Footer from '@/components/Footer';
import BookingForm from '@/components/BookingForm';
import { useSettings } from '@/lib/useSettings';

interface PackageItem {
  _id?: string;
  name: string;
  duration: string;
  price: string;
  image: string;
  description: string;
  highlights: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface Destination {
  _id: string;
  name: string;
  slug: string;
  tagline: string;
  heroImage: string;
  packages: PackageItem[];
  faqs: FaqItem[];
  isActive: boolean;
}

export default function PackageDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [destination, setDestination] = useState<Destination | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [defaultDest, setDefaultDest] = useState('');
  const { phoneNumber: contactPhone, phoneLink: contactPhoneLink, email: contactEmail } = useSettings();

  const slug = params.slug as string;
  const pkgIndex = parseInt(params.pkgIndex as string, 10);

  useEffect(() => {
    fetch('/api/destinations')
      .then(r => r.json())
      .then(data => {
        if (data.success && data.destinations) {
          const dest = data.destinations.find((d: Destination) => d.slug === slug);
          if (dest && dest.packages && dest.packages[pkgIndex]) {
            setDestination(dest);
            setDefaultDest(`${dest.name} — ${dest.packages[pkgIndex].name}`);
          } else {
            setNotFound(true);
          }
        } else {
          setNotFound(true);
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug, pkgIndex]);

  if (loading) {
    return (
      <main className="w-full min-h-screen pt-24 bg-[#FAFAFA] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#003DB8] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-semibold text-zinc-500">Loading package details...</p>
        </div>
      </main>
    );
  }

  if (notFound || !destination) {
    return (
      <main className="w-full min-h-screen pt-24 bg-[#FAFAFA] flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center gap-6 px-4">
          <p className="text-zinc-500 text-base font-semibold">Package not found</p>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Packages
          </button>
        </div>
        <Footer />
      </main>
    );
  }

  const pkg = destination.packages[pkgIndex];

  return (
    <main className="w-full min-h-screen pt-24 bg-[#FAFAFA] text-zinc-800">
      {/* Back Button */}
      <div className="max-w-5xl mx-auto px-4 py-4">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Packages
        </button>
      </div>

      {/* Hero Image */}
      <section className="max-w-5xl mx-auto px-4 pb-2">
        <div className="relative w-full h-56 sm:h-72 md:h-80 rounded-2xl overflow-hidden shadow-lg border border-zinc-200">
          {pkg.image ? (
            <Image
              src={pkg.image}
              alt={pkg.name}
              fill
              unoptimized
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover object-center"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#003DB8] to-[#00D9FF] flex items-center justify-center">
              <span className="text-white font-serif font-bold text-3xl opacity-40">{pkg.name}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <p className="text-xs font-bold text-white/70 uppercase tracking-widest mb-1">{destination.name}</p>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight drop-shadow">{pkg.name}</h1>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto px-4 py-6 text-xs text-zinc-500">
        <div className="flex items-center gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-[#003DB8] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/packages" className="hover:text-[#003DB8] transition-colors">Packages</Link>
          <span>/</span>
          <Link href="/packages" className="hover:text-[#003DB8] transition-colors">{destination.name}</Link>
          <span>/</span>
          <span className="text-zinc-700">{pkg.name}</span>
        </div>
      </div>

      {/* Content */}
      <section className="max-w-5xl mx-auto px-4 py-8 pb-16">
        {/* Duration + Price */}
        <div className="flex flex-wrap gap-3 mb-8">
          {pkg.duration && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 text-zinc-700 text-sm font-semibold">
              <Clock className="w-4 h-4 text-[#003DB8]" />
              {pkg.duration}
            </div>
          )}
          {pkg.price && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-[#003DB8] text-sm font-bold">
              <Banknote className="w-4 h-4" />
              {pkg.price}
            </div>
          )}
        </div>

        {/* Overview */}
        {pkg.description && (
          <div className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-800 mb-2">Overview</h2>
            <p className="text-sm text-zinc-600 leading-relaxed whitespace-pre-line">{pkg.description}</p>
          </div>
        )}

        {/* Highlights */}
        {pkg.highlights && (
          <div className="mb-10">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-800 mb-3">Highlights</h2>
            <ul className="space-y-2">
              {pkg.highlights.split('\n').filter(l => l.trim()).map((line, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-600">
                  <CheckCircle2 className="w-4 h-4 text-[#003DB8] flex-shrink-0 mt-0.5" />
                  <span>{line.trim()}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Enquire CTA */}
        <button
          type="button"
          onClick={() => document.getElementById('enquiry-form')?.scrollIntoView({ behavior: 'smooth' })}
          className="w-full inline-flex items-center justify-center py-4 rounded-2xl bg-[#003DB8] hover:bg-[#002f8f] active:scale-95 text-white font-bold text-sm uppercase tracking-wider shadow-lg transition-all"
        >
          Enquire Now
        </button>
      </section>

      {/* Travel Tips */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[#003DB8]">Plan Ahead</span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 mt-1">Travel Tips</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              title: 'Visa Information',
              desc: 'Check visa requirements before traveling, ensuring a smooth entry and compliance with destination regulations.',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <circle cx="9" cy="10" r="2" />
                  <path d="M7 16c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2" />
                  <path d="M15 8h2M15 11h2" />
                </svg>
              ),
            },
            {
              title: 'Health & Safety',
              desc: 'Prioritize health, stay hydrated, follow safety guidelines, and maintain personal hygiene for a secure journey.',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                  <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
                  <path d="M12 8v4M10 10h4" />
                </svg>
              ),
            },
            {
              title: 'Currency & Tipping',
              desc: 'Familiarize with local currency, consider customary tipping practices for respectful and seamless travel experiences.',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                  <circle cx="12" cy="14" r="2" />
                  <path d="M12 12v-1M12 16v1" />
                </svg>
              ),
            },
          ].map((tip) => (
            <div key={tip.title} className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6 flex flex-col items-center text-center gap-4 hover:shadow-lg hover:-translate-y-0.5 transition-all group">
              <div className="w-20 h-20 rounded-full bg-[#003DB8] group-hover:bg-[#002f8f] flex items-center justify-center shadow-md flex-shrink-0 transition-colors">
                {tip.icon}
              </div>
              <h3 className="font-serif font-bold text-zinc-900 text-lg">{tip.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{tip.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      {destination.faqs && destination.faqs.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 pb-16">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#003DB8]">Need Help?</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 mt-1">FAQs</h2>
          </div>
          <div className="divide-y divide-zinc-100 border border-zinc-100 rounded-2xl overflow-hidden">
            {destination.faqs.map((faq, i) => (
              <div key={i} className="bg-white">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-zinc-50 transition-colors gap-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-md bg-[#003DB8]/10 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-[#003DB8]">Q</span>
                    </span>
                    <span className="text-sm font-semibold text-zinc-800">{faq.question}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-zinc-400 flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 pt-0">
                    <p className="text-sm text-zinc-600 leading-relaxed pl-9">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Enquiry Form */}
      <section id="enquiry-form" className="relative w-full py-16 sm:py-24 bg-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20 z-0 flex items-center justify-center">
          <Image src="/map_image.png" alt="World Map Background" fill unoptimized sizes="100vw" className="object-cover object-center" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left: Stay Connected */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-zinc-900 tracking-tight">Stay Connected</h2>
              <div className="flex flex-col items-center lg:items-start space-y-2 group">
                <a
                  href={contactPhoneLink}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[#003DB8]/10 text-[#003DB8] group-hover:bg-[#003DB8] group-hover:text-white transition-all shadow-sm"
                >
                  <Phone className="w-5 h-5 fill-current" />
                </a>
                <a href={contactPhoneLink} className="text-base sm:text-lg font-semibold text-zinc-800 hover:text-[#003DB8] transition-colors tracking-wide">
                  {contactPhone}
                </a>
              </div>
              <div className="flex flex-col items-center lg:items-start space-y-2 group">
                <a
                  href={`mailto:${contactEmail}`}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[#003DB8]/10 text-[#003DB8] group-hover:bg-[#003DB8] group-hover:text-white transition-all shadow-sm"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <a href={`mailto:${contactEmail}`} className="text-base sm:text-lg font-semibold text-zinc-800 hover:text-[#003DB8] transition-colors">
                  {contactEmail}
                </a>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-7 w-full">
              <div className="bg-white p-6 sm:p-10 rounded-2xl border border-zinc-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.06)]">
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 mb-6 text-center sm:text-left">
                  Book Your Dream Vacay Today!
                </h3>
                <BookingForm defaultDestination={defaultDest} contactPhone={contactPhone} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
