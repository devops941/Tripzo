'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import AdminDashboardLayout from '@/components/AdminDashboardLayout';

export default function WebAdminPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('tripzo_admin') === 'true';
    }
    return false;
  });

  const handleLogin = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    let valid = true;
    if (!email.trim()) {
      setEmailError('Username or email is required');
      valid = false;
    } else {
      setEmailError('');
    }
    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    } else {
      setPasswordError('');
    }
    if (!valid) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const validEmail = email.trim().toLowerCase();
      if ((validEmail === 'admin@tripzo.com' || validEmail === 'admin') && password === 'admin123') {
        setIsLoggedIn(true);
        sessionStorage.setItem('tripzo_admin', 'true');
      } else {
        setErrorMessage('Invalid credentials. Use admin@tripzo.com / admin123');
      }
    }, 600);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('tripzo_admin');
    setPassword('');
  };

  // If logged in, show the AdminKit PRO Style Analytics Dashboard
  if (isLoggedIn) {
    return <AdminDashboardLayout onLogout={handleLogout} />;
  }

  // 50/50 Split Screen Layout matching Sun Sea ERP style
  return (
    <main className="min-h-screen w-full flex flex-col lg:flex-row bg-white text-zinc-900">
      {/* Left Column: Full-Height Deep Royal Blue Brand Hero (50% width) */}
      <div className="lg:w-1/2 bg-gradient-to-br from-[#0c3196] via-[#082987] to-[#041a5e] p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden text-white min-h-[380px] lg:min-h-screen">
        {/* Subtle geometric circles overlay */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full border border-white/10 pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-[500px] h-[500px] rounded-full border border-white/5 pointer-events-none" />
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-[#00D9FF]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top: Logo & Subtitle */}
        <div className="relative z-10 flex items-center gap-4">
          <Link href="/" className="inline-block transition-transform hover:scale-[1.02]">
            <div className="relative h-12 w-44">
              <Image
                src="/Home.png"
                alt="Tripzo"
                fill
                sizes="176px"
                className="object-contain object-left brightness-0 invert drop-shadow-md"
                priority
              />
            </div>
          </Link>
          <div className="h-6 w-px bg-white/20" />
          <span className="text-[11px] font-bold tracking-widest text-[#00D9FF] uppercase">
            Travel ERP Portal
          </span>
        </div>

        {/* Center: Main Punchy Slogan & Description */}
        <div className="relative z-10 my-auto py-12 max-w-lg space-y-5">
          <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-white leading-[1.12]">
            Smart Travel.
            <br />
            Complete Control.
          </h1>
          <p className="text-sm sm:text-base text-blue-100/85 leading-relaxed font-normal">
            Gain complete visibility over your tour packages, inquiries, bookings, and customer
            relations from a unified, intelligent platform.
          </p>
        </div>

        {/* Bottom: Copyright Note */}
        <div className="relative z-10 text-xs text-blue-200/60 font-medium">
          &copy; 2026 Tripzo Travels. All rights reserved.
        </div>
      </div>

      {/* Right Column: Clean White Login Form (50% width) */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-20 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Form Header */}
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1E56F0] tracking-tight">
              Welcome Back!
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500">
              Sign in to your account to continue managing operations.
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} noValidate className="space-y-5">
            {/* Username or Email */}
            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-xs font-bold text-zinc-700 uppercase tracking-wider">
                <Mail className="w-3.5 h-3.5 text-[#1E56F0]" />
                <span>USERNAME OR EMAIL</span>
                <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={email}
                onChange={e => { setEmail(e.target.value); if (emailError) setEmailError(''); }}
                placeholder="Enter username or email"
                className={`w-full px-4 py-3 rounded-lg border text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all shadow-2xs ${
                  emailError ? 'border-rose-400 focus:ring-rose-300' : 'border-zinc-200 focus:ring-[#1E56F0]'
                }`}
              />
              {emailError && <p className="text-[11px] text-rose-500">{emailError}</p>}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-xs font-bold text-zinc-700 uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5 text-[#1E56F0]" />
                <span>PASSWORD</span>
                <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); if (passwordError) setPasswordError(''); }}
                  placeholder="Enter your password"
                  className={`w-full pl-4 pr-11 py-3 rounded-lg border text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all shadow-2xs ${
                    passwordError ? 'border-rose-400 focus:ring-rose-300' : 'border-zinc-200 focus:ring-[#1E56F0]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {passwordError && <p className="text-[11px] text-rose-500">{passwordError}</p>}
            </div>


            {/* Login Now Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-lg bg-[#1E66F0] hover:bg-[#1556d4] active:scale-[0.99] text-white font-bold text-sm tracking-wide shadow-md shadow-[#1E66F0]/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
            >
              {isLoading ? 'Authenticating...' : 'Login Now'}
            </button>
          </form>

          {/* Quick Demo Helper Hint */}
          <div className="pt-4 border-t border-zinc-100 text-center">
            <p className="text-xs text-zinc-400">
              Demo Credentials:{' '}
              <button
                type="button"
                onClick={() => {
                  setEmail('admin@tripzo.com');
                  setPassword('admin123');
                }}
                className="text-[#1E66F0] font-semibold hover:underline"
              >
                admin@tripzo.com / admin123 (Click to fill)
              </button>
            </p>
          </div>

          {/* Back to Website */}
          <div className="text-center">
            <Link
              href="/"
              className="text-xs text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              &larr; Back to Tripzo Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
