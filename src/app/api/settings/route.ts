import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { SiteSettings } from '@/models/SiteSettings';

const DEFAULT_SETTINGS = {
  phoneNumber: '+91 9940882200',
  phoneLink: 'tel:+919940882200',
  email: 'info@tripzo.com',
  slides: [
    {
      image: '/image_one.png',
      badge: 'CURATED JOURNEYS',
      title: 'travel, worldclass',
      description:
        'The real voyage of discovery consists not in seeking new landscapes, but in having new eyes.',
    },
    {
      image: '/image_two.png',
      badge: 'EXOTIC ESCAPES',
      title: 'explore paradise',
      description:
        'Leave behind the everyday and immerse yourself in pristine waters and sun-kissed shores.',
    },
    {
      image: '/image_three.png',
      badge: 'LUXURY RETREATS',
      title: 'unwind in serenity',
      description:
        'Handcrafted itineraries with premium hospitality and unforgettable memories at every step.',
    },
    {
      image: '/image_four.png',
      badge: 'TIMELESS MEMORIES',
      title: 'your dream journey',
      description:
        'From mountain peaks to tropical escapes, let us turn your wanderlust into reality.',
    },
  ],
};

// GET: Retrieve the site settings or create default if none exists
export async function GET() {
  try {
    await connectToDatabase();
    let settings = await SiteSettings.findOne();

    if (!settings) {
      settings = await SiteSettings.create(DEFAULT_SETTINGS);
    }

    return NextResponse.json({ success: true, settings });
  } catch (error: any) {
    console.error('Failed to fetch settings from MongoDB:', error);
    // Graceful fallback so website continues running smoothly even on network/DB lag
    return NextResponse.json({
      success: false,
      settings: DEFAULT_SETTINGS,
      error: error?.message || 'Database error',
    });
  }
}

// POST / PUT: Update the site settings
export async function POST(req: Request) {
  try {
    const body = await req.json();
    await connectToDatabase();

    const { phoneNumber, phoneLink, email, slides } = body;

    let settings = await SiteSettings.findOne();

    if (!settings) {
      settings = new SiteSettings({
        phoneNumber: phoneNumber || DEFAULT_SETTINGS.phoneNumber,
        phoneLink: phoneLink || DEFAULT_SETTINGS.phoneLink,
        email: email || DEFAULT_SETTINGS.email,
        slides: slides && slides.length > 0 ? slides : DEFAULT_SETTINGS.slides,
      });
    } else {
      if (phoneNumber !== undefined) settings.phoneNumber = phoneNumber;
      if (phoneLink !== undefined) settings.phoneLink = phoneLink;
      if (email !== undefined) settings.email = email;
      if (slides !== undefined && Array.isArray(slides)) settings.slides = slides;
    }

    await settings.save();

    return NextResponse.json({ success: true, settings, message: 'Settings saved successfully' });
  } catch (error: any) {
    console.error('Failed to save settings:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to update settings' },
      { status: 500 }
    );
  }
}
