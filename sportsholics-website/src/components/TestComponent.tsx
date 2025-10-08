import { useEffect, useState } from 'react';
import axios from 'axios';
import './TestComponent.css';

// TypeScript interface for Rich Text blocks from Strapi
interface RichTextBlock {
  type: string;
  children: Array<{ type: string; text: string }>;
}

// TypeScript interface for Article data
interface Article {
  id: number;
  documentId: string;
  title: string;
  content: RichTextBlock[] | string; // Can be rich text blocks or plain string
  author: string;
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

const TestComponent = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Strapi API URL
  const STRAPI_URL = 'http://localhost:1337/api';

  // Helper function to render rich text content
  const renderContent = (content: RichTextBlock[] | string) => {
    // If it's already a string, return it
    if (typeof content === 'string') {
      return content;
    }
    
    // If it's rich text blocks, extract text from all blocks
    if (Array.isArray(content)) {
      return content
        .map(block => 
          block.children
            .map(child => child.text)
            .join('')
        )
        .join('\n');
    }
    
    return 'No content';
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch articles from Strapi
      const response = await axios.get<StrapiResponse>(`${STRAPI_URL}/articles`);
      
      console.log('Fetched articles:', response.data);
      setArticles(response.data.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          setError('Articles endpoint not found. Make sure you created the Article content type in Strapi.');
        } else if (err.response?.status === 403) {
          setError('Access forbidden. Make sure to enable public access for Article in Strapi Settings → Roles → Public.');
        } else if (err.code === 'ERR_NETWORK') {
          setError('Cannot connect to Strapi. Make sure Strapi is running at http://localhost:1337');
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

  if (loading) {
    return (
      <div className="test-component">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading articles from Strapi...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="test-component">
        <div className="error">
          <h2>⚠️ Error</h2>
          <p>{error}</p>
          <button onClick={fetchArticles} className="retry-btn">
            Try Again
          </button>
          <div className="help-text">
            <h3>Quick Checklist:</h3>
            <ul>
              <li>✓ Is Strapi running? <code>cd sportsholics-backend && npm run develop</code></li>
              <li>✓ Did you create the Article content type?</li>
              <li>✓ Did you enable public permissions for Article?</li>
              <li>✓ Did you publish at least one article?</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="test-component">
        <div className="empty">
          <h2>📝 No Articles Found</h2>
          <p>Go to Strapi admin panel and create some articles!</p>
          <a 
            href="http://localhost:1337/admin" 
            target="_blank" 
            rel="noopener noreferrer"
            className="admin-link"
          >
            Open Strapi Admin
          </a>
          <button onClick={fetchArticles} className="retry-btn">
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="test-component">
      <div className="header">
        <h1>🚀 Articles from Strapi</h1>
        <button onClick={fetchArticles} className="refresh-btn">
          🔄 Refresh
        </button>
      </div>
      
      <div className="articles-grid">
        {articles.map((article) => (
          <div key={article.id} className="article-card">
            <div className="article-header">
              <h2>{article.title}</h2>
              <span className="article-id">ID: {article.id}</span>
            </div>
            <div className="article-content">
              {renderContent(article.content)}
            </div>
            <div className="article-footer">
              <span className="author">👤 {article.author}</span>
              <span className="date">
                📅 {new Date(article.publishedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="stats">
        <p>Total Articles: <strong>{articles.length}</strong></p>
        <p>API Endpoint: <code>{STRAPI_URL}/articles</code></p>
      </div>
    </div>
  );
};

export default TestComponent;

