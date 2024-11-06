import openai
from dotenv import load_dotenv
import json
import os
from datetime import datetime
from pathlib import Path
from typing import Dict, List
import re

BASE_DIR = Path(__file__).resolve().parent.parent
PROJECT_ROOT = Path(os.getcwd())  # or use BASE_DIR if you prefer
REVIEW_OUTPUT_DIR = PROJECT_ROOT / 'data' / 'reviews'

load_dotenv()

# Load API key securely
openai.api_key = os.getenv("OPENAI_API_KEY")

class ReviewGenerator:
    def __init__(self):
        self.api_key = os.getenv("OPENAI_API_KEY")
        if not self.api_key:
            raise ValueError("OpenAI API key not found in environment variables")
        openai.api_key = self.api_key
        
        # Create the reviews directory if it doesn't exist
        REVIEW_OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
        (REVIEW_OUTPUT_DIR / 'images').mkdir(parents=True, exist_ok=True)

    def generate_casino_details(self, casino_name):
        """Generate detailed casino information using GPT-4"""
        prompt = f"""
        Provide detailed information about {casino_name} in JSON format with the following structure:
        {{
            "name": "Casino Name",
            "type": "Type of Casino (e.g., Sweepstakes, Social)",
            "launched": "Launch Year",
            "owner": "Operating Company",
            "licensed_by": "Licensing Authority",
            "available_countries": ["Country1", "Country2"],
            "restricted_states": ["State1", "State2"],
            "languages": ["Language1", "Language2"],
            "currencies": ["Currency1", "Currency2"]
        }}
        Ensure all information is accurate and up to date.
        """
        
        try:
            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.7
            )
            return json.loads(response.choices[0].message.content)
        except Exception as e:
            print(f"Error generating casino details: {e}")
            return {
                "name": casino_name.replace(" Review", ""),
                "type": "Unknown",
                "launched": "Unknown",
                "owner": "Unknown",
                "licensed_by": "Unknown",
                "available_countries": [],
                "restricted_states": [],
                "languages": ["English"],
                "currencies": ["USD"]
            }

    def generate_section_images(self, casino_name: str, sections: List[str]) -> Dict[str, str]:
        """Generate SVG illustrations for each review section"""
        section_images = {}
        
        section_specs = {
            "Bonuses and Promotions": {
                "description": "Create an SVG illustration for casino bonuses and promotions. Include icons for coins, gift boxes, and reward symbols. Use blue and gold colors.",
                "filename": "bonuses-illustration"
            },
            "Game Selection and Variety": {
                "description": "Create an SVG illustration representing casino game variety. Include symbols for slots, cards, and dice. Use vibrant colors.",
                "filename": "games-illustration"
            },
            "User Experience and Interface": {
                "description": "Create an SVG illustration for user interface elements. Show mobile devices and navigation symbols. Use clean, modern style.",
                "filename": "interface-illustration"
            },
            "Banking and Payment Methods": {
                "description": "Create an SVG illustration for payment methods. Include credit card and digital wallet symbols. Use secure, professional style.",
                "filename": "banking-illustration"
            },
            "Security and Licensing": {
                "description": "Create an SVG illustration for casino security. Include shield, lock, and certification symbols. Use trustworthy blue tones.",
                "filename": "security-illustration"
            },
            "Customer Support Services": {
                "description": "Create an SVG illustration for customer support. Show chat bubbles and support agent symbols. Use friendly, approachable style.",
                "filename": "support-illustration"
            }
        }

        try:
            for section, spec in section_specs.items():
                prompt = f"""
                Create an SEO-optimized SVG illustration for {casino_name}'s {section} section.
                
                Requirements:
                - Modern, professional style
                - Relevant icons and symbols
                - {spec['description']}
                - Viewbox: 0 0 400 300
                - Include proper ARIA labels and titles
                - Use semantic SVG elements
                - Include alt text
                
                Respond with valid SVG markup only.
                """

                response = openai.ChatCompletion.create(
                    model="gpt-4",
                    messages=[{"role": "user", "content": prompt}],
                    temperature=0.7
                )

                svg_content = response.choices[0].message.content.strip()
                svg_content = self._clean_svg(svg_content)
                
                filename = f"{spec['filename']}-{self._sanitize_filename(casino_name)}.svg"
                filepath = REVIEW_OUTPUT_DIR / 'images' / filename
                
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(svg_content)
                
                section_images[section] = f"/images/reviews/{filename}"

            return section_images

        except Exception as e:
            print(f"Error generating section images: {e}")
            return {}

    def _clean_svg(self, svg_content: str) -> str:
        """Clean and validate SVG content"""
        svg_content = re.sub(r'<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>', '', svg_content)
        
        if 'xmlns=' not in svg_content:
            svg_content = svg_content.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"')
        
        if 'aria-labelledby=' not in svg_content:
            svg_content = svg_content.replace('<svg', '<svg aria-labelledby="title desc"')
        
        return svg_content

    def _sanitize_filename(self, filename: str) -> str:
        """Sanitize filename for safe saving"""
        return re.sub(r'[^\w\-_.]', '-', filename.lower().replace(' review', ''))

    def generate_ratings(self, content):
        """Generate ratings based on review content"""
        try:
            prompt = f"""
            Based on this casino review content, provide ratings from 1-5 (can use .5 increments) for:
            - overall
            - game_variety
            - user_experience
            - bonuses
            - support
            - payment_options
            - mobile_experience

            Content: {content}

            Respond in JSON format only.
            """
            
            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.7
            )
            return json.loads(response.choices[0].message.content)
        except Exception as e:
            print(f"Error generating ratings: {e}")
            return {
                "overall": 4.0,
                "game_variety": 4.0,
                "user_experience": 4.0,
                "bonuses": 4.0,
                "support": 4.0,
                "payment_options": 4.0,
                "mobile_experience": 4.0
            }

    def extract_pros_cons(self, content):
        """Extract pros and cons from review content"""
        prompt = f"""
        Based on this casino review, list the main pros and cons in JSON format:
        {{
            "pros": ["pro1", "pro2", "pro3"],
            "cons": ["con1", "con2", "con3"]
        }}

        Review content: {content}
        """
        
        try:
            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.7
            )
            return json.loads(response.choices[0].message.content)
        except Exception as e:
            print(f"Error extracting pros and cons: {e}")
            return {"pros": [], "cons": []}

    def _generate_main_content(self, casino_name, casino_url, keywords):
        """Generate main review content"""
        prompt = f"""
        Create a comprehensive review for {casino_name} ({casino_url}) using this exact structure:

        **H1: [Casino Name]: A Comprehensive Review**
        [Introduction paragraph about the casino's unique features and overall impression]

        **H2: Bonuses and Promotions**
        [Detailed information about welcome bonus, ongoing promotions, and loyalty programs]

        **H2: Game Selection and Variety**
        [Comprehensive overview of available games, categories, and special features]

        **H2: User Experience and Interface**
        [Details about website usability, mobile compatibility, and overall design]

        **H2: Banking and Payment Methods**
        [Information about deposit and withdrawal options, processing times, and limits]

        **H2: Security and Licensing**
        [Details about licensing, security measures, and fair play certifications]

        **H2: Customer Support Services**
        [Information about support channels, availability, and response times]

        **H2: Final Verdict**
        [Summary of pros and cons, final recommendation]

        Keywords to include: {', '.join(keywords)}
        """

        try:
            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.7,
                max_tokens=2000
            )
            return response.choices[0].message.content
        except Exception as e:
            print(f"Error generating main content: {e}")
            return ""

    def _extract_meta_description(self, content):
        """Extract or generate meta description"""
        try:
            prompt = f"""
            Create a compelling meta description (max 160 characters) for this casino review:
            {content[:500]}...
            """
            
            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.7
            )
            return response.choices[0].message.content[:160]
        except Exception as e:
            print(f"Error generating meta description: {e}")
            return ""

    def generate_review(self, casino_name, casino_url, keywords):
        """Generate comprehensive casino review"""
        try:
            content = self._generate_main_content(casino_name, casino_url, keywords)
            
            if not content:
                raise ValueError("Failed to generate review content")

            section_images = self.generate_section_images(casino_name, [
                "Bonuses and Promotions",
                "Game Selection and Variety",
                "User Experience and Interface",
                "Banking and Payment Methods",
                "Security and Licensing",
                "Customer Support Services"
            ])

            casino_details = self.generate_casino_details(casino_name)
            ratings = self.generate_ratings(content)
            pros_cons = self.extract_pros_cons(content)
            
            review_data = {
                "casino_name": casino_name,
                "url": casino_url,
                "content": content,
                "last_updated": datetime.now().isoformat(),
                "review_date": datetime.now().strftime("%Y-%m-%d"),
                "casino_details": casino_details,
                "ratings": ratings,
                "pros_cons": pros_cons,
                "keywords": keywords,
                "review_sections": [
                    "Bonuses and Promotions",
                    "Game Selection and Variety",
                    "User Experience and Interface",
                    "Banking and Payment Methods",
                    "Security and Licensing",
                    "Customer Support Services",
                    "Final Verdict"
                ],
                "section_images": section_images,
                "seo": {
                    "title": f"{casino_name}: Comprehensive Review & Rating",
                    "meta_description": self._extract_meta_description(content),
                    "focus_keywords": keywords[:3],
                    "schema_type": "Review",
                    "image_alt_texts": {
                        section: f"{casino_name} {section.lower()} illustration"
                        for section in section_images.keys()
                    }
                }
            }
            
            self._save_review(review_data, casino_name)
            return review_data
            
        except Exception as e:
            print(f"Error generating review: {e}")
            return None

    def _save_review(self, review_data, casino_name):
        """Save review data to JSON file"""
        filename = f"{casino_name.lower().replace(' review', '').replace(' ', '_')}.json"
        filepath = REVIEW_OUTPUT_DIR / filename
        
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(review_data, f, indent=2, ensure_ascii=False)
        print(f"Review saved to {filepath}")

def main():
    """Main execution function"""
    try:
        generator = ReviewGenerator()
        
        casinos_to_review = [
            {
                "name": "Mcluck Sweepstakes Casino Review",
                "url": "https://mcluck.com",
                "keywords": [
                    "sweepstakes casino",
                    "social casino",
                    "online slots",
                    "casino bonuses"
                ]
            }
        ]

        for casino in casinos_to_review:
            print(f"\nGenerating review for {casino['name']}...")
            generator.generate_review(
                casino["name"],
                casino["url"],
                casino["keywords"]
            )

    except Exception as e:
        print(f"Error in main execution: {e}")

if __name__ == "__main__":
    main()