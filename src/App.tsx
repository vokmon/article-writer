import { useState } from "react";
import "./App.css";
import ArticleResult from "./components/ArticleResult";
import Youtube from "./components/generators/YoutubeButton";
import CurrentContentButton from "./components/generators/CurrentContentButton";
import LanguageSelector from "./components/ui/LanguageSelector";
import { LANG_LIST } from "./types/LanguageTypes";


function App() {
  const [generatedArticle, setGeneratedArticle] = useState("");
  const [language, setLanguage] = useState(LANG_LIST[0]);

  return (
    <div className="app">
      <LanguageSelector language={language} onLanguageChange={setLanguage} />
      <Youtube onGenerateArticleSuccess={setGeneratedArticle} language={language} />
      <CurrentContentButton onGenerateArticleSuccess={setGeneratedArticle} language={language} />
      <ArticleResult value={generatedArticle} />
    </div>
  );
}

export default App;
