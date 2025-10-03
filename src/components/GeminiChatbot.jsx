import React, { useState, useRef, useEffect } from 'react';
import { FaTimes, FaPaperPlane, FaRobot } from 'react-icons/fa';
import { animate } from 'animejs';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, set, onValue } from 'firebase/database';

// Gemini API integration
// Using the correct endpoint URL from Google AI documentation
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyCHuKm1Z7-5Zj2u5JRFwe7wpIsBLMgazqA';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

// Firebase configuration
// TEMPLATE CUSTOMIZATION: Replace with your Firebase project configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyD6CwedjJdcDjw-fd1WUhigu6BuseGLUhk",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "syed-taha-protfolio.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://syed-taha-protfolio-default-rtdb.firebaseio.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "syed-taha-protfolio",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "syed-taha-protfolio.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "661743042303",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:661743042303:web:b7cecc88ace19d778416ca",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-CYZ70QEZKT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// TEMPLATE CUSTOMIZATION: Update with your own portfolio information
const PORTFOLIO_INFO = {
  name: 'Syed Taha',
  email: 'tahasyed225@gmail.com',
  phone: '+923115929527',
  location: 'Pakistan, Abbottabad',
  field: 'Creative Digital Artist & Video Editor',
  youtube: '@iamsyedtaha',
  skills: [
    'Photoshop (3+ years experience)',
    'Premiere Pro (3+ years experience)',
    'After Effects (3+ years experience)',
    'React JS (2+ years experience)',
    'Python (3+ years experience)',
    'Firebase + Supabase + MongoDB (2+ years experience)',
    'Video Editing & Motion Graphics',
    'UI/UX Design',
    'Digital Art & Photo Manipulation'
  ],
  services: [
    'Video Editing & Motion Graphics',
    'Subtitle Creation & Synchronization',
    'Beat Scene Synchronization',
    'Photoshop Design & Tutorials',
    'AI-Enhanced Content Creation',
    'Web Development'
  ],
  languages: [
    'English (Fluent)',
    'Urdu (Native)',
    'Hindi (Conversational)'
  ],
  education: 'Creative Digital Arts & Computer Science',
  equipment: 'High-end laptop and PC',
  hobbies: [
    'Creating YouTube Shorts & Tutorials',
    'Coding',
    'Traveling',
    'Boxing'
  ]
};

