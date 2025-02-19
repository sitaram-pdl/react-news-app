import { DateRange } from 'react-day-picker';

export type Article = Partial<{
  title: string;
  author: string;
  category: string;
  date: string;
  description: string;
  imageUrl: string;
  source: string;
  sourceUrl: string;
  web_url: string;
}>;

export interface ArticleContextProps {
  categories: string[];
  authors: string[];
  sources: string[];
  selectedCategory: string[];
  selectedAuthor: string[];
  selectedSources: string[];
  keyword: string;
  date: DateRange | undefined;
  currentPage: number;
  pageSize: number;
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
  setAuthors: React.Dispatch<React.SetStateAction<string[]>>;
  setSources: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedAuthor: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedSources: React.Dispatch<React.SetStateAction<string[]>>;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  goToNextPage: () => void;
}
