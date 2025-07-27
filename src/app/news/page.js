"use client"

import Link from 'next/link';
import Image from 'next/image';
import SectionHeader from '@/components/SectionHeader';
import Card from '@/components/Card';
import MailtoNotifyForm from '@/components/SignUp';
import { useState, useEffect } from 'react';

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to format date
  const formatArticleDate = (dateString) => {
    try {
      const date = new Date(dateString);
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      return date.toLocaleDateString('en-GB', options);
    } catch (error) {
      return dateString; // Fallback to original string if parsing fails
    }
  };

  // Helper function to extract plain text from Contentful rich text
  const extractPlainText = (richTextContent) => {
    if (!richTextContent || !richTextContent.content) return '';
    
    let text = '';
    const extractTextFromNode = (node) => {
      if (node.nodeType === 'text') {
        text += node.value;
      } else if (node.content) {
        node.content.forEach(extractTextFromNode);
      }
    };
    
    richTextContent.content.forEach(extractTextFromNode);
    return text;
  };

  // Transform API article to match component expectations
  const transformArticle = (apiArticle) => {
    const imageUrl = apiArticle.fields.featuredImage?.fields?.file?.url 
      ? `https:${apiArticle.fields.featuredImage.fields.file.url}` 
      : null;

    return {
      id: apiArticle.sys.id,
      title: apiArticle.fields.title,
      slug: apiArticle.fields.slug,
      description: apiArticle.fields.excerpt || extractPlainText(apiArticle.fields.content).substring(0, 150) + '...',
      fullContent: apiArticle.fields.content,
      imageUrl: imageUrl,
      date: formatArticleDate(apiArticle.sys.createdAt),
      rawDate: apiArticle.sys.createdAt,
      author: apiArticle.fields.author,
      tags: apiArticle.fields.tags || []
    };
  };

  // Fetch articles from API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://arteng-be.onrender.com/api/v1/articles');
        
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        
        const data = await response.json();
        
        if (data.success && data.data) {
          const transformedArticles = data.data.map(transformArticle);
          console.log('Articles page articles:', transformedArticles); // Debug log
          setArticles(transformedArticles);
        } else {
          setArticles([]);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError('Failed to load articles. Please try again later.');
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // For articles page: 
  // Show the 1 latest article as "featured" and ALL articles in "all articles"
  const featuredArticles = articles.slice(0, 1); // Only the latest article
  const allArticles = articles; // All articles including the featured one

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-arteng-dark text-white py-12 pt-24">
          <div className="container mx-auto px-4 md:px-8">
            <h1 className="text-5xl font-bold mb-4">News</h1>
            <p className="text-xl">Stay updated with the latest from ArtEng and the industry.</p>
          </div>
        </section>
        
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-arteng-dark mx-auto mb-4"></div>
            <p className="text-gray-600">Loading articles...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-arteng-dark text-white py-12 pt-24">
          <div className="container mx-auto px-4 md:px-8">
            <h1 className="text-5xl font-bold mb-4">News</h1>
            <p className="text-xl">Stay updated with the latest from ArtEng and the industry.</p>
          </div>
        </section>
        
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-arteng-dark text-white px-4 py-2 rounded hover:bg-opacity-90 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-arteng-dark text-white py-12 pt-24">
        <div className="container mx-auto px-4 md:px-8">
          <h1 className="text-5xl font-bold mb-4">News</h1>
          <p className="text-xl">Stay updated with the latest from ArtEng and the industry.</p>
        </div>
      </section>

      <div className="relative">
        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <section className="py-16 px-4 md:px-8">
            <div className="container mx-auto">
              <div>
                <h2 className="text-4xl sm:text-4xl font-bold text-arteng-dark text-center sm:text-left">Featured News</h2>
                <p className="text-gray-600 text-center sm:text-left text-lg sm:text-lg">Latest Articles</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredArticles.map((article) => (
                  <Card
                    key={article.id}
                    imageUrl={article.imageUrl}
                    title={article.title}
                    description={article.description}
                    dateTime={article.date}
                    link={`/news/${encodeURIComponent(article.id)}`}
                    linkText="Read More"
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Articles Section */}
        <section className={`py-16 px-4 md:px-8 ${featuredArticles.length > 0 ? 'bg-gray-50' : ''}`}>
          <div className="container mx-auto">
            <div>
              <h2 className="text-4xl sm:text-4xl font-bold text-arteng-dark text-center sm:text-left">All Articles</h2>
              <p className="text-gray-600 text-center sm:text-left text-lg sm:text-lg">Stay Informed</p>
            </div>
            
            {articles.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg mb-4">No articles available at the moment.</p>
                <p className="text-gray-500">Check back later for the latest news and updates!</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allArticles.map((article) => (
                    <Card
                      key={article.id}
                      imageUrl={article.imageUrl}
                      title={article.title}
                      description={article.description}
                      dateTime={article.date}
                      link={`/news/${encodeURIComponent(article.id)}`}
                      linkText="Read More"
                    />
                  ))}
                </div>

                {allArticles.length > 6 && (
                  <div className="mt-8 flex justify-center">
                    <Link href="/news" className="inline-block bg-arteng-dark text-white px-4 py-2 rounded text-sm hover:bg-opacity-90 transition-colors w-32 text-center">
                      Load More
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}