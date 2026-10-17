import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISlide {
  image: string;
  badge: string;
  title: string;
  description: string;
}

export interface IArticle {
  heading: string;
  content: string;
}

export interface IBranch {
  cityName: string;
  address: string;
  image: string;
  articles: IArticle[];
}

export interface ISiteSettings extends Document {
  phoneNumber: string;
  phoneLink: string;
  email: string;
  logoUrl: string;
  faviconUrl: string;
  slides: ISlide[];
  branches: IBranch[];
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

const ArticleSchema = new Schema<IArticle>({
  heading: { type: String, required: true },
  content: { type: String, default: '' },
});

const BranchSchema = new Schema<IBranch>({
  cityName: { type: String, required: true },
  address: { type: String, default: '' },
  image: { type: String, default: '' },
  articles: { type: [ArticleSchema], default: [] },
});

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    phoneNumber: { type: String, default: '+91 9940882200' },
    phoneLink: { type: String, default: 'tel:+919940882200' },
    email: { type: String, default: 'info@tripzo.com' },
    logoUrl: { type: String, default: '/Home.png' },
    faviconUrl: { type: String, default: '/favicon.ico' },
    branches: {
      type: [BranchSchema],
      default: [
        {
          cityName: 'Madurai',
          address: 'Jayam Towers,\nHIG 38, Above DBS Bank,\n80 Feet Road, Annanagar,\nMadurai – 20',
          image: '/madurai_branch.jpg',
          articles: [
            {
              heading: 'How To Choose the Best Travel Agency in Madurai?',
              content: 'With hundreds of temples and a historical background that dates back to the Sangam age, Madurai is undoubtedly the cultural capital of Tamil Nadu. Over the last few decades, this temple city has become increasingly urbanized. To get their minds off the hectic schedule, local Maduraiites are looking for affordable tour packages in and around the country.',
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
              content: 'Tripzo has a robust background in the hospitality sector and hence offers the value addition of experience and expertise to the business. This expertise is another reason why we focus exclusively on creating delighted customers.\n\nWith branches across South India, Tripzo has a robust, well-established network of agents and assures you seamless and impeccable service wherever you go.',
            },
          ],
        },
      ] as any,
    },
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
