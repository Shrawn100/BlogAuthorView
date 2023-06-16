import he from "he";

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
        <label htmlFor="desc">Description:</label>
        <input
          type="text"
          id="desc"
          value={desc ? desc : ""}
          onChange={(e) => setDesc(e.target.value)}
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
        <label htmlFor="alt">Image Alt:</label>
        <input
          type="text"
          id="alt"
          value={alt ? alt : ""}
          onChange={(e) => setAlt(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="text">Content:</label>
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
