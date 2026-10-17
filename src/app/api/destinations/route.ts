import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Destination } from '@/models/Destination';

// GET: list all active destinations
export async function GET() {
  try {
    await connectToDatabase();
    const destinations = await Destination.find({ isActive: true }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, destinations });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}

// POST: create or update a destination
export async function POST(req: Request) {
  try {
    const body = await req.json();
    await connectToDatabase();
    const { _id, name, tagline, heroImage, packages, faqs, isActive } = body;

    // Auto-generate slug from name
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    if (_id) {
      // Update existing
      const dest = await Destination.findByIdAndUpdate(
        _id,
        { $set: { name, slug, tagline, heroImage, packages, faqs: faqs || [], isActive } },
        { new: true, runValidators: false }
      );
      return NextResponse.json({ success: true, destination: dest });
    } else {
      // Create new
      const dest = await Destination.create({
        name,
        slug,
        tagline,
        heroImage,
        packages: packages || [],
        faqs: faqs || [],
        isActive: isActive !== false,
      });
      return NextResponse.json({ success: true, destination: dest });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}

// DELETE: delete a destination by id (passed as query param)
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, error: 'No id provided' }, { status: 400 });
    await connectToDatabase();
    await Destination.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}
