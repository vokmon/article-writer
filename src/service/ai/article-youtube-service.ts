import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";
import { generateArticleFromContent } from "./article-generator-service";



export const createArticleFromYoutube = async (youtubeUrl: string) => {
  const loader = YoutubeLoader.createFromUrl(youtubeUrl, {
    // must of false, otherwise it will throw error "Failed to execute 'fetch' on 'Window': Illegal invocation"
    addVideoInfo: false,
  });

  const docs = await loader.load();
  let content = "";
  docs.forEach((doc) => {
    content = `${content} ${doc.pageContent}`;
  });

  return await generateArticleFromContent(content);
}
