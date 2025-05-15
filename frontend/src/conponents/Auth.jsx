import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: "", password: "", username: "" });
  const [role, setRole] = useState("developer");
  const { id } = useParams();

  useEffect(() => {
    setRole(id);
  }, [id]);

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setForm({ email: "", password: "", username: "" });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      handleLogin();
    } else {
      handleRegister();
    }
  };

  async function handleRegister() {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/register",
        {
          username: form.username,
          email: form.email,
          password: form.password,
          role: role,
        },
        { withCredentials: true }
      );

      if (response.data.token && response.data.success) {
        toggleMode();
      }
    } catch (error) {
      alert(error.response?.data?.message || "An unexpected error occurred");
    }
  }

  async function handleLogin() {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/login",
        {
          email: form.email,
          password: form.password,
        },
        { withCredentials: true }
      );

      if (response.data.token && response.data.success) {
        const userRole = response.data.user.role;
        navigate(`/${userRole}`);
      }
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  }

  return (
    <div className="w-full min-h-screen bg-black text-white font-sans">
      <div className="bg-[url('https://cdn.prod.website-files.com/67dc09e7e929a3f824ab44f2/67de4474b9bcdeb60029bf55_Hero%20Background%20Image.png')] bg-cover bg-center min-h-screen flex justify-center items-center px-4">
        <div className="bg-gradient-to-r from-black to-[#312755] text-white border border-[#5e4ca2] rounded-xl px-6 py-8 sm:px-8 md:px-10 md:py-10 w-full max-w-md">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">
            {isLogin ? "Login to BitCheck" : "Register for BitCheck"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-black text-white border border-gray-700 focus:outline-none"
                required
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-black text-white border border-gray-700 focus:outline-none"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-black text-white border border-gray-700 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition"
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </form>
          <div className="text-center mt-5">
            <p className="text-sm text-gray-400">
              {isLogin
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <button
                onClick={toggleMode}
                className="text-blue-400 hover:underline"
              >
                {isLogin ? "Register" : "Login"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
