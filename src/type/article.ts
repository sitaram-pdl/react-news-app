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
  selectedCategory: string[];
  selectedAuthor: string[];
  selectedSources: string[];
  keyword: string;
  date: Date | undefined;
  currentPage: number;
  pageSize: number;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedAuthor: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedSources: React.Dispatch<React.SetStateAction<string[]>>;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  goToNextPage: () => void;
}
