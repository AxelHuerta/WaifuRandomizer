export interface WaifuApiResponse {
  images: Image[];
}

export interface Image {
  signature: string;
  extension: string;
  image_id: number;
  favorites: number;
  dominant_color: string;
  source: string;
  artist: Artist;
  uploaded_at: Date;
  liked_at: null;
  is_nsfw: boolean;
  width: number;
  height: number;
  byte_size: number;
  url: string;
  preview_url: string;
  tags: Tag[];
}

export interface Tag {
  tag_id: number;
  name: string;
  description: string;
  is_nsfw: boolean;
}

export interface Artist {
  artist_id: number;
  name: string;
  patreon: null;
  pixiv: string;
  twitter: string;
  deviant_art: null;
}
