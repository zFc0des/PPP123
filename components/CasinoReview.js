import React from 'react';
import Layout from '../components/Layout';
import { ChevronRight, Star, Shield, Gamepad2, Headphones } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ReviewContent = ({ content }) => {
  // Parse the markdown-style content into structured data
  const sections = content.split('**').filter(Boolean).reduce((acc, section) => {
    if (section.startsWith('H1:') || section.startsWith('H2:')) {
      const [heading, ...contentParts] = section.split('\n');
      const [level, ...titleParts] = heading.split(':');
      acc.push({
        level,
        title: titleParts.join(':').trim(),
        content: contentParts.join('\n').trim()
      });
    }
    return acc;
  }, []);

  return (
    <div className="space-y-8">
      {sections.map((section, index) => {
        const Icon = index === 1 ? Star : 
                    index === 2 ? Gamepad2 : 
                    index === 5 ? Shield :
                    index === 6 ? Headphones : ChevronRight;

        return (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-brand-blue to-brand-hover">
              <CardTitle className="flex items-center gap-2 text-white">
                <Icon className="h-5 w-5" />
                <span>{section.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="prose max-w-none">
                {section.content.split('\n').map((paragraph, pIndex) => {
                  if (paragraph.startsWith('**Image Alt Text**:')) return null;
                  return (
                    <p key={pIndex} className="text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

const CasinoReview = ({ review }) => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">{review.casino_name}</h1>
          <p className="mt-2 text-lg text-gray-600">{review.meta_description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <ReviewContent content={review.content} />
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent>
                <nav className="space-y-2">
                  <a 
                    href={review.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-2 px-4 text-center bg-brand-blue hover:bg-brand-hover text-white rounded-lg transition-colors"
                  >
                    Visit Casino
                  </a>
                  {['Bonuses', 'Games', 'Payments', 'Support'].map((item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className="block w-full py-2 px-4 text-center text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {item}
                    </a>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CasinoReview;