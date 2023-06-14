import moment from "moment";

function BlogView({ title, date, decodedUrl, content }) {
  const formattedDate = moment(date).format("MMMM Do, YYYY");
  let imageExists = false;
  if (decodedUrl.split("").length > 1) {
    imageExists = true;
  } else {
    imageExists = false;
  }

  return (
    <div>
      <h1>{title}</h1>
      <p>Last edited: {formattedDate}</p>
      {imageExists ? <img src={decodedUrl} alt={title}></img> : <></>}
      {content.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}

export default BlogView;
