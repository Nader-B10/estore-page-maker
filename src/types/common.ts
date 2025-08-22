export interface LinkItem {
  id: string;
  text: string;
  url: string;
  type: 'internal' | 'external' | 'category' | 'page';
  isVisible: boolean;
  order: number;
}

export interface CustomPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  metaTitle?: string;
  metaDescription?: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}