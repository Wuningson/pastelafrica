import { Document, model, Schema } from 'mongoose';
import randomstring from 'randomstring';

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
      default: randomstring.generate(6),
    },
  },
  { timestamps: true }
);

export default model<UrlDocument>('url', schema);
