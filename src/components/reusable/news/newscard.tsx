import { Article } from '@/type/article';
import { Calendar, Link, User } from 'lucide-react';
import React from 'react';

type ArticleNews = {
  article: Article;
};

const NewsCard: React.FC<ArticleNews> = ({ article }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-blue-100 transition-all duration-300 h-full shadow-sm hover:shadow-xl">
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src={article.imageUrl || ''}
          alt={article.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

        {article.category && (
          <div className="absolute top-4 right-4">
            <span className="bg-blue-500/95 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-semibold tracking-wide shadow-lg">
              {article.category}
            </span>
          </div>
        )}

        {article.source && article.sourceUrl && (
          <div className="absolute bottom-4 left-4">
            <a
              href={article.sourceUrl}
              className="flex items-center gap-2 bg-white/95 backdrop-blur text-gray-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-50 transition-all duration-300 shadow-lg"
            >
              <Link size={14} className="text-blue-500" />
              {article.source}
            </a>
          </div>
        )}
      </div>

      <div className="p-8">
        {article.title && (
          <h2 className="text-2xl font-bold text-gray-800 mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {article.title}
          </h2>
        )}

        <div className="flex flex-wrap gap-6 mb-6 text-sm text-gray-600">
          {article.author && (
            <div className="flex items-center gap-2 hover:text-blue-500 transition-colors">
              <User size={16} className="text-blue-400" />
              <span className="font-medium">{article.author}</span>
            </div>
          )}
          {article.date && (
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-blue-400" />
              <span className="font-medium">{article.date}</span>
            </div>
          )}
        </div>

        {article.description && (
          <p className="text-gray-600 text-base leading-relaxed line-clamp-3 mb-8">
            {article.description}
          </p>
        )}

        {article.sourceUrl && (
          <a
            href={article.sourceUrl}
            className="w-full block text-center bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl transition-all duration-300 text-sm font-semibold tracking-wide shadow-md hover:shadow-lg active:scale-98"
          >
            Read Full Article
          </a>
        )}
      </div>
    </div>
  );
};

export default NewsCard;
