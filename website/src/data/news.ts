export interface NewsArticle {
  id: number;
  title: string;
  titleHi: string;
  excerpt: string;
  excerptHi?: string;
  content: string;
  contentHi?: string;
  date: string;
  author: string;
  category: "announcement" | "press" | "notice" | "achievement" | "general";
  image: string;
  slug: string;
  featured: boolean;
}

// No news or announcements have been supplied or verified by the Mahasabha
// office yet. The news feature (listing page, detail route, cards) stays in
// place and will publish real records as soon as owner-provided data is added.
export const newsArticles: NewsArticle[] = [];
