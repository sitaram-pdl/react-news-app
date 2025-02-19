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
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import DateRangePicker from '../../components/reusable/date-range-picker';
import MultiSelect from '../../components/reusable/multiselect';
import { Typography } from '../../components/reusable/typography';
import { Input } from '../../components/ui/input';

const Home = () => {
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
  } = useArticle();

  // Apply debounce to prevent rapid updates
  const debouncedKeyword = useDebounce(keyword, 500);
  const debouncedCategory = useDebounce(selectedCategory, 500);
  const debouncedAuthor = useDebounce(selectedAuthor, 500);
  const debouncedSources = useDebounce(selectedSources, 500);

  // // Debouncing 'from' and 'to' dates separately
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

  const newsApiData = useQuery(['getNewsApiArticles', params], () =>
    fetchNewsApiData(params)
  );

  const newApiNormalizeData = useMemo(() => {
    return normalizeArticlesToNewsCards(newsApiData?.data?.data.articles || []);
  }, [newsApiData?.data?.data.articles]);

  const guardianApiData = useQuery(['fetchGuardianApiData', params], () =>
    fetchGuardianApiData(params)
  );

  const guardianApiNormalizeData = useMemo(() => {
    return normalizeGuardianArticlesToNewsCards(
      guardianApiData.data?.data.response.results || []
    );
  }, [guardianApiData.data?.data.response.results]);

  const nytApiData = useQuery(['fetchNYTApiData', params], () =>
    fetchNYTApiData(params)
  );

  const nYTApiNormalizeData = useMemo(() => {
    return normalizeDocToArticle(nytApiData.data?.data.response.docs || []);
  }, [nytApiData.data?.data.response.docs]);

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
            onChange={setSelectedCategory}
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
            onChange={setSelectedAuthor}
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
            onChange={setSelectedSources}
            placeholder="Select sources..."
            emptyMessage="No sources available."
            className="w-full"
          />
        </div>
      </div>

      <Articles news={news} />
    </div>
  );
};

export default Home;
