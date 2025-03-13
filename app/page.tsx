import { YoutubeTranscriptGenerator } from "@/components/YoutubeConverter";

export const metadata = {
  title: "YouTube Transcript Generator | Convert YouTube Video to Text",
  description:
    "Free online tool to transcribe YouTube videos to text. Extract and translate YouTube subtitles automatically with our easy-to-use converter.",
  keywords:
    "youtube to text, youtube transcript generator, youtube transcript, youtube video to text converter, transcribe youtube video to text",
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 pt-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-gray-100 text-center mb-2">
            YouTube Transcript Generator
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            Convert YouTube Videos to Text Automatically
          </p>
          <YoutubeTranscriptGenerator />
        </div>
      </main>
      <footer className="w-full flex flex-col justify-center items-center gap-4 py-8">
        <a
          href="https://startupfa.me/s/youtube-transcript-generator?utm_source=rockpaper.space"
          target="_blank"
          rel="noopener noreferrer"
          className="h-9 flex items-center"
        >
          <img
            src="https://startupfa.me/badges/featured-badge-small.webp"
            alt="Transcript Generator - Convert YouTube Video to Text | Startup Fame"
            width="224"
            height="36"
            className="rounded hover:opacity-90 transition-opacity object-contain"
          />
        </a>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <a
            href="https://sumthatup.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
          >
            SumThatUp
          </a>
          <a
            href="https://futbox.pro/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
          >
            FutBox.Pro
          </a>
          <a
            href="https://share.evernote.com/note/0b540b3b-9b4d-54d3-9081-2f47f72f7fcd"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
          >
            Notes
          </a>
          <a
            href="https://cal.com/archieyang"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
          >
            Schedule Meeting
          </a>
          <a
            href="https://launched.lovable.dev/sumthatup"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
          >
            Launched.dev
          </a>
          <a
            href="https://launched.lovable.app/sumthatup"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
          >
            Launched.app
          </a>
        </div>
      </footer>
    </div>
  );
}
