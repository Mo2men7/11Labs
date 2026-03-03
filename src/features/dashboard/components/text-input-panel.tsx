"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { TEXT_MAX_LENGTH } from "@/features/text-to-speech/data/contstants";
import { Coins } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function TextInputPanel() {
  const router = useRouter();
  const [text, setText] = useState("");

  const handleGenerate = () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    router.push(`/text-to-speech?text=${encodeURIComponent(trimmed)}`);
  };

  return (
    <div
      className="
    rounded-[22px] bg-linear-185 from-[#ff8ee3] from-15% via-[#57d7e0] via-39% to-[#dbf1f2] to-85% p-0.5
    "
    >
      <div className="bg-background rounded-[20px] p-1">
        <div className="space-y-4 rounded-2xl bg-background p-4 drop-shadow-xs">
          <Textarea
            placeholder="Type or paste your text here..."
            className="min-h-35 resize-none border-none border-0 bg-transparent p-1 shadow-none focus-visible:ring-0"
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={TEXT_MAX_LENGTH}
          />

          <div className="flex items-center justify-between">
            <Badge variant="outline" className="gap-1.5 border-dashed">
              <Coins className="size-3 text-chart-5" />
              <span className="text-xs">
                {text.length === 0 ? (
                  "Start typing to estimate"
                ) : (
                  <>
                    <span className="tabular-nums">
                      ${(text.length * 0.0003).toFixed(4)}
                    </span>{" "}
                    estimated
                  </>
                )}
              </span>
            </Badge>
            <span className="text-xs text-muted-foreground">
              {text.length.toLocaleString()} /{" "}
              {TEXT_MAX_LENGTH.toLocaleString()} characters
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-end p-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setText("")}
            disabled={text.length === 0}
            className="w-full lg:w-auto"
          >
            Clear
          </Button>
          <Button
            size="sm"
            onClick={handleGenerate}
            // disabled={text.length === 0}
            disabled={!text.trim()}
            className="w-full lg:w-auto"
          >
            Generate
          </Button>
        </div>
      </div>
    </div>
  );
}
