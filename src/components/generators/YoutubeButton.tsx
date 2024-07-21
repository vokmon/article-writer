import { useState } from "react";
import { createArticleFromYoutube } from "../../service/ai/article-youtube-service";
import GenerateArticleButton from "../ui/GenerateArticleButton";
import youtube_icon from "../../assets/images/youtube_icon.svg";
import { ContentGeneratorProps } from "./ContentGeneratorProps";

export default function Youtube({
  onGenerateArticleSuccess,
}: ContentGeneratorProps) {
  const [currentUrl, setCurrentUrl] = useState<string | undefined>();

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const url = tabs[0].url;
    setCurrentUrl(url);
  });

  return (
    <GenerateArticleButton
      disabled={!isYoutubeWatchPage(currentUrl ?? "")}
      generateArticleFunction={async () => {
        if (currentUrl) {
          const result = await createArticleFromYoutube(currentUrl);
          return result;
        }
        return "";
      }}
      onGenerateArticleSuccess={onGenerateArticleSuccess}
      iconPath={youtube_icon}
    >
      สร้างจาก Video
    </GenerateArticleButton>
  );
}

function isYoutubeWatchPage(url: string): boolean {
  const regex = /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/;
  return regex.test(url);
}
