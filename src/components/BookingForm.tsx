'use client';

import { useState, useEffect } from 'react';
import { CheckCircle2, Phone } from 'lucide-react';
import type { BookingFormData } from '@/types';

interface BookingFormProps {
  defaultDestination?: string;
  contactPhone?: string;
}

const VACATION_TYPES = [
  'Honeymoon',
  'Family Holiday',
  'Group Tour',
  'Adventure / Trekking',
  'Corporate Retreat',
  'Luxury Custom Package',
];

const INPUT_CLS = (err?: string) =>
  `w-full px-4 py-2.5 rounded-md bg-white border text-zinc-800 placeholder-zinc-400 text-sm focus:outline-none focus:ring-1 transition-colors shadow-xs ${
    err
      ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-300'
      : 'border-zinc-300 focus:border-[#003DB8] focus:ring-[#003DB8]'
  }`;

const PHONE_CLS = (err?: string) =>
  `w-full pl-14 pr-4 py-2.5 rounded-md bg-white border text-zinc-800 placeholder-zinc-400 text-sm focus:outline-none focus:ring-1 transition-colors shadow-xs ${
    err
      ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-300'
      : 'border-zinc-300 focus:border-[#003DB8] focus:ring-[#003DB8]'
  }`;


type Errors = Partial<Record<keyof BookingFormData, string>>;

const EMPTY = (dest = ''): BookingFormData => ({
  name: '', city: '', email: '', phone: '', whatsapp: '',
  destination: dest, travelDate: '', peopleCount: '', vacationType: '',
});

function validate(form: BookingFormData, minDate: string): Errors {
  const e: Errors = {};
  if (!form.name.trim()) e.name = 'Name is required';
  if (!form.city.trim()) e.city = 'City is required';
  if (!form.email.trim()) e.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
  if (!form.phone.trim()) e.phone = 'Phone number is required';
  else if (!/^\d{10}$/.test(form.phone.replace(/\s/g, ''))) e.phone = 'Enter a valid 10-digit number';
  if (!form.destination.trim()) e.destination = 'Please enter a destination';
  if (!form.travelDate) e.travelDate = 'Select a travel date';
  else if (form.travelDate < minDate) e.travelDate = 'Travel date must be a future date';
  if (!form.peopleCount.trim()) e.peopleCount = 'Number of people is required';
  if (!form.vacationType) e.vacationType = 'Please select a vacation type';
  return e;
}

