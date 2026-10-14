'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  LayoutDashboard,
  Compass,
  ShoppingCart,
  Users,
  Settings,
  Calendar as CalendarIcon,
  Search,
  Bell,
  MessageSquare,
  Maximize2,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Truck,
  DollarSign,
  Plus,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  LogOut,
  Globe,
  Sliders,
  CheckCircle2,
  Menu,
  X,
} from 'lucide-react';
import SiteSettingsModule from '@/components/SiteSettingsModule';

export default function AdminDashboardLayout() {
  const [activeTab, setActiveTab] = useState<'analytics' | 'settings'>('analytics');
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
        <nav className="flex-1 px-3 py-2 space-y-6 overflow-y-auto text-xs font-medium">
          {/* Group: Pages */}
          <div className="space-y-1">
            {sidebarOpen && (
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400/80 mb-2">
                Pages
              </p>
            )}

            {/* Dashboards dropdown */}
            <div className="space-y-0.5">
              <div className="flex items-center justify-between px-3 py-2.5 rounded-lg text-white font-semibold cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <LayoutDashboard className="w-4 h-4 text-[#00D9FF]" />
                  {sidebarOpen && <span>Dashboards</span>}
                </div>
                {sidebarOpen && <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
              </div>

              {/* Sub items */}
              {sidebarOpen && (
                <div className="pl-9 pr-2 space-y-1">
                  <button
                    onClick={() => setActiveTab('analytics')}
                    className={`w-full text-left py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                      activeTab === 'analytics'
                        ? 'text-white bg-[#003DB8] font-bold shadow-sm'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    &rarr; Analytics
                  </button>

                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`w-full text-left py-2 px-3 rounded-lg text-xs font-medium transition-all flex items-center justify-between ${
                      activeTab === 'settings'
                        ? 'text-white bg-[#003DB8] font-bold shadow-sm'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>&rarr; Site Settings</span>
                    <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded font-bold">
                      Live
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* Other Sidebar Items */}
            <div className="space-y-0.5 pt-2">
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                  activeTab === 'settings'
                    ? 'text-white bg-white/10'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Sliders className="w-4 h-4 text-emerald-400" />
                {sidebarOpen && <span>Settings &amp; Carousel</span>}
              </button>

              <Link
                href="/packages"
                target="_blank"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Compass className="w-4 h-4 text-amber-400" />
                {sidebarOpen && <span>Tour Packages</span>}
              </Link>

              <Link
                href="/contact"
                target="_blank"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Users className="w-4 h-4 text-purple-400" />
                {sidebarOpen && <span>Customer Leads</span>}
              </Link>
            </div>
          </div>

          {/* Group: Public Link */}
          <div className="pt-2 border-t border-white/5">
            {sidebarOpen && (
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400/80 mb-2">
                Live Website
              </p>
            )}
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-[#00D9FF] hover:bg-white/5 transition-colors"
            >
              <Globe className="w-4 h-4" />
              {sidebarOpen && <span>View Main Site &rarr;</span>}
            </Link>
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-white/5">
          <Link
            href="/"
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
          {/* Left search & menu toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 text-zinc-500 hover:text-zinc-800 rounded-lg hover:bg-zinc-100 transition-colors"
              title="Toggle Sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search..."
                className="w-64 pl-9 pr-4 py-1.5 text-xs bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#003DB8] focus:bg-white transition-all"
              />
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <div className="hidden lg:flex items-center gap-4 text-xs font-medium text-zinc-500 pl-2">
              <span className="hover:text-zinc-900 cursor-pointer">Mega Menu</span>
              <span className="hover:text-zinc-900 cursor-pointer flex items-center gap-1">
                Resources <ChevronDown className="w-3 h-3" />
              </span>
            </div>
          </div>

          {/* Right utility icons */}
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 rounded-lg transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#003DB8]" />
            </button>

            <button className="p-2 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 rounded-lg transition-colors">
              <MessageSquare className="w-4 h-4" />
            </button>

            <button className="p-2 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 rounded-lg transition-colors hidden sm:block">
              <Maximize2 className="w-4 h-4" />
            </button>

            <div className="h-6 w-px bg-zinc-200 mx-1" />

            {/* User Avatar */}
            <div className="flex items-center gap-2 pl-1 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#003DB8] to-[#00D9FF] flex items-center justify-center text-white font-bold text-xs shadow-xs">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-8">
          {/* Top Title Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">
                {activeTab === 'analytics' ? 'Analytics Dashboard' : 'Site Settings & Dynamic Carousel'}
              </h1>
              <p className="text-xs text-zinc-500 mt-0.5">
                {activeTab === 'analytics'
                  ? 'Real-time overview of bookings, leads, visitors, and revenue.'
                  : 'Manage live contact info and upload hero carousel slides connected directly to MongoDB.'}
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

          {/* Conditional View: Analytics Dashboard OR Settings Module */}
          {activeTab === 'settings' ? (
            <SiteSettingsModule />
          ) : (
            <div className="space-y-8">
              {/* Row 1: 4 Metric Cards (Sales, Earnings, Visitors, Orders) + Chart */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* 4 Metric Cards (5 Cols) */}
                <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Sales */}
                  <div className="bg-white rounded-2xl p-5 border border-zinc-200/80 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-zinc-500">Sales</span>
                      <div className="w-9 h-9 rounded-full bg-blue-50 text-[#003DB8] flex items-center justify-center">
                        <Truck className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-zinc-900 tracking-tight">2.382</div>
                    <div className="flex items-center gap-1 text-[11px] text-rose-500 font-medium">
                      <span className="bg-rose-50 px-1.5 py-0.5 rounded font-bold">-3.65%</span>
                      <span className="text-zinc-400">Since last week</span>
                    </div>
                  </div>

                  {/* Earnings */}
                  <div className="bg-white rounded-2xl p-5 border border-zinc-200/80 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-zinc-500">Earnings</span>
                      <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <DollarSign className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-zinc-900 tracking-tight">$21.300</div>
                    <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                      <span className="bg-emerald-50 px-1.5 py-0.5 rounded font-bold">+6.65%</span>
                      <span className="text-zinc-400">Since last week</span>
                    </div>
                  </div>

                  {/* Visitors */}
                  <div className="bg-white rounded-2xl p-5 border border-zinc-200/80 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-zinc-500">Visitors</span>
                      <div className="w-9 h-9 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        <Users className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-zinc-900 tracking-tight">14.212</div>
                    <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                      <span className="bg-emerald-50 px-1.5 py-0.5 rounded font-bold">+5.25%</span>
                      <span className="text-zinc-400">Since last week</span>
                    </div>
                  </div>

                  {/* Orders */}
                  <div className="bg-white rounded-2xl p-5 border border-zinc-200/80 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-zinc-500">Orders</span>
                      <div className="w-9 h-9 rounded-full bg-sky-50 text-[#00D9FF] flex items-center justify-center">
                        <ShoppingCart className="w-4 h-4 text-[#003DB8]" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-zinc-900 tracking-tight">64</div>
                    <div className="flex items-center gap-1 text-[11px] text-rose-500 font-medium">
                      <span className="bg-rose-50 px-1.5 py-0.5 rounded font-bold">-2.25%</span>
                      <span className="text-zinc-400">Since last week</span>
                    </div>
                  </div>
                </div>

                {/* Recent Movement Chart (7 Cols) */}
                <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-zinc-200/80 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-bold text-zinc-900">Recent Movement</h2>
                      <p className="text-[11px] text-zinc-400">Monthly booking trend</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <select className="text-xs border border-zinc-200 rounded-lg px-2.5 py-1 text-zinc-600 bg-white">
                        <option>Jan - Dec 2026</option>
                        <option>2025</option>
                      </select>
                      <button className="p-1 text-zinc-400 hover:text-zinc-700">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* SVG Line Curve Chart */}
                  <div className="relative w-full h-56 pt-2">
                    <svg viewBox="0 0 700 220" className="w-full h-full overflow-visible">
                      <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#003DB8" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#003DB8" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Horizontal Grid lines */}
                      <line x1="40" y1="30" x2="680" y2="30" stroke="#f1f5f9" strokeWidth="1" />
                      <text x="10" y="34" fontSize="10" fill="#94a3b8">4000</text>

                      <line x1="40" y1="85" x2="680" y2="85" stroke="#f1f5f9" strokeWidth="1" />
                      <text x="10" y="89" fontSize="10" fill="#94a3b8">3000</text>

                      <line x1="40" y1="140" x2="680" y2="140" stroke="#f1f5f9" strokeWidth="1" />
                      <text x="10" y="144" fontSize="10" fill="#94a3b8">2000</text>

                      <line x1="40" y1="195" x2="680" y2="195" stroke="#f1f5f9" strokeWidth="1" />
                      <text x="10" y="199" fontSize="10" fill="#94a3b8">1000</text>

                      {/* Area Fill */}
                      <path
                        d="M 50 145 C 100 170, 150 165, 200 150 C 250 135, 300 175, 350 160 C 400 145, 450 120, 500 115 C 550 110, 600 55, 630 65 C 650 72, 665 60, 680 70 L 680 200 L 50 200 Z"
                        fill="url(#chartGrad)"
                      />

                      {/* Smooth Spline Line */}
                      <path
                        d="M 50 145 C 100 170, 150 165, 200 150 C 250 135, 300 175, 350 160 C 400 145, 450 120, 500 115 C 550 110, 600 55, 630 65 C 650 72, 665 60, 680 70"
                        fill="none"
                        stroke="#003DB8"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />

                      {/* Highlight Dots */}
                      <circle cx="50" cy="145" r="4.5" fill="#003DB8" stroke="#fff" strokeWidth="2" />
                      <circle cx="350" cy="160" r="4.5" fill="#003DB8" stroke="#fff" strokeWidth="2" />
                      <circle cx="500" cy="115" r="4.5" fill="#003DB8" stroke="#fff" strokeWidth="2" />
                      <circle cx="630" cy="65" r="5" fill="#00D9FF" stroke="#003DB8" strokeWidth="2.5" />
                    </svg>

                    {/* Months footer */}
                    <div className="flex justify-between text-[11px] text-zinc-400 pt-2 px-6">
                      <span>Jan</span>
                      <span>Feb</span>
                      <span>Mar</span>
                      <span>Apr</span>
                      <span>May</span>
                      <span>Jun</span>
                      <span>Jul</span>
                      <span>Aug</span>
                      <span>Sep</span>
                      <span>Oct</span>
                      <span>Nov</span>
                      <span>Dec</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: 3 Bottom Widgets (Calendar, Real-Time Map, Browser/Lead Donut) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* 1. Calendar Widget (4 Cols) */}
                <div className="md:col-span-4 bg-white rounded-2xl p-6 border border-zinc-200/80 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-zinc-900">Calendar</h3>
                    <MoreHorizontal className="w-4 h-4 text-zinc-400" />
                  </div>

                  {/* Month header */}
                  <div className="flex items-center justify-between px-2 pt-1">
                    <ChevronLeft className="w-4 h-4 text-zinc-400 cursor-pointer" />
                    <span className="text-xs font-bold text-zinc-800">October 2026</span>
                    <ChevronRight className="w-4 h-4 text-zinc-400 cursor-pointer" />
                  </div>

                  {/* Mini Calendar Grid */}
                  <div className="grid grid-cols-7 gap-y-2 text-center text-xs">
                    <span className="text-[10px] font-bold text-zinc-400">Sun</span>
                    <span className="text-[10px] font-bold text-zinc-400">Mon</span>
                    <span className="text-[10px] font-bold text-zinc-400">Tue</span>
                    <span className="text-[10px] font-bold text-zinc-400">Wed</span>
                    <span className="text-[10px] font-bold text-zinc-400">Thu</span>
                    <span className="text-[10px] font-bold text-zinc-400">Fri</span>
                    <span className="text-[10px] font-bold text-zinc-400">Sat</span>

                    {/* Days */}
                    <span className="text-zinc-300">28</span>
                    <span className="text-zinc-300">29</span>
                    <span className="text-zinc-300">30</span>
                    <span className="text-zinc-700">1</span>
                    <span className="text-zinc-700">2</span>
                    <span className="text-zinc-700">3</span>
                    <span className="text-zinc-700">4</span>
                    <span className="text-zinc-700">5</span>
                    <span className="text-zinc-700">6</span>
                    <span className="text-zinc-700">7</span>
                    <span className="text-zinc-700">8</span>
                    <span className="text-zinc-700">9</span>
                    <span className="text-zinc-700">10</span>
                    <span className="text-zinc-700">11</span>
                    <span className="text-zinc-700">12</span>
                    <span className="text-zinc-700">13</span>
                    {/* Active Day */}
                    <span className="w-7 h-7 mx-auto rounded-full bg-[#003DB8] text-white flex items-center justify-center font-bold shadow-xs">
                      14
                    </span>
                    <span className="text-zinc-700">15</span>
                    <span className="text-zinc-700">16</span>
                    <span className="text-zinc-700">17</span>
                    <span className="text-zinc-700">18</span>
                  </div>
                </div>

                {/* 2. Real-Time Global Visitors Map (4 Cols) */}
                <div className="md:col-span-4 bg-white rounded-2xl p-6 border border-zinc-200/80 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-zinc-900">Real-Time Travellers</h3>
                    <MoreHorizontal className="w-4 h-4 text-zinc-400" />
                  </div>

                  <div className="relative w-full h-44 bg-zinc-50 rounded-xl overflow-hidden flex items-center justify-center border border-zinc-100">
                    {/* Stylized World Map Vector */}
                    <svg viewBox="0 0 400 200" className="w-full h-full opacity-40 fill-zinc-400">
                      <path d="M 50,60 Q 80,40 110,65 Q 120,95 90,120 Q 60,110 50,60 Z" />
                      <path d="M 120,130 Q 150,140 140,180 Q 110,185 105,140 Z" />
                      <path d="M 200,50 Q 250,45 280,70 Q 270,110 230,110 Q 190,90 200,50 Z" />
                      <path d="M 230,120 Q 260,120 270,170 Q 230,180 220,130 Z" />
                      <path d="M 310,130 Q 360,120 370,160 Q 330,180 310,130 Z" />
                    </svg>

                    {/* Glowing Live Location Pins */}
                    <div className="absolute top-16 left-28 w-3 h-3 rounded-full bg-[#003DB8] animate-ping" />
                    <div className="absolute top-16 left-28 w-3 h-3 rounded-full bg-[#003DB8] border-2 border-white shadow" />

                    <div className="absolute top-24 left-56 w-3 h-3 rounded-full bg-[#00D9FF] animate-ping" />
                    <div className="absolute top-24 left-56 w-3 h-3 rounded-full bg-[#00D9FF] border-2 border-white shadow" />

                    <div className="absolute top-20 right-28 w-3 h-3 rounded-full bg-[#003DB8] animate-ping" />
                    <div className="absolute top-20 right-28 w-3 h-3 rounded-full bg-[#003DB8] border-2 border-white shadow" />
                  </div>

                  <div className="flex items-center justify-between text-xs text-zinc-500 pt-1">
                    <span>Active Sessions: <strong className="text-zinc-800">184 Live</strong></span>
                    <span className="text-emerald-600 font-semibold">&bull; Online</span>
                  </div>
                </div>

                {/* 3. Browser Usage / Booking Channel Donut (4 Cols) */}
                <div className="md:col-span-4 bg-white rounded-2xl p-6 border border-zinc-200/80 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-zinc-900">Traffic Source</h3>
                    <MoreHorizontal className="w-4 h-4 text-zinc-400" />
                  </div>

                  {/* Donut SVG */}
                  <div className="flex items-center justify-center py-2">
                    <div className="relative w-36 h-36">
                      <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                        {/* Chrome / Direct 65% (Blue) */}
                        <path
                          className="text-[#003DB8]"
                          strokeDasharray="65, 100"
                          strokeWidth="4"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        {/* Safari / Mobile 20% (Cyan) */}
                        <path
                          className="text-[#00D9FF]"
                          strokeDasharray="20, 100"
                          strokeDashoffset="-65"
                          strokeWidth="4"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        {/* Other 15% (Amber) */}
                        <path
                          className="text-amber-400"
                          strokeDasharray="15, 100"
                          strokeDashoffset="-85"
                          strokeWidth="4"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-xs text-zinc-400 leading-none">Total</span>
                        <span className="text-base font-extrabold text-zinc-900">4,306</span>
                      </div>
                    </div>
                  </div>

                  {/* Legend list */}
                  <div className="space-y-1.5 text-xs text-zinc-600">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#003DB8]" />
                        Chrome / Desktop
                      </span>
                      <strong className="text-zinc-800">4,306 (65%)</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#00D9FF]" />
                        Mobile Safari
                      </span>
                      <strong className="text-zinc-800">1,280 (20%)</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                        Direct / Other
                      </span>
                      <strong className="text-zinc-800">920 (15%)</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom: Embedded Live Settings Quick Access Card */}
              <div className="bg-gradient-to-r from-blue-50 via-white to-sky-50 border border-blue-200/70 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
                <div>
                  <h3 className="text-base font-bold text-zinc-900">
                    MongoDB Live Site Settings &amp; Hero Carousel
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Need to upload new photos to your homepage or update the customer contact details?
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('settings')}
                  className="px-5 py-2.5 rounded-xl bg-[#003DB8] hover:bg-[#002f8f] active:scale-95 text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer whitespace-nowrap"
                >
                  Configure Site Settings &rarr;
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
