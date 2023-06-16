import moment from "moment";

function BlogView({ title, date, imgUrl, content, alt }) {
  const formattedDate = moment(date).format("MMMM Do, YYYY");
  let text = content.split("%!P");
  return (
    <div>
      <h1>{title}</h1>
      <p>Last edited: {formattedDate}</p>
      <img src={imgUrl} alt={alt} />
      {text.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}

export default BlogView;
