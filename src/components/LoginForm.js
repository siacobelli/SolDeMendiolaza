// LoginForm.js
import React, { useState } from "react";
import { useLogin } from "react-admin";
import { Button, TextField } from "@material-ui/core";

const LoginForm = () => {
  const login = useLogin();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleLogin = () => {
    // Call the useLogin hook with the provided credentials
    login(credentials)
      .then(() => {
        // Handle successful login
        console.log("Login successful!");
      })
      .catch((error) => {
        // Handle login error
        console.error("Login error:", error);
      });
  };

  return (
    <form>
      <TextField
        label="Username"
        type="text"
        value={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
      />
      <TextField
        label="Password"
        type="password"
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
