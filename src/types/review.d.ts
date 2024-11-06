// src/types/review.d.ts

interface Promotions {
  sign_up_bonus: string;
  daily_login_bonus?: string;
  additional_bonus?: string;
  first_purchase_bonus?: string;
  special_event_bonus?: string;
}

interface WagerRequirements {
  sweeps_playthrough: string;
  max_sweeps_exchange?: string;
  max_daily_redemption?: string;
  max_redemption_limit?: string;
  daily_play_limits?: string;
}

interface Limits {
  min_sweeps_balance: string;
  regional_limitations: string;
}

interface Ratings {
  overall: number;
  game_variety?: number;
  user_experience?: number;
  bonuses?: number;
  support?: number;
  mobile_experience?: number;
}

interface ProsCons {
  pros: string[];
  cons: string[];
}

interface ReviewSection {
  level: 'H1' | 'H2';
  title: string;
  content: string;
  id: string;
}

export interface CasinoReview {
  name: string;
  slug: string;
  url: string;
  referral_link?: string;
  content: string;
  meta_description: string;
  last_updated: string;
  promotions: Promotions;
  wager_requirements: WagerRequirements;
  limits: Limits;
  ratings?: Ratings;
  pros_cons?: ProsCons;
  vip_program?: string;
}

export interface ParsedReviewContent {
  mainContent: ReviewSection | undefined;
  otherSections: ReviewSection[];
}

export interface ValidationResult {
  valid: boolean;
  errors: null | Array<{
    keyword: string;
    dataPath: string;
    schemaPath: string;
    params: any;
    message: string;
  }>;
}

export interface ReferralEvent {
  casino_name: string;
  link_type: 'referral' | 'direct';
  source: string;
  timestamp: string;
}