import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Code, ClipboardList } from "lucide-react";
import axios from "axios";
import 'remixicon/fonts/remixicon.css';

const Home = () => {
  const roleRef = useRef(null);
  const aboutRef = useRef(null);
  const touchRef = useRef(null);
  const [start, setStart] = useState(false);

  const scrollToRoles = () => {
    roleRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTouch = () => {
    touchRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchStart = async () => {
      try {
        const response = await axios.get("https://bitcheck.onrender.com", {
          withCredentials: true,
        });
        if (response.data.success) {
          setStart(true);
        }
      } catch (error) {
        console.error("Error starting server:", error);
      }
    };

    fetchStart();
  }, []);

  if (!start) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-black text-white">
        <div className="text-center">
          <div className="animate-pulse text-3xl font-semibold text-[#AD70FB]">
            Loading...
          </div>
          <p className="text-gray-400 mt-2">Waking up server, please wait.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-black text-white font-sans">
      <div className="bg-[url('https://cdn.prod.website-files.com/67dc09e7e929a3f824ab44f2/67de4474b9bcdeb60029bf55_Hero%20Background%20Image.png')] min-h-screen w-full">
        {/* Navbar */}
        <header className="flex flex-col md:flex-row justify-between items-center py-5 bg-black sticky top-0 z-50 px-4 md:px-44 border-b border-white/30">
          <img
            src="https://cdn.prod.website-files.com/67dc09e7e929a3f824ab44f2/67dc12f9beb4535c1d7f9342_Logo.png"
            alt="BitCheck Logo"
            className="w-18 md:w-auto mb-4 md:mb-0"
          />

          <nav className="flex flex-wrap justify-center items-center gap-2 md:gap-6 text-sm font-medium">
            <Link
              to="/play-ground"
              className="bg-gradient-to-r from-black to-[#5e4ca2] text-white capitalize border border-[#5e4ca2] rounded-md px-3 py-1 md:px-5 md:py-2 text-sm md:text-base font-medium leading-[150%] no-underline transition-all duration-300"
            >
              AI Playground
            </Link>

            <Link
              to="#"
              onClick={scrollToAbout}
              className="bg-gradient-to-r from-black to-[#5e4ca2] text-white capitalize border border-[#5e4ca2] rounded-md px-3 py-1 md:px-5 md:py-2 text-sm md:text-base font-medium leading-[150%] no-underline transition-all duration-300"
            >
              About
            </Link>

            <Link
              to="#"
              onClick={scrollToTouch}
              className="bg-gradient-to-r from-black to-[#5e4ca2] text-white capitalize border border-[#5e4ca2] rounded-md px-3 py-1 md:px-5 md:py-2 text-sm md:text-base font-medium leading-[150%] no-underline transition-all duration-300"
            >
              Get in Touch
            </Link>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center h-[90vh] text-center px-4 md:px-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium mb-6 leading-tight text-white max-w-4xl tracking-tight">
            AI-Driven <span className="text-[#AD70FB]">Code Review</span><br className="hidden md:block" />
            Without the Bottlenecks.
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mb-10 px-4">
            For Developers, Reviewers, and Coders – streamline collaboration with AI-powered workflows.
          </p>
          <button
            onClick={scrollToRoles}
            style={{
              backgroundImage: "linear-gradient(90deg, black -10%, #5e4ca2 75%)"
            }}
            className="bg-gradient-to-r from-black to-[#5e4ca2] text-white capitalize border border-[#5e4ca2] rounded-md px-6 py-3 md:px-8 md:py-4 font-medium leading-[150%] no-underline transition-all duration-300 text-lg"
          >
            Let's Start
          </button>
        </section>

        {/* Role Cards */}
        <section ref={roleRef} className="py-20 px-4 md:px-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/developer" className="bg-[#1E1E1E] rounded-2xl p-8 text-center shadow-md hover:shadow-lg transition-shadow border border-white/10">
              <Code size={40} className="mx-auto mb-4 text-[#AD70FB]" />
              <h3 className="text-2xl font-semibold mb-2">Developer</h3>
              <p className="text-gray-400 text-sm">Submit code snippets, request reviews, and track improvements.</p>
            </Link>

            <Link to="/reviewer" className="bg-[#1E1E1E] rounded-2xl p-8 text-center shadow-md hover:shadow-lg transition-shadow border border-white/10">
              <ShieldCheck size={40} className="mx-auto mb-4 text-[#AD70FB]" />
              <h3 className="text-2xl font-semibold mb-2">Reviewer</h3>
              <p className="text-gray-400 text-sm">Access developer submissions, leave feedback, and approve code.</p>
            </Link>

            <Link to="/admin" className="bg-[#1E1E1E] rounded-2xl p-8 text-center shadow-md hover:shadow-lg transition-shadow border border-white/10">
              <ClipboardList size={40} className="mx-auto mb-4 text-[#AD70FB]" />
              <h3 className="text-2xl font-semibold mb-2">Admin</h3>
              <p className="text-gray-400 text-sm">Manage roles, oversee project activity, and maintain quality control.</p>
            </Link>
          </div>
        </section>

        {/* About Section */}
        <section ref={aboutRef} className="py-20 px-6 md:px-20 text-center">
          <h2 className="text-4xl font-bold mb-8 text-white">About BitCheck</h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
            BitCheck is a streamlined platform that integrates the power of AI with human insight to create a seamless code review process. Whether you're a developer submitting code, a reviewer analyzing submissions, or an admin overseeing workflows, BitCheck simplifies collaboration and boosts efficiency.
          </p>
        </section>

        {/* Contact Section */}
        <section ref={touchRef} className="py-20 px-6 md:px-20 text-center">
          <h2 className="text-4xl font-bold mb-8 text-white">Get in Touch</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-6">
            Have questions, suggestions, or feedback? We'd love to hear from you.
          </p>
          <a
            href="mailto:contact@bitcheck.ai"
            className="inline-block bg-gradient-to-r from-black to-[#5e4ca2] text-white px-6 py-3 rounded-md border border-[#5e4ca2] text-base font-medium"
          >
            contact@bitcheck.ai
          </a>
        </section>
      </div>
    </div>
  );
};

export default Home;
