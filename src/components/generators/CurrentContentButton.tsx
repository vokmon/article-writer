import { useState } from "react";
import GenerateArticleButton from "../ui/GenerateArticleButton";
import { ContentGeneratorProps } from "./ContentGeneratorProps";
import { generateArticleFromContent } from "../../service/ai/article-generator-service";

// @ts-ignore
function DOMtoString() {
  return document.documentElement.outerHTML;
}

export default function CurrentContentButton({
  onGenerateArticleSuccess,
}: ContentGeneratorProps) {
  const [currentContent, setCurrentContent] = useState<string | undefined>();

  chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
    const activeTab = tabs[0];
    const activeTabId = activeTab.id;

    if (activeTabId) {
      const result = await chrome.scripting.executeScript({
        target: { tabId: activeTabId },
        // injectImmediately: true,  // uncomment this to make it execute straight away, other wise it will wait for document_idle
        func: DOMtoString,
        args: []  // you can use this to target what element to get the html for
      });
      if (result[0].result) {
        const content = result[0].result;
        const subContent = content.substring(content.indexOf("<body"), content.indexOf("</body>"));
        setCurrentContent(subContent);
      }
    }
  });

  return (
    <GenerateArticleButton
      disabled={false}
      generateArticleFunction={async () => {
        if (currentContent) {
          return await generateArticleFromContent(currentContent);
        }
        return currentContent ?? "";
      }}
      onGenerateArticleSuccess={onGenerateArticleSuccess}
    >
      สร้างจากเนื้อหาบน Page
    </GenerateArticleButton>
  );
}
