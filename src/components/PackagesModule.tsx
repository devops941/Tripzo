'use client';

import React, { useState, useEffect } from 'react';
import {
  Plus, Trash2, Upload, Save, Loader2, CheckCircle, AlertCircle,
  Image as ImageIcon, ArrowLeft, Pencil, Package,
} from 'lucide-react';
import { useUploadImage } from '@/lib/useUploadImage';
import type { PackageItem, FaqItem, Destination as DestItem } from '@/types';

function emptyPackage(): PackageItem {
  return { name: '', duration: '', price: '', image: '', description: '', highlights: '' };
}

function emptyFaq(): FaqItem {
  return { question: '', answer: '' };
}

function emptyDest(): DestItem {
  return { name: '', slug: '', tagline: '', heroImage: '', packages: [], faqs: [], isActive: true };
}

export default function PackagesModule() {
  const [destinations, setDestinations] = useState<DestItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form state
  const [viewMode, setViewMode] = useState<'list' | 'form'>('list');
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [form, setForm] = useState<DestItem>(emptyDest());

  // Upload hooks
  const { uploading: uploadingHero, upload: uploadHero } = useUploadImage();
  const { uploading: uploadingPkg, upload: uploadPkg } = useUploadImage();

  useEffect(() => { fetchDestinations(); }, []);

  const fetchDestinations = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/destinations');
      const data = await res.json();
      if (data.success) setDestinations(data.destinations || []);
    } catch { /* ignore */ }
    finally { setIsLoading(false); }
  };

  const openCreate = () => {
    setForm(emptyDest());
    setEditingIdx(null);
    setMessage(null);
    setViewMode('form');
  };

  const openEdit = (idx: number) => {
    setForm({ ...destinations[idx] });
    setEditingIdx(idx);
    setMessage(null);
    setViewMode('form');
  };

  const backToList = () => {
    setViewMode('list');
    setMessage(null);
  };

  // Delete from list view
  const handleDelete = async (idx: number) => {
    const dest = destinations[idx];
    if (!dest._id) {
      setDestinations(destinations.filter((_, i) => i !== idx));
      return;
    }
    if (!confirm(`Delete "${dest.name}"? This cannot be undone.`)) return;
    try {
      await fetch(`/api/destinations?id=${dest._id}`, { method: 'DELETE' });
      setDestinations(destinations.filter((_, i) => i !== idx));
      setMessage({ type: 'success', text: `"${dest.name}" deleted.` });
    } catch {
      setMessage({ type: 'error', text: 'Failed to delete destination.' });
    }
  };

  // Form field helpers
  const setField = <K extends keyof DestItem>(k: K, v: DestItem[K]) =>
    setForm(f => ({ ...f, [k]: v }));

  // Package helpers
  const addPackage = () => setForm(f => ({ ...f, packages: [...f.packages, emptyPackage()] }));
  const removePackage = (i: number) => setForm(f => ({ ...f, packages: f.packages.filter((_, j) => j !== i) }));
  const updatePackage = (i: number, k: keyof PackageItem, v: string) =>
    setForm(f => {
      const pkgs = [...f.packages];
      pkgs[i] = { ...pkgs[i], [k]: v };
      return { ...f, packages: pkgs };
    });

  // FAQ helpers
  const addFaq = () => setForm(f => ({ ...f, faqs: [...(f.faqs || []), emptyFaq()] }));
  const removeFaq = (i: number) => setForm(f => ({ ...f, faqs: (f.faqs || []).filter((_, j) => j !== i) }));
  const updateFaq = (i: number, k: keyof FaqItem, v: string) =>
    setForm(f => {
      const faqs = [...(f.faqs || [])];
      faqs[i] = { ...faqs[i], [k]: v };
      return { ...f, faqs };
    });

  // Hero image upload
  const handleHeroUpload = async (file: File) => {
    const url = await uploadHero(file);
    if (url) setField('heroImage', url);
    else setMessage({ type: 'error', text: 'Hero image upload failed.' });
  };

  // Package image upload
  const handlePackageImageUpload = async (file: File, pkgIdx: number) => {
    const url = await uploadPkg(file);
    if (url) updatePackage(pkgIdx, 'image', url);
    else setMessage({ type: 'error', text: 'Package image upload failed.' });
  };

  // Save form
  const handleSave = async () => {
    if (!form.name.trim()) {
      setMessage({ type: 'error', text: 'Destination name is required.' });
      return;
    }
    setIsSaving(true);
    setMessage(null);
    try {
      const res = await fetch('/api/destinations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        await fetchDestinations();
        setMessage({ type: 'success', text: `"${form.name}" saved successfully!` });
        setViewMode('list');
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to save.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Error saving destination.' });
    } finally {
      setIsSaving(false);
    }
  };

  // ─── LIST VIEW ─────────────────────────────────────────────────────────────
  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-blue-50/40 via-white to-transparent">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-zinc-900">Destinations &amp; Tour Packages</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-wider">MongoDB</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">Manage destinations, packages and FAQs. Click Edit to modify.</p>
          </div>
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#003DB8] hover:bg-[#002f8f] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Create Destination
          </button>
        </div>

        {/* Message */}
        {message && (
          <div className={`mx-6 sm:mx-8 mt-5 p-4 rounded-xl flex items-center gap-3 text-xs font-medium ${message.type === 'success' ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' : 'bg-rose-50 border border-rose-200 text-rose-800'}`}>
            {message.type === 'success' ? <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />}
            {message.text}
          </div>
        )}

        <div className="p-6 sm:p-8">
          {isLoading ? (
            <div className="text-center py-16">
              <Loader2 className="w-8 h-8 text-[#003DB8] animate-spin mx-auto mb-3" />
              <p className="text-sm text-zinc-500">Loading destinations...</p>
            </div>
          ) : destinations.length === 0 ? (
            <div className="text-center py-20 text-zinc-400">
              <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm font-semibold">No destinations yet.</p>
              <p className="text-xs mt-1">Click &ldquo;Create Destination&rdquo; to get started.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {destinations.map((dest, idx) => (
                <div key={dest._id || idx} className="flex items-center gap-4 p-4 rounded-2xl border border-zinc-100 hover:border-zinc-200 hover:shadow-sm transition-all bg-white">
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-zinc-100 flex-shrink-0 border border-zinc-100">
                    {dest.heroImage ? (
                      <img src={dest.heroImage} alt={dest.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#003DB8]/10 to-[#00D9FF]/10">
                        <Package className="w-5 h-5 text-[#003DB8]/40" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-serif font-bold text-zinc-900 text-base">{dest.name}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${dest.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-zinc-100 text-zinc-500'}`}>
                        {dest.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    {dest.tagline && <p className="text-xs text-zinc-500 mt-0.5 truncate">{dest.tagline}</p>}
                    <div className="flex items-center gap-3 mt-1.5 text-[11px] text-zinc-400 font-medium">
                      <span>{dest.packages.length} package{dest.packages.length !== 1 ? 's' : ''}</span>
                      <span>·</span>
                      <span>{(dest.faqs || []).length} FAQ{(dest.faqs || []).length !== 1 ? 's' : ''}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => openEdit(idx)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#003DB8]/8 hover:bg-[#003DB8]/15 text-[#003DB8] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(idx)}
                      className="p-2 rounded-lg hover:bg-rose-50 text-zinc-400 hover:text-rose-500 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ─── FORM VIEW ─────────────────────────────────────────────────────────────
  return (
    <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 sm:p-8 border-b border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-blue-50/40 via-white to-transparent">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={backToList}
            className="p-2 rounded-xl hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-zinc-900">
              {editingIdx !== null ? `Edit: ${form.name || 'Destination'}` : 'Create New Destination'}
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">Fill in the details and click Save when done.</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#003DB8] hover:bg-[#002f8f] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-60"
        >
          {isSaving ? <><Loader2 className="w-4 h-4 animate-spin" />Saving...</> : <><Save className="w-4 h-4" />Save Destination</>}
        </button>
      </div>

      {/* Message */}
      {message && (
        <div className={`mx-6 sm:mx-8 mt-5 p-4 rounded-xl flex items-center gap-3 text-xs font-medium ${message.type === 'success' ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' : 'bg-rose-50 border border-rose-200 text-rose-800'}`}>
          {message.type === 'success' ? <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />}
          {message.text}
        </div>
      )}

      <div className="p-6 sm:p-8 space-y-8">

        {/* ── Destination Info ── */}
        <div className="border border-zinc-100 rounded-2xl p-5 space-y-5">
          <h3 className="text-sm font-bold text-zinc-700 uppercase tracking-wider">Destination Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
            {/* Left */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-600 uppercase tracking-wider">Destination Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setField('name', e.target.value)}
                  placeholder="e.g. Bangalore"
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#003DB8]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-600 uppercase tracking-wider">Tagline</label>
                <input
                  type="text"
                  value={form.tagline}
                  onChange={e => setField('tagline', e.target.value)}
                  placeholder="e.g. India's Garden City"
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#003DB8]"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="dest-active"
                  checked={form.isActive}
                  onChange={e => setField('isActive', e.target.checked)}
                  className="w-4 h-4 rounded border-zinc-300 text-[#003DB8] focus:ring-[#003DB8]"
                />
                <label htmlFor="dest-active" className="text-xs font-semibold text-zinc-700 cursor-pointer">Active (visible on public page)</label>
              </div>
            </div>

            {/* Right: hero image */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-zinc-600 uppercase tracking-wider">Hero Image</label>
              {form.heroImage ? (
                <div className="relative h-40 w-full rounded-xl overflow-hidden border border-zinc-200">
                  <img src={form.heroImage} alt={form.name} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="h-40 w-full rounded-xl border-2 border-dashed border-zinc-200 flex items-center justify-center bg-zinc-50">
                  <span className="text-xs text-zinc-400">No hero image uploaded</span>
                </div>
              )}
              <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-[#003DB8]/40 bg-blue-50/40 text-[#003DB8] text-xs font-semibold cursor-pointer hover:bg-blue-50 transition-colors w-fit">
                {uploadingHero ? <><Loader2 className="w-4 h-4 animate-spin" />Uploading...</> : <><Upload className="w-4 h-4" />Upload Hero Image</>}
                <input type="file" accept="image/*" className="hidden" disabled={uploadingHero}
                  onChange={e => { const f = e.target.files?.[0]; if (f) handleHeroUpload(f); e.target.value = ''; }} />
              </label>
            </div>
          </div>
        </div>

        {/* ── Packages ── */}
        <div className="border border-zinc-100 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-zinc-700 uppercase tracking-wider">Packages</h3>
            <button type="button" onClick={addPackage}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#003DB8]/8 hover:bg-[#003DB8]/15 text-[#003DB8] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer">
              <Plus className="w-3.5 h-3.5" />Add Package
            </button>
          </div>

          {form.packages.length === 0 && (
            <p className="text-xs text-zinc-400 text-center py-6">No packages yet. Click &ldquo;Add Package&rdquo; to add trip options.</p>
          )}

          <div className="space-y-4">
            {form.packages.map((pkg, pkgIdx) => (
              <div key={pkgIdx} className="border border-zinc-200 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 bg-zinc-50/80 border-b border-zinc-100">
                  <span className="text-xs font-semibold text-zinc-600 truncate max-w-[80%]">{pkg.name || `Package #${pkgIdx + 1}`}</span>
                  <button type="button" onClick={() => removePackage(pkgIdx)}
                    className="p-1 rounded hover:bg-rose-50 text-zinc-400 hover:text-rose-500 transition-colors cursor-pointer">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="p-4 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {(['name', 'duration', 'price'] as const).map(field => (
                      <div key={field} className="space-y-1">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">{field}</label>
                        <input type="text" value={pkg[field]}
                          onChange={e => updatePackage(pkgIdx, field, e.target.value)}
                          placeholder={field === 'name' ? 'e.g. 2 Days Trip' : field === 'duration' ? 'e.g. 2D / 1N' : 'e.g. ₹4,999'}
                          className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-zinc-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#003DB8]" />
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Image */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Package Image</label>
                      {pkg.image ? (
                        <div className="relative h-28 w-full rounded-lg overflow-hidden border border-zinc-200">
                          <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="h-28 w-full rounded-lg border-2 border-dashed border-zinc-200 flex items-center justify-center bg-zinc-50">
                          <span className="text-[10px] text-zinc-400">No image</span>
                        </div>
                      )}
                      <label className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-dashed border-[#003DB8]/40 bg-blue-50/40 text-[#003DB8] text-[10px] font-semibold cursor-pointer hover:bg-blue-50 transition-colors w-fit">
                        {uploadingPkg ? <><Loader2 className="w-3 h-3 animate-spin" />Uploading...</> : <><Upload className="w-3 h-3" />Upload Image</>}
                        <input type="file" accept="image/*" className="hidden" disabled={uploadingPkg}
                          onChange={e => { const f = e.target.files?.[0]; if (f) handlePackageImageUpload(f, pkgIdx); e.target.value = ''; }} />
                      </label>
                    </div>
                    {/* Description */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Description</label>
                      <textarea rows={4} value={pkg.description}
                        onChange={e => updatePackage(pkgIdx, 'description', e.target.value)}
                        placeholder="Describe what's included..."
                        className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-zinc-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#003DB8] resize-none" />
                    </div>
                  </div>
                  {/* Highlights */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Highlights (one per line)</label>
                    <textarea rows={3} value={pkg.highlights}
                      onChange={e => updatePackage(pkgIdx, 'highlights', e.target.value)}
                      placeholder="Includes breakfast&#10;Hotel pickup & drop&#10;Guide included"
                      className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-zinc-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#003DB8] resize-none" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── FAQs ── */}
        <div className="border border-zinc-100 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-zinc-700 uppercase tracking-wider">FAQs</h3>
            <button type="button" onClick={addFaq}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#003DB8]/8 hover:bg-[#003DB8]/15 text-[#003DB8] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer">
              <Plus className="w-3.5 h-3.5" />Add FAQ
            </button>
          </div>

          {(!form.faqs || form.faqs.length === 0) && (
            <p className="text-xs text-zinc-400 text-center py-6">No FAQs yet. Click &ldquo;Add FAQ&rdquo; to add questions.</p>
          )}

          <div className="space-y-3">
            {(form.faqs || []).map((faq, faqIdx) => (
              <div key={faqIdx} className="border border-zinc-200 rounded-xl p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-1 space-y-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Question</label>
                      <input type="text" value={faq.question}
                        onChange={e => updateFaq(faqIdx, 'question', e.target.value)}
                        placeholder="e.g. What is the best time to visit?"
                        className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-zinc-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#003DB8]" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Answer</label>
                      <textarea rows={3} value={faq.answer}
                        onChange={e => updateFaq(faqIdx, 'answer', e.target.value)}
                        placeholder="Type the answer here..."
                        className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-zinc-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#003DB8] resize-none" />
                    </div>
                  </div>
                  <button type="button" onClick={() => removeFaq(faqIdx)}
                    className="p-1 rounded hover:bg-rose-50 text-zinc-400 hover:text-rose-500 transition-colors cursor-pointer mt-1">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Save */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-zinc-100">
          <button type="button" onClick={backToList}
            className="px-5 py-2.5 rounded-xl border border-zinc-200 text-zinc-600 font-semibold text-xs hover:bg-zinc-50 transition-colors cursor-pointer">
            Cancel
          </button>
          <button type="button" onClick={handleSave} disabled={isSaving}
            className="inline-flex items-center gap-2 px-8 py-2.5 rounded-xl bg-[#003DB8] hover:bg-[#002f8f] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-60">
            {isSaving ? <><Loader2 className="w-4 h-4 animate-spin" />Saving...</> : <><Save className="w-4 h-4" />Save Destination</>}
          </button>
        </div>
      </div>
    </div>
  );
}
