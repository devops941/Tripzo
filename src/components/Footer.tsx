'use client';

import Link from 'next/link';

interface FooterProps {
  phoneNumber?: string;
  phoneLink?: string;
  email?: string;
}

export default function Footer({
  phoneNumber = "+91 9940882200",
  phoneLink = "tel:+919940882200",
  email = "mail@tripzo.in",
}: FooterProps) {
  const branchesLeft = [
    'Mumbai',
    'Hyderabad',
    'Bangalore',
    'Chennai',
    'Coimbatore',
    'Erode',
    'Madurai',
  ];

  const branchesRight = [
    'Trichy',
    'Salem',
    'Kochi',
    'Vellore',
    'Pondicherry',
    'Nagercoil',
    'Kanyakumari',
  ];

  return (
    <footer className="w-full bg-[#1A1A1A] text-zinc-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-16 sm:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Corporate Office (lg: 4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <h3 className="text-2xl sm:text-[26px] font-serif font-bold text-white tracking-wide">
                Corporate Office
              </h3>
              <div className="w-12 h-0.5 bg-white/20 mt-2 mb-4" />
              <address className="not-italic text-xs sm:text-[13px] text-zinc-400 leading-relaxed space-y-1">
                <p className="font-semibold text-zinc-200">Tripzo Pvt LTD,</p>
                <p>Novel Tech Park,</p>
                <p>Opposite to 1 MG Mall,</p>
                <p>MG Road, Bangalore - 560042</p>
                <p>Karnataka, India.</p>
              </address>
            </div>

            {/* Call Us Block */}
            <div className="pt-4 border-l-2 border-white/20 pl-4">
              <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-semibold block">
                Call Us:
              </span>
              <a
                href={phoneLink}
                className="text-lg sm:text-xl font-bold font-serif text-white hover:text-[#00D9FF] transition-colors tracking-wide mt-1 block"
              >
                {phoneNumber}
              </a>
            </div>
          </div>

          {/* Column 2: Head Office (lg: 4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <h3 className="text-2xl sm:text-[26px] font-serif font-bold text-white tracking-wide">
                Head Office
              </h3>
              <div className="w-12 h-0.5 bg-white/20 mt-2 mb-4" />
              <address className="not-italic text-xs sm:text-[13px] text-zinc-400 leading-relaxed space-y-1">
                <p className="font-semibold text-zinc-200">Tripzo Pvt LTD,</p>
                <p>No.1, Gemini Parsn,</p>
                <p>Kodambakkam High Road,</p>
                <p>Nungambakkam, Chennai - 600006</p>
                <p>Tamil Nadu, India.</p>
              </address>
            </div>

            {/* Email Us Block */}
            <div className="pt-4 border-l-2 border-white/20 pl-4">
              <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-semibold block">
                Email Us:
              </span>
              <a
                href={`mailto:${email}`}
                className="text-lg sm:text-xl font-bold font-serif text-white hover:text-[#00D9FF] transition-colors tracking-wide mt-1 block"
              >
                {email}
              </a>
            </div>
          </div>

          {/* Column 3: Our Branches (lg: 4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <h3 className="text-2xl sm:text-[26px] font-serif font-bold text-white tracking-wide">
                Our Branches
              </h3>
              <div className="w-12 h-0.5 bg-white/20 mt-2 mb-4" />

              {/* 2-column branches list */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-xs sm:text-[13px] text-zinc-400">
                <div className="space-y-1.5">
                  {branchesLeft.map((city) => (
                    <p key={city} className="hover:text-white transition-colors cursor-pointer">
                      {city}
                    </p>
                  ))}
                </div>
                <div className="space-y-1.5">
                  {branchesRight.map((city) => (
                    <p key={city} className="hover:text-white transition-colors cursor-pointer">
                      {city}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Follow Us Block */}
            <div className="pt-4 border-l-2 border-white/20 pl-4">
              <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-semibold block mb-2">
                Follow Us:
              </span>
              <div className="flex items-center gap-3.5 text-white">
                <a
                  href="#facebook"
                  className="p-1 hover:text-[#00D9FF] hover:scale-110 transition-all"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="#instagram"
                  className="p-1 hover:text-[#00D9FF] hover:scale-110 transition-all"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
                <a
                  href="#linkedin"
                  className="p-1 hover:text-[#00D9FF] hover:scale-110 transition-all"
                  aria-label="LinkedIn"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.5a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z" />
                  </svg>
                </a>
                <a
                  href="#youtube"
                  className="p-1 hover:text-[#00D9FF] hover:scale-110 transition-all"
                  aria-label="YouTube"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                <a
                  href="#google"
                  className="p-1 font-bold text-sm hover:text-[#00D9FF] hover:scale-110 transition-all leading-none"
                  aria-label="Google"
                >
                  G
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Legal Bar */}
      <div className="border-t border-zinc-800 bg-[#141414] py-4 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <p>© 2026 by Tripzo Pvt Ltd. All Rights Reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-zinc-400">
            <Link href="#privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>|</span>
            <Link href="#terms" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
            <span>|</span>
            <Link href="#refund" className="hover:text-white transition-colors">
              Cancellation &amp; Refund Policy
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Enquire Now Button & WhatsApp Icon (Matching Header Theme) */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:block">
        <a
          href="#contact"
          className="px-6 py-3 rounded-2xl bg-[#003DB8] hover:bg-[#002f8f] border border-[#00D9FF]/80 text-white font-bold uppercase tracking-wider text-xs shadow-xl hover:shadow-[#003DB8]/40 transition-all duration-300 active:scale-95 inline-block"
        >
          Enquire Now
        </a>
      </div>

      {/* Floating WhatsApp Quick Action Button (Left side of reference) */}
      <div className="fixed bottom-6 left-6 z-40">
        <a
          href="https://wa.me/919940882200"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-7 h-7"
          >
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.477 2 12c0 1.892.525 3.662 1.438 5.176L2 22l4.982-1.39A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2Zm4.978 13.916c-.207.583-1.036 1.07-1.44 1.11-.384.038-.877.172-2.825-.633-2.34-1.002-3.83-3.385-3.948-3.542-.115-.157-.945-1.258-.945-2.4 0-1.141.598-1.703.811-1.936.213-.232.464-.29.62-.29.155 0 .31.002.445.009.143.007.336-.054.526.402.193.464.658 1.606.716 1.723.058.116.097.252.019.407-.077.155-.116.252-.232.388-.116.136-.244.304-.349.408-.116.116-.237.243-.102.476.136.232.603.996 1.294 1.612.89.794 1.64 1.04 1.873 1.156.232.116.368.097.504-.058.136-.155.58-.678.736-.91.155-.233.31-.194.523-.116.213.077 1.353.639 1.586.755.233.116.388.174.446.271.058.097.058.563-.149 1.146Z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>
    </footer>
  );
}
