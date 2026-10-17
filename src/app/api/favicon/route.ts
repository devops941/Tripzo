import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { SiteSettings } from '@/models/SiteSettings';

export async function GET() {
  try {
    await connectToDatabase();
    const settings = await SiteSettings.findOne().lean();
    const faviconUrl = (settings as any)?.faviconUrl || '/favicon.ico';

    if (faviconUrl.startsWith('http')) {
      return NextResponse.redirect(faviconUrl);
    }

    // For relative paths, redirect to the public file
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    return NextResponse.redirect(`${baseUrl}${faviconUrl}`);
  } catch {
    return NextResponse.redirect('http://localhost:3000/favicon.ico');
  }
}
