import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";
import ProgressTracker from "../components/comic/ProgressTracker";
import { toast } from "sonner";

export default function Generator() {
  const navigate = useNavigate();
  const [comic, setComic] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const urlParams = new URLSearchParams(window.location.search);
  const comicId = urlParams.get("id");

  useEffect(() => {
    if (comicId) {
      loadAndGenerateComic();
    }
  }, [comicId]);

  const loadAndGenerateComic = async () => {
    try {
      const comicData = await base44.entities.Comic.get(comicId);
      setComic(comicData);
      await generateComic(comicData);
    } catch (error) {
      toast.error("Failed to load comic");
      console.error(error);
    }
  };

  const generateComic = async (comicData) => {
    try {
      // Step 1: Extract content from uploaded file
      setCurrentStep(1);
      await base44.entities.Comic.update(comicData.id, { status: "extracting" });
      
      const extractedContent = await base44.integrations.Core.InvokeLLM({
        prompt: `You are an expert academic content extractor. Analyze the following document and extract the key academic concepts, theories, facts, and information. Focus on the main educational content that would be valuable for learning.

Topic: ${comicData.topic}

Provide a comprehensive summary that captures all important educational points in a clear, structured format.`,
        file_urls: [comicData.uploaded_file_url]
      });

      // Step 2: Create academic summary
      setCurrentStep(2);
      const academicSummary = await base44.integrations.Core.InvokeLLM({
        prompt: `You are an expert educator. Create a clear, accurate academic summary of the following content about "${comicData.topic}". 

Organize the information into key concepts, each with:
- Main concept/theory name
- Clear explanation
- Important facts or formulas
- Real-world applications or examples

Content to summarize:
${extractedContent}

Make it educational, accurate, and well-structured for learning.`
      });

      await base44.entities.Comic.update(comicData.id, { 
        academic_summary: academicSummary 
      });

      // Step 3: Generate comic script
      setCurrentStep(3);
      await base44.entities.Comic.update(comicData.id, { status: "scripting" });

      const scriptResponse = await base44.integrations.Core.InvokeLLM({
        prompt: `You are a master comic book writer who creates educational comics. Create a ${comicData.page_count}-page comic script about "${comicData.topic}" with ${comicData.humor_style} humor.

Academic Content:
${academicSummary}

CRITICAL REQUIREMENTS:
1. Create EXACTLY ${comicData.page_count} pages
2. Each page should have 2-4 panels
3. Humor style: ${comicData.humor_style}
4. Keep academic accuracy - never compromise educational content
5. Use characters that personify concepts or represent students/professors
6. Include dialogue that's both funny and educational
7. Each panel needs a visual scene description and dialogue

Output as JSON with this EXACT structure:
{
  "pages": [
    {
      "page_number": 1,
      "panels": [
        {
          "panel_number": 1,
          "scene_description": "Detailed visual description for image generation",
          "dialogue": "What the characters say",
          "image_prompt": "Detailed prompt for image generation (minimalist comic art style, simple clean lines, academic theme)"
        }
      ]
    }
  ]
}`,
        response_json_schema: {
          type: "object",
          properties: {
            pages: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  page_number: { type: "number" },
                  panels: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        panel_number: { type: "number" },
                        scene_description: { type: "string" },
                        dialogue: { type: "string" },
                        image_prompt: { type: "string" }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      });

      // Step 4: Generate images for all panels
      setCurrentStep(4);
      await base44.entities.Comic.update(comicData.id, { status: "generating_images" });

      const pagesWithImages = [];
      
      for (const page of scriptResponse.pages) {
        const panelsWithImages = [];
        
        for (const panel of page.panels) {
          const imageResult = await base44.integrations.Core.GenerateImage({
            prompt: `${panel.image_prompt}. Minimalist comic book art style, simple clean lines, black and white with neon accent colors (cyan, purple, magenta), futuristic aesthetic, academic theme. ${comicData.topic} concept visualization.`
          });
          
          panelsWithImages.push({
            ...panel,
            image_url: imageResult.url
          });
        }
        
        pagesWithImages.push({
          ...page,
          panels: panelsWithImages
        });
      }

      // Generate cover image
      const coverImage = await base44.integrations.Core.GenerateImage({
        prompt: `Comic book cover for "${comicData.title}". Topic: ${comicData.topic}. Futuristic minimalist style, neon colors (cyan, purple, magenta), academic theme, clean bold title text, professional comic book cover design`
      });

      // Step 5: Complete
      setCurrentStep(5);
      await base44.entities.Comic.update(comicData.id, {
        script: pagesWithImages,
        cover_image_url: coverImage.url,
        status: "completed"
      });

      toast.success("Comic generated successfully!");
      
      // Navigate to viewer
      setTimeout(() => {
        navigate(createPageUrl("Viewer") + `?id=${comicData.id}`);
      }, 1000);

    } catch (error) {
      console.error("Comic generation error:", error);
      await base44.entities.Comic.update(comicData.id, {
        status: "failed",
        error_message: error.message
      });
      toast.error("Failed to generate comic");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 w-full max-w-3xl mx-auto px-4">
        <ProgressTracker currentStep={currentStep} comic={comic} />
      </div>
    </div>
  );
}