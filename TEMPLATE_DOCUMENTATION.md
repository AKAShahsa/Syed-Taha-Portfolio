# Portfolio Template Documentation

Welcome to this professional React portfolio template! This document provides a comprehensive guide on how to customize every aspect of this template to make it your own.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Basic Configuration](#basic-configuration)
3. [Section Customization](#section-customization)
4. [API Integration](#api-integration)
5. [3D Elements](#3d-elements)
6. [Sound and Interactivity](#sound-and-interactivity)
7. [Styling](#styling)
8. [Deployment](#deployment)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher) or yarn
- Modern web browser with WebGL support
- Minimum 4GB RAM for development
- 1GB free disk space

📋 **Complete system requirements and dependency list available in `requirements.txt`**

### Installation

1. Extract the template files
2. Review system requirements in `requirements.txt`
3. Install dependencies:
```bash
npm install
# or
yarn install
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## Basic Configuration

The main file to edit is `src/SyedTahaPortfolio2.jsx` which contains most of the portfolio content.

### Personal Information

At the top of this file, you'll find constants for your personal links and information:

```javascript
// == Config / Assets ==
const CV_LINK = 'YOUR_CV_LINK'; // Your resume/CV URL
const PROFILE_IMG = 'src/assets/cv/Profilepicture.jpg'; // Path to your profile image
const YOUTUBE_CHANNEL = 'YOUR_YOUTUBE_CHANNEL_URL';
const DEFAULT_GREEN = '#00E676'; // Primary theme color - can be customized

// Social links
const LINKEDIN_URL = 'YOUR_LINKEDIN_URL';
const INSTAGRAM_URL = 'YOUR_INSTAGRAM_URL';
const GITHUB_URL = 'YOUR_GITHUB_URL';
const WHATSAPP_URL = 'https://wa.me/YOUR_PHONE_NUMBER?text=Hi%2C%20I%27m%20interested%20in%20your%20work!';
```

Replace these values with your own information.

### Assets

The template now includes your actual portfolio images:

**📸 Your Certificates**
- `src/assets/Certificates/certificateone.jpg`
- `src/assets/Certificates/certificate_of_Achivement.jpg`
- `src/assets/Certificates/certificate_of_graduation.jpg`

**🎨 Your Design Portfolio**
- `src/assets/Graphic_Design/design1.jpg`
- `src/assets/Graphic_Design/design2.jpg`
- `src/assets/Graphic_Design/design3.jpg`
- `src/assets/Graphic_Design/design4.jpg`

**🔄 To Replace Images:**
1. Replace your profile picture at `src/assets/cv/Profilepicture.jpg`
2. Update your CV/resume at `src/assets/cv/mycv.pdf`
3. Add more certificates to `src/assets/Certificates/` and update the imports
4. Add more designs to `src/assets/Graphic_Design/` and update the `PHOTOSHOP_PROJECTS` array

**📏 Image Specifications:**
- Certificates: 600x400px recommended (1.5:1 ratio)
- Design Projects: 800x600px recommended (4:3 ratio)
- Profile Picture: 400x400px recommended (1:1 ratio)
- Supported formats: JPG, PNG, WebP

## Section Customization

### Hero Section

Edit the hero section text and call-to-action buttons around line ~600 in `SyedTahaPortfolio2.jsx`.

### About Me

Customize the about section with your own bio (lines ~900-950).

### Skills

Update the skills array with your own skills and expertise levels:

```javascript
const SKILLS = [
  { name: 'Your Skill 1', years: 'X+ yrs', pct: 95, icon: SiAdobephotoshop },
  { name: 'Your Skill 2', years: 'X+ yrs', pct: 90, icon: SiAdobepremierepro },
  // Add more skills...
];
```

- `name`: Name of your skill
- `years`: Experience with this skill
- `pct`: Proficiency percentage (0-100)
- `icon`: Icon from react-icons (import additional icons if needed)

### Projects

Update the project arrays like `PHOTOSHOP_PROJECTS` with your own work:

```javascript
const YOUR_PROJECTS = [
  {
    src: 'path/to/image.jpg', // Project thumbnail
    title: 'Project Title',
    description: 'Short project description.'
  },
  // Add more projects...
];
```

### YouTube Videos

Add your YouTube videos to the YOUTUBE_EMBEDS array:

```javascript
const YOUTUBE_EMBEDS = [
  'https://www.youtube.com/embed/YOUR_VIDEO_ID_1',
  'https://www.youtube.com/embed/YOUR_VIDEO_ID_2',
  // Add more videos...
];
```

### Testimonials/Certificates

Edit the certificate data in the `CertificatesCarousel` component.

## Environment Variables

This template uses environment variables for API keys and other sensitive information. These are stored in `.env` files.

### Setting Up Environment Variables

1. Locate the `.env.example` file in the project root
2. Copy it to create a new file named `.env`:
   ```bash
   cp .env.example .env
   ```
3. Edit the `.env` file and replace placeholder values with your actual API keys and credentials

### Available Environment Variables

```
# YouTube API settings
VITE_YOUTUBE_API_KEY=YOUR_YOUTUBE_API_KEY_HERE
VITE_YOUTUBE_CHANNEL_ID=YOUR_YOUTUBE_CHANNEL_ID_HERE
VITE_DEMO_MODE=false

# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=YOUR_EMAILJS_SERVICE_ID
VITE_EMAILJS_TEMPLATE_ID=YOUR_EMAILJS_TEMPLATE_ID
VITE_EMAILJS_PUBLIC_KEY=YOUR_EMAILJS_PUBLIC_KEY

# Google Gemini API Key
VITE_GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

### Development vs Production Environment

- `.env.development` - Used during development (`npm run dev`)
- `.env` - Used for production builds (`npm run build`)

For development, you might want to set `VITE_DEMO_MODE=true` to avoid consuming API quotas while developing.

## API Integration

### YouTube API (Subscriber Counter)

1. Create a Google Cloud account and enable the YouTube Data API
2. Generate an API key
3. Add your API key to your `.env` file:
   ```
   VITE_YOUTUBE_API_KEY=your_youtube_api_key
   VITE_YOUTUBE_CHANNEL_ID=your_youtube_channel_id
   ```
4. The configuration is automatically picked up from these environment variables

### EmailJS (Contact Form)

1. Create an EmailJS account at [emailjs.com](https://www.emailjs.com/)
2. Create a service and email template
3. Add your EmailJS credentials to your `.env` file:
   ```
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

### Gemini AI Chatbot

1. Get a Gemini API key from [Google AI Studio](https://aistudio.google.com/)
2. Add your API key to your `.env` file:
   ```
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```

### Firebase (Chat History Storage)

1. Create a Firebase project
2. Add your Firebase config in `src/components/GeminiChatbot.jsx`:
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_FIREBASE_API_KEY",
     authDomain: "your-project-id.firebaseapp.com",
     databaseURL: "https://your-project-id-default-rtdb.firebaseio.com",
     projectId: "your-project-id",
     storageBucket: "your-project-id.firebasestorage.app",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID",
     measurementId: "YOUR_MEASUREMENT_ID"
   };
   ```

## 3D Elements

### Galaxy Background

The 3D galaxy background is implemented in `src/components/GalaxyBackground.jsx` using Three.js. You can:
- Adjust particle count for performance
- Change colors and animation speed
- Replace with your own Three.js scene

### 3D Model Viewer

To replace the 3D model:
1. Add your .glb or .gltf file to the `public` directory
2. Update the model path in the section where the 3D model is loaded (search for "need_some_space.glb")

## Sound and Interactivity

### Background Music

Replace the background music file in `src/utils/` and update the import in `soundManager.js`.

### Easter Eggs & Interactive Elements

The portfolio includes hidden interactive elements. Customize them in:
- `src/components/EasterEggs.jsx`
- `src/components/EasterEggsMobile.jsx`

## Styling

The project uses Tailwind CSS for styling:

1. Customize colors in `tailwind.config.js`
2. Global styles are in `src/index.css`
3. Component-specific styles are inline with Tailwind classes

## Deployment

### Build for Production

```bash
npm run build
# or
yarn build
```

This will create a `dist` directory with optimized files ready for deployment.

### Deployment Options

1. **Vercel/Netlify**: Connect your repository for automatic deployments
2. **GitHub Pages**: Deploy the `dist` directory
3. **Traditional hosting**: Upload the `dist` directory to your server

## Timeline for Customization

Here's a recommended timeline for customizing this template:

1. **Day 1**: Configure basic info, links and personal details
2. **Day 2**: Customize sections (About, Skills, Projects)
3. **Day 3**: Replace images and media assets
4. **Day 4**: Set up API integrations (YouTube, EmailJS, etc.)
5. **Day 5**: Fine-tune styling and test everything

OR an easy option is:

Download cursor ai or trae ai and give the agent all the information require that is your personal info, api keys and assets then say replace the template with my information!

## Support

For any questions or issues with this template, please contact [tahasyed225@gmail.com]

---

© 2025 Your Name | Template from Envato Market
