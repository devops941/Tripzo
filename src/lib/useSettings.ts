'use client';

import { useState, useEffect } from 'react';
import type { SiteSettings } from '@/types';

const DEFAULTS: SiteSettings = {
  phoneNumber: '+91 9940882200',
  phoneLink: 'tel:+919940882200',
  email: 'info@tripzo.com',
  logoUrl: '/Home.png',
  branches: [],
};

export function useSettings(): SiteSettings {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULTS);

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(data => {
        if (data.settings) {
          setSettings({
            phoneNumber: data.settings.phoneNumber || DEFAULTS.phoneNumber,
            phoneLink: data.settings.phoneLink || DEFAULTS.phoneLink,
            email: data.settings.email || DEFAULTS.email,
            logoUrl: data.settings.logoUrl || DEFAULTS.logoUrl,
            branches: data.settings.branches?.length > 0 ? data.settings.branches : DEFAULTS.branches,
          });
        }
      })
      .catch(() => {});
  }, []);

  return settings;
}
