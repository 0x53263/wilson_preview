// Create this file as: src/app/news/[id]/page.js

"use client"

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function ArticlePage() {
  const params = useParams();
  const [article, setArticle] = useState(null);
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
      return dateString;
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

  // Helper function to render rich text content as JSX
  const renderRichText = (richTextContent) => {
    if (!richTextContent || !richTextContent.content) return '';
    
    const renderNode = (node, index) => {
      if (node.nodeType === 'text') {
        if (node.marks && node.marks.length > 0) {
          let text = node.value;
          node.marks.forEach(mark => {
            if (mark.type === 'italic') {
              text = <em key={index}>{text}</em>;
            } else if (mark.type === 'bold') {
              text = <strong key={index}>{text}</strong>;
            }
          });
          return text;
        }
        return node.value;
      } else if (node.nodeType === 'paragraph') {
        return (
          <p key={index} className="mb-6 text-lg leading-relaxed text-gray-700">
            {node.content.map((child, childIndex) => renderNode(child, childIndex))}
          </p>
        );
      } else if (node.content) {
        return node.content.map((child, childIndex) => renderNode(child, childIndex));
      }
      return null;
    };
    
    return richTextContent.content.map((node, index) => renderNode(node, index));
  };

  // Transform API article
  const transformArticle = (apiArticle) => {
    const imageUrl = apiArticle.fields.featuredImage?.fields?.file?.url 
      ? `https:${apiArticle.fields.featuredImage.fields.file.url}` 
      : null;

    return {
      id: apiArticle.sys.id,
      title: apiArticle.fields.title,
      slug: apiArticle.fields.slug,
      description: apiArticle.fields.excerpt || extractPlainText(apiArticle.fields.content).substring(0, 200) + '...',
      fullContent: apiArticle.fields.content,
      imageUrl: imageUrl,
      date: formatArticleDate(apiArticle.sys.createdAt),
      rawDate: apiArticle.sys.createdAt,
      author: apiArticle.fields.author,
      tags: apiArticle.fields.tags || []
    };
  };

  // Fetch single article by ID
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        // First get all articles, then find the one with matching ID
        const response = await fetch('https://arteng-be.onrender.com/api/v1/articles');
        
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        
        const data = await response.json();
        
        if (data.success && data.data) {
          const transformedArticles = data.data.map(transformArticle);
          const foundArticle = transformedArticles.find(article => 
            article.id === params.id || article.slug === params.id
          );
          
          if (foundArticle) {
            setArticle(foundArticle);
          } else {
            setError('Article not found');
          }
        } else {
          setError('Article not found');
        }
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Failed to load article. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchArticle();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-arteng-dark mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'This article could not be found.'}</p>
          <Link href="/news" className="bg-arteng-dark text-white px-6 py-2 rounded hover:bg-opacity-90 transition-colors">
            Back to News
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-arteng-dark text-white py-12 pt-24">
        <div className="container mx-auto px-4 md:px-8">
          <nav className="mb-4">
            <Link href="/news" className="text-gray-300 hover:text-white transition-colors">
              ← Back to News
            </Link>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{article.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{article.date}</span>
            </div>
            
            {article.author && (
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>By {article.author}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16 px-4 md:px-8">
        <div className="container mx-auto max-w-4xl">
          {/* Featured Image */}
          {article.imageUrl && (
            <div className="relative h-96 mb-12 rounded-lg overflow-hidden">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="object-cover object-center"
              />
            </div>
          )}

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Article Body */}
          <div className="prose prose-lg max-w-none">
            {renderRichText(article.fullContent)}
          </div>

          {/* Share/Back Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <Link href="/news" className="bg-arteng-dark text-white px-6 py-2 rounded hover:bg-opacity-90 transition-colors">
                ← Back to News
              </Link>
              
              <div className="flex items-center gap-4">
                <span className="text-gray-600">Share this article:</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: article.title,
                          text: article.description,
                          url: window.location.href,
                        });
                      } else {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Link copied to clipboard!');
                      }
                    }}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded text-sm transition-colors"
                  >
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}