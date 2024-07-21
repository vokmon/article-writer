import { useState } from "react";
import ErrorMessage from "../ErrorMessage";
import "./GenerateArticleButton.css";

type GenerateArticleButtonProps = {
  generateArticleFunction: () => Promise<string>;
  onGenerateArticleSuccess: (article: string) => void;
  disabled: boolean;
  children: React.ReactNode;
  iconPath?: string;
};

export default function GenerateArticleButton({
  generateArticleFunction,
  onGenerateArticleSuccess,
  disabled,
  iconPath,
  children,
}: GenerateArticleButtonProps) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleOnClick = async () => {
    try {
      setLoading(true);
      setErrorMessage("");
      const result = await generateArticleFunction();
      setLoading(false);
      onGenerateArticleSuccess(result);
    } catch (e) {
      setErrorMessage("เกิดข้อผิดพลาด");
      setLoading(false);
    }
  };

  return (
    <div className="generate-article-button">
      <div className="generate-article-container">
        <button disabled={disabled || loading} onClick={handleOnClick}>
          <div className="button-container">
            {!!iconPath && <img src={iconPath} />}
            {children}
          </div>
        </button>
        {loading && <div>กำลังสร้างเนื้อหา</div>}
      </div>
      {!!errorMessage && <ErrorMessage message={errorMessage} />}
    </div>
  );
}
