# Customization Guide for Portfolio Template

## Main Areas to Customize

### Personal Information
1. **Name**: Replace "Syed Taha" with your own name throughout the template
   - Main heading in hero section (line ~2397)
   - Footer copyright section (line ~4106)
   - Other name mentions throughout the template

2. **Images**:
   - **Profile Picture**: Replace file at `src/assets/cv/Profilepicture.jpg` with your own professional headshot
   - **Design/Project Examples**: Replace these files with your own work:
     - `src/assets/Thumbnail.jpg`
     - `src/assets/astral projection thumbfinal.jpg`
     - `src/assets/thumbionali.jpg`
     - `src/assets/thumbnailtayaar.jpg`
   - Keep the same file names or update the import paths in `SyedTahaPortfolio2.jsx`

3. **Bio/Tagline**: 
   - Update the personal description text (line ~2399)
   - Replace with your own profession, skills, and bio

4. **Social Media Links**:
   - Update all social media URLs in the constants section (lines ~85-95)
   - Replace YouTube channel name "@iamsyedtaha" with your own channel name

5. **Contact Information**:
   - Replace email address "your.email@example.com" with your actual email
   - Update location "[YOUR LOCATION]" with your city/country
   - Replace phone number if used

### API Keys and Services

1. **EmailJS**:
   - Update EmailJS credentials in `SyedTahaPortfolio2.jsx` (lines ~1422-1424)
   - Set up your own EmailJS account and template

2. **YouTube API**:
   - Get your own YouTube API key and channel ID
   - Update values in `src/config/youtubeConfig.js`

3. **Google Gemini AI**:
   - Get your own Gemini API key
   - Update in `src/components/GeminiChatbot.jsx`

4. **Firebase**:
   - Create your own Firebase project for chatbot history
   - Update Firebase config in `src/components/GeminiChatbot.jsx`

### Content Sections

1. **Skills**:
   - Update the SKILLS array with your own skills and proficiency levels

2. **Projects**:
   - Replace project images, titles, and descriptions in PHOTOSHOP_PROJECTS
   - Add your own project thumbnails in the assets folder

3. **Certificates**:
   - Update the certificates array with your own achievements
   - Replace certificate images with your own

4. **YouTube Videos**:
   - Add your own YouTube video embed URLs in the YOUTUBE_EMBEDS array

5. **Testimonials**:
   - Replace testimonial content with your own client feedback
   - Update reviewer names and photos

### Styling

1. **Color Scheme**:
   - Main accent color is defined as DEFAULT_GREEN = '#00E676'
   - You can modify this for your own brand color
   - Update other color references throughout the template

2. **Typography**:
   - Font styles are defined using Tailwind CSS classes
   - Modify as needed to match your personal brand

## File Structure

Key files to modify:
- `src/SyedTahaPortfolio2.jsx`: Main portfolio component
- `src/components/GeminiChatbot.jsx`: AI chatbot component
- `src/config/youtubeConfig.js`: YouTube API configuration
- `src/assets/`: Replace images with your own

For detailed customization instructions, refer to TEMPLATE_DOCUMENTATION.md
