// src/lib/review-schema.js
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv();
addFormats(ajv);

export const reviewSchema = {
  type: 'object',
  required: [
    'name',
    'slug',
    'url',
    'promotions',
    'wager_requirements',
    'limits',
    'content',
    'meta_description',
    'last_updated'
  ],
  properties: {
    name: { type: 'string' },
    slug: { type: 'string' },
    url: { type: 'string', format: 'uri' },
    referral_link: { type: 'string', format: 'uri' },
    content: { type: 'string' },
    meta_description: { type: 'string', maxLength: 160 },
    last_updated: { type: 'string', format: 'date-time' },

    promotions: {
      type: 'object',
      required: ['sign_up_bonus'],
      properties: {
        sign_up_bonus: { type: 'string' },
        daily_login_bonus: { type: 'string' },
        additional_bonus: { type: 'string' },
        first_purchase_bonus: { type: 'string' },
        special_event_bonus: { type: 'string' }
      }
    },

    wager_requirements: {
      type: 'object',
      required: ['sweeps_playthrough'],
      properties: {
        sweeps_playthrough: { type: 'string' },
        max_sweeps_exchange: { type: 'string' },
        max_daily_redemption: { type: 'string' },
        max_redemption_limit: { type: 'string' },
        daily_play_limits: { type: 'string' }
      }
    },

    limits: {
      type: 'object',
      required: ['min_sweeps_balance', 'regional_limitations'],
      properties: {
        min_sweeps_balance: { type: 'string' },
        regional_limitations: { type: 'string' }
      }
    },

    ratings: {
      type: 'object',
      properties: {
        overall: { type: 'number', minimum: 0, maximum: 5 },
        game_variety: { type: 'number', minimum: 0, maximum: 5 },
        user_experience: { type: 'number', minimum: 0, maximum: 5 },
        bonuses: { type: 'number', minimum: 0, maximum: 5 },
        support: { type: 'number', minimum: 0, maximum: 5 },
        mobile_experience: { type: 'number', minimum: 0, maximum: 5 }
      }
    },

    pros_cons: {
      type: 'object',
      properties: {
        pros: { type: 'array', items: { type: 'string' } },
        cons: { type: 'array', items: { type: 'string' } }
      }
    },

    vip_program: { type: 'string' }
  }
};

// Helper function to validate review data
export function validateReviewData(data) {
  const validate = ajv.compile(reviewSchema);
  const valid = validate(data);

  if (!valid) {
    console.error('Validation errors:', validate.errors);
    return {
      valid: false,
      errors: validate.errors
    };
  }

  return {
    valid: true,
    errors: null
  };
}

// Helper function to parse review content sections
export function parseReviewContent(content) {
  if (!content) return [];
  
  const sections = content.split('**').filter(Boolean);
  return sections.reduce((acc, section) => {
    if (section.startsWith('H1:') || section.startsWith('H2:')) {
      const [heading, ...contentParts] = section.split('\n');
      const [level, ...titleParts] = heading.split(':');
      acc.push({
        level,
        title: titleParts.join(':').trim(),
        content: contentParts.join('\n').trim(),
        id: titleParts.join(':').trim().toLowerCase().replace(/\s+/g, '-')
      });
    }
    return acc;
  }, []);
}

// Helper to get main content and sections
export function getReviewSections(content) {
  const sections = parseReviewContent(content);
  return {
    mainContent: sections.find(s => s.level === 'H1'),
    otherSections: sections.filter(s => s.level === 'H2')
  };
}