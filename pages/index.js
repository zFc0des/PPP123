// In your index.js - Current imports
import React from 'react';
import Layout from '../components/Layout';
import FeaturedDashboard from '../components/FeaturedDashboard';
import { ChevronRight, Star, Award, BookOpen } from 'lucide-react';
import Link from 'next/link';
import path from 'path';
import fs from 'fs';
import ReviewCard from '../components/ReviewCard';  // <- You import this but don't use it

export default function Home({ latestReviews, casinoData, promotions, blogPosts }) {
  return (
    <Layout>
      <FeaturedDashboard casinoData={casinoData} />

      {/* Latest Promotions Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Latest Promotions</h2>
            <Link 
              href="/promotions"
              className="flex items-center text-blue-600 hover:text-blue-700"
            >
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {promotions.map((promo, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="h-5 w-5 text-blue-600" />
                  <h3 className="text-xl font-bold">{promo.casino_name}</h3>
                </div>
                <p className="text-lg font-semibold text-gray-900 mb-2">
                  {promo.title}
                </p>
                <p className="text-gray-600 mb-4">{promo.description}</p>
                <Link
                  href={`/promotions/${promo.id}`}
                  className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
                >
                  Learn More <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Reviews Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Latest Reviews</h2>
            <Link 
              href="/reviews"
              className="flex items-center text-blue-600 hover:text-blue-700"
            >
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestReviews.map((review, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="h-5 w-5 text-blue-600" />
                  <h3 className="text-xl font-bold">{review.casino_name.replace(' Review', '')}</h3>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {review.meta_description || "Comprehensive casino review..."}
                </p>
                <Link
                  href={`/reviews/${review.casino_name.toLowerCase().replace(' review', '').replace(/\s+/g, '-')}`}
                  className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
                >
                  Read Review <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Latest Blog Posts</h2>
            <Link 
              href="/blog"
              className="flex items-center text-blue-600 hover:text-blue-700"
            >
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  <h3 className="text-xl font-bold">{post.title}</h3>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                  <Link
                    href={`/blog/${post.id}`}
                    className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
                  >
                    Read More <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

// pages/index.js
export async function getStaticProps() {
  try {
    // Load casino data
    const casinoData = require('../data/casinos.json');
    
    const reviewsDirectory = path.join(process.cwd(), 'data', 'reviews');
    const fileNames = fs.readdirSync(reviewsDirectory);
    
    // Filter out the 'images' directory and non-JSON files
    const reviewFiles = fileNames.filter(filename => 
      filename.endsWith('.json') && filename !== 'images'
    );
    
    // Load each review file
    const latestReviews = reviewFiles
      .map(filename => {
        try {
          const filePath = path.join(reviewsDirectory, filename);
          const fileContents = fs.readFileSync(filePath, 'utf8');
          return JSON.parse(fileContents);
        } catch (error) {
          console.error(`Error reading file ${filename}:`, error);
          return null;
        }
      })
      .filter(Boolean)
      .slice(0, 3); // Get latest 3 reviews

    // Sample data for other sections
    const promotions = [
      {
        id: 1,
        casino_name: "Example Casino",
        title: "Welcome Bonus",
        description: "Get started with our welcome bonus"
      }
    ];

    const blogPosts = [
      {
        id: 1,
        title: "Getting Started",
        excerpt: "Learn how to get started...",
        readTime: "5 min read"
      }
    ];

    return {
      props: {
        latestReviews,
        casinoData,
        promotions,
        blogPosts
      },
      revalidate: 3600
    };
  } catch (error) {
    console.error('Error loading data:', error);
    return {
      props: {
        latestReviews: [],
        casinoData: [],
        promotions: [],
        blogPosts: []
      }
    };
  }
}