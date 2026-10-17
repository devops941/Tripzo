'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Package, PhoneCall, Phone, Menu, X, ChevronDown, MapPin } from 'lucide-react';
import { useSettings } from '@/lib/useSettings';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { phoneNumber, phoneLink, logoUrl, branches } = useSettings();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCityPicker, setShowCityPicker] = useState(false);
  const [mobileCityOpen, setMobileCityOpen] = useState(false);
  const [destinations, setDestinations] = useState<{ name: string; slug: string }[]>([]);
  const [showDestPicker, setShowDestPicker] = useState(false);
  const [mobileDestOpen, setMobileDestOpen] = useState(false);
  const contactRef = useRef<HTMLDivElement>(null);
  const packagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/destinations')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.destinations) {
          setDestinations(data.destinations.filter((d: { isActive: boolean; name: string; slug: string }) => d.isActive).map((d: { name: string; slug: string }) => ({ name: d.name, slug: d.slug })));
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close city picker on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (contactRef.current && !contactRef.current.contains(e.target as Node)) {
        setShowCityPicker(false);
      }
      if (packagesRef.current && !packagesRef.current.contains(e.target as Node)) {
        setShowDestPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (pathname?.startsWith('/webadmin')) return null;

  const handleContactClick = (e: React.MouseEvent) => {
    if (branches.length > 1) {
      e.preventDefault();
      setShowCityPicker(prev => !prev);
    }
  };

  const handleCitySelect = (cityName: string) => {
    setShowCityPicker(false);
    setMobileMenuOpen(false);
    setMobileCityOpen(false);
    router.push(`/contact?city=${encodeURIComponent(cityName)}`);
  };

  const handlePackagesClick = (e: React.MouseEvent) => {
    if (destinations.length > 1) {
      e.preventDefault();
      setShowDestPicker(prev => !prev);
    }
  };

  const handleDestSelect = (slug: string) => {
    setShowDestPicker(false);
    setMobileMenuOpen(false);
    setMobileDestOpen(false);
    router.push(`/packages?dest=${encodeURIComponent(slug)}`);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/20 backdrop-blur-xl border-b border-zinc-200/60 shadow-lg shadow-zinc-950/5 py-2'
        : 'bg-white border-b border-zinc-100 shadow-sm py-2 sm:py-3'
        }`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center group transition-transform duration-300 hover:scale-[1.03] focus:outline-none"
            aria-label="Tripzo Home"
          >
            <div className="relative h-12 sm:h-14 md:h-16 w-44 sm:w-52 md:w-60 flex items-center">
              <Image
                src={logoUrl}
                alt="Tripzo"
                fill
                sizes="(max-width: 640px) 176px, (max-width: 768px) 208px, 240px"
                className="object-contain object-left drop-shadow-sm"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1.5 p-1.5 rounded-full bg-[#F8FAFF] border border-[#003DB8]/10 shadow-inner">
            <a href="/" className="group inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-zinc-600 hover:text-[#003DB8] rounded-full transition-all duration-200 hover:bg-white hover:shadow-sm">
              <Home className="w-4 h-4 text-zinc-400 group-hover:text-[#00BFFF] transition-colors" />
              <span>Home</span>
            </a>
            <div ref={packagesRef} className="relative">
              <a
                href="/packages"
                onClick={handlePackagesClick}
                className="group inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-zinc-600 hover:text-[#003DB8] rounded-full transition-all duration-200 hover:bg-white hover:shadow-sm cursor-pointer"
              >
                <Package className="w-4 h-4 text-zinc-400 group-hover:text-[#00BFFF] transition-colors" />
                <span>Packages</span>
                {destinations.length > 1 && (
                  <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${showDestPicker ? 'rotate-180' : ''}`} />
                )}
              </a>

              {showDestPicker && destinations.length > 1 && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white rounded-2xl shadow-2xl border border-zinc-100 overflow-hidden z-50 min-w-[200px]">
                  <div className="px-4 pt-3 pb-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Select Destination</p>
                  </div>
                  {destinations.map((d) => (
                    <button
                      key={d.slug}
                      onClick={() => handleDestSelect(d.slug)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-zinc-700 hover:bg-[#003DB8] hover:text-white transition-colors"
                    >
                      <Package className="w-4 h-4 flex-shrink-0" />
                      {d.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Contact with city popup */}
            <div ref={contactRef} className="relative">
              <a
                href="/contact"
                onClick={handleContactClick}
                className="group inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-zinc-600 hover:text-[#003DB8] rounded-full transition-all duration-200 hover:bg-white hover:shadow-sm cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-zinc-400 group-hover:text-[#00BFFF] transition-colors" />
                <span>Contact</span>
                {branches.length > 1 && (
                  <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${showCityPicker ? 'rotate-180' : ''}`} />
                )}
              </a>

              {showCityPicker && branches.length > 1 && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white rounded-2xl shadow-2xl border border-zinc-100 overflow-hidden z-50 min-w-[200px]">
                  <div className="px-4 pt-3 pb-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Select City</p>
                  </div>
                  {branches.map((b) => (
                    <button
                      key={b.cityName}
                      onClick={() => handleCitySelect(b.cityName)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-zinc-700 hover:bg-[#003DB8] hover:text-white transition-colors"
                    >
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      {b.cityName}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Phone + Hamburger */}
          <div className="flex items-center gap-3">
            <a
              href={phoneLink}
              className="group relative flex items-center gap-3.5 pl-3.5 pr-4 sm:pr-5 py-2.5 rounded-2xl bg-[#003DB8] border border-[#00D9FF]/80 hover:text-white shadow-sm hover:shadow-md hover:shadow-[#003DB8]/20 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              aria-label={`Call us at ${phoneNumber}`}
            >
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1">
                  <span className="text-xs sm:text-sm font-bold text-white tracking-wide">{phoneNumber}</span>
                </div>
              </div>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-zinc-700" /> : <Menu className="w-6 h-6 text-zinc-700" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 rounded-2xl bg-white border border-zinc-200/90 p-4 shadow-2xl space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <a href="/" onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-base font-semibold text-zinc-800 hover:text-[#003DB8] rounded-xl hover:bg-zinc-50 transition-colors">
              <Home className="w-5 h-5 text-[#003DB8]" />
              <span>Home</span>
            </a>
            {/* Mobile Packages: toggle destination list */}
            <div>
              <button
                type="button"
                onClick={() => destinations.length > 1 ? setMobileDestOpen(prev => !prev) : (router.push('/packages'), setMobileMenuOpen(false))}
                className="w-full flex items-center justify-between px-4 py-3 text-base font-semibold text-zinc-800 hover:text-[#003DB8] rounded-xl hover:bg-zinc-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-[#003DB8]" />
                  <span>Packages</span>
                </div>
                {destinations.length > 1 && (
                  <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${mobileDestOpen ? 'rotate-180' : ''}`} />
                )}
              </button>
              {mobileDestOpen && destinations.length > 1 && (
                <div className="ml-8 mt-1 space-y-1">
                  {destinations.map((d) => (
                    <button
                      key={d.slug}
                      onClick={() => handleDestSelect(d.slug)}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-zinc-700 hover:bg-[#003DB8]/5 hover:text-[#003DB8] transition-colors"
                    >
                      <Package className="w-4 h-4 flex-shrink-0" />
                      {d.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Contact: toggle city list */}
            <div>
              <button
                type="button"
                onClick={() => branches.length > 1 ? setMobileCityOpen(prev => !prev) : (router.push('/contact'), setMobileMenuOpen(false))}
                className="w-full flex items-center justify-between px-4 py-3 text-base font-semibold text-zinc-800 hover:text-[#003DB8] rounded-xl hover:bg-zinc-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <PhoneCall className="w-5 h-5 text-[#003DB8]" />
                  <span>Contact</span>
                </div>
                {branches.length > 1 && (
                  <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${mobileCityOpen ? 'rotate-180' : ''}`} />
                )}
              </button>
              {mobileCityOpen && branches.length > 1 && (
                <div className="ml-8 mt-1 space-y-1">
                  {branches.map((b) => (
                    <button
                      key={b.cityName}
                      onClick={() => handleCitySelect(b.cityName)}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-zinc-700 hover:bg-[#003DB8]/5 hover:text-[#003DB8] transition-colors"
                    >
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      {b.cityName}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-zinc-100">
              <a href={phoneLink} onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-3 w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm shadow-md active:scale-95 transition-all">
                <Phone className="w-4 h-4 fill-current" />
                <span>Call {phoneNumber}</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
