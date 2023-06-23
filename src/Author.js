import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BlogForm from "./BlogForm";

const AuthorPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [createStatus, setCreateStatus] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [alt, setAlt] = useState("");
  const [text, setText] = useState("");
  const [published, setPublished] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [errorArray, setErrorArray] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .get("https://blogapi-production-9a30.up.railway.app/author", config)
        .then((response) => {
          console.log(response);
          setBlogs(response.data);
          setResponseData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching author's blogs:", error);
        });
    }
  }, [createStatus]);

  function handleCreateClick() {
    setCreateStatus(!createStatus);
    setDesc("");
    setTitle("");
    setImgUrl("");
    setText("");
    setPublished(false);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .post(
          "https://blogapi-production-9a30.up.railway.app/author/blog",
          {
            author: blogs.author,
            title: title,
            desc: desc,
            image: imgUrl,
            alt: alt,
            content: text,
            published: published,
          },
          config
        )
        .then((response) => {
          if (response.data.arr) {
            setErrorArray(response.data.arr);
          } else {
            setCreateStatus(false);
          }
        })
        .catch((error) => {
          console.error("Error creating blog:", error);
        });
    }
  };
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };

  return (
    <>
      {responseData ? (
        <>
          {createStatus ? (
            <>
              <div className="btn-container">
                <button className="create-btn" onClick={handleCreateClick}>
                  Cancel
                </button>
              </div>

              <h1 className="blog-form-heading">Create Blog</h1>
              <BlogForm
                handleSubmit={handleSubmit}
                title={title}
                setTitle={setTitle}
                desc={desc}
                setDesc={setDesc}
                imgUrl={imgUrl}
                setImgUrl={setImgUrl}
                alt={alt}
                setAlt={setAlt}
                text={text}
                setText={setText}
                published={published}
                setPublished={setPublished}
              ></BlogForm>
              {errorArray.map((error) => (
                <div>{error.msg}</div>
              ))}
            </>
          ) : (
            <>
              <div className="btn-container">
                <Link className="sign-out" to="/">
                  Logout
                </Link>
                <button className="create-btn" onClick={handleCreateClick}>
                  Create a new blog
                </button>
              </div>
              <div className="article-container">
                {blogs.map((blog) => (
                  <Link
                    className="blog-article-container"
                    key={blog.id}
                    to={`/author/${blog._id}`}
                  >
                    <img
                      className="article-image"
                      src={blog.image}
                      alt={blog.alt}
                    ></img>

                    <div className="blog-info">
                      <h1 className="blog-info-heading">{blog.title}</h1>
                      <p className="blog-info-content">{blog.desc}</p>

                      <p className="blog-info-date">
                        Published on: {formatDate(blog.date)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <div>Loading..</div>
      )}
    </>
  );
};

export default AuthorPage;
