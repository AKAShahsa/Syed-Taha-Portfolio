# Quick Start Guide

This is a professional React portfolio template built with React, Vite, Three.js, and Tailwind CSS.

## System Requirements

Before installing, ensure you have:
- **Node.js** 18.x or higher
- **npm** 9.x or higher (or yarn/pnpm equivalent)
- **Modern web browser** with WebGL support
- **Minimum 4GB RAM** for development
- **1GB free disk space**

📋 **See `requirements.txt` for complete dependency list and detailed system requirements.**

## Installation

1. **Install dependencies**
```bash
npm install
# or
yarn install
```

2. **Start development server**
```bash
npm run dev
# or
yarn dev
```

3. **Build for production**
```bash
npm run build
# or
yarn build
```

## Essential Customization

1. **Set up environment variables**
   - Copy `.env.example` to create a new file named `.env`
   ```bash
   cp .env.example .env
   ```
   - Edit the `.env` file to add your API keys:
   ```
   VITE_YOUTUBE_API_KEY=YOUR_YOUTUBE_API_KEY
   VITE_YOUTUBE_CHANNEL_ID=YOUR_YOUTUBE_CHANNEL_ID
   VITE_EMAILJS_SERVICE_ID=YOUR_EMAILJS_SERVICE_ID
   VITE_EMAILJS_TEMPLATE_ID=YOUR_EMAILJS_TEMPLATE_ID
   VITE_EMAILJS_PUBLIC_KEY=YOUR_EMAILJS_PUBLIC_KEY
   VITE_GEMINI_API_KEY=YOUR_GEMINI_API_KEY
   ```

2. **Replace placeholder images**
   - The template uses placeholder images that say "Your Profile Picture", "Your Design Project 1", etc.
   - Update image URLs in `src/SyedTahaPortfolio2.jsx`:
     - `PROFILE_IMG` - Your profile picture
     - `thumbnailImg`, `astralProjectionImg`, etc. - Your design projects
   - See [IMAGE_REPLACEMENT_GUIDE.md](./IMAGE_REPLACEMENT_GUIDE.md) for detailed instructions

3. **Update personal information**
   - Edit constants in `src/SyedTahaPortfolio2.jsx`
   - Replace profile picture in `src/assets/cv/Profilepicture.jpg`
   - Update CV/resume in `src/assets/cv/mycv.pdf`

3. **Update Firebase config**
   - Update Firebase configuration in `src/components/GeminiChatbot.jsx`

3. **Content**
   - Update skills array in `SyedTahaPortfolio2.jsx`
   - Replace project images and descriptions
   - Update YouTube video embeds

For detailed customization instructions, please refer to the [full documentation](./TEMPLATE_DOCUMENTATION.md).

---

© 2025 Your Name | Template from Envato Market
