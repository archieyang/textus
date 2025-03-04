import { YoutubeConverter } from "@/components/YoutubeConverter";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-gray-100 text-center mb-8">
          YouTube Subtitle Extractor
        </h1>
        <YoutubeConverter />
      </main>
    </div>
  );
}
