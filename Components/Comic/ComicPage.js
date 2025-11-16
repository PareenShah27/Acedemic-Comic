import React from "react";

export default function ComicPage({ page }) {
  return (
    <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="space-y-6">
        {page.panels.map((panel) => (
          <div
            key={panel.panel_number}
            className="bg-black/40 border border-cyan-500/10 rounded-xl overflow-hidden hover:border-cyan-500/30 transition-all"
          >
            {/* Panel Image */}
            <div className="aspect-video relative overflow-hidden bg-gray-900">
              <img
                src={panel.image_url}
                alt={`Panel ${panel.panel_number}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Panel Dialogue */}
            {panel.dialogue && (
              <div className="p-6">
                <div className="relative bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-lg p-4">
                  {/* Speech bubble tail */}
                  <div className="absolute -top-2 left-8 w-4 h-4 bg-cyan-500/10 border-l border-t border-cyan-500/20 rotate-45" />
                  
                  <p className="text-white leading-relaxed">
                    {panel.dialogue}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Page Number */}
      <div className="text-center mt-6">
        <span className="inline-block px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 text-sm">
          Page {page.page_number}
        </span>
      </div>
    </div>
  );
}