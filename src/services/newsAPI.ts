import { NewsResponse, NewsFilters } from '../types';

// Mock news data for demonstration
const mockArticles = [
  {
    source: { id: 'bbc-news', name: 'BBC News' },
    author: 'BBC News',
    title: 'Breaking: Major Technology Breakthrough Announced',
    description: 'Scientists have made a significant breakthrough in quantum computing technology that could revolutionize the industry.',
    url: 'https://example.com/article1',
    urlToImage: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800',
    publishedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    content: 'Scientists at leading research institutions have announced a major breakthrough in quantum computing...'
  },
  {
    source: { id: 'techcrunch', name: 'TechCrunch' },
    author: 'Sarah Johnson',
    title: 'AI Revolution: New Language Model Surpasses Human Performance',
    description: 'A new artificial intelligence model has achieved unprecedented results in language understanding and generation tasks.',
    url: 'https://example.com/article2',
    urlToImage: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    content: 'The latest advancement in artificial intelligence has researchers and industry experts...'
  },
  {
    source: { id: 'reuters', name: 'Reuters' },
    author: 'Michael Chen',
    title: 'Global Climate Summit Reaches Historic Agreement',
    description: 'World leaders have reached a groundbreaking agreement on climate action at the international summit.',
    url: 'https://example.com/article3',
    urlToImage: 'https://images.pexels.com/photos/9324336/pexels-photo-9324336.jpeg?auto=compress&cs=tinysrgb&w=800',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
    content: 'In a historic moment for global environmental policy, world leaders have unanimously agreed...'
  },
  {
    source: { id: 'cnn', name: 'CNN' },
    author: 'Emma Rodriguez',
    title: 'Space Exploration Milestone: New Planet Discovery',
    description: 'Astronomers have discovered a potentially habitable exoplanet in a nearby star system.',
    url: 'https://example.com/article4',
    urlToImage: 'https://images.pexels.com/photos/2156/sky-earth-space-working.jpg?auto=compress&cs=tinysrgb&w=800',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), // 6 hours ago
    content: 'Using advanced telescopic technology, astronomers have identified what appears to be...'
  },
  {
    source: { id: 'bloomberg', name: 'Bloomberg' },
    author: 'David Park',
    title: 'Market Update: Tech Stocks Surge on Innovation News',
    description: 'Technology stocks are experiencing significant gains following recent breakthrough announcements.',
    url: 'https://example.com/article5',
    urlToImage: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), // 8 hours ago
    content: 'Financial markets are responding positively to a series of technological breakthroughs...'
  },
  {
    source: { id: 'guardian', name: 'The Guardian' },
    author: 'Lisa Thompson',
    title: 'Healthcare Innovation: Gene Therapy Shows Promise',
    description: 'New gene therapy treatments are showing remarkable results in clinical trials for rare diseases.',
    url: 'https://example.com/article6',
    urlToImage: 'https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=800',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
    content: 'Medical researchers have reported significant progress in gene therapy treatments...'
  }
];

