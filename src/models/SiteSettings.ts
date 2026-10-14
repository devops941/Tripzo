import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISlide {
  image: string;
  badge: string;
  title: string;
  description: string;
}

export interface ISiteSettings extends Document {
  phoneNumber: string;
  phoneLink: string;
  email: string;
  slides: ISlide[];
  updatedAt: Date;
}

const SlideSchema = new Schema<ISlide>({
  image: { type: String, required: true },
  badge: { type: String, default: 'CURATED JOURNEYS' },
  title: { type: String, default: 'travel, worldclass' },
  description: {
    type: String,
    default:
      'The real voyage of discovery consists not in seeking new landscapes, but in having new eyes.',
  },
});

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    phoneNumber: { type: String, default: '+91 9940882200' },
    phoneLink: { type: String, default: 'tel:+919940882200' },
    email: { type: String, default: 'info@tripzo.com' },
    slides: {
      type: [SlideSchema],
      default: [
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
    },
  },
  { timestamps: true }
);

export const SiteSettings: Model<ISiteSettings> =
  mongoose.models.SiteSettings || mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema);
