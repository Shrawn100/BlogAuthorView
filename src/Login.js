import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const handleLogin = async () => {
    // Handle login with test user
    setUsername("testUser");
    setPassword("testUser");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://blogapi-production-9a30.up.railway.app/login",
        {
          username: username,
          password: password,
        }
      );
      const { message, errors, token } = response.data;

      if (errors) {
        setErrors(errors);
        setMessage("");
      } else if (message === "User does not exist") {
        setErrors([]);
        setMessage("User does not exist");
      } else if (message === "Wrong password") {
        setErrors([]);
        setMessage("Wrong password");
      } else if (token) {
        // Perform any necessary action upon successful login, e.g., save token to localStorage
        localStorage.setItem("token", token);
        setErrors([]);
        setMessage("Login successful");
        navigate("/author"); // Redirect to "/author" page
      }
    } catch (error) {
      console.error("Login request failed:", error);
    }
  };

  return (
    <div className="login-page-container">
      <img
        className="login-page-img"
        src="https://images.pexels.com/photos/2253818/pexels-photo-2253818.jpeg"
        alt="Sky view of beach"
      ></img>
      <div className="login-page-content">
        <h1 className="login-header">Author Hub</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-container">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleInputChange}
            />
          </div>
          <div className="login-page-btns">
            <button type="submit">Submit</button>
            <button type="button" onClick={handleLogin}>
              Test User
            </button>
          </div>

          {errors.length > 0 && (
            <ul className="errors-list-ul">
              {errors.map((error, index) => (
                <li key={index}>{error.msg}</li>
              ))}
            </ul>
          )}
          {message && <p className="error-msg-p">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
