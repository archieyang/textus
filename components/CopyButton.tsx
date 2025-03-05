"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CopyButtonProps {
  content: string;
  className?: string;
}

export function CopyButton({ content }: CopyButtonProps) {
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);

  if (!content?.trim()) return null;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content.trim());
      setIsCopied(true);
      toast({
        title: "Copied to clipboard",
        description: "Content has been copied to your clipboard.",
      });
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed: ", err);
      toast({
        title: "Copy failed",
        description: "An error occurred while copying the content.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      size="sm"
      className="flex items-center gap-2 min-w-[200px]"
      onClick={copyToClipboard}
    >
      {isCopied ? (
        <>
          <Check className="h-4 w-4" />
          Copied
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          Copy
        </>
      )}
    </Button>
  );
}
