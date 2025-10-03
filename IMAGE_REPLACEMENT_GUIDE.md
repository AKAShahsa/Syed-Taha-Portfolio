# Image Replacement Guide

This document provides guidance on replacing all placeholder images in the portfolio template with your own.

## Current Placeholder Images

The template currently uses placeholder images that clearly indicate where you need to add your own content:

- Profile picture: Shows "Your Profile Picture"
- Design projects: Show "Your Design Project 1", "Your Design Project 2", etc.
- Certificates: Show "Certificate 1", "Certificate 2", etc.

## Key Images to Replace

### Profile/Personal Images

1. **Profile Picture**
   - **Current**: Placeholder URL in code
   - **Used in**: Header, About section
   - **How to replace**: Update the `PROFILE_IMG` constant in `SyedTahaPortfolio2.jsx`
   - **Recommended size**: 400x400px, square ratio
   - **Example**:
     ```jsx
     const PROFILE_IMG = 'https://your-image-host.com/your-profile.jpg';
     // OR if hosting locally:
     const PROFILE_IMG = 'src/assets/cv/your-profile.jpg';
     ```

2. **CV/Resume**
   - **Current**: `CV_LINK = '#'` (disabled link)
   - **Used in**: CV download button
   - **How to replace**: Update the `CV_LINK` constant
   - **Example**:
     ```jsx
     const CV_LINK = 'https://your-website.com/your-cv.pdf';
     // OR if hosting locally:
     const CV_LINK = 'src/assets/cv/your-cv.pdf';
     ```

### Project/Design Examples

**Current**: Placeholder URLs in `SyedTahaPortfolio2.jsx`

1. **Design Example 1**
   - **Variable**: `thumbnailImg`
   - **Current**: `https://via.placeholder.com/800x600/1a202c/00e676?text=Your+Design+Project+1`

2. **Design Example 2**  
   - **Variable**: `astralProjectionImg`
   - **Current**: `https://via.placeholder.com/800x600/1a202c/00e676?text=Your+Design+Project+2`

3. **Design Example 3**
   - **Variable**: `thumbionaliImg`
   - **Current**: `https://via.placeholder.com/800x600/1a202c/00e676?text=Your+Design+Project+3`

4. **Design Example 4**
   - **Variable**: `thumbnailtayaarImg`
   - **Current**: `https://via.placeholder.com/800x600/1a202c/00e676?text=Your+Design+Project+4`

**How to replace**: Update these variables in `SyedTahaPortfolio2.jsx`:
```jsx
const thumbnailImg = 'https://your-host.com/project1.jpg';
const astralProjectionImg = 'https://your-host.com/project2.jpg';
// etc.
```

## How to Replace Images

### Method 1: Use hosted images (Recommended for beginners)

1. Upload your images to an image hosting service (Imgur, Cloudinary, etc.)
2. Copy the direct image URLs
3. Replace the placeholder URLs in the code with your URLs

### Method 2: Add images to the project locally

1. Add your images to the `src/assets/` directory
2. Import them at the top of the file:
   ```jsx
   import yourProfileImg from './assets/your-profile.jpg';
   import yourProject1 from './assets/your-project1.jpg';
   ```
3. Update the constants to use the imported images:
   ```jsx
   const PROFILE_IMG = yourProfileImg;
   const thumbnailImg = yourProject1;
   ```

## Certificate Images

Certificates already use placeholder URLs. To replace them:

1. Find the `certificates` array in `SyedTahaPortfolio2.jsx`
2. Update the `image` property for each certificate:
   ```jsx
   {
     id: 1,
     title: "Your Certificate Title",
     issuer: "Issuing Organization", 
     date: "2024",
     image: "https://your-host.com/your-certificate.jpg", // Replace this URL
     description: "Your certificate description",
     icon: SiAdobepremierepro,
     color: "#9999ff"
   }
   ```

## Image Optimization Tips

1. **Compress images**: Use tools like TinyPNG or ImageOptim
2. **Recommended sizes**:
   - Profile picture: 400x400px
   - Project images: 800x600px minimum
   - Certificates: 600x400px
3. **Keep file sizes**: Under 300KB for faster loading
4. **Use modern formats**: WebP when possible, JPEG for photos, PNG for graphics
