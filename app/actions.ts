"use server";

import { openrouter } from "@openrouter/ai-sdk-provider";
import { streamText } from "ai";

interface TranscriptResponse {
  transcript: string;
}

interface GetCaptionsParams {
  targetLanguage: string;
  videoId: string;
}

export async function getCaptionsFromYoutube({
  targetLanguage,
  videoId,
}: GetCaptionsParams) {
  try {
    const response = await fetch(
      "https://api.kome.ai/api/tools/youtube-transcripts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          video_id: videoId,
          format: true,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch captions: ${response.status}`);
    }

    const data: TranscriptResponse = await response.json();

    // 使用 OpenRouter 处理字幕内容
    const { textStream } = await streamText({
      model: openrouter("google/gemini-2.0-flash-thinking-exp:free"),
      prompt: `Translate the following text to ${targetLanguage}. Format the translation as a coherent article. Output the translation directly without any prefixes or explanations:\n\n${data.transcript}`,
    });

    return { textStream };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error processing captions: ${error.message}`);
    }
    throw new Error("Unknown error occurred while processing captions");
  }
}
