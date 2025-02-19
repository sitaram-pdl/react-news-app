import { fetchGuardianApiData, fetchNewsApiData, fetchNYTApiData } from '@/api';
import Articles from '@/components/reusable/news/article';
import { Label } from '@/components/ui/label';
import { useArticle } from '@/context/article-provider';
import useDebounce from '@/hooks/useDebounce';
import {
  extractUniqueAuthors,
  extractUniqueCategories,
  extractUniqueSources,
  normalizeArticlesToNewsCards,
  normalizeDocToArticle,
  normalizeGuardianArticlesToNewsCards,
} from '@/lib/normalizeHelper';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import DateRangePicker from '../../components/reusable/date-range-picker';
import MultiSelect from '../../components/reusable/multiselect';
import { Typography } from '../../components/reusable/typography';
import { Input } from '../../components/ui/input';

const Home = () => {
  const { ref, inView } = useInView();

  const {
    selectedCategory,
    setSelectedCategory,
    selectedAuthor,
    setSelectedAuthor,
    selectedSources,
    setSelectedSources,
    keyword,
    setKeyword,
    date,
    setDate,
    pageSize,
    currentPage,
    setCurrentPage,
  } = useArticle();

  const debouncedKeyword = useDebounce(keyword, 500);
  const debouncedCategory = useDebounce(selectedCategory, 500);
  const debouncedAuthor = useDebounce(selectedAuthor, 500);
  const debouncedSources = useDebounce(selectedSources, 500);
  const debouncedFrom = useDebounce(date?.from, 500);
  const debouncedTo = useDebounce(date?.to, 500);

  const params = {
    categories: debouncedCategory,
    sources: debouncedSources,
    authors: debouncedAuthor,
    page: currentPage,
    pageSize,
    keyword: debouncedKeyword,
    date: { from: debouncedFrom, to: debouncedTo },
  };

  const newsApiData = useInfiniteQuery(
    [
      'getNewsApiArticles',
      debouncedKeyword,
      debouncedCategory,
      debouncedAuthor,
      debouncedSources,
      debouncedFrom,
      debouncedTo,
    ],
    ({ pageParam = 1 }) => fetchNewsApiData({ ...params, page: pageParam }),
    {
      getNextPageParam: (lastPage, pages) => pages.length + 1,
    }
  );

  const newApiNormalizeData = useMemo(() => {
    return (
      newsApiData.data?.pages.flatMap((page) =>
        normalizeArticlesToNewsCards(page?.data.articles || [])
      ) || []
    );
  }, [newsApiData.data?.pages]);

  const guardianApiData = useInfiniteQuery(
    [
      'fetchGuardianApiData',
      debouncedKeyword,
      debouncedCategory,
      debouncedAuthor,
      debouncedSources,
      debouncedFrom,
      debouncedTo,
    ],
    ({ pageParam = 1 }) => fetchGuardianApiData({ ...params, page: pageParam }),
    {
      getNextPageParam: (lastPage, pages) => pages.length + 1,
    }
  );

  const guardianApiNormalizeData = useMemo(() => {
    return (
      guardianApiData.data?.pages.flatMap((page) =>
        normalizeGuardianArticlesToNewsCards(page?.data.response.results || [])
      ) || []
    );
  }, [guardianApiData.data?.pages]);

  const nytApiData = useInfiniteQuery(
    [
      'fetchNYTApiData',
      debouncedKeyword,
      debouncedCategory,
      debouncedAuthor,
      debouncedSources,
      debouncedFrom,
      debouncedTo,
    ],
    ({ pageParam = 1 }) => fetchNYTApiData({ ...params, page: pageParam }),
    {
      getNextPageParam: (lastPage, pages) => pages.length + 1,
    }
  );

  const nYTApiNormalizeData = useMemo(() => {
    return (
      nytApiData.data?.pages.flatMap((page) =>
        normalizeDocToArticle(page?.data.response.docs || [])
      ) || []
    );
  }, [nytApiData.data?.pages]);

  const news = useMemo(
    () => [
      ...nYTApiNormalizeData,
      ...guardianApiNormalizeData,
      ...newApiNormalizeData,
    ],
    [nYTApiNormalizeData, guardianApiNormalizeData, newApiNormalizeData]
  );

  const uniqueCategories = useMemo(() => extractUniqueCategories(news), [news]);
  const uniqueAuthors = useMemo(() => extractUniqueAuthors(news), [news]);
  const uniqueSources = useMemo(() => extractUniqueSources(news), [news]);

  useEffect(() => {
    if (inView) {
      newsApiData.fetchNextPage();
      guardianApiData.fetchNextPage();
      nytApiData.fetchNextPage();
    }
  }, [inView]);

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <Typography variant="h1" className="text-gray-600 font-bold mt-5 mb-20">
        React News App
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {/* Keyword Search */}
        <div className="space-y-2">
          <Label htmlFor="keyword">Keyword</Label>
          <Input
            id="keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search by keyword"
            className="w-full"
          />
        </div>

        {/* Date Range Picker */}
        <DateRangePicker date={date} setDate={setDate} />

        {/* Category Filter */}
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <MultiSelect
            id="category"
            options={uniqueCategories}
            selected={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e);
              setCurrentPage(1);
            }}
            placeholder="Select categories..."
            emptyMessage="No categories available."
            className="w-full"
          />
        </div>

        {/* Author Filter */}
        <div className="space-y-2">
          <Label htmlFor="author">Author</Label>
          <MultiSelect
            id="author"
            options={uniqueAuthors}
            selected={selectedAuthor}
            onChange={(e) => {
              setSelectedAuthor(e);
              setCurrentPage(1);
            }}
            placeholder="Select authors..."
            emptyMessage="No authors available."
            className="w-full"
          />
        </div>

        {/* Sources Filter */}
        <div className="space-y-2">
          <Label htmlFor="sources">Sources</Label>
          <MultiSelect
            id="sources"
            options={uniqueSources}
            selected={selectedSources}
            onChange={(e) => {
              setSelectedSources(e);
              setCurrentPage(1);
            }}
            placeholder="Select sources..."
            emptyMessage="No sources available."
            className="w-full"
          />
        </div>
      </div>

      <Articles news={news} />

      <div ref={ref} className="mt-4">
        {(newsApiData.isFetchingNextPage ||
          guardianApiData.isFetchingNextPage ||
          nytApiData.isFetchingNextPage) && (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
