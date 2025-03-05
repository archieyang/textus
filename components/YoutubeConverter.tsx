"use client";
import { useState } from "react";
import { getCaptionsFromYoutube } from "@/app/actions";
import Markdown from "react-markdown";

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

export const YoutubeConverter = () => {
  const [url, setUrl] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setContent(""); // 清空之前的内容

    try {
      const videoId = url.match(
        /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
      )?.[1];

      if (!videoId) {
        alert("Please enter a valid YouTube URL");
        return;
      }

      const { text } = await getCaptionsFromYoutube({
        videoId,
        targetLanguage: selectedLanguage,
      });
      setContent(text)
    } catch (error: Error | unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred while processing the request.";
      console.error("Error:", error);
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto p-6 max-w-xl">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter YouTube video URL"
            className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 bg-transparent transition-all"
          />
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 dark:text-gray-100 bg-transparent transition-all"
          >
            {Object.entries(languages).map(([key, value]) => (
              <option key={key} value={value}>
                {key}
              </option>
            ))}
          </select>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium relative disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Processing..." : "Extract Subtitles"}
            {isLoading && (
              <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/60 border-t-white"></div>
              </div>
            )}
          </button>
        </form>

        {content && (
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-600 max-h-[500px] overflow-auto">
            <pre className="text-sm text-gray-700 dark:text-gray-200 whitespace-pre-wrap">
              <Markdown>{content}</Markdown>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
