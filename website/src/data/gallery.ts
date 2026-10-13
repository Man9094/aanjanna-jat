export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: "events" | "heritage" | "cultural" | "sports" | "community" | "historical";
  title: string;
  date?: string;
  width: number;
  height: number;
}

export interface GalleryAlbum {
  id: number;
  title: string;
  titleHi: string;
  cover: string;
  count: number;
  category: string;
  date: string;
}

// No photographs have been supplied or verified by the Mahasabha office yet.
// The gallery feature (album filters, lightbox) stays in place and will show
// real photographs as soon as owner-provided images are added here.
export const galleryImages: GalleryImage[] = [];
export const galleryAlbums: GalleryAlbum[] = [];
