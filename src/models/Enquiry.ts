import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEnquiry extends Document {
  name: string;
  city: string;
  email: string;
  phone: string;
  whatsapp: string;
  destination: string;
  travelDate: string;
  peopleCount: string;
  vacationType: string;
  createdAt: Date;
}

const EnquirySchema = new Schema<IEnquiry>(
  {
    name:        { type: String, required: true },
    city:        { type: String, default: '' },
    email:       { type: String, default: '' },
    phone:       { type: String, default: '' },
    whatsapp:    { type: String, default: '' },
    destination: { type: String, default: '' },
    travelDate:  { type: String, default: '' },
    peopleCount: { type: String, default: '' },
    vacationType:{ type: String, default: '' },
  },
  { timestamps: true }
);

export const Enquiry: Model<IEnquiry> =
  mongoose.models.Enquiry || mongoose.model<IEnquiry>('Enquiry', EnquirySchema);
