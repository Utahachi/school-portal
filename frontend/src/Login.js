import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // for redirecting after login
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useAuth } from "./context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/login",
        { email, password },
        { withCredentials: true } // needed for refresh cookie
      );

      // Save access token
      // store token using context
      login(res.data.accessToken);

      // Decode token
      const decoded = jwtDecode(res.data.accessToken);

      // Redirect based on role
      if (decoded.role === "Admin") {
        navigate("/admin");
      } else if (decoded.role === "Teacher") {
        navigate("/teacher");
      } else {
        navigate("/student");
      }

    } catch (err) {
      setMessage("Login failed");
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "100px auto" }}>
      <h2>School Portal Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit">Login</button>
      </form>

      <p>{message}</p>
    </div>
  );
}