import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Download, ChevronLeft, ChevronRight, BookOpen, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ComicPage from "../components/comic/ComicPage";
import { toast } from "sonner";

export default function Viewer() {
  const navigate = useNavigate();
  const [comic, setComic] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const urlParams = new URLSearchParams(window.location.search);
  const comicId = urlParams.get("id");

  useEffect(() => {
    loadComic();
  }, [comicId]);

  const loadComic = async () => {
    try {
      const comicData = await base44.entities.Comic.get(comicId);
      setComic(comicData);
    } catch (error) {
      toast.error("Failed to load comic");
      console.error(error);
    }
    setIsLoading(false);
  };

  const handleNextPage = () => {
    if (comic && currentPage < comic.script.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const downloadImage = async (url, filename) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download failed:', error);
      throw error;
    }
  };

  const handleDownloadAllImages = async () => {
    setIsDownloading(true);
    try {
      // Download cover
      if (comic.cover_image_url) {
        await downloadImage(comic.cover_image_url, `${comic.title}_cover.jpg`);
      }

      // Download all panel images
      for (let i = 0; i < comic.script.length; i++) {
        const page = comic.script[i];
        for (let j = 0; j < page.panels.length; j++) {
          const panel = page.panels[j];
          await downloadImage(
            panel.image_url,
            `${comic.title}_page${page.page_number}_panel${panel.panel_number}.jpg`
          );
          // Small delay to avoid overwhelming the browser
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }

      toast.success("All images downloaded!");
    } catch (error) {
      toast.error("Download failed. Please try again.");
    }
    setIsDownloading(false);
  };

  const handlePrintView = () => {
    navigate(createPageUrl("PrintView") + `?id=${comic.id}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading comic...</p>
        </div>
      </div>
    );
  }

  if (!comic) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400">Comic not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={() => navigate(createPageUrl("Library"))}
            variant="ghost"
            className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Library
          </Button>

          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {comic.title}
            </h1>
            <p className="text-gray-400 mt-1">{comic.topic}</p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-900 border-gray-700">
              <DropdownMenuItem 
                onClick={handleDownloadAllImages}
                className="text-white hover:bg-gray-800 cursor-pointer"
              >
                <Download className="w-4 h-4 mr-2" />
                Download All Images
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={handlePrintView}
                className="text-white hover:bg-gray-800 cursor-pointer"
              >
                <Printer className="w-4 h-4 mr-2" />
                Print / Save as PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Comic Viewer */}
        <div className="max-w-5xl mx-auto">
          {/* Cover Page */}
          {currentPage === 0 && comic.cover_image_url && (
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="aspect-[3/4] relative overflow-hidden rounded-xl">
                <img
                  src={comic.cover_image_url}
                  alt="Comic Cover"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                  <div>
                    <h2 className="text-4xl font-bold text-white mb-2">{comic.title}</h2>
                    <p className="text-cyan-300 text-lg">{comic.topic}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Comic Pages */}
          {currentPage > 0 && comic.script[currentPage - 1] && (
            <ComicPage page={comic.script[currentPage - 1]} />
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <Button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              variant="outline"
              className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <div className="flex items-center gap-2 text-gray-400">
              <BookOpen className="w-5 h-5" />
              <span>
                Page {currentPage + 1} of {comic.script.length + 1}
              </span>
            </div>

            <Button
              onClick={handleNextPage}
              disabled={currentPage >= comic.script.length}
              variant="outline"
              className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10 disabled:opacity-30"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}