// pages/blog/[id].js
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

const BlogPost = () => {
  const router = useRouter();
  const { id } = router.query;

  // Simulated blog post data - replace with your actual data source
  const blogPost = {
    id: 1,
    title: "Understanding Sweepstakes Casinos",
    content: "Detailed content about sweepstakes casinos...",
    category: "Guide",
    readTime: "5 min read",
    date: "2024-03-01",
    author: "Casino Expert"
  };

  if (router.isFallback) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-4 mb-8">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            {blogPost.category}
          </span>
          <h1 className="text-4xl font-bold text-gray-900">{blogPost.title}</h1>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>{blogPost.author}</span>
            <span>•</span>
            <span>{new Date(blogPost.date).toLocaleDateString()}</span>
            <span>•</span>
            <span>{blogPost.readTime}</span>
          </div>
        </div>

        <div className="prose max-w-none">
          <p>{blogPost.content}</p>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to all posts
          </button>
        </div>
      </article>
    </Layout>
  );
};

export default BlogPost;