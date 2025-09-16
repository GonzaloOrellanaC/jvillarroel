import mongoose, { Document, Schema } from 'mongoose';


export interface INews extends Document {
  epigrafe?: string;
  titular?: string;
  bajada?: string;
  lead?: string;
  cuerpo?: string;
  images: string[];
  video?: string;
  likes: number;
  createdAt: Date;
  type: 'text' | 'text_images' | 'text_video' | 'link';
  link?: string;
  linkPreview?: {
    title?: string;
    image?: string;
    description?: string;
  };
}


const NewsSchema = new Schema<INews>({
  epigrafe: { type: String },
  titular: {
    type: String,
    required: function(this: any) {
      // Solo requerir titular si no es tipo link
      return this.type !== 'link';
    }
  },
  bajada: { type: String },
  lead: { type: String },
  cuerpo: {
    type: String,
    required: function(this: any) {
      // Solo requerir cuerpo si no es tipo link
      return this.type !== 'link';
    }
  },
  images: { type: [String], default: [], maxlength: 4 },
  video: { type: String },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  type: { type: String, enum: ['text', 'text_images', 'text_video', 'link'], required: true },
  link: {
    type: String,
    required: function(this: any) {
      // Solo requerir link si es tipo link
      return this.type === 'link';
    }
  },
  linkPreview: {
    title: String,
    image: String,
    description: String
  }
});

export default mongoose.model<INews>('News', NewsSchema);
