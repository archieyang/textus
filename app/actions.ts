"use server";

import { openrouter } from "@openrouter/ai-sdk-provider";
import { generateText } from "ai";

interface TranscriptResponse {
  transcript: string;
}

interface GetCaptionsParams {
  targetLanguage: string;
  videoId: string;
}

// 函数名称优化
export async function generateYoutubeTranscript({
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
    const { text } = await generateText({
      model: openrouter("google/gemini-2.0-flash-thinking-exp:free"),
      prompt: `You are a professional translator. Translate the following text to ${targetLanguage}. Requirements:
1. Maintain the original meaning and style
2. Keep the translation natural and fluent
3. Preserve any technical terms accurately
4. Format the output as a coherent article
5. Output translation directly without explanations

Text to translate:
${data.transcript}`,
    });

    return { text };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error processing captions: ${error.message}`);
    }
    throw new Error("Unknown error occurred while processing captions");
  }
}