export default function BookingForm({ defaultDestination = '', contactPhone = '' }: BookingFormProps) {
  const [minDate, setMinDate] = useState('');
  useEffect(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    setMinDate(d.toISOString().split('T')[0]);
  }, []);
  const [form, setForm] = useState<BookingFormData>(EMPTY(defaultDestination));
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [successName, setSuccessName] = useState('');
  const [successPhone, setSuccessPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const set = (k: keyof BookingFormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors(prev => ({ ...prev, [k]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate(form, minDate);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    setSubmitError('');
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to submit');
      setSuccessName(form.name);
      setSuccessPhone(form.phone || contactPhone);
      setForm(EMPTY(defaultDestination));
      setErrors({});
      setSubmitted(true);
    } catch {
      setSubmitError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="py-10 px-4 text-center space-y-5">
        <div className="flex h-20 w-20 mx-auto items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="w-11 h-11" />
        </div>
        <div className="space-y-2">
          <h4 className="text-2xl font-bold font-serif text-zinc-900">Enquiry Submitted!</h4>
          <p className="text-sm text-zinc-600 max-w-sm mx-auto leading-relaxed">
            Thank you, <span className="font-semibold text-zinc-900">{successName}</span>!
            Our team will <span className="font-semibold text-[#003DB8]">call you back soon</span> at{' '}
            <span className="font-semibold text-zinc-900">{successPhone}</span> with your
            personalised itinerary.
          </p>
        </div>
        <div className="flex items-center justify-center gap-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5 max-w-xs mx-auto">
          <Phone className="w-3.5 h-3.5 flex-shrink-0" />
          <span>Expect a call within 24 hours</span>
        </div>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-2 text-xs text-zinc-400 hover:text-zinc-700 underline underline-offset-2 transition-colors"
        >
          Submit another query
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-3">
      {/* Name */}
      <div>
        <input
          type="text"
          placeholder="Name *"
          value={form.name}
          onChange={set('name')}
          className={INPUT_CLS(errors.name)}
        />
        {errors.name && <p className="mt-1 text-[11px] text-rose-500">{errors.name}</p>}
      </div>

      {/* City */}
      <div>
        <input
          type="text"
          placeholder="City of Residence *"
          value={form.city}
          onChange={set('city')}
          className={INPUT_CLS(errors.city)}
        />
        {errors.city && <p className="mt-1 text-[11px] text-rose-500">{errors.city}</p>}
      </div>

      {/* Email */}
      <div>
        <input
          type="email"
          placeholder="Email *"
          value={form.email}
          onChange={set('email')}
          className={INPUT_CLS(errors.email)}
        />
        {errors.email && <p className="mt-1 text-[11px] text-rose-500">{errors.email}</p>}
      </div>

      {/* Phone */}
      <div>
        <div className="relative flex items-center">
          <span className="absolute left-3.5 flex items-center gap-1 text-xs text-zinc-500 pointer-events-none">
            <span className="text-sm">🇮🇳</span><span>▼</span>
          </span>
          <input
            type="tel"
            placeholder="Phone Number *"
            value={form.phone}
            onChange={set('phone')}
            maxLength={10}
            className={PHONE_CLS(errors.phone)}
          />
        </div>
        {errors.phone && <p className="mt-1 text-[11px] text-rose-500">{errors.phone}</p>}
      </div>

      {/* WhatsApp (optional) */}
      <div className="relative flex items-center">
        <span className="absolute left-3.5 flex items-center gap-1 text-xs text-zinc-500 pointer-events-none">
          <span className="text-sm">🇮🇳</span><span>▼</span>
        </span>
        <input
          type="tel"
          placeholder="WhatsApp (optional)"
          value={form.whatsapp}
          onChange={set('whatsapp')}
          maxLength={10}
          className={PHONE_CLS()}
        />
      </div>

      {/* Destination */}
      <div>
        <input
          type="text"
          placeholder="Travel Destination *"
          value={form.destination}
          onChange={set('destination')}
          className={INPUT_CLS(errors.destination)}
        />
        {errors.destination && <p className="mt-1 text-[11px] text-rose-500">{errors.destination}</p>}
      </div>

      {/* Date — future only */}
      <div>
        <input
          type="date"
          min={minDate}
          value={form.travelDate}
          onChange={set('travelDate')}
          className={INPUT_CLS(errors.travelDate)}
        />
        {errors.travelDate && <p className="mt-1 text-[11px] text-rose-500">{errors.travelDate}</p>}
      </div>

      {/* People */}
      <div>
        <input
          type="number"
          min="1"
          placeholder="No. of People *"
          value={form.peopleCount}
          onChange={set('peopleCount')}
          className={INPUT_CLS(errors.peopleCount)}
        />
        {errors.peopleCount && <p className="mt-1 text-[11px] text-rose-500">{errors.peopleCount}</p>}
      </div>

      {/* Vacation type */}
      <div>
        <select
          value={form.vacationType}
          onChange={set('vacationType')}
          className={`w-full px-4 py-2.5 rounded-md bg-white border text-sm focus:outline-none focus:ring-1 transition-colors shadow-xs ${
            errors.vacationType
              ? 'border-rose-400 text-zinc-700 focus:border-rose-500 focus:ring-rose-300'
              : 'border-zinc-300 text-zinc-700 focus:border-[#003DB8] focus:ring-[#003DB8]'
          }`}
        >
          <option value="">Vacation Type *</option>
          {VACATION_TYPES.map(v => <option key={v} value={v}>{v}</option>)}
        </select>
        {errors.vacationType && <p className="mt-1 text-[11px] text-rose-500">{errors.vacationType}</p>}
      </div>

      {submitError && (
        <p className="text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded-md px-3 py-2">{submitError}</p>
      )}

      <div className="pt-1">
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3.5 rounded-2xl bg-[#003DB8] hover:bg-[#002f8f] active:scale-[0.99] border border-[#00D9FF]/80 text-white font-bold uppercase tracking-widest text-sm shadow-md transition-all cursor-pointer disabled:opacity-70"
        >
          {submitting ? 'Submitting...' : 'SUBMIT'}
        </button>
      </div>
    </form>
  );
}
