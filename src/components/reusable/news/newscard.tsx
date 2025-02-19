import { Article } from '@/type/article';
import { Calendar, Link, User } from 'lucide-react';
import React from 'react';

type ArticleNews = {
  article: Article;
};

const NewsCard: React.FC<ArticleNews> = ({ article }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 h-full border border-gray-100">
      {/* Image Container with Gradient Overlay */}

      <div className="relative h-56 w-full overflow-hidden group">
        <img
          src={article.imageUrl || ''}
          alt={article.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Category Badge */}
        {article.category && (
          <div className="absolute top-4 right-4">
            <span className="bg-blue-600/90 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-medium">
              {article.category}
            </span>
          </div>
        )}

        {/* Source Badge */}
        {article.source && article.sourceUrl && (
          <div className="absolute bottom-4 left-4">
            <a
              href={article.sourceUrl}
              className="flex items-center gap-2 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-white transition-colors"
            >
              <Link size={14} />
              {article.source}
            </a>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-6">
        {/* Title */}
        {article.title && (
          <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer">
            {article.title}
          </h2>
        )}

        {/* Meta Information */}
        <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
          {article.author && (
            <div className="flex items-center gap-2 hover:text-blue-600 transition-colors cursor-pointer">
              <User size={16} className="text-gray-400" />
              <span>{article.author}</span>
            </div>
          )}
          {article.date && (
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-gray-400" />
              <span>{article.date}</span>
            </div>
          )}
        </div>

        {/* Description */}
        {article.description && (
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-6">
            {article.description}
          </p>
        )}

        {/* Read More Button */}
        {article.sourceUrl && (
          <a
            href={article.sourceUrl}
            className="w-full block text-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2.5 rounded-lg transition-all duration-300 text-sm font-medium shadow-sm hover:shadow-md active:scale-98"
          >
            Read Full Article
          </a>
        )}
      </div>
    </div>
  );
};

export default NewsCard;
