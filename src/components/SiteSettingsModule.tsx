'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Phone,
  Mail,
  Upload,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  Loader2,
  Save,
  Image as ImageIcon,
  ExternalLink,
} from 'lucide-react';

export interface SlideItem {
  image: string;
  badge: string;
  title: string;
  description: string;
}

export default function SiteSettingsModule() {
  const [phoneNumber, setPhoneNumber] = useState('+91 9940882200');
  const [phoneLink, setPhoneLink] = useState('tel:+919940882200');
  const [email, setEmail] = useState('info@tripzo.com');
  const [slides, setSlides] = useState<SlideItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Fetch settings from MongoDB API
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data.success && data.settings) {
        setPhoneNumber(data.settings.phoneNumber || '+91 9940882200');
        setPhoneLink(data.settings.phoneLink || 'tel:+919940882200');
        setEmail(data.settings.email || 'info@tripzo.com');
        setSlides(data.settings.slides || []);
      }
    } catch (err: any) {
      console.error('Failed to load settings:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Upload an image file for a specific slide
  const handleFileUpload = async (file: File, slideIdx: number) => {
    try {
      setUploadingIdx(slideIdx);
      setMessage(null);

      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        const updatedSlides = [...slides];
        updatedSlides[slideIdx].image = data.url;
        setSlides(updatedSlides);
        setMessage({
          type: 'success',
          text: `Image uploaded successfully for Slide #${slideIdx + 1}! Click "Save Changes" to publish.`,
        });
      } else {
        setMessage({
          type: 'error',
          text: data.error || 'Failed to upload image.',
        });
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err?.message || 'Error uploading file' });
    } finally {
      setUploadingIdx(null);
    }
  };

  // Update slide property
  const updateSlide = (idx: number, field: keyof SlideItem, value: string) => {
    const updated = [...slides];
    updated[idx] = { ...updated[idx], [field]: value };
    setSlides(updated);
  };

  // Add new slide
  const addSlide = () => {
    setSlides([
      ...slides,
      {
        image: '/image_one.png',
        badge: 'NEW DESTINATION',
        title: 'discover the extraordinary',
        description: 'Experience handcrafted journeys and unforgettable moments.',
      },
    ]);
  };

  // Remove slide
  const removeSlide = (idx: number) => {
    if (slides.length <= 1) {
      alert('You must keep at least one slide in the showcase carousel.');
      return;
    }
    setSlides(slides.filter((_, i) => i !== idx));
  };

  // Save changes to MongoDB
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber,
          phoneLink: phoneLink || `tel:${phoneNumber.replace(/[^0-9+]/g, '')}`,
          email,
          slides,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage({
          type: 'success',
          text: 'Settings and Slides successfully saved to MongoDB! Live pages are now updated.',
        });
      } else {
        setMessage({
          type: 'error',
          text: data.error || 'Failed to save settings to MongoDB.',
        });
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err?.message || 'Failed to connect to database' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl p-12 border border-zinc-200 text-center">
        <Loader2 className="w-8 h-8 text-[#003DB8] animate-spin mx-auto mb-3" />
        <p className="text-sm font-semibold text-zinc-600">Connecting to MongoDB &amp; loading settings...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden">
      {/* Header Bar */}
      <div className="p-6 sm:p-8 border-b border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-blue-50/40 via-white to-transparent">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-zinc-900">
              Live Site Settings &amp; Hero Carousel
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-wider">
              MongoDB Connected
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Update contact details and carousel images. Any saved change updates the live site instantly without redeployment.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#003DB8] hover:bg-[#002f8f] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer disabled:opacity-60"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving to MongoDB...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>

      {/* Status Notifications */}
      {message && (
        <div
          className={`mx-6 sm:mx-8 mt-6 p-4 rounded-xl flex items-center gap-3 text-xs sm:text-sm font-medium ${
            message.type === 'success'
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border border-rose-200 text-rose-800'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="p-6 sm:p-8 space-y-10">
        {/* Contact Info Settings */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-zinc-900 border-b border-zinc-100 pb-2">
            1. Global Contact Credentials
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Phone Number */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-bold text-zinc-700 uppercase tracking-wider">
                <Phone className="w-3.5 h-3.5 text-[#003DB8]" />
                <span>Call Button / Header Phone Number</span>
              </label>
              <input
                type="text"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
                placeholder="+91 9940882200"
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#003DB8]"
              />
              <p className="text-[11px] text-zinc-400">
                Updates top header button, footer contact card, and inquiry popups.
              </p>
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-bold text-zinc-700 uppercase tracking-wider">
                <Mail className="w-3.5 h-3.5 text-[#003DB8]" />
                <span>Official Support Email</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="info@tripzo.com"
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#003DB8]"
              />
              <p className="text-[11px] text-zinc-400">
                Used in branch office cards, article inquiry forms, and email contacts.
              </p>
            </div>
          </div>
        </div>

        {/* Carousel Slides Manager */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
            <div>
              <h3 className="text-base font-bold text-zinc-900">
                2. Home Page Hero Slides &amp; Uploaded Images
              </h3>
              <p className="text-xs text-zinc-500">
                Upload new photos to replace existing slides or add brand new ones.
              </p>
            </div>
            <button
              type="button"
              onClick={addSlide}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 text-[#003DB8] hover:bg-blue-100 text-xs font-bold transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Slide</span>
            </button>
          </div>

          <div className="space-y-6">
            {slides.map((slide, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl border border-zinc-200 bg-zinc-50/50 hover:bg-white hover:shadow-md transition-all space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#003DB8] text-white text-xs font-bold uppercase tracking-wider">
                    Slide #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeSlide(idx)}
                    className="p-1.5 text-zinc-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Remove Slide"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Image Preview & Upload Controls (5 cols) */}
                  <div className="lg:col-span-5 space-y-3">
                    <div className="relative w-full h-44 rounded-xl overflow-hidden border border-zinc-200 bg-zinc-900 shadow-inner">
                      {slide.image ? (
                        <Image
                          src={slide.image}
                          alt={`Slide ${idx + 1}`}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-zinc-500">
                          <ImageIcon className="w-8 h-8 mb-1" />
                          <span className="text-xs">No image chosen</span>
                        </div>
                      )}

                      {uploadingIdx === idx && (
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center text-white text-xs gap-2">
                          <Loader2 className="w-6 h-6 animate-spin text-[#00D9FF]" />
                          <span>Uploading image...</span>
                        </div>
                      )}
                    </div>

                    {/* File Upload Button */}
                    <div className="flex items-center gap-2">
                      <label className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border-2 border-dashed border-[#003DB8]/40 hover:border-[#003DB8] bg-blue-50/50 hover:bg-blue-50 text-[#003DB8] text-xs font-bold transition-all cursor-pointer">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload New Image</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={e => {
                            if (e.target.files?.[0]) {
                              handleFileUpload(e.target.files[0], idx);
                            }
                          }}
                        />
                      </label>
                    </div>

                    <input
                      type="text"
                      value={slide.image}
                      onChange={e => updateSlide(idx, 'image', e.target.value)}
                      placeholder="Image URL or /image_one.png"
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-zinc-200 text-zinc-600 font-mono"
                    />
                  </div>

                  {/* Slide Content Fields (7 cols) */}
                  <div className="lg:col-span-7 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                          Badge Tag
                        </label>
                        <input
                          type="text"
                          value={slide.badge}
                          onChange={e => updateSlide(idx, 'badge', e.target.value)}
                          placeholder="CURATED JOURNEYS"
                          className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-200 focus:outline-none focus:ring-1 focus:ring-[#003DB8]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                          Headline
                        </label>
                        <input
                          type="text"
                          value={slide.title}
                          onChange={e => updateSlide(idx, 'title', e.target.value)}
                          placeholder="travel, worldclass"
                          className="w-full px-3 py-2 text-xs font-serif font-bold rounded-lg border border-zinc-200 focus:outline-none focus:ring-1 focus:ring-[#003DB8]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                        Slide Description
                      </label>
                      <textarea
                        rows={3}
                        value={slide.description}
                        onChange={e => updateSlide(idx, 'description', e.target.value)}
                        placeholder="The real voyage of discovery consists not in seeking new landscapes..."
                        className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-200 focus:outline-none focus:ring-1 focus:ring-[#003DB8] resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Save Bar */}
        <div className="pt-4 border-t border-zinc-200 flex items-center justify-end gap-3">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#003DB8] hover:bg-[#002f8f] text-white font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all cursor-pointer disabled:opacity-60"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving to MongoDB...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save All Settings</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
