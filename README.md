# Acedemic-Comic

Transform academic materials into entertaining educational comic books using AI-powered generation.

## 🎯 Overview

**Acedemic-Comic** is an innovative web application that converts educational documents into visually engaging comic books. It uses advanced AI to extract academic content, generate witty narratives with humor, and create visual panels—making learning more fun and memorable.

Whether you're a student looking to better understand complex topics or an educator seeking creative ways to present material, Acedemic-Comic bridges the gap between serious academics and entertaining storytelling.

## ✨ Key Features

- **Smart Content Extraction**: Upload academic materials (PDFs, PowerPoint presentations, Word documents, text files, or Markdown) and let AI intelligently extract key concepts and information
- **Accurate Academic Summarization**: Complex topics are distilled into clear, structured summaries that preserve educational integrity while maintaining accuracy
- **AI-Powered Comic Script Generation**: Original comic narratives are crafted with your choice of humor styles (Witty, Sarcastic, Silly, or Pun-based) that enhance rather than diminish educational value
- **Dynamic Visual Generation**: Each comic panel is rendered with consistent artistic style—minimalist comic art with neon accents (cyan, purple, magenta) in a futuristic academic aesthetic
- **Customizable Parameters**:
  - Set comic title and academic topic
  - Choose humor style to match your preference
  - Control page count (3-20 pages)
- **Persistent Comic Library**: Access all your generated comics in one place with creation timestamps and viewing options
- **Multi-Format Export**: Download individual panels or entire comics as high-quality images
- **Print-Friendly Viewing**: View comics in multiple formats including print-optimized layouts

## 🚀 How It Works

The comic generation pipeline follows five intelligent steps:

1. **Content Extraction** - Uploaded academic material is analyzed to extract key concepts, theories, and facts
2. **Academic Analysis** - Information is summarized into clear, structured concepts with explanations, facts, and real-world applications
3. **Script Writing** - AI creates an engaging comic narrative that balances humor with educational accuracy
4. **Image Generation** - AI renders each comic panel based on detailed visual descriptions, ensuring consistency across all pages
5. **Finalization** - Your complete comic is ready for viewing, sharing, and downloading

## 🛠️ Technology Stack

- **Frontend Framework**: React with React Router for navigation
- **UI Components**: shadcn/ui library with Radix UI primitives
- **Styling**: CSS with Tailwind support
- **Icons**: Lucide React for consistent iconography
- **State Management**: React Hooks with React Query for data fetching
- **Backend Integration**: Base44 framework for:
  - File uploads and storage
  - LLM integration for content extraction and script generation
  - Image generation with AI
  - Database entity management
- **Notifications**: Sonner for toast notifications
- **Utilities**: date-fns for date formatting

## 📱 User Workflow

1. **Create New Comic**
   - Navigate to Home page
   - Upload your academic material (PDF, PPTX, DOCX, TXT, or Markdown)
   - Enter comic title and academic topic
   - Select humor style preference
   - Set desired page count
   - Click "Generate Comic"

2. **Monitor Generation**
   - Watch real-time progress through the 5-step pipeline
   - See estimated time based on page count
   - Automatic redirect to viewer when complete

3. **View & Interact**
   - Navigate between pages using arrow buttons
   - View panel details and dialogue
   - Download individual images or entire comic
   - Print-optimized viewing available

4. **Manage Collection**
   - Access Library to view all generated comics
   - Sort by creation date or topic
   - Quick preview and re-access functionality

## 🎨 Customization Options

### Humor Styles
- **Witty** - Clever wordplay and intellectual humor
- **Sarcastic** - Dry, ironic commentary on academic topics
- **Silly** - Lighthearted, absurdist humor
- **Pun-based** - Heavy emphasis on puns and wordplay

### Comic Parameters
- **Title**: Custom name for your comic
- **Topic**: Academic subject area
- **Page Count**: 3-20 pages (recommended 8-12 for balanced length)
- **Visual Style**: Consistent minimalist comic art with futuristic neon aesthetic

## 🌐 Live Application

Visit the deployed application: [https://academicomic.base44.app/home](https://academicomic.base44.app/home)

## 📚 Use Cases

- **Students**: Simplify complex course materials and improve retention through visual learning
- **Educators**: Create engaging supplementary materials to enhance classroom learning
- **Content Creators**: Transform existing academic content into shareable, entertaining formats
- **Academic Institutions**: Develop innovative study materials for diverse learning styles

## 🔄 Data Flow

```
User Input (File + Parameters)
    ↓
File Upload → Content Extraction (LLM)
    ↓
Academic Summarization (LLM)
    ↓
Comic Script Generation (LLM + JSON Schema)
    ↓
Batch Image Generation (AI)
    ↓
Database Storage (Comic Entity)
    ↓
Interactive Viewer + Library Access
    ↓
Export/Download/Print Options
```