import { fetchNewsApiData } from '@/api';
import Articles from '@/components/reusable/news/article';
import { Label } from '@/components/ui/label';
import { useArticle } from '@/context/article-provider';
import { normalizeArticlesToNewsCards } from '@/lib/normalizeHelper';
import { useQuery } from '@tanstack/react-query';
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
    categories,
    authors,
    pageSize,
    currentPage,
    sources,
  } = useArticle();

  const params = {
    categories,
    sources,
    authors,
    page: currentPage,
    pageSize,
    keyword,
  };

  const newsApiData = useQuery(['getNewsApiArticles', params], () =>
    fetchNewsApiData(params)
  );

  const newApiNormalizeData = normalizeArticlesToNewsCards(
    newsApiData?.data?.data.articles || []
  );

  // useQuery(['fetchGuardianApiData', params], () =>
  //   fetchGuardianApiData(params)
  // );
  // useQuery(['fetchGuardianApiData', params], () => fetchNYTApiData(params));
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
            options={categories}
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
            options={authors}
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
            options={sources}
            selected={selectedSources}
            onChange={setSelectedSources}
            placeholder="Select sources..."
            emptyMessage="No sources available."
            className="w-full"
          />
        </div>
      </div>

      <Articles news={newApiNormalizeData} />
    </div>
  );
};

export default Home;
