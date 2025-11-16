import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";
import { BookOpen, Sparkles, Upload, Zap } from "lucide-react";
import FileUploader from "../components/comic/FileUploader";
import ParameterForm from "../components/comic/ParameterForm";
import { toast } from "sonner";

export default function Home() {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (file) => {
    setIsUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setFileUrl(file_url);
      setUploadedFile(file);
      toast.success("File uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload file");
      console.error(error);
    }
    setIsUploading(false);
  };

  const handleGenerate = async (params) => {
    try {
      const comic = await base44.entities.Comic.create({
        title: params.title,
        topic: params.topic,
        humor_style: params.humor_style,
        page_count: params.page_count,
        uploaded_file_url: fileUrl,
        status: "uploading"
      });

      navigate(createPageUrl("Generator") + `?id=${comic.id}`);
    } catch (error) {
      toast.error("Failed to create comic");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-full mb-4">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-300 text-sm font-medium tracking-wider">ACADEMIC COMICS GENERATOR</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            Learn Through
            <br />
            Humorous Comics
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Transform your academic materials into entertaining comic books. 
            Upload PDFs, notes, or documents and watch AI create engaging visual stories.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* File Upload Section */}
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 shadow-2xl shadow-cyan-500/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-cyan-500/10 rounded-lg">
                <Upload className="w-5 h-5 text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Upload Your Material</h2>
            </div>
            
            <FileUploader 
              onFileSelect={handleFileUpload} 
              isUploading={isUploading}
              uploadedFile={uploadedFile}
            />
          </div>

          {/* Parameter Form Section */}
          {fileUrl && (
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 shadow-2xl shadow-purple-500/10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Configure Your Comic</h2>
              </div>
              
              <ParameterForm onSubmit={handleGenerate} />
            </div>
          )}

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="p-6 bg-gradient-to-br from-cyan-500/5 to-transparent border border-cyan-500/20 rounded-xl">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">AI-Powered</h3>
              <p className="text-gray-400 text-sm">Advanced AI extracts key concepts and creates engaging narratives</p>
            </div>

            <div className="p-6 bg-gradient-to-br from-purple-500/5 to-transparent border border-purple-500/20 rounded-xl">
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Academically Accurate</h3>
              <p className="text-gray-400 text-sm">Humor never compromises educational integrity</p>
            </div>

            <div className="p-6 bg-gradient-to-br from-pink-500/5 to-transparent border border-pink-500/20 rounded-xl">
              <div className="w-12 h-12 bg-pink-500/10 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-pink-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Customizable</h3>
              <p className="text-gray-400 text-sm">Choose page count, humor style, and visual themes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}