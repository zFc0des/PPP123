// pages/reviews.js
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { BookOpen, Star, Search } from 'lucide-react';
import path from 'path';


// Sample blog posts data - replace with your actual data source later
const blogPosts = [
  {
    id: 1,
    title: "Understanding Sweepstakes Casinos",
    excerpt: "Learn everything you need to know about how sweepstakes casinos work and how to get started with virtual currency gaming.",
    category: "Guide",
    readTime: "5 min read",
    date: "2024-03-01"
  },
  {
    id: 2,
    title: "Top 5 Sweepstakes Casino Games",
    excerpt: "Discover the most popular sweepstakes casino games that players love in 2024.",
    category: "Gaming",
    readTime: "4 min read",
    date: "2024-03-15"
  }
];

// Function to parse the markdown-style content
const parseReviewContent = (content) => {
  const sections = content.split('**').filter(Boolean);
  const parsedContent = {
    title: '',
    sections: []
  };

  sections.forEach(section => {
    if (section.startsWith('H1:')) {
      parsedContent.title = section.split('\n')[0].replace('H1:', '').trim();
    } else if (section.startsWith('H2:')) {
      const [heading, ...contentParts] = section.split('\n');
      parsedContent.sections.push({
        title: heading.replace('H2:', '').trim(),
        content: contentParts.join('\n').trim()
      });
    }
  });

  return parsedContent;
};

const ContentCard = ({ type, data }) => {
  if (type === 'reviews') {
    const parsedReview = parseReviewContent(data.content);
    const firstSection = parsedReview.sections[0] || {};
    
    return (
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">
              {data.casino_name.replace(' Review', '')}
            </h3>
          </div>
          
          <p className="text-gray-600 line-clamp-3">
            {parsedReview.sections[0]?.content.split('\n')[0] || 'Comprehensive casino review...'}
          </p>
          
          <div className="space-y-2">
            {parsedReview.sections.slice(0, 2).map((section, index) => (
              <div key={index} className="text-sm text-gray-500">
                • {section.title.split(':')[0]}
              </div>
            ))}
          </div>
          
          <a
            href={`/reviews/${data.casino_name.toLowerCase().replace(' review', '').replace(/\s+/g, '-')}`}
            className="inline-block w-full text-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Read Full Review
          </a>
        </div>
      </div>
    );
  }

  // Blog post card
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between mb-2">
          <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
            {data.category}
          </span>
          <span className="text-sm text-gray-500">{data.readTime}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900">{data.title}</h3>
        <p className="text-gray-600">{data.excerpt}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {new Date(data.date).toLocaleDateString()}
          </span>
          <a
            href={`/blog/${data.id}`}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Read More →
          </a>
        </div>
      </div>
    </div>
  );
};

const FiltersSection = ({ activeTab, searchTerm, setSearchTerm, filterType, setFilterType, sortBy, setSortBy }) => (
  <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type="text"
          placeholder={`Search ${activeTab === 'reviews' ? 'casinos' : 'guides and news'}...`}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <select 
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
      >
        <option value="all">All Types</option>
        {activeTab === 'reviews' ? (
          <option value="featured">Featured Reviews</option>
        ) : (
          <>
            <option value="guide">Guides</option>
            <option value="gaming">Gaming</option>
            <option value="news">News</option>
          </>
        )}
      </select>
      
      <select
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        {activeTab === 'reviews' ? (
          <>
            <option value="name">Sort by Name</option>
            <option value="rating">Sort by Rating</option>
          </>
        ) : (
          <>
            <option value="date">Sort by Date</option>
            <option value="title">Sort by Title</option>
          </>
        )}
      </select>
    </div>
  </div>
);

const Reviews = ({ reviewsData }) => {
  const [activeTab, setActiveTab] = useState('reviews');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const filterContent = (contentType) => {
    if (contentType === 'reviews') {
      return reviewsData
        .filter(review => {
          const matchesSearch = review.casino_name.toLowerCase().includes(searchTerm.toLowerCase());
          return matchesSearch;
        })
        .sort((a, b) => {
          if (sortBy === 'name') {
            return a.casino_name.localeCompare(b.casino_name);
          }
          return 0;
        });
    }

    return blogPosts
      .filter(post => {
        const matchesType = filterType === 'all' || 
                          post.category.toLowerCase() === filterType.toLowerCase();
        const matchesSearch = 
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesType && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        return 0;
      });
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Casino Reviews & Guides</h1>
          <p className="mt-2 text-lg text-gray-600">
            Expert reviews, guides, and insights about sweepstakes casinos
          </p>
        </div>

        <div className="space-y-8">
          <div className="flex justify-center space-x-4 border-b">
            <button
              className={`px-4 py-2 font-medium flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === 'reviews'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('reviews')}
            >
              <Star className="h-4 w-4" />
              Reviews
            </button>
            <button
              className={`px-4 py-2 font-medium flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === 'blog'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('blog')}
            >
              <BookOpen className="h-4 w-4" />
              Guides & News
            </button>
          </div>

          <FiltersSection
            activeTab={activeTab}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterType={filterType}
            setFilterType={setFilterType}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterContent(activeTab).map((item, index) => (
              <ContentCard key={index} type={activeTab} data={item} />
            ))}
          </div>

          {filterContent(activeTab).length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900">No content found</h3>
              <p className="mt-2 text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  const fs = require('fs');
  try {
    const reviewsDirectory = path.join(process.cwd(), 'reviews');
    const fileContents = fs.readFileSync(
      path.join(reviewsDirectory, 'chumba_casino_review.json'), 
      'utf8'
    );

    // Remove the import of casinoData at the top of the file
    // The data should now come from the JSON file

    const reviewsData = [JSON.parse(fileContents)];
    console.log('Loaded review data:', reviewsData); // Debug log

    return {
      props: { reviewsData },
      revalidate: 3600
    };
  } catch (error) {
    console.error('Error loading reviews:', error);
    return { props: { reviewsData: [] } };
  }
}
  


export default Reviews;