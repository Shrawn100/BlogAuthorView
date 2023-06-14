import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function App() {
  return (
    <div>
      <Form></Form>
    </div>
  );
}

const Form = () => {
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/login", {
        username: username,
        password: password,
      });
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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Login</button>
      {errors.length > 0 && (
        <div>
          <p>Errors:</p>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error.msg}</li>
            ))}
          </ul>
        </div>
      )}
      {message && <p>{message}</p>}
    </form>
  );
};

export default App;
