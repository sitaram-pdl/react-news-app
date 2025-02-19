import { ApiArticle, Doc, GuardianArticle } from '@/api';
import { Article } from '@/type/article';

export const normalizeArticlesToNewsCards = (
  articles: ApiArticle[]
): Article[] => {
  return articles.map((article) => ({
    title: article.title,
    author: article.author ?? 'Unknown',
    date: article.publishedAt,
    description: article.description ?? '',
    imageUrl: article.urlToImage ?? 'https://placehold.co/600x400',
    source: article.source?.name ?? 'Unknown Source',
    sourceUrl: article.url,
    web_url: article.url,
  }));
};

export const normalizeGuardianArticlesToNewsCards = (
  guardianArticles: GuardianArticle[]
): Article[] => {
  return guardianArticles.map((article) => ({
    title: article.webTitle,
    author: article.fields?.byline ?? 'Unknown',
    category: article.sectionName ?? 'Uncategorized',
    date: article.webPublicationDate,
    description: article.fields?.trailText ?? '',
    imageUrl: article.fields?.thumbnail ?? 'https://placehold.co/600x400',
    source: 'The Guardian',
    sourceUrl: article.webUrl,
    web_url: article.webUrl,
  }));
};

export const normalizeDocToArticle = (docs: Doc[]): Article[] => {
  return docs.map((doc) => ({
    title: doc.headline.main ?? '',
    author: doc.byline?.original ?? 'Unknown',
    category: doc.section_name ?? 'Uncategorized',
    date: doc.pub_date,
    description: doc.abstract ?? '',
    imageUrl:
      doc.multimedia.length > 0
        ? 'https://static01.nyt.com/' + doc.multimedia[0].url
        : 'https://placehold.co/600x400',
    source: doc.source ?? '',
    sourceUrl: doc.web_url,
    web_url: doc.web_url,
  }));
};
