import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { SiteSettings } from '@/models/SiteSettings';

const DEFAULT_SETTINGS = {
  phoneNumber: '+91 9940882200',
  phoneLink: 'tel:+919940882200',
  email: 'info@tripzo.com',
  logoUrl: '/Home.png',
  faviconUrl: '/favicon.ico',
  branches: [
    {
      cityName: 'Madurai',
      address: 'Jayam Towers,\nHIG 38, Above DBS Bank,\n80 Feet Road, Annanagar,\nMadurai – 20',
      image: '/madurai_branch.jpg',
      articles: [
        {
          heading: 'How To Choose the Best Travel Agency in Madurai?',
          content: "With hundreds of temples and a historical background that dates back to the Sangam age, Madurai is undoubtedly the cultural capital of Tamil Nadu. Over the last few decades, this temple city has become increasingly urbanized. To get their minds off the hectic schedule, local Maduraiites are looking for affordable tour packages in and around the country.",
        },
        {
          heading: 'Travel Agents Vs. DIY Travel Planning – Which Is Better?',
          content: "Good Madurai tour operators don't go overboard with advertising, allowing their service quality and experience to speak for them. There are several benefits of planning a vacation through a travel agency in Madurai – from booking to boarding & lodging, your travel agent will manage the entire process.\n\nMadurai people value honor and honesty above everything else – winning their hearts is easy if you practice transparency and offer value for money.",
        },
        {
          heading: 'Why Is Tripzo the Best Travel Agency in Madurai?',
          content: "Tripzo is a well-established brand of travel consultants in South India with a strong footprint in the travel industry and boasts a solid national and international network in the travel and tourism sector. Our strong network helps us design customized travel plans in India and outside the country.\n\nThanks to our strong local team of employees, we've become a sought-after travel agency in Madurai.",
        },
        {
          heading: 'Which Company Is Best for Travel Agents in Madurai?',
          content: "Tripzo has a robust background in the hospitality sector and hence offers the value addition of experience and expertise to the business. This expertise is another reason why we focus exclusively on creating delighted customers.\n\nWith branches across South India, Tripzo has a robust, well-established network of agents and assures you seamless and impeccable service wherever you go.",
        },
      ],
    },
  ],
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

    const { phoneNumber, phoneLink, email, logoUrl, faviconUrl, branches, slides } = body;

    const setPayload: Record<string, any> = {};
    if (phoneNumber !== undefined) setPayload.phoneNumber = phoneNumber;
    if (phoneLink !== undefined) setPayload.phoneLink = phoneLink;
    if (email !== undefined) setPayload.email = email;
    if (logoUrl !== undefined) setPayload.logoUrl = logoUrl;
    if (faviconUrl !== undefined) setPayload.faviconUrl = faviconUrl;
    if (branches !== undefined && Array.isArray(branches)) setPayload.branches = branches;
    if (slides !== undefined && Array.isArray(slides)) setPayload.slides = slides;

    const settings = await SiteSettings.findOneAndUpdate(
      {},
      { $set: setPayload, $unset: { articles: '' } },
      { new: true, upsert: true, runValidators: false }
    );

    return NextResponse.json({ success: true, settings, message: 'Settings saved successfully' });
  } catch (error: any) {
    console.error('Failed to save settings:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to update settings' },
      { status: 500 }
    );
  }
}
