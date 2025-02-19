/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ArticleContextProps } from '@/type/article';
import React, { createContext, ReactNode, useContext, useState } from 'react';
import { DateRange } from 'react-day-picker';

const PAGE_SIZE = 50;

const ArticleContext = createContext<ArticleContextProps | undefined>(
  undefined
);

export const ArticleProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [authors, setAuthors] = useState<string[]>([]);
  const [sources, setSources] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<string[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [keyword, setKeyword] = useState<string>('');
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <ArticleContext.Provider
      value={{
        categories,
        authors,
        sources,
        selectedCategory,
        selectedAuthor,
        selectedSources,
        keyword,
        date,
        currentPage,
        pageSize,
        setCategories,
        setAuthors,
        setSources,
        setSelectedCategory,
        setSelectedAuthor,
        setSelectedSources,
        setKeyword,
        setDate,
        setCurrentPage,
        setPageSize,
        goToNextPage,
      }}
    >
      {children}
    </ArticleContext.Provider>
  );
};

export const useArticle = (): ArticleContextProps => {
  const context = useContext(ArticleContext);
  if (!context) {
    throw new Error('useArticle must be used within an ArticleProvider');
  }
  return context;
};
