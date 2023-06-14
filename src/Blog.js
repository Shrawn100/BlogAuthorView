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
  const [content, setContent] = useState("");
  const [editStatus, setEditStatus] = useState(false);
  const [title, setTitle] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [text, setText] = useState("");
  const [published, setPublished] = useState(false);
  const [date, setDate] = useState(null);
  const [confirmation, setConfirmation] = useState(false);
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

          setText(response.data.blog.content);
          setPublished(response.data.blog.published);
          setContent(response.data.blog.content.split("%!P"));
          setDate(response.data.blog.date);
          if (response.data.blog.image) {
            setImgUrl(response.data.blog.image);
          }
        }
      } catch (error) {
        console.error("Error fetching author's blogs:", error);
      }
    };

    fetchData();
  }, [id, editStatus]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (published === undefined || published === null) {
        setPublished(false);
      }
      console.log(published);
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.put(
          `http://localhost:3000/author/${id}`,
          {
            author: author,
            title: title,
            image: decodedUrl,
            content: text,
            published: published,
          },
          config
        );
        console.log("PUT request successful:", response.data);
        setEditStatus(false);
        // Perform any additional actions after the successful PUT request
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle the error as needed
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
  const decodedUrl = he.decode(imgUrl);
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
                      imgUrl={imgUrl}
                      setImgUrl={setImgUrl}
                      text={text}
                      setText={setText}
                      published={published}
                      setPublished={setPublished}
                    ></BlogForm>
                    <button onClick={handleDeleteClick}>Delete Blog</button>
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
                  decodedUrl={decodedUrl}
                  content={content}
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
