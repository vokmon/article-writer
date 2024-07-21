import { useState } from "react";
import "./App.css";
import ArticleResult from "./components/ArticleResult";
import Youtube from "./components/generators/YoutubeButton";
import CurrentContentButton from "./components/generators/CurrentContentButton";

function App() {
  const [generatedArtible, setGeneratedArtible] = useState("");

  return (
    <div className="app">
      <Youtube onGenerateArticleSuccess={setGeneratedArtible} />
      <CurrentContentButton onGenerateArticleSuccess={setGeneratedArtible} />
      <ArticleResult value={generatedArtible} />
    </div>
  );
}

export default App;
