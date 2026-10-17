'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Phone, Mail } from 'lucide-react';
import BookingForm from '@/components/BookingForm';


export default function BookingSection() {
  const [phoneNumber, setPhoneNumber] = useState('+91 9940882200');
  const [phoneLink, setPhoneLink] = useState('tel:+919940882200');
  const [email, setEmail] = useState('info@tripzo.com');

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.settings) {
          if (data.settings.phoneNumber) setPhoneNumber(data.settings.phoneNumber);
          if (data.settings.phoneLink) setPhoneLink(data.settings.phoneLink);
          if (data.settings.email) setEmail(data.settings.email);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="contact" className="relative w-full py-16 sm:py-24 bg-white overflow-hidden">
      {/* Background World Map Image */}
      <div className="absolute inset-0 pointer-events-none opacity-20 sm:opacity-25 z-0 flex items-center justify-center">
        <Image
          src="/map_image.png"
          alt="World Map Background"
          fill
          unoptimized
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Stay Connected */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-zinc-900 tracking-tight">
              Stay Connected
            </h2>

            {/* Phone Hotline */}
            <div className="flex flex-col items-center lg:items-start space-y-2 group">
              <a
                href={phoneLink}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#003DB8]/10 text-[#003DB8] group-hover:bg-[#003DB8] group-hover:text-white transition-all duration-300 shadow-sm"
                aria-label={`Call us at ${phoneNumber}`}
              >
                <Phone className="w-5 h-5 fill-current" />
              </a>
              <a
                href={phoneLink}
                className="text-base sm:text-lg font-semibold text-zinc-800 hover:text-[#003DB8] transition-colors tracking-wide"
              >
                {phoneNumber}
              </a>
            </div>

            {/* Email Contact */}
            <div className="flex flex-col items-center lg:items-start space-y-2 group">
              <a
                href={`mailto:${email}`}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#003DB8]/10 text-[#003DB8] group-hover:bg-[#003DB8] group-hover:text-white transition-all duration-300 shadow-sm"
                aria-label={`Email us at ${email}`}
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${email}`}
                className="text-base sm:text-lg font-semibold text-zinc-800 hover:text-[#003DB8] transition-colors"
              >
                {email}
              </a>
            </div>
          </div>

          {/* Right Column: Book Your Dream Vacay Today Form */}
          <div className="lg:col-span-7 w-full max-w-2xl mx-auto lg:max-w-none">
            <div className="bg-white p-6 sm:p-10 rounded-2xl border border-zinc-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.06)]">
              <h3 className="text-2xl sm:text-3xl md:text-[34px] font-serif font-bold text-zinc-900 mb-6 text-center sm:text-left">
                Book Your Dream Vacay Today!
              </h3>
              <BookingForm contactPhone={phoneNumber} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
