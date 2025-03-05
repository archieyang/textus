"use client";
import { useState } from "react";
import { generateYoutubeTranscript } from "@/app/actions";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { CopyButton } from "./CopyButton";
import { useToast } from "@/hooks/use-toast";

const languages = {
  Arabic: "Arabic",
  Chinese: "Chinese",
  Czech: "Czech",
  Danish: "Danish",
  Dutch: "Dutch",
  English: "English",
  Finnish: "Finnish",
  French: "French",
  German: "German",
  Hebrew: "Hebrew",
  Hungarian: "Hungarian",
  Italian: "Italian",
  Japanese: "Japanese",
  Korean: "Korean",
  Norwegian: "Norwegian",
  Polish: "Polish",
  Portuguese: "Portuguese",
  Romanian: "Romanian",
  Russian: "Russian",
  Spanish: "Spanish",
  Swedish: "Swedish",
  Thai: "Thai",
  Turkish: "Turkish",
  Ukrainian: "Ukrainian",
  Vietnamese: "Vietnamese",
};

// 组件名称优化
export const YoutubeTranscriptGenerator = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setContent("");

    try {
      const videoId = url.match(
        /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
      )?.[1];

      if (!videoId) {
        toast({
          title: "Invalid URL",
          description: "Please enter a valid YouTube video URL",
          variant: "destructive",
        });
        return;
      }

      const { text } = await generateYoutubeTranscript({
        videoId,
        targetLanguage: selectedLanguage,
      });
      setContent(text);
    } catch (error: Error | unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      console.error("Error:", error);
      toast({
        title: "Processing Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto p-6 max-w-4xl">
      <form
        onSubmit={handleSubmit}
        className="space-y-4  max-w-[600px] mx-auto"
      >
        <Input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter YouTube video URL"
          className="w-full"
        />
        <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Object.entries(languages).map(([key, value]) => (
                <SelectItem key={key} value={value}>
                  {key}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="flex justify-center">
          <Button type="submit" disabled={isLoading} className="min-w-[200px]">
            {isLoading ? "Processing..." : "Generate Transcript"}
            {isLoading && (
              <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/60 border-t-white"></div>
              </div>
            )}
          </Button>
        </div>
      </form>

      {content && (
        <div className="mt-6">
          <ScrollArea className="h-[400px] w-full max-w-[600px] mx-auto rounded-base text-mtext border-2 border-border bg-main p-4 shadow-shadow">
            {content}
          </ScrollArea>
          <div className="mt-2 flex justify-center">
            <CopyButton content={content} />
          </div>
        </div>
      )}
    </div>
  );
};