// Fallback response function for when API is not configured
const getFallbackResponse = (message) => {
  const fallbackResponses = {
    greeting: "👋 Hello! I'm Syed Taha's AI assistant. How can I help you today?",
    about: "I'm an AI assistant for **Syed Taha**, a Creative Digital Artist & Video Editor based in Pakistan, Abbottabad. Syed specializes in video editing, motion graphics, subtitles, and creative content creation with 3+ years of experience.",
    contact: "You can contact Syed Taha at:\n\n📧 **Email**: tahasyed225@gmail.com\n📱 **Phone**: +923115929527\n📍 **Location**: Pakistan, Abbottabad",
    skills: "Syed's skills include:\n\n**Creative Software**\n- Photoshop (3+ years experience)\n- Premiere Pro (3+ years experience)\n- After Effects (3+ years experience)\n\n**Programming & Development**\n- React JS (2+ years experience)\n- Python (3+ years experience)\n- Firebase + Supabase + MongoDB (2+ years experience)",
    services: "Syed offers the following services:\n\n🎬 **Video Editing & Motion Graphics**\n- Subtitle Creation & Synchronization\n- Beat Scene Synchronization\n- Long Form Video Production\n\n🎨 **Creative Design**\n- Photoshop Design & Tutorials\n- AI-Enhanced Content Creation\n- Digital Art & Photo Manipulation",
    education: "Syed studied Creative Digital Arts & Computer Science.",
    languages: "Syed is fluent in:\n\n- English (Fluent)\n- Urdu (Native)\n- Hindi (Conversational)",
    youtube: "Check out Syed's YouTube channel: **@iamsyedtaha** where he creates video editing tutorials, creative content, and showcases his work. You can check it out [here](https://www.youtube.com/@iamsyedtaha).",
    hobbies: "Syed's interests include:\n\n- Video Editing & Motion Graphics\n- Digital Art Creation\n- Learning New Technologies\n- Creative Content Development",
    hire: "Interested in working with Syed? Great choice! You can reach out via:\n\n📧 **Email**: tahasyed225@gmail.com\n📱 **WhatsApp**: +923115929527\n\nPlease include details about your project requirements and timeline for a faster response.",
    setup: `🔧 **Setup Required**\n\nTo enable full AI functionality, please configure your Gemini API key in the \`.env\` file.\n\nFor now, I can provide basic information about Syed's skills, services, and contact details.`,
    default: "Thanks for your message! I can tell you about Syed's skills, services, experience, or contact information. What would you like to know?\n\n💡 **Tip**: For advanced AI responses, configure the Gemini API key in your .env file."
  };
  
  const lowerMsg = message.toLowerCase();
  
  if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg === 'hey') {
    return fallbackResponses.greeting;
  } else if (lowerMsg.includes('about you') || lowerMsg.includes('who are you') || lowerMsg.includes('tell me about')) {
    return fallbackResponses.about;
  } else if (lowerMsg.includes('contact') || lowerMsg.includes('email') || lowerMsg.includes('phone')) {
    return fallbackResponses.contact;
  } else if (lowerMsg.includes('skill') || lowerMsg.includes('can you do') || lowerMsg.includes('expertise')) {
    return fallbackResponses.skills;
  } else if (lowerMsg.includes('service') || lowerMsg.includes('offer') || lowerMsg.includes('provide')) {
    return fallbackResponses.services;
  } else if (lowerMsg.includes('education') || lowerMsg.includes('study') || lowerMsg.includes('degree')) {
    return fallbackResponses.education;
  } else if (lowerMsg.includes('language') || lowerMsg.includes('speak')) {
    return fallbackResponses.languages;
  } else if (lowerMsg.includes('youtube') || lowerMsg.includes('channel') || lowerMsg.includes('video')) {
    return fallbackResponses.youtube;
  } else if (lowerMsg.includes('hobby') || lowerMsg.includes('interest') || lowerMsg.includes('free time')) {
    return fallbackResponses.hobbies;
  } else if (lowerMsg.includes('hire') || lowerMsg.includes('work with') || lowerMsg.includes('project')) {
    return fallbackResponses.hire;
  } else if (lowerMsg.includes('setup') || lowerMsg.includes('configure') || lowerMsg.includes('api')) {
    return fallbackResponses.setup;
  } else {
    return fallbackResponses.default;
  }
};

