import he from "he";

function BlogForm({
  handleSubmit,
  title,
  setTitle,
  imgUrl,
  setImgUrl,
  text,
  setText,
  published,
  setPublished,
}) {
  let decodedUrl = "";
  if (imgUrl) {
    decodedUrl = he.decode(imgUrl);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title ? title : ""}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="imgUrl">Image URL:</label>
        <input
          type="text"
          id="imgUrl"
          value={decodedUrl ? decodedUrl : ""}
          onChange={(e) => setImgUrl(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="text">Text:</label>
        <textarea
          id="text"
          value={text ? text : ""}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>
      <div>
        <label htmlFor="published">Published:</label>
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
