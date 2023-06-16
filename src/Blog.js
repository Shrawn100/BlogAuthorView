import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import he from "he";
import BlogForm from "./BlogForm";
import BlogView from "./BlogView";

function Blog() {
  const { id } = useParams();
  const [responseData, setResponseData] = useState(null);
  const [author, setAuthor] = useState(null);

  const [editStatus, setEditStatus] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [alt, setAlt] = useState("");
  const [text, setText] = useState("");
  const [published, setPublished] = useState(false);
  const [date, setDate] = useState(null);
  const [confirmation, setConfirmation] = useState(false);
  const [errorArray, setErrorArray] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const response = await axios.get(
            `http://localhost:3000/author/${id}`,
            config
          );
          setResponseData(response.data);
          setAuthor(response.data.blog.author._id);
          console.log(response.data);
          setTitle(response.data.blog.title);
          setDesc(response.data.blog.desc);
          setText(response.data.blog.content);
          setPublished(response.data.blog.published);

          setDate(response.data.blog.date);
          setImgUrl(response.data.blog.image);
          setAlt(response.data.blog.alt);
        }
      } catch (error) {
        console.error("Error fetching author's blogs:", error);
      }
    };

    fetchData();
  }, [id, editStatus]);
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
        .put(
          `http://localhost:3000/author/${id}`,
          {
            author: author,
            title: title,
            desc: desc,
            image: he.decode(imgUrl),
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
            setEditStatus(false);
          }
        })
        .catch((error) => {
          console.error("Error creating blog:", error);
        });
      // Perform any additional actions after the successful PUT request
    }
  };
  function handleEditClick() {
    setEditStatus(!editStatus);
  }
  function handleDeleteClick() {
    setConfirmation(!confirmation);
  }
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.delete(
          `http://localhost:3000/author/${id}`,
          config
        );
        console.log("Delete request successful:", response.data);
        setEditStatus(false);
        navigate("/author");
        // Perform any additional actions after the successful PUT request
      }
    } catch (error) {
      console.error("Error deleting form:", error);
      // Handle the error as needed
    }
  };

  return (
    <>
      {responseData ? (
        <>
          {editStatus ? (
            <>
              <div>
                {confirmation ? (
                  <>
                    <h1>Are you sure?</h1>
                    <button onClick={handleDelete}>Yes</button>
                    <button onClick={handleDeleteClick}>No</button>
                  </>
                ) : (
                  <>
                    <button onClick={handleEditClick}>Cancel</button>
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
                    <button onClick={handleDeleteClick}>Delete Blog</button>
                    {errorArray.map((error) => (
                      <div>{error.msg}</div>
                    ))}
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              <div>
                <Link to="/author">Go Back</Link>
                <button onClick={handleEditClick}>Edit</button>
                <BlogView
                  title={title}
                  date={date}
                  imgUrl={imgUrl}
                  content={text}
                  alt={alt}
                ></BlogView>
              </div>
            </>
          )}
        </>
      ) : (
        <div>Loading..</div>
      )}
    </>
  );
}

export default Blog;
