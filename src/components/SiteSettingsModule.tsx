'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Phone, Mail, Upload, Plus, Trash2, CheckCircle, AlertCircle,
  Loader2, Save, Image as ImageIcon, ArrowLeft, Pencil,
  Globe, MapPin, Images, Contact,
} from 'lucide-react';
import { useUploadImage } from '@/lib/useUploadImage';

export interface SlideItem {
  image: string;
  badge: string;
  title: string;
  description: string;
}

interface BranchItem {
  cityName: string;
  address: string;
  image: string;
  articles: { heading: string; content: string }[];
}

type Section = 'contact' | 'brand' | 'branches' | 'carousel';

export default function SiteSettingsModule() {
  const [phoneNumber, setPhoneNumber] = useState('+91 9940882200');
  const [phoneLink, setPhoneLink] = useState('tel:+919940882200');
  const [email, setEmail] = useState('info@tripzo.com');
  const [logoUrl, setLogoUrl] = useState('/Home.png');
  const [faviconUrl, setFaviconUrl] = useState('/favicon.ico');
  const [slides, setSlides] = useState<SlideItem[]>([]);
  const [branches, setBranches] = useState<BranchItem[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [activeSection, setActiveSection] = useState<Section | null>(null);
  // Branch nested list/form
  const [editingBranchIdx, setEditingBranchIdx] = useState<number | 'new' | null>(null);
  const [branchForm, setBranchForm] = useState<BranchItem>({ cityName: '', address: '', image: '', articles: [] });

  // Upload hooks
  const { uploading: uploadingBrand, upload: uploadBrand } = useUploadImage();
  const { uploading: uploadingBranch, upload: uploadBranchImg } = useUploadImage();
  const { uploading: uploadingSlide, upload: uploadSlideImg } = useUploadImage();

  useEffect(() => { fetchSettings(); }, []);

  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data.success && data.settings) {
        setPhoneNumber(data.settings.phoneNumber || '+91 9940882200');
        setPhoneLink(data.settings.phoneLink || 'tel:+919940882200');
        setEmail(data.settings.email || 'info@tripzo.com');
        setLogoUrl(data.settings.logoUrl || '/Home.png');
        setFaviconUrl(data.settings.faviconUrl || '/favicon.ico');
        setBranches(data.settings.branches || []);
        setSlides(data.settings.slides || []);
      }
    } catch { /* ignore */ }
    finally { setIsLoading(false); }
  };

  const saveAll = async () => {
    setIsSaving(true);
    setMessage(null);
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber,
          phoneLink: phoneLink || `tel:${phoneNumber.replace(/[^0-9+]/g, '')}`,
          email, logoUrl, faviconUrl, branches, slides,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: 'success', text: 'Settings saved successfully!' });
        setActiveSection(null);
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to save settings.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Error connecting to database.' });
    } finally {
      setIsSaving(false);
    }
  };

  // Brand upload
  const handleBrandUpload = async (file: File, type: 'logo' | 'favicon') => {
    const url = await uploadBrand(file);
    if (url) { if (type === 'logo') setLogoUrl(url); else setFaviconUrl(url); }
    else setMessage({ type: 'error', text: 'Upload failed.' });
  };

  // Branch helpers
  const addBranch = () => setBranches(b => [...b, { cityName: '', address: '', image: '', articles: [] }]);
  const removeBranch = (i: number) => setBranches(b => b.filter((_, j) => j !== i));
  const updateBranch = (i: number, field: string, value: string) => {
    setBranches(b => { const u = [...b]; u[i] = { ...u[i], [field]: value }; return u; });
  };
  const handleBranchImageUpload = async (file: File, i: number) => {
    const url = await uploadBranchImg(file);
    if (url) updateBranch(i, 'image', url);
    else setMessage({ type: 'error', text: 'Image upload failed.' });
  };
  const addBranchArticle = (bi: number) => {
    setBranches(b => { const u = [...b]; u[bi] = { ...u[bi], articles: [...(u[bi].articles || []), { heading: '', content: '' }] }; return u; });
  };
  const removeBranchArticle = (bi: number, ai: number) => {
    setBranches(b => { const u = [...b]; u[bi] = { ...u[bi], articles: u[bi].articles.filter((_, j) => j !== ai) }; return u; });
  };
  const updateBranchArticle = (bi: number, ai: number, combined: string) => {
    const nl = combined.indexOf('\n');
    const heading = nl === -1 ? combined : combined.slice(0, nl);
    const content = nl === -1 ? '' : combined.slice(nl + 1);
    setBranches(b => { const u = [...b]; const arts = [...(u[bi].articles || [])]; arts[ai] = { heading, content }; u[bi] = { ...u[bi], articles: arts }; return u; });
  };

  // Slide helpers
  const addSlide = () => setSlides(s => [...s, { image: '', badge: '', title: '', description: '' }]);
  const removeSlide = (i: number) => {
    if (slides.length <= 1) { alert('You must keep at least one slide.'); return; }
    setSlides(s => s.filter((_, j) => j !== i));
  };
  const updateSlide = (i: number, field: keyof SlideItem, value: string) => {
    setSlides(s => { const u = [...s]; u[i] = { ...u[i], [field]: value }; return u; });
  };
  const handleSlideImageUpload = async (file: File, i: number) => {
    const url = await uploadSlideImg(file);
    if (url) updateSlide(i, 'image', url);
    else setMessage({ type: 'error', text: 'Slide image upload failed.' });
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl p-12 border border-zinc-200 text-center">
        <Loader2 className="w-8 h-8 text-[#003DB8] animate-spin mx-auto mb-3" />
        <p className="text-sm font-semibold text-zinc-600">Loading settings from MongoDB...</p>
      </div>
    );
  }

  // ─── LIST VIEW ─────────────────────────────────────────────────────────────
  if (!activeSection) {
    const sections = [
      {
        id: 'contact' as Section,
        icon: <Contact className="w-5 h-5 text-[#003DB8]" />,
        title: 'Global Contact Info',
        desc: 'Phone number and support email used across the site.',
        preview: phoneNumber,
      },
      {
        id: 'brand' as Section,
        icon: <Globe className="w-5 h-5 text-[#003DB8]" />,
        title: 'Brand Assets',
        desc: 'Site logo and browser favicon.',
        preview: 'Logo & Favicon',
      },
      {
        id: 'branches' as Section,
        icon: <MapPin className="w-5 h-5 text-[#003DB8]" />,
        title: 'Branch Offices & Cities',
        desc: 'City offices shown on the Contact page.',
        preview: `${branches.length} branch${branches.length !== 1 ? 'es' : ''}`,
      },
      {
        id: 'carousel' as Section,
        icon: <Images className="w-5 h-5 text-[#003DB8]" />,
        title: 'Hero Carousel Slides',
        desc: 'Images and text for the home page hero carousel.',
        preview: `${slides.length} slide${slides.length !== 1 ? 's' : ''}`,
      },
    ];

    return (
      <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-zinc-100 bg-gradient-to-r from-blue-50/40 via-white to-transparent">
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-zinc-900">Site Settings</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-wider">MongoDB</span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">Select a setting to edit. Changes go live instantly after saving.</p>
        </div>

        {message && (
          <div className={`mx-6 sm:mx-8 mt-5 p-4 rounded-xl flex items-center gap-3 text-xs font-medium ${message.type === 'success' ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' : 'bg-rose-50 border border-rose-200 text-rose-800'}`}>
            {message.type === 'success' ? <CheckCircle className="w-4 h-4 flex-shrink-0 text-emerald-600" /> : <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />}
            {message.text}
          </div>
        )}

        <div className="p-6 sm:p-8 space-y-3">
          {sections.map(s => (
            <div key={s.id} className="flex items-center gap-4 p-4 rounded-2xl border border-zinc-100 hover:border-zinc-200 hover:shadow-sm transition-all bg-white">
              <div className="w-12 h-12 rounded-xl bg-[#003DB8]/8 flex items-center justify-center flex-shrink-0">
                {s.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-zinc-900 text-sm">{s.title}</p>
                <p className="text-xs text-zinc-500 mt-0.5">{s.desc}</p>
                <p className="text-xs text-[#003DB8] font-semibold mt-1">{s.preview}</p>
              </div>
              <button
                type="button"
                onClick={() => { setMessage(null); setActiveSection(s.id); }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#003DB8]/8 hover:bg-[#003DB8]/15 text-[#003DB8] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex-shrink-0"
              >
                <Pencil className="w-3.5 h-3.5" />
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ─── SECTION FORM HEADER (shared) ──────────────────────────────────────────
  const sectionTitles: Record<Section, string> = {
    contact: 'Global Contact Info',
    brand: 'Brand Assets',
    branches: 'Branch Offices & Cities',
    carousel: 'Hero Carousel Slides',
  };

  const FormWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden">
      <div className="p-6 sm:p-8 border-b border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-blue-50/40 via-white to-transparent">
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => { setActiveSection(null); setMessage(null); }}
            className="p-2 rounded-xl hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-zinc-900">{sectionTitles[activeSection!]}</h2>
            <p className="text-xs text-zinc-500 mt-0.5">Edit and click Save to update the live site.</p>
          </div>
        </div>
        <button type="button" onClick={saveAll} disabled={isSaving}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#003DB8] hover:bg-[#002f8f] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-60">
          {isSaving ? <><Loader2 className="w-4 h-4 animate-spin" />Saving...</> : <><Save className="w-4 h-4" />Save Changes</>}
        </button>
      </div>

      {message && (
        <div className={`mx-6 sm:mx-8 mt-5 p-4 rounded-xl flex items-center gap-3 text-xs font-medium ${message.type === 'success' ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' : 'bg-rose-50 border border-rose-200 text-rose-800'}`}>
          {message.type === 'success' ? <CheckCircle className="w-4 h-4 flex-shrink-0 text-emerald-600" /> : <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />}
          {message.text}
        </div>
      )}

      <div className="p-6 sm:p-8 space-y-6">{children}</div>

      <div className="px-6 sm:px-8 pb-8 flex items-center justify-end gap-3 border-t border-zinc-100 pt-6">
        <button type="button" onClick={() => { setActiveSection(null); setMessage(null); }}
          className="px-5 py-2.5 rounded-xl border border-zinc-200 text-zinc-600 font-semibold text-xs hover:bg-zinc-50 transition-colors cursor-pointer">
          Cancel
        </button>
        <button type="button" onClick={saveAll} disabled={isSaving}
          className="inline-flex items-center gap-2 px-8 py-2.5 rounded-xl bg-[#003DB8] hover:bg-[#002f8f] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-60">
          {isSaving ? <><Loader2 className="w-4 h-4 animate-spin" />Saving...</> : <><Save className="w-4 h-4" />Save Changes</>}
        </button>
      </div>
    </div>
  );

  // ─── CONTACT SECTION ───────────────────────────────────────────────────────
  if (activeSection === 'contact') {
    return (
      <FormWrapper>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-bold text-zinc-700 uppercase tracking-wider">
              <Phone className="w-3.5 h-3.5 text-[#003DB8]" />Phone Number
            </label>
            <input type="text" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}
              placeholder="+91 9940882200"
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#003DB8]" />
            <p className="text-[11px] text-zinc-400">Updates top header button, footer, and WhatsApp link.</p>
          </div>
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-bold text-zinc-700 uppercase tracking-wider">
              <Mail className="w-3.5 h-3.5 text-[#003DB8]" />Support Email
            </label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="info@tripzo.com"
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#003DB8]" />
            <p className="text-[11px] text-zinc-400">Shown in footer and contact cards.</p>
          </div>
        </div>
      </FormWrapper>
    );
  }

  // ─── BRAND SECTION ─────────────────────────────────────────────────────────
  if (activeSection === 'brand') {
    return (
      <FormWrapper>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Logo */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-zinc-600 uppercase tracking-wider">Site Logo</label>
            {logoUrl && (
              <div className="relative h-20 w-56 rounded-xl border border-zinc-200 overflow-hidden bg-zinc-50">
                <Image src={logoUrl} alt="Logo" fill className="object-contain p-2" unoptimized />
              </div>
            )}
            <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-[#003DB8]/40 bg-blue-50/40 text-[#003DB8] text-xs font-semibold cursor-pointer hover:bg-blue-50 transition-colors w-fit">
              {uploadingBrand ? <><Loader2 className="w-4 h-4 animate-spin" />Uploading...</> : <><Upload className="w-4 h-4" />Upload New Logo</>}
              <input type="file" accept="image/*" className="hidden" disabled={uploadingBrand}
                onChange={e => { const f = e.target.files?.[0]; if (f) handleBrandUpload(f, 'logo'); e.target.value = ''; }} />
            </label>
            <p className="text-[11px] text-zinc-400">PNG with transparent background recommended.</p>
          </div>
          {/* Favicon */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-zinc-600 uppercase tracking-wider">Browser Favicon</label>
            {faviconUrl && (
              <div className="relative h-20 w-20 rounded-xl border border-zinc-200 overflow-hidden bg-zinc-50">
                <Image src={faviconUrl} alt="Favicon" fill className="object-contain p-2" unoptimized />
              </div>
            )}
            <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-[#003DB8]/40 bg-blue-50/40 text-[#003DB8] text-xs font-semibold cursor-pointer hover:bg-blue-50 transition-colors w-fit">
              {uploadingBrand ? <><Loader2 className="w-4 h-4 animate-spin" />Uploading...</> : <><Upload className="w-4 h-4" />Upload New Favicon</>}
              <input type="file" accept="image/*,.ico" className="hidden" disabled={uploadingBrand}
                onChange={e => { const f = e.target.files?.[0]; if (f) handleBrandUpload(f, 'favicon'); e.target.value = ''; }} />
            </label>
            <p className="text-[11px] text-zinc-400">Square PNG or ICO, 32×32 or 64×64 recommended.</p>
          </div>
        </div>
      </FormWrapper>
    );
  }

  // ─── BRANCHES SECTION ──────────────────────────────────────────────────────
  if (activeSection === 'branches') {
    // helpers that operate on branchForm
    const bfAddArticle = () => setBranchForm(f => ({ ...f, articles: [...(f.articles || []), { heading: '', content: '' }] }));
    const bfRemoveArticle = (ai: number) => setBranchForm(f => ({ ...f, articles: f.articles.filter((_, j) => j !== ai) }));
    const bfUpdateArticle = (ai: number, combined: string) => {
      const nl = combined.indexOf('\n');
      const heading = nl === -1 ? combined : combined.slice(0, nl);
      const content = nl === -1 ? '' : combined.slice(nl + 1);
      setBranchForm(f => { const arts = [...f.articles]; arts[ai] = { heading, content }; return { ...f, articles: arts }; });
    };
    const bfUploadImage = async (file: File) => {
      const url = await uploadBranchImg(file);
      if (url) setBranchForm(f => ({ ...f, image: url }));
      else setMessage({ type: 'error', text: 'Image upload failed.' });
    };
    const saveBranch = async () => {
      if (!branchForm.cityName.trim()) { setMessage({ type: 'error', text: 'City name is required.' }); return; }
      const updated = [...branches];
      if (editingBranchIdx === 'new') updated.push(branchForm);
      else if (editingBranchIdx !== null) updated[editingBranchIdx] = branchForm;
      setBranches(updated);
      setEditingBranchIdx(null);
      // persist immediately
      setIsSaving(true); setMessage(null);
      try {
        const res = await fetch('/api/settings', { method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phoneNumber, phoneLink: phoneLink || `tel:${phoneNumber.replace(/[^0-9+]/g, '')}`, email, logoUrl, faviconUrl, branches: updated, slides }) });
        const data = await res.json();
        setMessage(data.success ? { type: 'success', text: `"${branchForm.cityName}" saved!` } : { type: 'error', text: data.error || 'Failed to save.' });
      } catch { setMessage({ type: 'error', text: 'Error saving.' }); }
      finally { setIsSaving(false); }
    };
    const deleteBranch = async (idx: number) => {
      if (!confirm(`Delete "${branches[idx].cityName}"?`)) return;
      const updated = branches.filter((_, i) => i !== idx);
      setBranches(updated);
      setIsSaving(true);
      try {
        const res = await fetch('/api/settings', { method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phoneNumber, phoneLink, email, logoUrl, faviconUrl, branches: updated, slides }) });
        const data = await res.json();
        setMessage(data.success ? { type: 'success', text: 'Branch deleted.' } : { type: 'error', text: 'Failed to delete.' });
      } catch { setMessage({ type: 'error', text: 'Error.' }); }
      finally { setIsSaving(false); }
    };

    // ── Branch form view ──
    if (editingBranchIdx !== null) {
      return (
        <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-blue-50/40 via-white to-transparent">
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => { setEditingBranchIdx(null); setMessage(null); }}
                className="p-2 rounded-xl hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h2 className="text-xl font-serif font-bold text-zinc-900">
                  {editingBranchIdx === 'new' ? 'Add New City' : `Edit: ${branchForm.cityName || 'City'}`}
                </h2>
                <p className="text-xs text-zinc-500 mt-0.5">Branch Offices & Cities</p>
              </div>
            </div>
            <button type="button" onClick={saveBranch} disabled={isSaving}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#003DB8] hover:bg-[#002f8f] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-60">
              {isSaving ? <><Loader2 className="w-4 h-4 animate-spin" />Saving...</> : <><Save className="w-4 h-4" />Save City</>}
            </button>
          </div>

          {message && (
            <div className={`mx-6 sm:mx-8 mt-5 p-4 rounded-xl flex items-center gap-3 text-xs font-medium ${message.type === 'success' ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' : 'bg-rose-50 border border-rose-200 text-rose-800'}`}>
              {message.type === 'success' ? <CheckCircle className="w-4 h-4 flex-shrink-0 text-emerald-600" /> : <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />}
              {message.text}
            </div>
          )}

          <div className="p-6 sm:p-8 space-y-6">
            {/* City info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-600 uppercase tracking-wider">City Name *</label>
                  <input type="text" value={branchForm.cityName} onChange={e => setBranchForm(f => ({ ...f, cityName: e.target.value }))}
                    placeholder="e.g. Madurai"
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#003DB8]" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-600 uppercase tracking-wider">Address</label>
                  <textarea rows={5} value={branchForm.address} onChange={e => setBranchForm(f => ({ ...f, address: e.target.value }))}
                    placeholder={"Jayam Towers,\nHIG 38, Above DBS Bank,\n80 Feet Road, Annanagar,\nMadurai – 20"}
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#003DB8] resize-none" />
                  <p className="text-[11px] text-zinc-400">Each line is a separate address line.</p>
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold text-zinc-600 uppercase tracking-wider">Branch Photo</label>
                {branchForm.image ? (
                  <div className="relative h-44 w-full rounded-xl overflow-hidden border border-zinc-200">
                    <img src={branchForm.image} alt={branchForm.cityName} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="h-44 w-full rounded-xl border-2 border-dashed border-zinc-200 flex items-center justify-center bg-zinc-50">
                    <span className="text-xs text-zinc-400">No image uploaded</span>
                  </div>
                )}
                <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-[#003DB8]/40 bg-blue-50/40 text-[#003DB8] text-xs font-semibold cursor-pointer hover:bg-blue-50 transition-colors w-fit">
                  {uploadingBranch ? <><Loader2 className="w-4 h-4 animate-spin" />Uploading...</> : <><Upload className="w-4 h-4" />Upload Photo</>}
                  <input type="file" accept="image/*" className="hidden" disabled={uploadingBranch}
                    onChange={e => { const f = e.target.files?.[0]; if (f) bfUploadImage(f); e.target.value = ''; }} />
                </label>
              </div>
            </div>

            {/* Articles */}
            <div className="border-t border-zinc-100 pt-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-zinc-700 uppercase tracking-wider">Articles</h3>
                <button type="button" onClick={bfAddArticle}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#003DB8]/8 hover:bg-[#003DB8]/15 text-[#003DB8] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer">
                  <Plus className="w-3 h-3" />Add Article
                </button>
              </div>
              {(branchForm.articles || []).length === 0 && <p className="text-xs text-zinc-400">No articles yet.</p>}
              <div className="space-y-3">
                {(branchForm.articles || []).map((article, aIdx) => (
                  <div key={aIdx} className="border border-zinc-200 rounded-xl overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2 bg-zinc-50 border-b border-zinc-100">
                      <span className="text-xs font-semibold text-zinc-600 truncate max-w-[80%]">{article.heading || `Article #${aIdx + 1}`}</span>
                      <button type="button" onClick={() => bfRemoveArticle(aIdx)}
                        className="p-1 rounded hover:bg-rose-50 text-zinc-400 hover:text-rose-500 transition-colors cursor-pointer">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="p-4">
                      <textarea rows={6} value={article.heading + '\n' + article.content} onChange={e => bfUpdateArticle(aIdx, e.target.value)}
                        placeholder={"Article Heading (first line)\n\nContent paragraph one...\n\nContent paragraph two..."}
                        className="w-full px-3 py-2.5 rounded-lg border border-zinc-200 text-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#003DB8] resize-y" />
                      <p className="text-[11px] text-zinc-400 mt-1">First line = heading. Rest = content.</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-zinc-100">
              <button type="button" onClick={() => { setEditingBranchIdx(null); setMessage(null); }}
                className="px-5 py-2.5 rounded-xl border border-zinc-200 text-zinc-600 font-semibold text-xs hover:bg-zinc-50 transition-colors cursor-pointer">
                Cancel
              </button>
              <button type="button" onClick={saveBranch} disabled={isSaving}
                className="inline-flex items-center gap-2 px-8 py-2.5 rounded-xl bg-[#003DB8] hover:bg-[#002f8f] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-60">
                {isSaving ? <><Loader2 className="w-4 h-4 animate-spin" />Saving...</> : <><Save className="w-4 h-4" />Save City</>}
              </button>
            </div>
          </div>
        </div>
      );
    }

    // ── Branch list view ──
    return (
      <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-blue-50/40 via-white to-transparent">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => { setActiveSection(null); setMessage(null); }}
              className="p-2 rounded-xl hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-zinc-900">Branch Offices & Cities</h2>
              <p className="text-xs text-zinc-500 mt-0.5">Cities shown on the Contact page.</p>
            </div>
          </div>
          <button type="button" onClick={() => { setBranchForm({ cityName: '', address: '', image: '', articles: [] }); setEditingBranchIdx('new'); setMessage(null); }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#003DB8] hover:bg-[#002f8f] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all active:scale-95 cursor-pointer">
            <Plus className="w-4 h-4" />Add City
          </button>
        </div>

        {message && (
          <div className={`mx-6 sm:mx-8 mt-5 p-4 rounded-xl flex items-center gap-3 text-xs font-medium ${message.type === 'success' ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' : 'bg-rose-50 border border-rose-200 text-rose-800'}`}>
            {message.type === 'success' ? <CheckCircle className="w-4 h-4 flex-shrink-0 text-emerald-600" /> : <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />}
            {message.text}
          </div>
        )}

        <div className="p-6 sm:p-8">
          {branches.length === 0 ? (
            <div className="text-center py-16 text-zinc-400">
              <MapPin className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm font-semibold">No branches yet.</p>
              <p className="text-xs mt-1">Click &ldquo;Add City&rdquo; to get started.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {branches.map((branch, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl border border-zinc-100 hover:border-zinc-200 hover:shadow-sm transition-all bg-white">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-zinc-100 flex-shrink-0 border border-zinc-100">
                    {branch.image ? (
                      <img src={branch.image} alt={branch.cityName} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#003DB8]/10 to-[#00D9FF]/10">
                        <MapPin className="w-4 h-4 text-[#003DB8]/40" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-zinc-900 text-sm">{branch.cityName || `City #${idx + 1}`}</p>
                    {branch.address && <p className="text-xs text-zinc-500 mt-0.5 truncate">{branch.address.split('\n')[0]}</p>}
                    <p className="text-[11px] text-zinc-400 mt-1 font-medium">{(branch.articles || []).length} article{(branch.articles || []).length !== 1 ? 's' : ''}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button type="button" onClick={() => { setBranchForm({ ...branch }); setEditingBranchIdx(idx); setMessage(null); }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#003DB8]/8 hover:bg-[#003DB8]/15 text-[#003DB8] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer">
                      <Pencil className="w-3.5 h-3.5" />Edit
                    </button>
                    <button type="button" onClick={() => deleteBranch(idx)}
                      className="p-2 rounded-lg hover:bg-rose-50 text-zinc-400 hover:text-rose-500 transition-colors cursor-pointer">
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

  // ─── CAROUSEL SECTION ──────────────────────────────────────────────────────
  return (
    <FormWrapper>
      <div className="flex items-center justify-between">
        <p className="text-xs text-zinc-500">Images and text for the home page hero carousel.</p>
        <button type="button" onClick={addSlide}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#003DB8]/8 hover:bg-[#003DB8]/15 text-[#003DB8] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer">
          <Plus className="w-3.5 h-3.5" />Add Slide
        </button>
      </div>

      <div className="space-y-5">
        {slides.map((slide, idx) => (
          <div key={idx} className="border border-zinc-200 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#003DB8] text-white text-xs font-bold uppercase tracking-wider">Slide #{idx + 1}</span>
              <button type="button" onClick={() => removeSlide(idx)}
                className="p-1.5 text-zinc-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              {/* Image */}
              <div className="lg:col-span-5 space-y-3">
                <div className="relative w-full h-40 rounded-xl overflow-hidden border border-zinc-200 bg-zinc-100">
                  {slide.image ? (
                    <Image src={slide.image} alt={`Slide ${idx + 1}`} fill unoptimized className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-zinc-400">
                      <ImageIcon className="w-8 h-8 mb-1" />
                      <span className="text-xs">No image chosen</span>
                    </div>
                  )}
                  {uploadingSlide && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Loader2 className="w-6 h-6 animate-spin text-white" />
                    </div>
                  )}
                </div>
                <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-[#003DB8]/40 bg-blue-50/40 text-[#003DB8] text-xs font-semibold cursor-pointer hover:bg-blue-50 transition-colors">
                  <Upload className="w-4 h-4" />Upload Image
                  <input type="file" accept="image/*" className="hidden"
                    onChange={e => { const f = e.target.files?.[0]; if (f) handleSlideImageUpload(f, idx); e.target.value = ''; }} />
                </label>
                <input type="text" value={slide.image} onChange={e => updateSlide(idx, 'image', e.target.value)}
                  placeholder="Image URL or /image.png"
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-zinc-200 text-zinc-600 font-mono" />
              </div>
              {/* Fields */}
              <div className="lg:col-span-7 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Badge Tag</label>
                    <input type="text" value={slide.badge} onChange={e => updateSlide(idx, 'badge', e.target.value)}
                      placeholder="CURATED JOURNEYS"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#003DB8]" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Headline</label>
                    <input type="text" value={slide.title} onChange={e => updateSlide(idx, 'title', e.target.value)}
                      placeholder="Travel, Worldclass"
                      className="w-full px-3 py-2 text-xs font-serif font-bold rounded-lg border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#003DB8]" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Description</label>
                  <textarea rows={4} value={slide.description} onChange={e => updateSlide(idx, 'description', e.target.value)}
                    placeholder="The real voyage of discovery..."
                    className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#003DB8] resize-none" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </FormWrapper>
  );
}
