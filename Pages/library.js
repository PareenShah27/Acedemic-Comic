import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";
import { Plus, BookOpen, Clock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export default function Library() {
  const navigate = useNavigate();

  const { data: comics, isLoading } = useQuery({
    queryKey: ['comics'],
    queryFn: () => base44.entities.Comic.list('-created_date'),
    initialData: []
  });

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
              Your Comic Library
            </h1>
            <p className="text-gray-400">All your generated academic comics in one place</p>
          </div>

          <Button
            onClick={() => navigate(createPageUrl("Home"))}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Comic
          </Button>
        </div>

        {/* Comics Grid */}
        {isLoading ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Loading your comics...</p>
          </div>
        ) : comics.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg mb-6">No comics yet. Create your first one!</p>
            <Button
              onClick={() => navigate(createPageUrl("Home"))}
              className="bg-gradient-to-r from-cyan-500 to-purple-500"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Comic
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {comics.map((comic) => (
              <div
                key={comic.id}
                className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl border border-cyan-500/20 rounded-xl overflow-hidden hover:border-cyan-500/40 transition-all hover:scale-105 cursor-pointer group"
                onClick={() => {
                  if (comic.status === "completed") {
                    navigate(createPageUrl("Viewer") + `?id=${comic.id}`);
                  } else if (comic.status === "failed") {
                    // Do nothing or show error
                  } else {
                    navigate(createPageUrl("Generator") + `?id=${comic.id}`);
                  }
                }}
              >
                {/* Cover Image */}
                <div className="aspect-[3/4] relative overflow-hidden bg-gray-900">
                  {comic.cover_image_url ? (
                    <img
                      src={comic.cover_image_url}
                      alt={comic.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="w-16 h-16 text-gray-700" />
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    {comic.status === "completed" ? (
                      <span className="px-3 py-1 bg-green-500/20 border border-green-500/50 rounded-full text-green-300 text-xs font-medium">
                        ✓ Complete
                      </span>
                    ) : comic.status === "failed" ? (
                      <span className="px-3 py-1 bg-red-500/20 border border-red-500/50 rounded-full text-red-300 text-xs font-medium">
                        ✗ Failed
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/50 rounded-full text-yellow-300 text-xs font-medium animate-pulse">
                        ⟳ Processing
                      </span>
                    )}
                  </div>
                </div>

                {/* Comic Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                    {comic.title}
                  </h3>
                  <p className="text-cyan-300 text-sm mb-4">{comic.topic}</p>

                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      <span>{comic.page_count} pages</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{format(new Date(comic.created_date), "MMM d")}</span>
                    </div>
                  </div>

                  {comic.status === "completed" && (
                    <Button
                      className="w-full mt-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(createPageUrl("Viewer") + `?id=${comic.id}`);
                      }}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Comic
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}