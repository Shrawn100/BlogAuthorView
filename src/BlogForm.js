import he from "he";
import React, { useState } from "react";
import SimpleMDEEditor from "react-simplemde-editor";
import "easymde/dist/easymde.min.css"; // Import the editor's styles

function BlogForm({
  handleSubmit,
  title,
  setTitle,
  desc,
  setDesc,
  imgUrl,
  setImgUrl,
  text,
  setText,
  published,
  setPublished,
  alt,
  setAlt,
}) {
  let decodedUrl = "";
  if (imgUrl) {
    decodedUrl = he.decode(imgUrl);
  }

  return (
    <form className="blog-form" onSubmit={handleSubmit}>
      <div className="blog-form-section">
        <label htmlFor="desc">Description</label>
        <input
          placeholder="Explore the enchanting waters of Maldives"
          required
          type="text"
          id="desc"
          value={desc ? desc : ""}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>
      <div className="blog-form-section">
        <label htmlFor="imgUrl">Image URL</label>
        <input
          placeholder="www.image/maldives.com"
          required
          type="text"
          id="imgUrl"
          value={decodedUrl ? decodedUrl : ""}
          onChange={(e) => setImgUrl(e.target.value)}
        />
      </div>
      <div className="blog-form-section">
        <label htmlFor="alt">Image Alt</label>
        <input
          placeholder="Maldives beaches"
          required
          type="text"
          id="alt"
          value={alt ? alt : ""}
          onChange={(e) => setAlt(e.target.value)}
        />
      </div>
      <div className="blog-form-section">
        <label htmlFor="text">Content</label>
        <textarea
          rows="17"
          placeholder="Note: You can use MarkDown Syntax"
          required
          id="text"
          value={text ? text : ""}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>
      <div className="form-select">
        <label htmlFor="published">Published</label>
        <input
          type="checkbox"
          id="published"
          checked={published ? published : false}
          onChange={(e) => setPublished(e.target.checked)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
export default BlogForm;
