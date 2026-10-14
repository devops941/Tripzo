'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Package, PhoneCall, Phone, Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  phoneNumber?: string;
  phoneLink?: string;
}

export default function Header({
  phoneNumber: initialPhone = "+91 9940882200",
  phoneLink: initialLink = "tel:+919940882200",
}: HeaderProps) {
  const pathname = usePathname();
  const [phoneNumber, setPhoneNumber] = useState(initialPhone);
  const [phoneLink, setPhoneLink] = useState(initialLink);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Fetch dynamic contact info from MongoDB
  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.settings?.phoneNumber) {
          setPhoneNumber(data.settings.phoneNumber);
          setPhoneLink(data.settings.phoneLink || `tel:${data.settings.phoneNumber}`);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Do not render website header on admin pages
  if (pathname?.startsWith('/webadmin')) {
    return null;
  }

  const navLinks = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Packages', href: '/packages', icon: Package },
    { label: 'Contact', href: '/contact', icon: PhoneCall },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/20 backdrop-blur-xl border-b border-zinc-200/60 shadow-lg shadow-zinc-950/5 py-2'
        : 'bg-white border-b border-zinc-100 shadow-sm py-2 sm:py-3'
        }`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Brand / Home Logo (Enlarged) */}
          <Link
            href="/"
            className="flex items-center group transition-transform duration-300 hover:scale-[1.03] focus:outline-none"
            aria-label="Tripzo Home"
          >
            <div className="relative h-12 sm:h-14 md:h-16 w-44 sm:w-52 md:w-60 flex items-center">
              <Image
                src="/Home.png"
                alt="Tripzo"
                fill
                sizes="(max-width: 640px) 176px, (max-width: 768px) 208px, 240px"
                className="object-contain object-left drop-shadow-sm"
                priority
              />
            </div>
          </Link>

          {/* Center: Desktop Navigation Links with Lucide Icons */}
          <nav className="hidden md:flex items-center gap-1.5 p-1.5 rounded-full bg-[#F8FAFF] border border-[#003DB8]/10 shadow-inner">
            {navLinks.map((link) => {
              const IconComponent = link.icon;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="group inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-zinc-600 hover:text-[#003DB8] rounded-full transition-all duration-200 hover:bg-white hover:shadow-sm"
                >
                  <IconComponent className="w-4 h-4 text-zinc-400 group-hover:text-[#00BFFF] transition-colors" />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right: Premium "Call Us" Card Design */}
          <div className="flex items-center gap-3">

            <a
              href={phoneLink}
              className="group relative flex items-center gap-3.5 pl-3.5 pr-4 sm:pr-5 py-2.5 rounded-2xl bg-[#003DB8] border border-[#00D9FF]/80 hover:text-white shadow-sm hover:shadow-md hover:shadow-[#003DB8]/20 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              aria-label={`Call us at ${phoneNumber}`}
            >



              {/* Right Side: Text & Mobile Number */}
              <div className="flex flex-col text-left">

                <div className="flex items-center gap-1">
                  <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
                    {phoneNumber}
                  </span>

                </div>
              </div>
            </a>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-zinc-700" />
              ) : (
                <Menu className="w-6 h-6 text-zinc-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Menu with Lucide Icons */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 rounded-2xl bg-white border border-zinc-200/90 p-4 shadow-2xl space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
            {navLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-base font-semibold text-zinc-800 hover:text-emerald-600 rounded-xl hover:bg-zinc-50 transition-colors"
                >
                  <IconComponent className="w-5 h-5 text-emerald-600" />
                  <span>{link.label}</span>
                </a>
              );
            })}
            <div className="pt-2 border-t border-zinc-100">
              <a
                href={phoneLink}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-3 w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm shadow-md active:scale-95 transition-all"
              >
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
