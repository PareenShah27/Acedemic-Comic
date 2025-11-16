import React from "react";
import { FileText, Brain, BookOpen, Image, CheckCircle, Loader2 } from "lucide-react";

const steps = [
  { id: 1, title: "Extracting Content", icon: FileText, description: "Reading your uploaded material" },
  { id: 2, title: "Academic Analysis", icon: Brain, description: "Summarizing key concepts" },
  { id: 3, title: "Script Writing", icon: BookOpen, description: "Creating comic narrative" },
  { id: 4, title: "Generating Art", icon: Image, description: "Drawing comic panels" },
  { id: 5, title: "Complete", icon: CheckCircle, description: "Your comic is ready!" }
];

export default function ProgressTracker({ currentStep, comic }) {
  return (
    <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 shadow-2xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
          Generating Your Comic
        </h1>
        {comic && (
          <p className="text-gray-400 text-lg">{comic.title}</p>
        )}
      </div>

      <div className="space-y-6">
        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;
          const isPending = currentStep < step.id;

          return (
            <div
              key={step.id}
              className={`flex items-center gap-4 p-6 rounded-xl transition-all duration-500 ${
                isActive
                  ? "bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 scale-105"
                  : isCompleted
                  ? "bg-green-500/5 border border-green-500/20"
                  : "bg-gray-800/30 border border-gray-700/30"
              }`}
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                  isActive
                    ? "bg-gradient-to-br from-cyan-500 to-purple-500 shadow-lg shadow-purple-500/50"
                    : isCompleted
                    ? "bg-green-500"
                    : "bg-gray-700"
                }`}
              >
                {isActive ? (
                  <Loader2 className="w-8 h-8 text-white animate-spin" />
                ) : (
                  <Icon className="w-8 h-8 text-white" />
                )}
              </div>

              <div className="flex-1">
                <h3
                  className={`text-lg font-semibold mb-1 ${
                    isActive ? "text-cyan-300" : isCompleted ? "text-green-400" : "text-gray-400"
                  }`}
                >
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm">{step.description}</p>
              </div>

              {isCompleted && (
                <CheckCircle className="w-6 h-6 text-green-400" />
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-lg">
        <p className="text-center text-cyan-300 text-sm">
          ✨ This may take a few minutes. Creating {comic?.page_count} pages of educational entertainment!
        </p>
      </div>
    </div>
  );
}