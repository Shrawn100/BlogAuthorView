import React, { useState } from "react";
import SimpleMDEEditor from "react-simplemde-editor";
import "easymde/dist/easymde.min.css"; // Import the editor's styles
import { marked } from "marked";

const MarkdownEditor = () => {
  const [markdownText, setMarkdownText] = useState("123");

  const handleEditorChange = (e) => {
    setMarkdownText(e.target.value);
    console.log(markdownText);
  };

  return (
    <div>
      <textarea value={markdownText} onChange={handleEditorChange} />
      <div dangerouslySetInnerHTML={{ __html: marked(markdownText) }}></div>
    </div>
  );
};

export default MarkdownEditor;
