import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { SiteSettings } from '@/models/SiteSettings';

const BRANCH_IMAGES: Record<string, string> = {
  Bangalore: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80',
  Chennai:   'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
  Madurai:   '/madurai_branch.jpg',
};

// GET: patch branch images on the existing settings document (no data wipe)
export async function GET() {
  try {
    await connectToDatabase();

    const settings = await SiteSettings.findOne();
    if (!settings) {
      return NextResponse.json({ success: false, error: 'No settings document found. Run /api/seed first.' }, { status: 404 });
    }

    let updated = 0;
    for (const branch of settings.branches) {
      const img = BRANCH_IMAGES[branch.cityName];
      if (img && branch.image !== img) {
        branch.image = img;
        updated++;
      }
    }

    if (updated > 0) {
      settings.markModified('branches');
      await settings.save();
    }

    return NextResponse.json({
      success: true,
      message: `Updated ${updated} branch image(s).`,
      branches: settings.branches.map((b: { cityName: string; image: string }) => ({
        city: b.cityName,
        image: b.image,
      })),
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}
