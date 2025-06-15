import React from 'react';
import { Article } from '../types';
import NewsCard from './NewsCard';
import LoadingSkeleton from './LoadingSkeleton';

interface NewsFeedProps {
  articles: Article[];
  loading: boolean;
  error: string | null;
}

const NewsFeed: React.FC<NewsFeedProps> = ({ articles, loading, error }) => {
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, index) => (
            <LoadingSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
            <h3 className="text-lg font-medium text-red-800 mb-2">Unable to load news</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <p className="text-sm text-red-500">
              Please check your internet connection and make sure you have a valid NewsAPI key configured.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-md mx-auto">
            <h3 className="text-lg font-medium text-gray-800 mb-2">No articles found</h3>
            <p className="text-gray-600">Try adjusting your search or category filters.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <NewsCard key={`${article.url}-${index}`} article={article} />
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;