// Function to generate response using Gemini API
const generateResponse = async (message) => {
  try {
    // Debug logging
    console.log('API_KEY loaded:', API_KEY ? `${API_KEY.substring(0, 10)}...` : 'NOT LOADED');
    console.log('API key starts with AIza:', API_KEY && API_KEY.startsWith('AIza'));
    
    // Check if API key is configured
    if (!API_KEY || API_KEY === 'YOUR_GEMINI_API_KEY' || !API_KEY.startsWith('AIza')) {
      console.log('API key validation failed, using fallback');
      // Provide setup instructions if API key is not configured
      const lowerMsg = message.toLowerCase();
      
      if (lowerMsg.includes('api') || lowerMsg.includes('setup') || lowerMsg.includes('configure')) {
        return `🔧 **API Setup Instructions**

To enable full AI functionality:

1. **Get Gemini API Key:**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account
   - Click "Create API Key"
   - Copy the generated key

2. **Add to Environment:**
   - Create \`.env\` file in project root
   - Add: \`VITE_GEMINI_API_KEY=your_api_key_here\`
   - Restart development server (\`npm run dev\`)

3. **Update Firebase (Optional):**
   - Update Firebase config in the chatbot component
   - Replace placeholder values with your project details

**Current Status:** API key not configured - using fallback responses.`;
      }
      
      // Fallback responses when API is not configured
      return getFallbackResponse(message);
    }

    console.log('Making API call to:', API_URL);
    // Try to use the Gemini API
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                // TEMPLATE CUSTOMIZATION: Update this prompt with your information
                text: `You are an AI assistant for Syed Taha, a Professional Video Editor and Youtuber. Respond to the following message in a helpful, friendly manner. Include markdown formatting like **bold** for emphasis and [text](url) for links when appropriate. Keep responses concise and relevant.\n\nHere's information about you:\n${JSON.stringify(PORTFOLIO_INFO, null, 2)}\n\nUser message: ${message}`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API request failed with status ${response.status}:`, errorText);
      throw new Error(`API request failed with status ${response.status}: ${errorText}`);
    }
    
    const data = await response.json();
    console.log('Gemini API response:', data);
    
    // Check if we have a valid response
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
      console.log('API call successful, returning response');
      return data.candidates[0].content.parts[0].text;
    }
    
    // If API call succeeds but no valid response, use fallback
    console.log('API call succeeded but no valid response, using fallback');
    return getFallbackResponse(message);
    
  } catch (error) {
    console.error('Error generating response:', error);
    
    // Provide more specific error message for API errors
    if (error.message && error.message.includes('404')) {
      return "I'm having trouble connecting to the Gemini API. There might be an issue with the API endpoint or key. For now, I can provide basic information about skills, services, and contact details.";
    }
    
    // For other errors, use fallback responses
    return getFallbackResponse(message);
  }
};

const GeminiChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [pastConversations, setPastConversations] = useState([]);
  const [showConversations, setShowConversations] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  
  // Check if API key is properly configured
  const isApiKeyConfigured = API_KEY && API_KEY !== 'YOUR_GEMINI_API_KEY' && API_KEY.startsWith('AIza');
  
  // Animation functions for chatbot icon
  const animateChatbotIcon = () => {
    // Continuous breathing effect
    animate('.chatbot-icon', {
      scale: [1, 1.1, 1],
      boxShadow: [
        '0 4px 20px rgba(0, 230, 118, 0.3)',
        '0 8px 40px rgba(0, 230, 118, 0.6)',
        '0 4px 20px rgba(0, 230, 118, 0.3)'
      ],
      duration: 2500,
      loop: true,
      ease: 'inOut(2)'
    });

    // Subtle robot icon rotation
    animate('.chatbot-icon svg', {
      rotate: [0, 5, -5, 0],
      duration: 4000,
      loop: true,
      ease: 'inOut(1)'
    });
  };

  const animateChatbotHover = (target) => {
    animate(target, {
      scale: 1.2,
      rotate: [0, 10, -10, 0],
      boxShadow: '0 8px 40px rgba(0, 230, 118, 0.8)',
      duration: 600,
      ease: 'out(3)'
    });
  };

  const animateChatbotLeave = (target) => {
    animate(target, {
      scale: 1,
      rotate: 0,
      duration: 200,
      ease: 'out(2)'
    });
  };

  const startAttentionAnimation = () => {
    // Periodic attention-grabbing animation
    setInterval(() => {
      const chatbotButton = document.querySelector('.chatbot-icon');
      if (chatbotButton && !isOpen) { // Only animate when chat is closed
        animate(chatbotButton, {
          scale: [1, 1.3, 1],
          rotate: [0, 10, -10, 0],
          boxShadow: [
            '0 4px 20px rgba(0, 230, 118, 0.3)',
            '0 12px 60px rgba(0, 230, 118, 0.9)',
            '0 4px 20px rgba(0, 230, 118, 0.3)'
          ],
          duration: 800,
          ease: 'out(3)'
        });
      }
    }, 8000); // Every 8 seconds
  };
  
  // Create a new conversation in Firebase
  const createNewConversation = () => {
    const conversationsRef = ref(database, 'conversations');
    const newConversationRef = push(conversationsRef);
    const newConversationId = newConversationRef.key;
    
    // Initialize with timestamp and empty messages
    set(newConversationRef, {
      createdAt: new Date().toISOString(),
      messages: []
    });
    
    return newConversationId;
  };
  
  // Save a message to Firebase
  const saveMessageToFirebase = (message) => {
    if (!conversationId) return;
    
    const messagesRef = ref(database, `conversations/${conversationId}/messages`);
    const newMessageRef = push(messagesRef);
    set(newMessageRef, {
      id: message.id,
      text: message.text,
      sender: message.sender,
      timestamp: new Date().toISOString()
    });
  };
  
  // Load conversation from Firebase
  const loadConversationFromFirebase = (convId) => {
    const messagesRef = ref(database, `conversations/${convId}/messages`);
    onValue(messagesRef, (snapshot) => {
      if (snapshot.exists()) {
        const messagesData = snapshot.val();
        const messagesList = Object.values(messagesData).sort((a, b) => a.id - b.id);
        setMessages(messagesList);
      }
    });
  };
  
  // Fetch all past conversations
  const fetchPastConversations = () => {
    const conversationsRef = ref(database, 'conversations');
    onValue(conversationsRef, (snapshot) => {
      if (snapshot.exists()) {
        const conversationsData = snapshot.val();
        const conversationsList = Object.entries(conversationsData).map(([key, value]) => {
          // Get the first message as preview (usually the greeting)
          const messages = value.messages ? Object.values(value.messages) : [];
          const firstMessage = messages.length > 0 ? 
            messages.sort((a, b) => a.id - b.id)[0].text : 
            "Empty conversation";
          
          // Get the last message timestamp for sorting
          const lastMessage = messages.length > 0 ? 
            messages.sort((a, b) => b.id - a.id)[0] : 
            null;
          
          return {
            id: key,
            createdAt: value.createdAt,
            preview: firstMessage.substring(0, 50) + (firstMessage.length > 50 ? '...' : ''),
            lastMessageTime: lastMessage ? lastMessage.timestamp : value.createdAt
          };
        });
        
        // Sort by most recent conversation
        conversationsList.sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime));
        setPastConversations(conversationsList);
      }
    });
  };
  
  // Delete a conversation
  const deleteConversation = (convId, event) => {
    // Stop the event from bubbling up to parent elements
    event.stopPropagation();
    
    if (window.confirm('Are you sure you want to delete this conversation?')) {
      const conversationRef = ref(database, `conversations/${convId}`);
      set(conversationRef, null);
      
      // If we're deleting the current conversation, start a new one
      if (convId === conversationId) {
        startNewConversation();
      }
    }
  };
  
  // Export conversation as JSON
  const exportConversation = (convId, event) => {
    // Stop the event from bubbling up to parent elements
    event.stopPropagation();
    
    const messagesRef = ref(database, `conversations/${convId}/messages`);
    onValue(messagesRef, (snapshot) => {
      if (snapshot.exists()) {
        const messagesData = snapshot.val();
        const messagesList = Object.values(messagesData).sort((a, b) => a.id - b.id);
        
        // Create a JSON file and trigger download
        const dataStr = JSON.stringify(messagesList, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `conversation-${convId.substring(0, 8)}-${new Date().toISOString().slice(0, 10)}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
      }
    }, { onlyOnce: true }); // Only read once, not continuously
  };
  
  // Clear all conversations
  const clearAllConversations = () => {
    if (window.confirm('Are you sure you want to delete ALL conversations? This cannot be undone.')) {
      const conversationsRef = ref(database, 'conversations');
      set(conversationsRef, null);
      startNewConversation();
    }
  };

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Fetch past conversations when component mounts
  useEffect(() => {
    fetchPastConversations();
  }, []);

  // Focus input when chat opens and initialize conversation
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      
      // Create a new conversation if none exists
      if (!conversationId) {
        const newConversationId = createNewConversation();
        setConversationId(newConversationId);
        
        // Add initial greeting if no messages
        if (messages.length === 0) {
          let initialMessage;
          
          if (!isApiKeyConfigured) {
            // Show setup instructions if API key is not configured
            initialMessage = {
              id: 1,
              text: `🤖 **AI Chatbot Setup Required**

Hi! I'm your AI assistant, but I need to be configured first.

**To enable AI responses:**

1. **Get a Gemini API Key:**
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key for Gemini

2. **Add it to your environment:**
   - Create a \`.env\` file in your project root
   - Add: \`VITE_GEMINI_API_KEY=your_actual_api_key_here\`
   - Restart your development server

**Current Status:** ❌ API key not configured

For now, I can provide basic responses about the portfolio, but AI features are limited.

Try asking: "What are your skills?" or "How can I contact you?"`,
              sender: 'ai'
            };
          } else {
            // Normal greeting when API is configured
            initialMessage = {
              id: 1,
              text: "👋 Hi there! I'm your AI assistant. I can tell you about skills, services, projects, and help with any questions you have. How can I help you today?",
              sender: 'ai'
            };
          }
          
          setMessages([initialMessage]);
          
          // Save initial message to Firebase
          setTimeout(() => {
            saveMessageToFirebase(initialMessage);
          }, 100);
        }
      } else {
        // Load existing conversation
        loadConversationFromFirebase(conversationId);
      }
    }
  }, [isOpen, conversationId]);

  // Initialize chatbot icon animations
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('Initializing chatbot animations...');
      animateChatbotIcon();
      startAttentionAnimation();
      console.log('Chatbot animations initialized!');
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setShowConversations(false); // Hide conversations list when toggling chat
  };
  
  const toggleConversationsList = () => {
    setShowConversations(!showConversations);
  };
  
  const switchConversation = (convId) => {
    setConversationId(convId);
    loadConversationFromFirebase(convId);
    setShowConversations(false); // Hide the list after selection
  };
  
  const startNewConversation = () => {
    const newConversationId = createNewConversation();
    setConversationId(newConversationId);
    setMessages([]);
    setShowConversations(false);
    
    // Add initial greeting
    const initialMessage = {
      id: 1,
      text: "👋 Hi there! I'm Syed Taha's AI assistant. How can I help you today?",
      sender: 'ai'
    };
    
    setMessages([initialMessage]);
    saveMessageToFirebase(initialMessage);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isSubmitting) {
        handleSendMessage();
      }
    }
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === '' || isSubmitting) return;
    
    // Ensure we have a conversation ID
    if (!conversationId) {
      const newConversationId = createNewConversation();
      setConversationId(newConversationId);
    }

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user'
    };

    const currentInput = inputValue;
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setIsSubmitting(true);
    
    // Save user message to Firebase
    saveMessageToFirebase(userMessage);

    try {
      // Add a small delay to make the interaction feel more natural
      await new Promise(resolve => setTimeout(resolve, 500));

      // Get response from Gemini API
      const responseText = await generateResponse(currentInput);
      
      const aiResponse = {
        id: Date.now() + 1,
        text: responseText,
        sender: 'ai'
      };
      
      setMessages(prev => [...prev, aiResponse]);
      
      // Save AI response to Firebase
      saveMessageToFirebase(aiResponse);
    } catch (error) {
      console.error('Error getting response:', error);
      
      // Add error message
      const errorResponse = {
        id: Date.now() + 1,
        text: "I'm having trouble connecting right now. Please try again later.",
        sender: 'ai'
      };
      
      setMessages(prev => [...prev, errorResponse]);
      
      // Save error response to Firebase
      saveMessageToFirebase(errorResponse);
    } finally {
      setIsTyping(false);
      setIsSubmitting(false);
    }
  };

  // Function to render message text with markdown-like formatting
  const renderMessageText = (text) => {
    // Convert **bold** to <strong>
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Convert [link](url) to <a>
    formattedText = formattedText.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[#00E676] underline hover:text-[#4eff9e] transition-colors">$1</a>');
    
    // Convert line breaks to <br>
    formattedText = formattedText.replace(/\n/g, '<br />');
    
    return <div dangerouslySetInnerHTML={{ __html: formattedText }} />;
  };

  return (
    <div className="fixed bottom-5 left-5 z-50">
      {/* Custom CSS for professional scrollbars and animations */}
      <style jsx>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #00E676 #041827;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #021728;
          border-radius: 10px;
          margin: 5px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #00E676, #4eff9e);
          border-radius: 10px;
          border: 2px solid #021728;
          transition: all 0.3s ease;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #4eff9e, #00E676);
          box-shadow: 0 0 10px rgba(0, 230, 118, 0.5);
        }
        
        .message-enter {
          animation: messageSlideIn 0.3s ease-out;
        }
        
        @keyframes messageSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .chat-window-enter {
          animation: chatWindowSlideUp 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        @keyframes chatWindowSlideUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .typing-indicator {
          animation: typingPulse 1.5s infinite;
        }
        
        @keyframes typingPulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        
        .glassmorphism {
          backdrop-filter: blur(20px);
          background: rgba(2, 23, 40, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        
        .gradient-border {
          position: relative;
          background: linear-gradient(135deg, #021728, #041827);
          border: 1px solid transparent;
        }
        
        .gradient-border::before {
          content: '';
          position: absolute;
          inset: 0;
          padding: 1px;
          background: linear-gradient(135deg, #00E676, #4eff9e, #00E676);
          border-radius: inherit;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          opacity: 0.3;
        }
        
        .shimmer-effect {
          position: relative;
          overflow: hidden;
        }
        
        .shimmer-effect::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(0, 230, 118, 0.2),
            transparent
          );
          animation: shimmer 2s infinite;
        }
        
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
      `}</style>

      {/* Chat toggle button */}
      <button
        onClick={toggleChat}
        onMouseEnter={(e) => {
          animateChatbotHover(e.target);
        }}
        onMouseLeave={(e) => {
          animateChatbotLeave(e.target);
        }}
        className="interactive chatbot-icon w-16 h-16 rounded-full bg-gradient-to-br from-[#00E676] to-[#4eff9e] text-[#001313] flex items-center justify-center shadow-2xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#00E676]/50 shimmer-effect"
        aria-label="Open AI assistant chat"
        title={isApiKeyConfigured ? "Chat with AI Assistant (Gemini AI Active)" : "Chat with AI Assistant (Fallback Mode - Configure API key for full features)"}
      >
        {isOpen ? <FaTimes size={22} /> : <FaRobot size={26} />}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div 
          className="absolute bottom-20 left-0 w-80 sm:w-96 h-[500px] glassmorphism rounded-2xl shadow-2xl overflow-hidden flex flex-col chat-window-enter"
          role="dialog"
          aria-labelledby="chatbot-title"
        >
          {/* Chat header */}
          <div className="p-4 bg-gradient-to-r from-[#041827] to-[#063042] border-b border-[#00E676]/20 flex items-center justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00E676]/5 to-transparent"></div>
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00E676]/30 to-[#4eff9e]/30 flex items-center justify-center backdrop-blur-sm border border-[#00E676]/30">
                <FaRobot className="text-[#00E676] text-lg" />
              </div>
              <div>
                <div id="chatbot-title" className="font-bold text-white text-lg">AI Assistant</div>
                <div className="text-xs text-gray-300">
                  {isApiKeyConfigured ? (
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      <span className="bg-green-500/20 px-2 py-0.5 rounded-full text-green-300">Gemini AI Active</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                      <span className="bg-yellow-500/20 px-2 py-0.5 rounded-full text-yellow-300">Fallback Mode</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 relative z-10">
              <button 
                onClick={toggleConversationsList}
                className="interactive p-2 rounded-xl hover:bg-[#00E676]/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00E676]/50 backdrop-blur-sm"
                aria-label="View conversation history"
                title="View conversation history"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300 hover:text-[#00E676] transition-colors" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
              <button 
                onClick={toggleChat}
                className="interactive p-2 rounded-xl hover:bg-red-500/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500/50 backdrop-blur-sm"
                aria-label="Close chat"
              >
                <FaTimes className="text-gray-300 hover:text-red-400 transition-colors" />
              </button>
            </div>
          </div>

          {/* Conversation history panel */}
          {showConversations && (
            <div className="absolute inset-0 glassmorphism z-10 flex flex-col rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-[#041827] to-[#063042] border-b border-[#00E676]/20 p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00E676]/30 to-[#4eff9e]/30 flex items-center justify-center mr-3">
                    <FaRobot className="text-[#00E676]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Conversation History</h3>
                    <p className="text-xs text-gray-300">{pastConversations.length} conversation{pastConversations.length !== 1 ? 's' : ''}{conversationId ? ` (Current: ${conversationId.substring(0, 8)}...)` : ''}</p>
                  </div>
                </div>
                <button 
                  onClick={toggleConversationsList}
                  className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#00E676]/50 p-2 rounded-xl hover:bg-[#00E676]/20 transition-all duration-300"
                  aria-label="Close history"
                >
                  <FaTimes />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
                 <div className="flex gap-2 mb-3">
                   <button
                     onClick={startNewConversation}
                     className="flex-1 p-3 bg-gradient-to-br from-[#041827] to-[#063042] hover:from-[#00E676]/20 hover:to-[#4eff9e]/20 text-[#00E676] rounded-xl flex items-center justify-center transition-all duration-300 border border-[#00E676]/30 backdrop-blur-sm shimmer-effect"
                   >
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                       <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                     </svg>
                     New Chat
                   </button>
                   <button
                     onClick={clearAllConversations}
                     className="p-3 bg-gradient-to-br from-[#041827] to-[#063042] hover:from-red-900/50 hover:to-red-800/50 text-gray-400 hover:text-red-300 rounded-xl flex items-center justify-center transition-all duration-300 border border-[#063042] backdrop-blur-sm"
                     title="Clear all conversations"
                     aria-label="Clear all conversations"
                   >
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                       <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                     </svg>
                   </button>
                 </div>
                
                {pastConversations.length === 0 ? (
                   <div className="text-center text-gray-400 p-8">
                     <FaRobot className="mx-auto text-4xl mb-3 opacity-50" />
                     <p className="text-lg font-medium">No conversations yet</p>
                     <p className="text-sm">Start chatting to see your history</p>
                   </div>
                 ) : (
                   pastConversations.map(conversation => (
                     <div key={conversation.id} className="relative mb-3 message-enter">
                       <button
                         onClick={() => switchConversation(conversation.id)}
                         className={`w-full p-4 text-left rounded-xl transition-all duration-300 backdrop-blur-sm ${
                           conversation.id === conversationId 
                             ? 'bg-gradient-to-br from-[#00E676]/20 to-[#4eff9e]/20 border border-[#00E676]/50 shadow-lg' 
                             : 'bg-gradient-to-br from-[#041827]/80 to-[#063042]/80 border border-[#063042] hover:border-[#00E676]/30 hover:bg-[#00E676]/10'
                         }`}
                       >
                         <div className="text-sm font-medium truncate text-white pr-12">{conversation.preview}</div>
                         <div className="text-xs text-gray-300 mt-2 bg-[#041827]/50 px-2 py-1 rounded-full inline-block">
                           {new Date(conversation.lastMessageTime).toLocaleString()}
                         </div>
                       </button>
                       <div className="absolute top-3 right-3 flex space-x-1">
                          <button 
                            onClick={(e) => exportConversation(conversation.id, e)}
                            className="p-2 text-gray-400 hover:text-blue-400 hover:bg-[#00E676]/20 rounded-full transition-all duration-300 backdrop-blur-sm"
                            aria-label="Export conversation"
                            title="Export conversation"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                          <button 
                            onClick={(e) => deleteConversation(conversation.id, e)}
                            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/20 rounded-full transition-all duration-300 backdrop-blur-sm"
                            aria-label="Delete conversation"
                            title="Delete conversation"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                     </div>
                   ))
                 )}
              </div>
            </div>
          )}
          
          {/* Messages container */}
          <div className="flex-1 p-4 overflow-y-auto custom-scrollbar" aria-live="polite" role="log">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} message-enter`}
              >
                <div 
                  className={`max-w-[85%] p-4 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] ${
                    message.sender === 'user' 
                      ? 'bg-gradient-to-br from-[#00E676] to-[#4eff9e] text-[#001313] shadow-lg shadow-[#00E676]/25' 
                      : 'glassmorphism text-white border border-[#00E676]/20 shadow-lg'
                  }`}
                  role={message.sender === 'ai' ? 'status' : ''}
                >
                  {message.sender === 'ai' && (
                    <div className="flex items-center gap-2 mb-2 pb-2 border-b border-[#00E676]/20">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#00E676]/30 to-[#4eff9e]/30 flex items-center justify-center">
                        <FaRobot className="text-[#00E676] text-xs" />
                      </div>
                      <span className="text-xs text-gray-300 font-medium">AI Assistant</span>
                    </div>
                  )}
                  <div className={message.sender === 'user' ? 'font-medium' : ''}>
                    {renderMessageText(message.text)}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start mb-4 message-enter">
                <div className="glassmorphism border border-[#00E676]/20 p-4 rounded-2xl text-white shadow-lg typing-indicator">
                  <div className="flex items-center gap-2 mb-2 pb-2 border-b border-[#00E676]/20">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#00E676]/30 to-[#4eff9e]/30 flex items-center justify-center">
                      <FaRobot className="text-[#00E676] text-xs" />
                    </div>
                    <span className="text-xs text-gray-300 font-medium">AI Assistant is typing...</span>
                  </div>
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-[#00E676] rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-[#00E676] rounded-full animate-bounce" style={{animationDelay: "0.2s"}}></span>
                    <span className="w-2 h-2 bg-[#00E676] rounded-full animate-bounce" style={{animationDelay: "0.4s"}}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="p-4 bg-gradient-to-r from-[#041827] to-[#063042] border-t border-[#00E676]/20 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder={isApiKeyConfigured ? "Ask me anything..." : "Ask about skills, services, contact info..."}
                  className="interactive w-full px-4 py-3 rounded-xl glassmorphism border border-[#00E676]/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00E676]/50 focus:border-[#00E676]/50 transition-all duration-300 backdrop-blur-sm"
                  aria-label="Type your message"
                  autoComplete="off"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#00E676]/5 to-[#4eff9e]/5 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <button
                onClick={handleSendMessage}
                disabled={inputValue.trim() === '' || isSubmitting}
                className="interactive p-3 rounded-xl bg-gradient-to-br from-[#00E676] to-[#4eff9e] text-[#001313] disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#00E676]/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#00E676]/25 shimmer-effect"
                aria-label="Send message"
              >
                <FaPaperPlane className="text-lg" />
              </button>
            </div>
            <div className="mt-2 text-xs text-gray-400 text-center">
              {isApiKeyConfigured ? 
                "Powered by Gemini AI • Type your message and press Enter" : 
                "Fallback mode • Configure Gemini API for full AI features"
              }
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default GeminiChatbot;