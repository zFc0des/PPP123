import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { Star, ChevronLeft } from 'lucide-react';
import path from 'path';
import fs from 'fs';

const parseReviewContent = (content) => {
  // First, split into sections by H1/H2 markers
  const sections = content
    .split('**H')
    .filter(Boolean)
    .map(section => {
      const lines = section.split('\n').filter(Boolean);
      const titleLine = lines[0];
      const level = titleLine.startsWith('1:') ? 'H1' : 'H2';
      // Clean up the title by removing level prefix and any trailing asterisks
      const title = titleLine
        .replace(/[12]:/, '')
        .replace(/\*\*$/, '')
        .replace(/\*\*/g, '')
        .trim();
      const content = lines.slice(1).join('\n').trim();
      const id = title
        .toLowerCase()
        .replace(/\*\*/g, '')
        .replace(/\s+/g, '-');
      
      return { level, title, content, id };
    });

  return sections;
};

const ReviewPage = ({ reviewData }) => {
  const router = useRouter();
  
  if (!reviewData?.content) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </Layout>
    );
  }

  const sections = parseReviewContent(reviewData.content);
  const mainContent = sections.find(s => s.level === 'H1');
  const otherSections = sections.filter(s => s.level === 'H2');

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/reviews"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to all reviews
        </Link>

        {/* Main Title and Introduction */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {mainContent?.title}
          </h1>
          <p className="text-lg text-gray-600">
            {mainContent?.content}
          </p>
        </div>

        {/* Table of Contents */}
        <nav className="mb-12 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Navigation</h2>
          <ul className="space-y-4">
            {otherSections.map((section, index) => (
              <li key={index}>
                <a
                  href={`#${section.id}`}
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <Star className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">{section.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Content Sections */}
        <div className="space-y-12">
          {otherSections.map((section, index) => (
            <section 
              key={index} 
              id={section.id}
              className="scroll-mt-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Star className="h-5 w-5 text-blue-600" />
                {section.title}
              </h2>
              <div className="prose max-w-none">
                {section.content.split('\n').filter(Boolean).map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-gray-600 mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-center gap-4">
          <a
            href={reviewData.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors"
          >
            Visit Casino
          </a>
          <Link
            href="/reviews"
            className="px-8 py-3 border border-gray-300 text-gray-700 text-center rounded-lg hover:border-gray-400 transition-colors"
          >
            See More Reviews
          </Link>
        </div>
      </div>
    </Layout>
  );
};

// Keep existing getStaticPaths and getStaticProps
export async function getStaticPaths() {
  const reviewsDirectory = path.join(process.cwd(), 'data', 'reviews');
  const fileNames = fs.readdirSync(reviewsDirectory);

  const paths = fileNames.map(fileName => ({
    params: { 
      slug: fileName.replace('.json', '').replace(/_/g, '-')
    }
  }));

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  try {
    const reviewsDirectory = path.join(process.cwd(), 'data', 'reviews');
    const filePath = path.join(reviewsDirectory, `${params.slug.replace(/-/g, '_')}.json`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const reviewData = JSON.parse(fileContents);

    return {
      props: { reviewData },
      revalidate: 3600
    };
  } catch (error) {
    return { notFound: true };
  }
}

export default ReviewPage;