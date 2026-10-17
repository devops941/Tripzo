'use client';

import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import Footer from '@/components/Footer';

interface PackageItem {
  _id?: string;
  name: string;
  duration: string;
  price: string;
  image: string;
  description: string;
  highlights: string;
}

interface Destination {
  _id: string;
  name: string;
  slug: string;
  tagline: string;
  heroImage: string;
  packages: PackageItem[];
  isActive: boolean;
}

function PackagesPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/destinations')
      .then(r => r.json())
      .then(data => {
        if (data.success) setDestinations(data.destinations || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const dest = searchParams.get('dest');
    if (dest && destinations.length > 0) {
      const idx = destinations.findIndex(d => d.slug === dest);
      if (idx !== -1) setSelectedIdx(idx);
    }
  }, [searchParams, destinations]);

  if (loading) {
    return (
      <main className="w-full min-h-screen pt-24 bg-[#FAFAFA] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#003DB8] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-semibold text-zinc-500">Loading packages...</p>
        </div>
      </main>
    );
  }

  if (destinations.length === 0) {
    return (
      <main className="w-full min-h-screen pt-24 bg-[#FAFAFA] flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <p className="text-zinc-500 text-base font-semibold">No packages available yet.</p>
        </div>
        <Footer />
      </main>
    );
  }

  const selected = destinations[selectedIdx];

  return (
    <main className="w-full min-h-screen pt-24 bg-[#FAFAFA] text-zinc-800">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="relative w-full h-56 sm:h-72 md:h-80 rounded-2xl overflow-hidden shadow-lg border border-zinc-200 mb-6">
          {selected.heroImage ? (
            <Image
              src={selected.heroImage}
              alt={selected.name}
              fill
              unoptimized
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#003DB8] to-[#00D9FF] flex items-center justify-center">
              <span className="text-white text-4xl font-serif font-bold opacity-40">{selected.name}</span>
            </div>
          )}
          {/* Overlay gradient + text */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex flex-col justify-end p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-tight drop-shadow">
              {selected.name} Tour Packages
            </h1>
            {selected.tagline && (
              <p className="text-sm sm:text-base text-white/80 mt-1 font-medium drop-shadow">
                {selected.tagline}
              </p>
            )}
          </div>
        </div>

        {/* Packages Grid */}
        {selected.packages.length === 0 ? (
          <div className="text-center py-20 text-zinc-400">
            <p className="text-sm font-semibold">No packages added for {selected.name} yet.</p>
            <p className="text-xs mt-1">Check back soon or contact us for custom itineraries.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {selected.packages.map((pkg, idx) => (
              <div
                key={pkg._id || idx}
                onClick={() => router.push('/packages/' + selected.slug + '/' + idx)}
                className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                {/* Package Image */}
                <div className="relative h-48 w-full bg-zinc-100 flex-shrink-0">
                  {pkg.image ? (
                    <Image src={pkg.image} alt={pkg.name} fill unoptimized
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#003DB8]/10 to-[#00D9FF]/10 flex items-center justify-center">
                      <span className="text-zinc-400 text-xs font-semibold">No Image</span>
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1 gap-3">
                  <h3 className="font-serif font-bold text-zinc-900 text-lg leading-snug">{pkg.name}</h3>
                  <div className="flex items-center gap-2 flex-wrap">
                    {pkg.duration && (
                      <span className="text-xs font-semibold text-zinc-500 bg-zinc-100 px-2.5 py-1 rounded-full">{pkg.duration}</span>
                    )}
                    {pkg.price && (
                      <span className="text-xs font-bold text-[#003DB8] bg-blue-50 px-2.5 py-1 rounded-full">{pkg.price}</span>
                    )}
                  </div>
                  {pkg.description && (
                    <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2 flex-1">{pkg.description}</p>
                  )}
                  <span className="mt-auto inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#003DB8] text-white font-bold text-xs uppercase tracking-wider shadow-sm">
                    View Details
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}

export default function PackagesPage() {
  return (
    <Suspense fallback={
      <main className="w-full min-h-screen pt-24 bg-[#FAFAFA] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#003DB8] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-semibold text-zinc-500">Loading packages...</p>
        </div>
      </main>
    }>
      <PackagesPageContent />
    </Suspense>
  );
}
