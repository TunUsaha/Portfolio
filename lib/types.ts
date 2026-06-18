export type Page = 'home' | 'about' | 'experience' | 'projects';
export type Theme = 'auto' | 'light' | 'dark';

export interface Repo {
  name: string;
  description: string;
  language: string;
  stars: number;
  url: string;
  updated: string;
}
