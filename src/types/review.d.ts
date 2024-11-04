// src/lib/review-schema.js

export const reviewSchema = {
    type: 'object',
    required: [
      'casino_name',
      'url',
      'content',
      'last_updated',
      'casino_details',
      'ratings',
      'pros_cons',
      'keywords',
      'review_sections',
      'seo'
    ],
    properties: {
      casino_name: { type: 'string' },
      url: { type: 'string', format: 'uri' },
      content: { type: 'string' },
      last_updated: { type: 'string', format: 'date-time' },
      review_date: { type: 'string', format: 'date' },
      
      casino_details: {
        type: 'object',
        required: ['name', 'type', 'launched', 'owner', 'licensed_by'],
        properties: {
          name: { type: 'string' },
          type: { type: 'string' },
          launched: { type: 'string' },
          owner: { type: 'string' },
          licensed_by: { type: 'string' },
          available_countries: { type: 'array', items: { type: 'string' } },
          restricted_states: { type: 'array', items: { type: 'string' } },
          languages: { type: 'array', items: { type: 'string' } },
          currencies: { type: 'array', items: { type: 'string' } }
        }
      },
  
      ratings: {
        type: 'object',
        required: ['overall'],
        properties: {
          overall: { type: 'number', minimum: 0, maximum: 5 },
          game_variety: { type: 'number', minimum: 0, maximum: 5 },
          user_experience: { type: 'number', minimum: 0, maximum: 5 },
          bonuses: { type: 'number', minimum: 0, maximum: 5 },
          support: { type: 'number', minimum: 0, maximum: 5 },
          payment_options: { type: 'number', minimum: 0, maximum: 5 },
          mobile_experience: { type: 'number', minimum: 0, maximum: 5 }
        }
      },
  
      pros_cons: {
        type: 'object',
        required: ['pros', 'cons'],
        properties: {
          pros: { type: 'array', items: { type: 'string' } },
          cons: { type: 'array', items: { type: 'string' } }
        }
      },
  
      keywords: { type: 'array', items: { type: 'string' } },
      
      review_sections: { type: 'array', items: { type: 'string' } },
  
      seo: {
        type: 'object',
        required: ['title', 'meta_description', 'focus_keywords'],
        properties: {
          title: { type: 'string' },
          meta_description: { type: 'string', maxLength: 160 },
          focus_keywords: { type: 'array', items: { type: 'string' } },
          schema_type: { type: 'string', enum: ['Review'] }
        }
      }
    }
  };
  
  // Helper function to validate review data
  export function validateReviewData(data) {
    // Note: You'll need to implement actual validation logic here
    // You could use a library like 'ajv' for JSON Schema validation
    return true;
  }
  
  // Helper function to parse review content sections
  export function parseReviewContent(content) {
    const sections = content.split('**').filter(Boolean);
    return sections.reduce((acc, section) => {
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
  }