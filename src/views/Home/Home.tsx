import { fetchGuardianApiData, fetchNewsApiData, fetchNYTApiData } from '@/api';
import { DatePicker } from '@/components/reusable/date-picker';
import Articles from '@/components/reusable/news/article';
import { ScrollableSelect } from '@/components/reusable/Select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useArticle } from '@/context/article-provider';
import useDebounce from '@/hooks/useDebounce';
import {
  extractUniqueAuthors,
  extractUniqueCategories,
  normalizeArticlesToNewsCards,
  normalizeDocToArticle,
  normalizeGuardianArticlesToNewsCards,
} from '@/lib/normalizeHelper';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import MultiSelect from '../../components/reusable/multiselect';
import { Typography } from '../../components/reusable/typography';
import { Input } from '../../components/ui/input';

const newsOptions = [
  {
    items: [
      { value: 'ALL', label: 'ALL' },
      { value: 'News API', label: 'News API' },
      { value: 'The Guardian', label: 'The Guardian' },
      { value: 'New York Times', label: 'New York Times' },
    ],
  },
];

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
  const debouncedFrom = useDebounce(date, 500);

  const params = {
    categories: debouncedCategory,
    authors: debouncedAuthor,
    page: currentPage,
    pageSize,
    date: debouncedFrom,
    keyword: debouncedKeyword,
  };

  const newsApiData = useInfiniteQuery(
    ['getNewsApiArticles', debouncedKeyword, debouncedFrom],
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
    ['fetchGuardianApiData', debouncedKeyword, debouncedFrom],
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
    ['fetchNYTApiData', debouncedKeyword, debouncedFrom],
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

  const news = useMemo(() => {
    if (selectedSources.length === 0 || selectedSources.includes('ALL')) {
      return [
        ...guardianApiNormalizeData,
        ...nYTApiNormalizeData,
        ...newApiNormalizeData,
      ];
    }

    return [
      ...(selectedSources.includes('The Guardian')
        ? guardianApiNormalizeData
        : []),
      ...(selectedSources.includes('New York Times')
        ? nYTApiNormalizeData
        : []),
      ...(selectedSources.includes('News API') ? newApiNormalizeData : []),
    ];
  }, [
    guardianApiNormalizeData,
    newApiNormalizeData,
    nYTApiNormalizeData,
    selectedSources,
  ]);

  const uniqueCategories = useMemo(() => extractUniqueCategories(news), [news]);
  const uniqueAuthors = useMemo(() => extractUniqueAuthors(news), [news]);

  const filteredNews = useMemo(
    () =>
      news.filter((item) => {
        const authorMatch =
          debouncedAuthor.length > 0
            ? debouncedAuthor.includes(item.author || '')
            : true;

        const categoryMatch =
          debouncedCategory.length > 0
            ? debouncedCategory.includes(item.category || '')
            : true;

        return authorMatch && categoryMatch;
      }),
    [news, debouncedAuthor, debouncedCategory]
  );

  const loadMore = () => {
    newsApiData.fetchNextPage();
    guardianApiData.fetchNextPage();
    nytApiData.fetchNextPage();
  };

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
        {/* Date Picker */}
        <DatePicker date={date} setDate={setDate} />
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
          <ScrollableSelect
            options={newsOptions}
            placeholder="Select a news source"
            value={selectedSources[0]}
            onChange={(e) => {
              setSelectedSources([e]);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>
      <Articles news={filteredNews} />
      {newsApiData.isFetchingNextPage ||
      guardianApiData.isFetchingNextPage ||
      nytApiData.isFetchingNextPage ? (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
        </div>
      ) : (
        <Button onClick={loadMore}>Load More Pages</Button>
      )}
    </div>
  );
};

export default Home;
