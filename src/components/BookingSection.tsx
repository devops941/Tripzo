'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Phone, Mail, CheckCircle2 } from 'lucide-react';

interface BookingSectionProps {
  phoneNumber?: string;
  phoneLink?: string;
  email?: string;
}

export default function BookingSection({
  phoneNumber = "+91 9940882200",
  phoneLink = "tel:+919940882200",
  email = "mail@tripzo.in",
}: BookingSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    email: '',
    phone: '',
    whatsapp: '',
    destination: '',
    travelDate: '',
    peopleCount: '',
    vacationType: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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

              {submitted ? (
                <div className="py-12 px-4 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-bold font-serif text-zinc-900">
                    Booking Request Received!
                  </h4>
                  <p className="text-sm text-zinc-600 max-w-md mx-auto">
                    Thank you, <span className="font-semibold text-zinc-900">{formData.name || 'Traveler'}</span>! Our vacation planner will contact you at{' '}
                    <span className="font-semibold text-zinc-900">{formData.phone || phoneNumber}</span> with your customized itinerary.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-md bg-[#003DB8] text-white text-xs font-semibold hover:bg-[#002f8f] transition-colors"
                  >
                    Submit Another Query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {/* Name */}
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Name *"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-md bg-white border border-zinc-300 text-zinc-800 placeholder-zinc-400 text-sm focus:outline-none focus:border-[#003DB8] focus:ring-1 focus:ring-[#003DB8] transition-colors shadow-xs"
                    />
                  </div>

                  {/* City of Residence */}
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="City of Residence *"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-md bg-white border border-zinc-300 text-zinc-800 placeholder-zinc-400 text-sm focus:outline-none focus:border-[#003DB8] focus:ring-1 focus:ring-[#003DB8] transition-colors shadow-xs"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Email *"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-md bg-white border border-zinc-300 text-zinc-800 placeholder-zinc-400 text-sm focus:outline-none focus:border-[#003DB8] focus:ring-1 focus:ring-[#003DB8] transition-colors shadow-xs"
                    />
                  </div>

                  {/* Phone Number with Country Flag / Indicator */}
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 flex items-center gap-1.5 text-xs text-zinc-500 pointer-events-none">
                      <span className="text-sm">🇮🇳</span>
                      <span>▼</span>
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder="Phone Number *"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-14 pr-4 py-2.5 rounded-md bg-white border border-zinc-300 text-zinc-800 placeholder-zinc-400 text-sm focus:outline-none focus:border-[#003DB8] focus:ring-1 focus:ring-[#003DB8] transition-colors shadow-xs"
                    />
                  </div>

                  {/* WhatsApp */}
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 flex items-center gap-1.5 text-xs text-zinc-500 pointer-events-none">
                      <span className="text-sm">🇮🇳</span>
                      <span>▼</span>
                    </span>
                    <input
                      type="tel"
                      placeholder="WhatsApp"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className="w-full pl-14 pr-4 py-2.5 rounded-md bg-white border border-zinc-300 text-zinc-800 placeholder-zinc-400 text-sm focus:outline-none focus:border-[#003DB8] focus:ring-1 focus:ring-[#003DB8] transition-colors shadow-xs"
                    />
                  </div>

                  {/* Travel Destination */}
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Travel Destination *"
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-md bg-white border border-zinc-300 text-zinc-800 placeholder-zinc-400 text-sm focus:outline-none focus:border-[#003DB8] focus:ring-1 focus:ring-[#003DB8] transition-colors shadow-xs"
                    />
                  </div>

                  {/* Date of Travel */}
                  <div>
                    <input
                      type="text"
                      placeholder="Date of Travel *"
                      onFocus={(e) => (e.target.type = 'date')}
                      onBlur={(e) => {
                        if (!e.target.value) e.target.type = 'text';
                      }}
                      value={formData.travelDate}
                      onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-md bg-white border border-zinc-300 text-zinc-800 placeholder-zinc-400 text-sm focus:outline-none focus:border-[#003DB8] focus:ring-1 focus:ring-[#003DB8] transition-colors shadow-xs"
                    />
                  </div>

                  {/* No. of People */}
                  <div>
                    <input
                      type="text"
                      placeholder="No. of People *"
                      value={formData.peopleCount}
                      onChange={(e) => setFormData({ ...formData, peopleCount: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-md bg-white border border-zinc-300 text-zinc-800 placeholder-zinc-400 text-sm focus:outline-none focus:border-[#003DB8] focus:ring-1 focus:ring-[#003DB8] transition-colors shadow-xs"
                    />
                  </div>

                  {/* Vacation Type */}
                  <div>
                    <select
                      value={formData.vacationType}
                      onChange={(e) => setFormData({ ...formData, vacationType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-md bg-white border border-zinc-300 text-zinc-700 text-sm focus:outline-none focus:border-[#003DB8] focus:ring-1 focus:ring-[#003DB8] transition-colors shadow-xs"
                    >
                      <option value="">Vacation Type *</option>
                      <option value="Honeymoon">Honeymoon</option>
                      <option value="Family Holiday">Family Holiday</option>
                      <option value="Group Tour">Group Tour</option>
                      <option value="Adventure / Trekking">Adventure / Trekking</option>
                      <option value="Corporate Retreat">Corporate Retreat</option>
                      <option value="Luxury Custom Package">Luxury Custom Package</option>
                    </select>
                  </div>

                  {/* Submit Button (Matching Header Call Button Theme) */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-2xl bg-[#003DB8] hover:bg-[#002f8f] active:scale-[0.99] border border-[#00D9FF]/80 text-white font-bold uppercase tracking-widest text-sm shadow-md hover:shadow-[#003DB8]/30 transition-all duration-300 cursor-pointer"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
