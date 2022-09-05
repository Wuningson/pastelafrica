import { Document, model, Schema } from 'mongoose';

export interface UrlDocument extends Url, Document {
  createdAt: string | Date;
  updatedAt: string | Date;
}

const schema = new Schema<Url>(
  {
    longUrl: {
      type: String,
      required: [true, 'long url field is required'],
    },
    shortUrl: {
      type: String,
      required: [true, 'short url field is required'],
    },
  },
  { timestamps: true }
);

export default model<UrlDocument>('url', schema);
