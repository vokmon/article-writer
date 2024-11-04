import { StringOutputParser } from "@langchain/core/output_parsers";
import { llm } from "./article-generator-service";
import { RunnableSequence } from "@langchain/core/runnables";
import { convert } from "html-to-text";

export const createArticleFromWebHtml = async (htmlString: string, lang: string) => {
  const chain = RunnableSequence.from([
    () => {
      return convert(htmlString);
    },
    llm,
    new StringOutputParser(),
  ]);
  const response = await chain.invoke({
    htmlString: htmlString,
    lang: lang,
  });
  return response;
};
