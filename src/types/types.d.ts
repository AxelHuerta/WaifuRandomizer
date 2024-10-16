interface Tag {
  tag_id: number;
  name: string;
  description: string;
  is_nsfw: boolean;
}

interface Artist {
  artist_id: number;
  name: string;
  patreon: string | null;
  pixiv: string | null;
  twitter: string | null;
  deviant_art: string | null;
}

interface Image {
  signature: string;
  extension: string;
  image_id: number;
  favorites: number;
  dominant_color: string;
  source: string;
  artist: Artist | null;
  uploaded_at: string;
  liked_at: string | null;
  is_nsfw: boolean;
  width: number;
  height: number;
  byte_size: number;
  url: string;
  preview_url: string;
  tags: Tag[];
}

interface Waifu {
  images: Image[];
}
