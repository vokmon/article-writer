import { StringOutputParser } from "@langchain/core/output_parsers";
import { llm } from "./article-generator-service";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";

const promptTemplate = `
  You are a html reader. You will read the data in html format and extract only the human readable content
  from the htmlString. You will remove all the functions and css included in the html string as well.
  The output is to get the useful content from the html string.
  htmlString: {htmlString}
  `;

const prompt = PromptTemplate.fromTemplate(promptTemplate);

export const createArticleFromWebHtml = async (htmlString: string) => {
  const chain = RunnableSequence.from([prompt, llm, new StringOutputParser()]);
  const response = await chain.invoke({
    htmlString: htmlString,
  });
  return response;
};
