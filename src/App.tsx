import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './hooks/useAuth';
import Header from './components/Header';
import CategoryFilter from './components/CategoryFilter';
import NewsFeed from './components/NewsFeed';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import { newsAPI } from './services/newsAPI';
import { Article, NewsFilters } from './types';

const NewsApp: React.FC = () => {
  const { user } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<NewsFilters>({
    category: 'general',
    query: '',
    sortBy: 'publishedAt',
    country: 'us',
  });

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let response;
      if (filters.query) {
        response = await newsAPI.searchNews(filters.query, filters.sortBy);
      } else {
        response = await newsAPI.getTopHeadlines({
          category: filters.category,
          country: filters.country,
        });
      }
      
      setArticles(response.articles.filter(article => 
        article.title && 
        article.description &&
        article.title !== '[Removed]' &&
        article.description !== '[Removed]'
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch news');
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [filters]);

  const handleCategoryChange = (category: string) => {
    setFilters(prev => ({ ...prev, category, query: '' }));
  };

  const handleSearch = (query: string) => {
    setFilters(prev => ({ ...prev, query, category: 'general' }));
  };

  if (!user) {
    return <AuthenticationFlow />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={handleSearch} searchQuery={filters.query} />
      <CategoryFilter
        selectedCategory={filters.category}
        onCategoryChange={handleCategoryChange}
      />
      <NewsFeed articles={articles} loading={loading} error={error} />
    </div>
  );
};

const AuthenticationFlow: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return isLogin ? (
    <LoginForm onToggleForm={() => setIsLogin(false)} />
  ) : (
    <RegisterForm onToggleForm={() => setIsLogin(true)} />
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <NewsApp />
    </AuthProvider>
  );
};

export default App;