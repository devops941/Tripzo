'use client';

import { useState } from 'react';

interface UploadResult {
  uploading: boolean;
  upload: (file: File) => Promise<string | null>;
}

export function useUploadImage(): UploadResult {
  const [uploading, setUploading] = useState(false);

  const upload = async (file: File): Promise<string | null> => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      return data.success && data.url ? data.url : null;
    } catch {
      return null;
    } finally {
      setUploading(false);
    }
  };

  return { uploading, upload };
}
