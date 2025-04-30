import React, { useState } from "react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: "", password: "", username: "" });

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
      console.log("Logging in with", form);
    } else {
      console.log("Registering with", form);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-black/80 text-white">
      <div className="bg-[#1E1E1E] p-8 rounded-2xl shadow-2xl w-[90%] max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">
          {isLogin ? "Login to bitCheck" : "Register for bitCheck"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-[#2D2D2D] text-white border border-gray-700 focus:outline-none"
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-[#2D2D2D] text-white border border-gray-700 focus:outline-none"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-[#2D2D2D] text-white border border-gray-700 focus:outline-none"
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
            {isLogin ? "Don't have an account?" : "Already have an account?"} {" "}
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
  );
};

export default AuthPage;
