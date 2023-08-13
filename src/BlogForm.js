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
    <form className="blog-form" onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input
        placeholder="Why sports are exciting"
        required
        type="text"
        id="title"
        value={title ? title : ""}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label htmlFor="desc">Description:</label>
      <input
        placeholder="This blogs talks about sports"
        required
        type="text"
        id="desc"
        value={desc ? desc : ""}
        onChange={(e) => setDesc(e.target.value)}
      />

      <label htmlFor="imgUrl">Image URL:</label>
      <input
        placeholder="www.image/soccerball.com"
        required
        type="text"
        id="imgUrl"
        value={decodedUrl ? decodedUrl : ""}
        onChange={(e) => setImgUrl(e.target.value)}
      />

      <label htmlFor="alt">Image Alt:</label>
      <input
        placeholder="Soccer ball"
        required
        type="text"
        id="alt"
        value={alt ? alt : ""}
        onChange={(e) => setAlt(e.target.value)}
      />

      <label htmlFor="text">Content:</label>
      <textarea
        placeholder="Note: You can seperate content into paragraphs by using delimiter: %!P"
        required
        id="text"
        value={text ? text : ""}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
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
