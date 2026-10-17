'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  LayoutDashboard,
  ChevronDown,
  Plus,
  ExternalLink,
  LogOut,
  Sliders,
  CheckCircle2,
  Menu,
  Package,
  Globe,
  MapPin,
  Inbox,
  Phone,
  Mail,
  CalendarDays,
  Users,
} from 'lucide-react';
import SiteSettingsModule from '@/components/SiteSettingsModule';
import PackagesModule from '@/components/PackagesModule';

export default function AdminDashboardLayout({ onLogout }: { onLogout?: () => void }) {
  const [activeTab, setActiveTab] = useState<'analytics' | 'settings' | 'packages' | 'enquiries'>('analytics');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [stats, setStats] = useState({ destinations: 0, packages: 0, active: 0, branches: 0 });
  const [destinations, setDestinations] = useState<any[]>([]);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);

  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loadingEnquiries, setLoadingEnquiries] = useState(false);

  useEffect(() => {
    if (activeTab !== 'analytics') return;

    let cancelled = false;
    setLoadingAnalytics(true);

    async function fetchData() {
      try {
        const [destRes, settingsRes] = await Promise.all([
          fetch('/api/destinations'),
          fetch('/api/settings'),
        ]);

        const destJson = destRes.ok ? await destRes.json() : { destinations: [] };
        const settingsJson = settingsRes.ok ? await settingsRes.json() : { branches: [] };

        if (cancelled) return;

        const dests: any[] = destJson.destinations ?? [];
        const totalPackages = dests.reduce(
          (acc: number, d: any) => acc + (Array.isArray(d.packages) ? d.packages.length : 0),
          0
        );
        const activeCount = dests.filter((d: any) => d.isActive === true).length;
        const branchCount = Array.isArray(settingsJson.branches) ? settingsJson.branches.length : 0;

        setDestinations(dests);
        setStats({
          destinations: dests.length,
          packages: totalPackages,
          active: activeCount,
          branches: branchCount,
        });
      } catch {
        // silently fail — stats stay at 0
      } finally {
        if (!cancelled) setLoadingAnalytics(false);
      }
    }

    fetchData();
    return () => { cancelled = true; };
  }, [activeTab]);

  useEffect(() => {
    if (activeTab !== 'enquiries') return;
    let cancelled = false;
    setLoadingEnquiries(true);
    fetch('/api/enquiries')
      .then(r => r.json())
      .then(data => { if (!cancelled) setEnquiries(data.enquiries ?? []); })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoadingEnquiries(false); });
    return () => { cancelled = true; };
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#F5F7FB] flex text-zinc-800 font-sans antialiased">
      {/* 1. Left Dark Sidebar (AdminKit Style: #1B2A4A / #222E3C) */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } transition-all duration-300 bg-[#222E3C] text-slate-300 flex flex-col flex-shrink-0 min-h-screen z-30 select-none shadow-xl`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-white/5">
          <Link href="/" className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#003DB8] to-[#00D9FF] flex items-center justify-center text-white font-extrabold text-sm shadow-md flex-shrink-0">
              T
            </div>
            {sidebarOpen && (
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <span className="font-bold text-white text-lg tracking-tight">AdminKit</span>
                <span className="text-[10px] uppercase font-extrabold bg-[#003DB8] text-[#00D9FF] px-1.5 py-0.5 rounded tracking-wider">
                  PRO
                </span>
              </div>
            )}
          </Link>
        </div>

        {/* User Profile Snippet in Sidebar */}
        {sidebarOpen && (
          <div className="p-4 mx-3 my-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#003DB8] to-[#00D9FF] p-[2px] flex-shrink-0">
              <div className="w-full h-full rounded-full bg-[#222E3C] flex items-center justify-center text-white font-bold text-sm">
                AD
              </div>
            </div>
            <div className="overflow-hidden flex-1">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-white truncate">Administrator</p>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
              <p className="text-[11px] text-slate-400 truncate">Tour &amp; Portal Manager</p>
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
              activeTab === 'analytics'
                ? 'text-white bg-[#003DB8] font-semibold shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-[#00D9FF] flex-shrink-0" />
            {sidebarOpen && <span>Dashboard</span>}
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
              activeTab === 'settings'
                ? 'text-white bg-[#003DB8] font-semibold shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sliders className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            {sidebarOpen && <span>Settings &amp; Carousel</span>}
          </button>

          <button
            onClick={() => setActiveTab('packages')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
              activeTab === 'packages'
                ? 'text-white bg-[#003DB8] font-semibold shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Package className="w-4 h-4 text-sky-400 flex-shrink-0" />
            {sidebarOpen && <span>Tour Packages</span>}
          </button>

          <button
            onClick={() => setActiveTab('enquiries')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
              activeTab === 'enquiries'
                ? 'text-white bg-[#003DB8] font-semibold shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Inbox className="w-4 h-4 text-rose-400 flex-shrink-0" />
            {sidebarOpen && <span>Enquiries</span>}
          </button>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-white/5">
          <Link
            href="/"
            onClick={onLogout}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-rose-300 hover:bg-rose-500/10 hover:text-rose-200 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            {sidebarOpen && <span className="text-xs font-semibold">Exit Portal</span>}
          </Link>
        </div>
      </aside>

      {/* 2. Main Right Column */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-zinc-200/80 px-6 flex items-center justify-between sticky top-0 z-20 shadow-2xs">
          {/* Left: sidebar toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-zinc-500 hover:text-zinc-800 rounded-lg hover:bg-zinc-100 transition-colors"
            title="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Right: User Avatar */}
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#003DB8] to-[#00D9FF] flex items-center justify-center text-white font-bold text-xs shadow-xs">
              A
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-8">
          {/* Top Title Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">
                {activeTab === 'analytics' ? 'Analytics Dashboard'
                  : activeTab === 'settings' ? 'Site Settings & Dynamic Carousel'
                  : activeTab === 'packages' ? 'Destinations & Tour Packages'
                  : 'Customer Enquiries'}
              </h1>
              <p className="text-xs text-zinc-500 mt-0.5">
                {activeTab === 'analytics' ? 'Live overview of your destinations, packages, and branch offices.'
                  : activeTab === 'settings' ? 'Manage live contact info and upload hero carousel slides connected directly to MongoDB.'
                  : activeTab === 'packages' ? 'Add destinations and trip packages that appear live on the public packages page.'
                  : 'All booking enquiries submitted through the website contact and package pages.'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab(activeTab === 'analytics' ? 'settings' : 'analytics')}
                className="px-4 py-2 rounded-lg bg-white border border-zinc-200 hover:bg-zinc-50 text-xs font-semibold text-zinc-700 shadow-2xs transition-all cursor-pointer"
              >
                {activeTab === 'analytics' ? 'Open Site Settings' : 'Back to Analytics'}
              </button>

              <Link
                href="/"
                target="_blank"
                className="px-4 py-2 rounded-lg bg-[#003DB8] hover:bg-[#002f8f] active:scale-95 text-xs font-bold text-white shadow-sm transition-all flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>View Live Site</span>
              </Link>
            </div>
          </div>

          {/* Conditional View */}
          {activeTab === 'settings' ? (
            <SiteSettingsModule />
          ) : activeTab === 'packages' ? (
            <PackagesModule />
          ) : activeTab === 'enquiries' ? (
            <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-2xs overflow-hidden">
              <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Inbox className="w-4 h-4 text-rose-400" />
                  <h2 className="text-sm font-bold text-zinc-900">All Enquiries</h2>
                  {!loadingEnquiries && (
                    <span className="ml-1 text-[11px] bg-rose-50 text-rose-600 font-bold px-2 py-0.5 rounded-full">
                      {enquiries.length}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => { setActiveTab('analytics'); setTimeout(() => setActiveTab('enquiries'), 10); }}
                  className="text-xs text-zinc-500 hover:text-zinc-800 transition-colors"
                >
                  Refresh
                </button>
              </div>

              {loadingEnquiries ? (
                <div className="divide-y divide-zinc-100">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex gap-4 px-6 py-4">
                      <div className="w-9 h-9 rounded-full bg-zinc-100 animate-pulse flex-shrink-0" />
                      <div className="flex-1 space-y-2 py-1">
                        <div className="h-3 w-32 bg-zinc-100 animate-pulse rounded" />
                        <div className="h-2.5 w-56 bg-zinc-100 animate-pulse rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : enquiries.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center px-6">
                  <Inbox className="w-10 h-10 text-zinc-300 mb-3" />
                  <p className="text-sm font-semibold text-zinc-500">No enquiries yet</p>
                  <p className="text-xs text-zinc-400 mt-1">Submissions from the contact and package pages will appear here.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-zinc-50 text-left">
                        <th className="px-6 py-3 font-semibold text-zinc-500">Name</th>
                        <th className="px-4 py-3 font-semibold text-zinc-500">Contact</th>
                        <th className="px-4 py-3 font-semibold text-zinc-500">Destination</th>
                        <th className="px-4 py-3 font-semibold text-zinc-500">Travel Date</th>
                        <th className="px-4 py-3 font-semibold text-zinc-500">People</th>
                        <th className="px-4 py-3 font-semibold text-zinc-500">Type</th>
                        <th className="px-4 py-3 font-semibold text-zinc-500">Received</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      {enquiries.map((enq: any) => (
                        <tr key={enq._id} className="hover:bg-zinc-50/60 transition-colors">
                          <td className="px-6 py-3">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#003DB8] to-[#00D9FF] flex items-center justify-center text-white font-bold text-[11px] flex-shrink-0">
                                {enq.name?.[0]?.toUpperCase() ?? '?'}
                              </div>
                              <div>
                                <p className="font-semibold text-zinc-900">{enq.name}</p>
                                <p className="text-zinc-400">{enq.city}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-1 text-zinc-600">
                                <Phone className="w-3 h-3 text-zinc-400" />
                                <span>{enq.phone || '—'}</span>
                              </div>
                              <div className="flex items-center gap-1 text-zinc-400">
                                <Mail className="w-3 h-3" />
                                <span className="truncate max-w-[160px]">{enq.email || '—'}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 font-medium text-zinc-800">{enq.destination || '—'}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1 text-zinc-600">
                              <CalendarDays className="w-3 h-3 text-zinc-400" />
                              <span>{enq.travelDate || '—'}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <div className="flex items-center gap-1 text-zinc-600">
                              <Users className="w-3 h-3 text-zinc-400" />
                              <span>{enq.peopleCount || '—'}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            {enq.vacationType ? (
                              <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold text-[11px]">
                                {enq.vacationType}
                              </span>
                            ) : '—'}
                          </td>
                          <td className="px-4 py-3 text-zinc-400 whitespace-nowrap">
                            {enq.createdAt
                              ? new Date(enq.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                              : '—'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-8">
              {/* Row 1: 4 Live Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {/* Destinations */}
                <div className="bg-white rounded-2xl p-5 border border-zinc-200/80 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-zinc-500">Destinations</span>
                    <div className="w-9 h-9 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center">
                      <Globe className="w-4 h-4" />
                    </div>
                  </div>
                  {loadingAnalytics ? (
                    <div className="h-8 w-16 bg-zinc-100 animate-pulse rounded" />
                  ) : (
                    <div className="text-2xl font-bold text-zinc-900 tracking-tight">{stats.destinations}</div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] bg-amber-50 text-amber-600 px-2 py-0.5 rounded font-bold">MongoDB Live</span>
                  </div>
                </div>

                {/* Tour Packages */}
                <div className="bg-white rounded-2xl p-5 border border-zinc-200/80 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-zinc-500">Tour Packages</span>
                    <div className="w-9 h-9 rounded-full bg-sky-50 text-sky-500 flex items-center justify-center">
                      <Package className="w-4 h-4" />
                    </div>
                  </div>
                  {loadingAnalytics ? (
                    <div className="h-8 w-16 bg-zinc-100 animate-pulse rounded" />
                  ) : (
                    <div className="text-2xl font-bold text-zinc-900 tracking-tight">{stats.packages}</div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] bg-sky-50 text-sky-600 px-2 py-0.5 rounded font-bold">MongoDB Live</span>
                  </div>
                </div>

                {/* Active Listings */}
                <div className="bg-white rounded-2xl p-5 border border-zinc-200/80 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-zinc-500">Active Listings</span>
                    <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  </div>
                  {loadingAnalytics ? (
                    <div className="h-8 w-16 bg-zinc-100 animate-pulse rounded" />
                  ) : (
                    <div className="text-2xl font-bold text-zinc-900 tracking-tight">{stats.active}</div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded font-bold">MongoDB Live</span>
                  </div>
                </div>

                {/* Branch Offices */}
                <div className="bg-white rounded-2xl p-5 border border-zinc-200/80 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-zinc-500">Branch Offices</span>
                    <div className="w-9 h-9 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center">
                      <MapPin className="w-4 h-4" />
                    </div>
                  </div>
                  {loadingAnalytics ? (
                    <div className="h-8 w-16 bg-zinc-100 animate-pulse rounded" />
                  ) : (
                    <div className="text-2xl font-bold text-zinc-900 tracking-tight">{stats.branches}</div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] bg-purple-50 text-purple-600 px-2 py-0.5 rounded font-bold">MongoDB Live</span>
                  </div>
                </div>
              </div>

              {/* Row 2: Destinations Table */}
              <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-2xs overflow-hidden">
                <div className="px-6 py-4 flex items-center justify-between border-b border-zinc-100">
                  <h2 className="text-sm font-bold text-zinc-900">All Destinations</h2>
                  <button
                    onClick={() => setActiveTab('packages')}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#003DB8] hover:bg-[#002f8f] active:scale-95 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Destination
                  </button>
                </div>

                {loadingAnalytics ? (
                  /* Loading skeleton */
                  <div className="divide-y divide-zinc-100">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-4 px-6 py-4">
                        <div className="w-10 h-10 rounded-lg bg-zinc-100 animate-pulse flex-shrink-0" />
                        <div className="flex-1 space-y-2">
                          <div className="h-3 w-32 bg-zinc-100 animate-pulse rounded" />
                          <div className="h-2.5 w-48 bg-zinc-100 animate-pulse rounded" />
                        </div>
                        <div className="h-3 w-10 bg-zinc-100 animate-pulse rounded" />
                        <div className="h-3 w-10 bg-zinc-100 animate-pulse rounded" />
                        <div className="h-5 w-16 bg-zinc-100 animate-pulse rounded-full" />
                        <div className="h-7 w-12 bg-zinc-100 animate-pulse rounded-lg" />
                      </div>
                    ))}
                  </div>
                ) : destinations.length === 0 ? (
                  /* Empty state */
                  <div className="flex flex-col items-center justify-center py-16 text-center px-6">
                    <Globe className="w-10 h-10 text-zinc-300 mb-3" />
                    <p className="text-sm font-semibold text-zinc-500">No destinations yet</p>
                    <p className="text-xs text-zinc-400 mt-1">
                      Click &quot;Add Destination&quot; above to create your first tour destination.
                    </p>
                  </div>
                ) : (
                  /* Destinations table */
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="bg-zinc-50 text-left">
                          <th className="px-6 py-3 font-semibold text-zinc-500 w-12" />
                          <th className="px-4 py-3 font-semibold text-zinc-500">Name</th>
                          <th className="px-4 py-3 font-semibold text-zinc-500 text-center">Packages</th>
                          <th className="px-4 py-3 font-semibold text-zinc-500 text-center">FAQs</th>
                          <th className="px-4 py-3 font-semibold text-zinc-500">Status</th>
                          <th className="px-4 py-3 font-semibold text-zinc-500" />
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100">
                        {destinations.map((dest: any) => (
                          <tr key={dest._id} className="hover:bg-zinc-50/60 transition-colors">
                            {/* Hero image */}
                            <td className="px-6 py-3">
                              <div className="w-10 h-10 rounded-lg overflow-hidden bg-zinc-100 flex-shrink-0 relative">
                                {dest.heroImage ? (
                                  <Image
                                    src={dest.heroImage}
                                    alt={dest.name ?? 'destination'}
                                    fill
                                    className="object-cover"
                                    sizes="40px"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <Globe className="w-4 h-4 text-zinc-300" />
                                  </div>
                                )}
                              </div>
                            </td>
                            {/* Name + tagline */}
                            <td className="px-4 py-3">
                              <p className="font-semibold text-zinc-900 truncate max-w-[180px]">{dest.name}</p>
                              {dest.tagline && (
                                <p className="text-zinc-400 truncate max-w-[220px] mt-0.5">{dest.tagline}</p>
                              )}
                            </td>
                            {/* Packages count */}
                            <td className="px-4 py-3 text-center font-semibold text-zinc-700">
                              {Array.isArray(dest.packages) ? dest.packages.length : 0}
                            </td>
                            {/* FAQs count */}
                            <td className="px-4 py-3 text-center font-semibold text-zinc-700">
                              {Array.isArray(dest.faqs) ? dest.faqs.length : 0}
                            </td>
                            {/* Status badge */}
                            <td className="px-4 py-3">
                              {dest.isActive ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold text-[11px]">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                                  Active
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-500 font-semibold text-[11px]">
                                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 inline-block" />
                                  Inactive
                                </span>
                              )}
                            </td>
                            {/* Edit button */}
                            <td className="px-4 py-3">
                              <button
                                onClick={() => setActiveTab('packages')}
                                className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-semibold transition-colors text-[11px] cursor-pointer"
                              >
                                Edit
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Row 3: Quick Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {/* Configure Settings */}
                <button
                  onClick={() => setActiveTab('settings')}
                  className="bg-white rounded-2xl p-5 border border-zinc-200/80 shadow-2xs text-left hover:shadow-md hover:border-blue-200 transition-all group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:bg-blue-100 transition-colors">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-bold text-zinc-900">Configure Settings</p>
                  <p className="text-xs text-zinc-400 mt-1">Update contact info, carousel images, and branch details.</p>
                </button>

                {/* Manage Packages */}
                <button
                  onClick={() => setActiveTab('packages')}
                  className="bg-white rounded-2xl p-5 border border-zinc-200/80 shadow-2xs text-left hover:shadow-md hover:border-sky-200 transition-all group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-3 group-hover:bg-sky-100 transition-colors">
                    <Package className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-bold text-zinc-900">Manage Packages</p>
                  <p className="text-xs text-zinc-400 mt-1">Add or edit destinations, tour packages, and FAQs.</p>
                </button>

                {/* View Live Site */}
                <Link
                  href="/"
                  target="_blank"
                  className="bg-white rounded-2xl p-5 border border-zinc-200/80 shadow-2xs text-left hover:shadow-md hover:border-indigo-200 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 group-hover:bg-indigo-100 transition-colors">
                    <ExternalLink className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-bold text-zinc-900">View Live Site</p>
                  <p className="text-xs text-zinc-400 mt-1">Open the public-facing Tripzo portal in a new tab.</p>
                </Link>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
