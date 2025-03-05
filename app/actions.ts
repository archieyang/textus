"use server";

import { openrouter } from "@openrouter/ai-sdk-provider";
import { streamText } from "ai";

interface TranscriptResponse {
  transcript: string;
}

interface GetCaptionsParams {
  targetLanguage: string;
  url: string;
}

// 函数名称优化
export async function generateYoutubeTranscript({
  targetLanguage,
  url,
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
          video_id: url,
          format: true,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch captions: ${response.status}`);
    }

    const data: TranscriptResponse = await response.json();

    // 使用 OpenRouter 处理字幕内容
    const { textStream } = streamText({
      model: openrouter("google/gemini-2.0-flash-thinking-exp:free"),
      prompt: `You are a professional translator. Translate the following text to ${targetLanguage}. Requirements:
1. Use appropriate headings and paragraphs
2. Maintain natural flow and readability
3. Preserve speaker identification if present
4. Ensure proper spacing and indentation
5. Output translation directly without explanations or meta text

Text to translate:
${data.transcript}`,
    });

    return { textStream };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error processing captions: ${error.message}`);
    }
    throw new Error("Unknown error occurred while processing captions");
  }
}
