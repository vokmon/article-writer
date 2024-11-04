import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const promptTemplate = `
  You are a helpful and enthusiastic support bot, content creator who can create summarize
  and create articles based on the given information and your based knowledge.
  Firstly you will study about the given context to know what it is talking about.
  
  Try to remove unneccessary and irrelevant content from the context and create a new article based on the given context.
  The article should be created in a short and concise format but full of information in {lang} language however You can include some
  technical word in English.
  The style of the article should be casual and easy to read for everyone and remove the redundant content.
  The outtro should be alter and adjust to article style not video.
  If at the end of the text talking about video, it should change to writtebe based
  Remember that we are writing an article not creating a video.
  The article lenght should be about 500 words, if the content is not long enough, it's ok. Do not try to make it up to 500 words.
  Also add some emoji into the article it make it more friendly but do not add it too much.
  
  context: {context}
  `;

export const llm = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash",
  maxOutputTokens: 8192,
  apiKey: import.meta.env.VITE_APP_GOOGLE_API_KEY,
  temperature: 1,
  topP: 0.95,
  topK: 64,
});

const prompt = PromptTemplate.fromTemplate(promptTemplate);

export const generateArticleFromContent = async (content: string, lang: string = "Thai") => {
  
  const chain = RunnableSequence.from([prompt, llm, new StringOutputParser()]);
  const response = await chain.invoke({
    context: content,
    lang: lang,
  });
  return response;
};
