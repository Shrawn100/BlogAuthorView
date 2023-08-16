import moment from "moment";
import { marked } from "marked";
function BlogView({ title, date, imgUrl, content, alt, author }) {
  const formattedDate = moment(date).format("MMMM Do, YYYY");

  return (
    <div className="blog-container">
      <div className="blog-content">
        <h1 className="blog-title">{title}</h1>
        <p className="blog-author">{author}</p>
        <p className="blog-date">{formattedDate}</p>
        <img className="blog-image" src={imgUrl} alt={alt} />
        <div
          className="blog-content-container"
          dangerouslySetInnerHTML={{ __html: marked(content) }}
        ></div>
      </div>
    </div>
  );
}

export default BlogView;
