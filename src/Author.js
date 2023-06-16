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
        .get("http://localhost:3000/author", config)
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
          "http://localhost:3000/author/blog",
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

  return (
    <>
      {responseData ? (
        <>
          {createStatus ? (
            <>
              <button onClick={handleCreateClick}>Go back</button>
              <h1>Create Blog</h1>
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
              <button onClick={handleCreateClick}>Create new blog</button>
              {blogs.map((blog) => (
                <div key={blog.id}>
                  <Link to={`/author/${blog._id}`}>{blog.title}</Link>
                </div>
              ))}
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
