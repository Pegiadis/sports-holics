import { useEffect, useState } from 'react';
import axios from 'axios';
import './HomePage.css';

// TypeScript interfaces
interface RichTextBlock {
  type: string;
  children: Array<{ type: string; text: string }>;
}

interface ImageFormat {
  url: string;
  width: number;
  height: number;
}

interface ArticleImage {
  url: string;
  formats?: {
    thumbnail?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
  };
}

interface Article {
  id: number;
  documentId: string;
  title: string;
  excerpt: string;
  content: RichTextBlock[] | string;
  category: string;
  author: string;
  featured: boolean;
  image?: ArticleImage | ArticleImage[]; // Can be single object or array
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface StrapiResponse {
  data: Article[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

const HomePage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const STRAPI_URL = 'http://localhost:1337';
  const API_URL = `${STRAPI_URL}/api`;

  useEffect(() => {
    fetchArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get<StrapiResponse>(
        `${API_URL}/articles?populate=*&sort[0]=publishedAt:desc`
      );
      
      console.log('✅ Fetched articles:', response.data.data);
      console.log('📊 Total articles:', response.data.data.length);
      setArticles(response.data.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          setError('Articles not found. Please check Strapi setup.');
        } else if (err.response?.status === 403) {
          setError('Access forbidden. Enable public permissions in Strapi.');
        } else if (err.code === 'ERR_NETWORK') {
          setError('Cannot connect to Strapi at http://localhost:1337');
        } else {
          setError(`Error: ${err.message}`);
        }
      } else {
        setError('An unexpected error occurred');
      }
      console.error('Error fetching articles:', err);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (image?: ArticleImage | ArticleImage[]) => {
    // Handle case where image is an array (Strapi v5 returns arrays for media)
    let imageData: ArticleImage | undefined;
    
    if (Array.isArray(image)) {
      imageData = image[0]; // Get first image from array
    } else {
      imageData = image;
    }
    
    // Return placeholder if no image or no url
    if (!imageData || !imageData.url) {
      return 'https://placehold.co/800x450/1a1a1a/ffffff?text=No+Image';
    }
    
    // Check if URL is absolute (starts with http) or relative
    const baseUrl = imageData.url.startsWith('http') ? imageData.url : `${STRAPI_URL}${imageData.url}`;
    return baseUrl;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  };

  // Helper to safely display field values
  const safeDisplay = (value: string | null | undefined, fallback: string = 'N/A') => {
    return value || fallback;
  };

  if (loading) {
    return (
      <div className="home-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading sports news...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-page">
        <div className="error-container">
          <h2>⚠️ Error Loading Articles</h2>
          <p>{error}</p>
          <button onClick={fetchArticles} className="retry-btn">
            Try Again
          </button>
          <div className="setup-help">
            <h3>Setup Required:</h3>
            <ol>
              <li>Make sure Strapi is running: <code>cd sportsholics-backend && npm run develop</code></li>
              <li>Check <code>STRAPI_INTEGRATION_GUIDE.md</code> for setup instructions</li>
              <li>Enable public permissions for Articles in Strapi</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="home-page">
        <div className="empty-container">
          <h2>📰 No Articles Yet</h2>
          <p>Create articles in Strapi admin panel to get started!</p>
          <a 
            href="http://localhost:1337/admin" 
            target="_blank" 
            rel="noopener noreferrer"
            className="admin-btn"
          >
            Open Strapi Admin
          </a>
        </div>
      </div>
    );
  }

  const featuredArticle = articles.find(a => a.featured) || articles[0];
  const sideArticles = articles.filter(a => a.id !== featuredArticle.id).slice(0, 3);
  const gridArticles = articles.filter(a => a.id !== featuredArticle.id).slice(3, 9);

  return (
    <div className="home-page">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon">⚽</div>
            <h1>Sports Holics</h1>
          </div>
          <nav className="nav">
            <a href="#news">News</a>
            <a href="#leagues">Leagues</a>
            <a href="#teams">Teams</a>
            <a href="#live">Live Scores</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-wrapper">
          
          {/* Hero Section */}
          <section className="hero-section">
            <div className="hero-main">
              <article className="hero-article">
                <div className="hero-image">
                  <img src={getImageUrl(featuredArticle.image)} alt={featuredArticle.title} />
                  <div className="hero-overlay"></div>
                </div>
                <div className="hero-content">
                  <span className="category-badge">{safeDisplay(featuredArticle.category, 'NEWS')}</span>
                  <h2 className="hero-title">{featuredArticle.title}</h2>
                  <p className="hero-excerpt">{safeDisplay(featuredArticle.excerpt, 'Read more about this article...')}</p>
                  <div className="article-meta">
                    <span className="date">{formatDate(featuredArticle.publishedAt)}</span>
                  </div>
                </div>
              </article>
            </div>

            <div className="hero-sidebar">
              {sideArticles.map((article) => (
                <article key={article.id} className="sidebar-article">
                  <div className="sidebar-image">
                    <img src={getImageUrl(article.image)} alt={article.title} />
                  </div>
                  <div className="sidebar-content">
                    <span className="category-badge small">{safeDisplay(article.category, 'NEWS')}</span>
                    <h3 className="sidebar-title">{article.title}</h3>
                    <span className="date small">{formatDate(article.publishedAt)}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Articles Grid */}
          <section className="articles-grid">
            {gridArticles.map((article) => (
              <article key={article.id} className="grid-article">
                <div className="grid-image">
                  <img src={getImageUrl(article.image)} alt={article.title} />
                  <span className="category-badge overlay">{safeDisplay(article.category, 'NEWS')}</span>
                </div>
                <div className="grid-content">
                  <h3 className="grid-title">{article.title}</h3>
                  <p className="grid-excerpt">{safeDisplay(article.excerpt, 'Click to read more...')}</p>
                  <span className="date small">{formatDate(article.publishedAt)}</span>
                </div>
              </article>
            ))}
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Sports Holics - Your Source for Sports News</p>
      </footer>
    </div>
  );
};

export default HomePage;

