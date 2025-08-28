import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  
  const handleLogin = async (username, password) => {
  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      const token = data.access_token; // JWT from Flask
      localStorage.setItem("jwt", token); // store it in localStorage (or memory)
      alert("Login successful");
    } else {
      alert(data.msg || "Login failed");
    }
  } catch (err) {
    console.error(err);
  }
};

  return (
    <form
      onSubmit={handleLogin}
      style={{ display: "flex", flexDirection: "column", width: "200px", margin: "50px auto" }}
    >
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px" }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px" }}
      />
      <button type="submit">Login</button>
    </form>
  );
}
