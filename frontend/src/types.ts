export interface NewsItem {
  _id: string;
  epigrafe?: string;
  titular?: string;
  bajada?: string;
  lead?: string;
  cuerpo?: string;
  type: 'text' | 'text_images' | 'text_video' | 'link';
  images?: string[];
  video?: string;
  createdAt: string;
  link?: string;
  linkPreview?: {
    title?: string;
    image?: string;
    description?: string;
  };
}
