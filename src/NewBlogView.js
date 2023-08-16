import moment from "moment";
import { marked } from "marked";

function NewBlogView({ title, imgUrl, content, alt, author }) {
  return (
    <div className="blog-container">
      <div className="blog-content">
        <h1 className="blog-title">{title}</h1>
        <p className="blog-author">{author}</p>
        <p className="blog-date">Last edited: Now</p>
        <img className="blog-image" src={imgUrl} alt={alt} />

        <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
      </div>
    </div>
  );
}

export default NewBlogView;
