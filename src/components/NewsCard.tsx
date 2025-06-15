import React from 'react';
import { ExternalLink, Clock, User } from 'lucide-react';
import { Article } from '../types';

interface NewsCardProps {
  article: Article;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    
    if (diffHours < 1) {
      return 'Just now';
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const handleClick = () => {
    window.open(article.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">
      <div onClick={handleClick} className="block">
        {article.urlToImage && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              {article.source.name}
            </span>
            <div className="flex items-center text-gray-500 text-sm">
              <Clock className="h-4 w-4 mr-1" />
              {formatDate(article.publishedAt)}
            </div>
          </div>
          
          <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
            {article.title}
          </h2>
          
          {article.description && (
            <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
              {article.description}
            </p>
          )}
          
          <div className="flex items-center justify-between">
            {article.author && (
              <div className="flex items-center text-gray-500 text-sm">
                <User className="h-4 w-4 mr-1" />
                <span className="truncate">{article.author}</span>
              </div>
            )}
            
            <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors duration-200">
              <span className="mr-1">Read more</span>
              <ExternalLink className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;