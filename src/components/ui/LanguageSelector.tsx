// LanguageSelector.tsx
import React from "react";
import { LANG_LIST } from "../../types/LanguageTypes";

type LanguageSelectorProps = {
  language: (typeof LANG_LIST)[number]; // Type for language, limited to values in LANG_LIST
  onLanguageChange: (lang: string) => void; // Type for the change event handler
};

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  language,
  onLanguageChange,
}) => {
  return (
    <div className="language-selector">
      <label htmlFor="language">Select Language: </label>
      <select id="language" value={language} onChange={(e) => {onLanguageChange(e.target.value)}}>
        {LANG_LIST.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
