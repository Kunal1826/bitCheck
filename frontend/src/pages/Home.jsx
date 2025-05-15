import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Code, ClipboardList } from "lucide-react";
import 'remixicon/fonts/remixicon.css'

const Home = () => {
  const roleRef = useRef(null);
  const aboutRef = useRef(null);
  const touchRef = useRef(null); // Fixed variable name (camelCase)

  const scrollToRoles = () => {
    roleRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTouch = () => {
    touchRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full bg-black text-white font-sans">
      <div className="bg-[url('https://cdn.prod.website-files.com/67dc09e7e929a3f824ab44f2/67de4474b9bcdeb60029bf55_Hero%20Background%20Image.png')]  min-h-screen w-full">
        {/* Navbar */}
        <header className="flex flex-col md:flex-row justify-between items-center py-5 bg-black sticky top-0 z-50 px-4 md:px-44 border-b border-white/30">
          <img
            src="https://cdn.prod.website-files.com/67dc09e7e929a3f824ab44f2/67dc12f9beb4535c1d7f9342_Logo.png"
            alt="BitCheck Logo"
            className="w-18 md:w-auto  mb-4 md:mb-0"
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
              onClick={scrollToTouch} // Fixed: was onAbort
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

        {/* Role Cards Section */}
        <section
          ref={roleRef}
          className="bg-black py-16 md:py-32 px-4 md:px-20 flex flex-col items-center gap-8 md:gap-15"
        >
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-medium mb-3 text-white">Choose Your <span className="text-[#AD70FB]">Role</span></h2>
            <p className="text-gray-300 mt-4 md:mt-6">
              Built for teams who code, review, and manage quality — efficiently.
            </p>
          </div>

          <div className="relative w-full max-w-7xl flex flex-col md:flex-row justify-center items-center mt-2 gap-8 md:gap-0">
            {/* Developer */}
            <div className="flex flex-col justify-center items-center border border-[#ad70fb] bg-gradient-to-r from-[#1b1b1b] to-[#ad70fb33] rounded-xl px-6 py-8 md:px-10 md:py-[62.5px] w-full md:w-80 h-auto md:h-96 text-center shadow-xl hover:scale-105 transition-all duration-300">
              <div className="flex justify-center mb-5">
                <Code className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">Developer</h3>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                Submit clean code, get feedback instantly, and iterate faster with AI support.
              </p>
              <Link
                to="/auth/developer"
                className="bg-black text-white capitalize border border-[#5e4ca2] rounded-full px-4 py-1 md:px-5 md:py-2 text-sm md:text-base font-medium leading-[150%] no-underline transition-all duration-300"
              >
                Go to Developer
              </Link>
            </div>

            {/* Reviewer (center card, raised slightly) */}
            <div className="flex flex-col justify-center items-center border border-[#ad70fb] bg-gradient-to-r from-[#1b1b1b] to-[#ad70fb33] rounded-xl px-6 py-8 md:px-10 md:py-[62.5px] w-full md:w-80 h-auto md:h-96 text-center shadow-xl md:mx-8 z-10 hover:scale-105 transition-all duration-300 md:transform md:-translate-y-8">
              <div className="flex justify-center mb-5">
                <ClipboardList className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">Reviewer</h3>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                Review incoming submissions, give actionable insights, and ensure high standards.
              </p>
              <Link
                to="/auth/reviewer"
                className="bg-black text-white capitalize border border-[#5e4ca2] rounded-full px-4 py-1 md:px-5 md:py-2 text-sm md:text-base font-medium leading-[150%] no-underline transition-all duration-300"
              >
                Go to Reviewer
              </Link>
            </div>

            {/* Admin */}
            <div className="flex flex-col justify-center items-center border border-[#ad70fb] bg-gradient-to-r from-[#1b1b1b] to-[#ad70fb33] rounded-xl px-6 py-8 md:px-10 md:py-[62.5px] w-full md:w-80 h-auto md:h-96 text-center shadow-xl hover:scale-105 transition-all duration-300">
              <div className="flex justify-center mb-5">
                <ShieldCheck className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">Admin</h3>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                Manage roles, approve reviews, and keep everything flowing securely.
              </p>
              <Link
                to="/auth/admin"
                className="bg-black text-white capitalize border border-[#5e4ca2] rounded-full px-4 py-1 md:px-5 md:py-2 text-sm md:text-base font-medium leading-[150%] no-underline transition-all duration-300"
              >
                Go to Admin
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          ref={aboutRef}
          className="bg-[url('https://cdn.prod.website-files.com/67dc09e7e929a3f824ab44f2/67de4474b9bcdeb60029bf55_Hero%20Background%20Image.png')] bg-cover bg-center py-16 md:py-32 px-4 md:px-20 text-white flex flex-col items-center justify-center"
        >
          <div className="flex flex-col justify-center items-center bg-gradient-to-r from-[#111111]/50 to-[#ad70fb33] rounded-xl px-6 py-8 md:px-10 md:py-[62.5px] text-center shadow-xl relative w-full md:w-[80%] h-auto md:h-130 p-4 md:p-20">
            <h2 className="text-3xl md:text-5xl font-semibold mb-6 text-center text-white">What is <span className="text-[#AD70FB]">BitCheck</span>?</h2>
            <p className="max-w-3xl text-center text-gray-300 mb-8 md:mb-16 text-base md:text-lg leading-relaxed">
              BitCheck is a role-based AI-powered code collaboration platform designed to streamline developer workflows, automate code reviews, and enhance code quality. Whether you're a Developer submitting code, a Reviewer offering feedback, or an Admin overseeing operations BitCheck integrates intelligent workflows to accelerate and secure the review lifecycle.
            </p>

            {/* Icon Grid - Hidden on mobile, shown on md and up */}
            <div className="hidden md:block ">
              <img src="https://cdn.prod.website-files.com/67dc09e7e929a3f824ab44f2/67e272ef8665cac5b2c213f7_Power%20Icon%201.png" className="w-20 md:w-32 p-4 md:p-8 absolute left-2 md:left-0 top-2 md:top-10 rounded-full bg-white/10" alt="Icon 1" />
              <img src="https://cdn.prod.website-files.com/67dc09e7e929a3f824ab44f2/67e24ceb4be2402b01c80c61_Power%20Icon%202.png" className="w-12 md:w-18 p-2 md:p-4 absolute left-10 md:left-20 top-[45%] rounded-full bg-white/10" alt="Icon 2" />
              <img src="https://cdn.prod.website-files.com/67dc09e7e929a3f824ab44f2/67e272ef7dd5a73bd3a24edf_Power%20Icon%203.png" className="w-20 md:w-32 p-4 md:p-8 absolute left-2 md:left-0 bottom-2 md:bottom-5 rounded-full bg-white/10" alt="Icon 3" />
              <img src="https://cdn.prod.website-files.com/67dc09e7e929a3f824ab44f2/67e272ee79a7047719f15218_Power%20Icon%204.png" className="w-20 md:w-32 p-4 md:p-8 absolute right-2 md:right-0 top-2 md:top-10 rounded-full bg-white/10" alt="Icon 4" />
              <img src="https://cdn.prod.website-files.com/67dc09e7e929a3f824ab44f2/67e24ceae5f32bf1972d3080_Power%20Icon%205.png" className="w-12 md:w-18 p-2 md:p-4 absolute right-10 md:right-20 top-[45%] rounded-full bg-white/10" alt="Icon 5" />
              <img src="https://cdn.prod.website-files.com/67dc09e7e929a3f824ab44f2/67e272efc032463993ef57ed_Power%20Icon%20.png" className="w-20 md:w-32 p-4 md:p-8 absolute right-2 md:right-0 bottom-2 md:bottom-5 rounded-full bg-white/10" alt="Icon 6" />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          ref={touchRef} // Fixed: using the correct ref variable
          className="bg-black py-16 md:py-32 px-4 md:px-60 flex flex-col md:flex-row items-center gap-8 md:gap-20 justify-between"
        >
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl">Contact Me</h1>
            <h1 className="text-4xl md:text-6xl text-[#AD70FB] mt-2">Today</h1>
            <p className="mt-4 md:mt-5 opacity-80">For any improvement, suggestion or query</p>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <i className="ri-mail-ai-line text-white text-2xl md:text-3xl"></i>
            <h1 className="text-xl md:text-3xl opacity-80 text-[#AD70FB]">kunal.kumawat001@gmail.com</h1>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;