const categoryArticles = {
  business: [
    {
      source: { id: 'wsj', name: 'Wall Street Journal' },
      author: 'Robert Kim',
      title: 'Startup Funding Reaches Record High This Quarter',
      description: 'Venture capital investments in technology startups have reached unprecedented levels.',
      url: 'https://example.com/business1',
      urlToImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
      content: 'The venture capital landscape has seen remarkable growth this quarter...'
    },
    {
      source: { id: 'forbes', name: 'Forbes' },
      author: 'Jennifer Walsh',
      title: 'E-commerce Giants Report Strong Q4 Earnings',
      description: 'Major e-commerce platforms have exceeded analyst expectations with their quarterly results.',
      url: 'https://example.com/business2',
      urlToImage: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      content: 'E-commerce platforms continue to show strong performance despite market challenges...'
    }
  ],
  technology: [
    {
      source: { id: 'wired', name: 'Wired' },
      author: 'Alex Turner',
      title: 'Quantum Computing Breakthrough Could Transform Cryptography',
      description: 'Researchers have achieved a major milestone in quantum computing that could revolutionize data security.',
      url: 'https://example.com/tech1',
      urlToImage: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800',
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      content: 'The latest quantum computing research has implications for cybersecurity...'
    },
    {
      source: { id: 'ars-technica', name: 'Ars Technica' },
      author: 'Maria Santos',
      title: 'Next-Generation Processors Promise 50% Performance Boost',
      description: 'New chip architecture delivers significant improvements in processing power and energy efficiency.',
      url: 'https://example.com/tech2',
      urlToImage: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=800',
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
      content: 'The semiconductor industry continues to push the boundaries of performance...'
    }
  ],
  health: [
    {
      source: { id: 'nature', name: 'Nature' },
      author: 'Dr. Amanda Foster',
      title: 'Revolutionary Cancer Treatment Shows 90% Success Rate',
      description: 'New immunotherapy approach demonstrates remarkable effectiveness in clinical trials.',
      url: 'https://example.com/health1',
      urlToImage: 'https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=800',
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
      content: 'Clinical trials for the new immunotherapy treatment have shown unprecedented results...'
    }
  ],
  science: [
    {
      source: { id: 'scientific-american', name: 'Scientific American' },
      author: 'Dr. James Wilson',
      title: 'Mars Mission Discovers Evidence of Ancient Water Systems',
      description: 'Latest rover data reveals complex water networks that existed on Mars billions of years ago.',
      url: 'https://example.com/science1',
      urlToImage: 'https://images.pexels.com/photos/2156/sky-earth-space-working.jpg?auto=compress&cs=tinysrgb&w=800',
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
      content: 'The Mars rover has transmitted data that provides new insights into the planet\'s history...'
    }
  ],
  sports: [
    {
      source: { id: 'espn', name: 'ESPN' },
      author: 'Mike Johnson',
      title: 'Championship Finals Set Record Viewership Numbers',
      description: 'The latest championship game attracted the largest television audience in sports history.',
      url: 'https://example.com/sports1',
      urlToImage: 'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=800',
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(),
      content: 'Sports fans around the world tuned in to watch the historic championship match...'
    }
  ],
  entertainment: [
    {
      source: { id: 'variety', name: 'Variety' },
      author: 'Rachel Green',
      title: 'Streaming Platform Announces Major Content Expansion',
      description: 'Popular streaming service reveals plans for significant investment in original programming.',
      url: 'https://example.com/entertainment1',
      urlToImage: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800',
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 14).toISOString(),
      content: 'The streaming wars continue as platforms compete for viewer attention...'
    }
  ]
};

const API_KEY = 'YOUR_NEWS_API_KEY'; // Users can replace this with their actual API key
const BASE_URL = 'https://newsapi.org/v2';

class NewsAPIService {
  private useMockData = API_KEY === 'YOUR_NEWS_API_KEY';

  private async fetchWithErrorHandling(url: string): Promise<any> {
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.status === 'error') {
        throw new Error(data.message || 'API request failed');
      }
      
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  private async mockDelay(): Promise<void> {
    // Simulate network delay for realistic experience
    await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 700));
  }

  async getTopHeadlines(filters: Partial<NewsFilters> = {}): Promise<NewsResponse> {
    if (this.useMockData) {
      await this.mockDelay();
      
      let articles = [...mockArticles];
      
      // Filter by category if specified
      if (filters.category && filters.category !== 'general' && categoryArticles[filters.category as keyof typeof categoryArticles]) {
        articles = [...categoryArticles[filters.category as keyof typeof categoryArticles], ...articles.slice(0, 4)];
      }
      
      return {
        status: 'ok',
        totalResults: articles.length,
        articles: articles
      };
    }

    // Real API implementation
    const params = new URLSearchParams({
      apiKey: API_KEY,
      pageSize: '20',
    });

    if (filters.category && filters.category !== 'general') {
      params.append('category', filters.category);
    }
    
    if (filters.country) {
      params.append('country', filters.country);
    } else {
      params.append('country', 'us');
    }

    const url = `${BASE_URL}/top-headlines?${params.toString()}`;
    return this.fetchWithErrorHandling(url);
  }

  async searchNews(query: string, sortBy: string = 'publishedAt'): Promise<NewsResponse> {
    if (this.useMockData) {
      await this.mockDelay();
      
      // Simple mock search - filter articles by query
      const searchResults = [...mockArticles, ...Object.values(categoryArticles).flat()]
        .filter(article => 
          article.title.toLowerCase().includes(query.toLowerCase()) ||
          article.description.toLowerCase().includes(query.toLowerCase())
        );
      
      return {
        status: 'ok',
        totalResults: searchResults.length,
        articles: searchResults
      };
    }

    // Real API implementation
    const params = new URLSearchParams({
      apiKey: API_KEY,
      q: query,
      sortBy,
      pageSize: '20',
      language: 'en',
    });

    const url = `${BASE_URL}/everything?${params.toString()}`;
    return this.fetchWithErrorHandling(url);
  }

  async getNewsByCategory(category: string): Promise<NewsResponse> {
    return this.getTopHeadlines({ category });
  }
}

export const newsAPI = new NewsAPIService();