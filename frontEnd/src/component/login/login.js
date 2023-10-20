import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const baseURL = "http://localhost:5000";

const api = axios.create({
  baseURL,
});

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();

  const handleLogin = async () => {
    if (username === "" || password === "") {
      toast.error("Input Field Required.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
        hideProgressBar: true,
      });
      return;
    }
    try {
      const response = await api.post("/auth/login", {
        username,
        password,
      });

      if (
        response.data.message === "Login successful. Redirect to the next page."
      ) {
        /* const { username } = response.data.payload;

        localStorage.setItem("username", username) */ toast.success(
          "Login successful",
          {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
            hideProgressBar: true,
          }
        );

        history("/dashboard");

        setUsername("");
        setPassword("");
      } else {
        toast.error("Login failed", { position: toast.POSITION.TOP_CENTER });
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      console.error("Error during Login:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">
          Login to your account
        </h3>
        <div>
          <div className="mt-4">
            <label className="block" htmlFor="email">
              Username
            </label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              required
            />
          </div>
          <div className="flex items-baseline justify-between">
            <button
              onClick={handleLogin}
              className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
