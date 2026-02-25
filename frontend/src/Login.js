import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // for redirecting after login
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    // Save token
        localStorage.setItem("token", data.token);

    // Decode token
    const decoded = jwtDecode(data.token);

    // Redirect based on role
    if (decoded.role === "Admin") {
        navigate("/admin");
    } else if (decoded.role === "Teacher") {
        navigate("/teacher");
    } else {
        navigate("/student");
    }
};

    try {
      const res = await axios.post(
        "http://localhost:5000/login",
        { email, password },
        { withCredentials: true } // needed for refresh cookie
      );

      // Save access token
      localStorage.setItem("accessToken", res.data.accessToken);

      setMessage("Login successful!");
      navigate("/dashboard"); // redirect to dashboard after login
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