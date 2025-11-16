import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Sparkles } from "lucide-react";

export default function ParameterForm({ onSubmit }) {
  const [params, setParams] = useState({
    title: "",
    topic: "",
    humor_style: "witty",
    page_count: 8
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(params);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-white">Comic Title</Label>
        <Input
          id="title"
          placeholder="e.g., The Adventures of Quantum Physics"
          value={params.title}
          onChange={(e) => setParams({ ...params, title: e.target.value })}
          required
          className="bg-white/5 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="topic" className="text-white">Academic Topic</Label>
        <Input
          id="topic"
          placeholder="e.g., Quantum mechanics, photosynthesis, machine learning"
          value={params.topic}
          onChange={(e) => setParams({ ...params, topic: e.target.value })}
          required
          className="bg-white/5 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="humor" className="text-white">Humor Style</Label>
        <Select
          value={params.humor_style}
          onValueChange={(value) => setParams({ ...params, humor_style: value })}
        >
          <SelectTrigger className="bg-white/5 border-gray-700 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 border-gray-700">
            <SelectItem value="witty">Witty & Clever</SelectItem>
            <SelectItem value="meme">Meme-style</SelectItem>
            <SelectItem value="bollywood">Bollywood-inspired</SelectItem>
            <SelectItem value="puns">Puns & Wordplay</SelectItem>
            <SelectItem value="sarcastic">Sarcastic</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label className="text-white">Number of Pages</Label>
          <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {params.page_count}
          </span>
        </div>
        <Slider
          value={[params.page_count]}
          onValueChange={(value) => setParams({ ...params, page_count: value[0] })}
          min={3}
          max={20}
          step={1}
          className="[&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-cyan-500 [&_[role=slider]]:to-purple-500 [&_[role=slider]]:border-0 [&_[role=slider]]:shadow-lg [&_[role=slider]]:shadow-purple-500/50"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>3 pages (Quick)</span>
          <span>20 pages (Detailed)</span>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold py-6 text-lg shadow-lg shadow-purple-500/50 transition-all hover:shadow-xl hover:shadow-purple-500/70"
      >
        <Sparkles className="w-5 h-5 mr-2" />
        Generate Comic Book
      </Button>
    </form>
  );
}