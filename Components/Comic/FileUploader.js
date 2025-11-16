import React, { useRef } from "react";
import { Upload, File, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FileUploader({ onFileSelect, isUploading, uploadedFile }) {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.pptx,.docx,.txt,.md"
        onChange={handleFileChange}
        className="hidden"
      />

      <div
        onClick={handleClick}
        className="border-2 border-dashed border-cyan-500/30 rounded-xl p-12 text-center cursor-pointer transition-all hover:border-cyan-500/60 hover:bg-cyan-500/5 group"
      >
        {uploadedFile ? (
          <div className="flex items-center justify-center gap-3">
            <CheckCircle className="w-8 h-8 text-green-400" />
            <div className="text-left">
              <p className="text-white font-medium">{uploadedFile.name}</p>
              <p className="text-gray-400 text-sm">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>
        ) : (
          <>
            <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-cyan-500/20 transition-colors">
              {isUploading ? (
                <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Upload className="w-8 h-8 text-cyan-400" />
              )}
            </div>
            <p className="text-white font-medium mb-2">
              {isUploading ? "Uploading..." : "Click to upload or drag and drop"}
            </p>
            <p className="text-gray-400 text-sm">
              PDF, PPTX, DOCX, TXT, or Markdown files
            </p>
          </>
        )}
      </div>

      {uploadedFile && (
        <Button
          onClick={handleClick}
          variant="outline"
          className="w-full border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
        >
          Upload Different File
        </Button>
      )}
    </div>
  );
}