import "./ArticleResult.css";

type ArticleResultProps = {
  value: string;
};

export default function ArticleResult({ value }: ArticleResultProps) {
  function copy() {
    // Copy the text inside the text field
    navigator.clipboard.writeText(value);

    // Alert the copied text
    alert("Copied the text: ");
  }

  return (
    <div className="article-result">
      <textarea
        value={value}
        rows={20}
        placeholder="กดปุ่มด้านบนเพื่อสร้างเนื้อหา..."
      ></textarea>
      <div className="buttons">
        <button onClick={copy} disabled={(!value)}>
          Copy ไปที่ Clipboard
        </button>
      </div>
    </div>
  );
}
