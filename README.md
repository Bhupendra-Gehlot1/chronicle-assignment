# AI Writing Assistant

A modern, AI-powered writing companion that helps you continue your creative thoughts using Google's Gemini AI. Built with React, TypeScript, and cutting-edge web technologies.

## ✨ Features

- **AI-Powered Continuation**: Start writing and let Gemini AI intelligently continue your story
- **Rich Text Editor**: Professional editing experience powered by ProseMirror
- **Real-time Analytics**: Track your writing progress with word and character counts
- **Modern UI**: Beautiful, responsive interface built with Tailwind CSS
- **State Management**: Robust state handling with XState
- **TypeScript**: Full type safety throughout the application

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd assignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to see the application.

### Getting a Gemini API Key

1. Visit the [Google AI Studio](https://aistudio.google.com/)
2. Sign in with your Google account
3. Generate an API key
4. Add it to your `.env` file

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🏗️ Technology Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: XState 5
- **Text Editor**: ProseMirror
- **AI Integration**: Google Gemini AI
- **Build Tool**: Vite 7
- **Linting**: ESLint 9

## 📖 How to Use

1. **Start Writing**: Type your initial thoughts or story beginning in the editor
2. **Get AI Help**: Click the "Continue the Story" button to have Gemini AI suggest a continuation
3. **Edit & Refine**: Use the rich text editor to modify and polish your content
4. **Track Progress**: Monitor your writing statistics in real-time

## 🔧 Project Structure

```
src/
├── components/         # React components
│   └── TextEditor.tsx  # ProseMirror-based rich text editor
├── constants/          # Application constants and types
├── machines/           # XState state machines
├── services/           # External service integrations (Gemini AI)
├── assets/             # Static assets
└── App.tsx             # Main application component
```

## 🎯 Key Features Explained

### AI-Powered Writing Assistance
The application integrates with Google's Gemini AI to provide intelligent text continuation. Simply start writing, and the AI will suggest natural continuations based on your content.

### Rich Text Editing
Built with ProseMirror, the editor provides a professional writing experience with features like:
- Rich text formatting
- Undo/redo functionality
- Keyboard shortcuts
- Responsive design

### State Management
XState manages the application's complex state transitions, handling:
- Content updates
- Loading states
- Error handling
- User interactions

## 🚨 Environment Setup

Make sure to set up your environment variables properly:

```env
# Required
VITE_GEMINI_API_KEY=your_api_key_here
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and for assignment purposes.

## 🔗 Useful Links

- [Google Gemini AI Documentation](https://ai.google.dev/)
- [ProseMirror Documentation](https://prosemirror.net/)
- [XState Documentation](https://xstate.js.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Vite Documentation](https://vite.dev/)
