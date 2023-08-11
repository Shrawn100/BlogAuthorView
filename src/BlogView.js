import moment from "moment";

function BlogView({ title, date, imgUrl, content, alt }) {
  const formattedDate = moment(date).format("MMMM Do, YYYY");
  let text = content.split("%!P");
  return (
    <div className="blog-container">
      <div className="blog-content">
        <h1 className="blog-title">{title}</h1>
        <p className="blog-date">Last edited: {formattedDate}</p>
        <img className="blog-image" src={imgUrl} alt={alt} />
        {text.map((paragraph, index) => (
          <p className="blog-paragraph" key={index}>
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}

export default BlogView;
