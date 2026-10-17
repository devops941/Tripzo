import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IFaq {
  question: string;
  answer: string;
}

export interface ITripPackage {
  name: string;
  duration: string;
  price: string;
  image: string;
  description: string;
  highlights: string;
}

export interface IDestination extends Document {
  name: string;
  slug: string;
  tagline: string;
  heroImage: string;
  packages: ITripPackage[];
  faqs: IFaq[];
  isActive: boolean;
}

const FaqSchema = new Schema<IFaq>({
  question: { type: String, default: '' },
  answer: { type: String, default: '' },
});

const TripPackageSchema = new Schema<ITripPackage>({
  name: { type: String, required: true },
  duration: { type: String, default: '' },
  price: { type: String, default: '' },
  image: { type: String, default: '' },
  description: { type: String, default: '' },
  highlights: { type: String, default: '' },
});

const DestinationSchema = new Schema<IDestination>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    tagline: { type: String, default: '' },
    heroImage: { type: String, default: '' },
    packages: { type: [TripPackageSchema], default: [] },
    faqs: { type: [FaqSchema], default: [] },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Destination: Model<IDestination> =
  mongoose.models.Destination || mongoose.model<IDestination>('Destination', DestinationSchema);
