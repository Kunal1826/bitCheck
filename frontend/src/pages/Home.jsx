import React from "react";
import Nav from "../conponents/Nav";
import { Link } from "react-router-dom";
import { ShieldCheck, Code, ClipboardList, Sparkles } from "lucide-react";

const Home = () => {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-zinc-100 to-zinc-300 p-4 flex flex-col gap-8 overflow-hidden">
      <Nav />

      <div className="grid grid-cols-4 gap-6 justify-items-center mt-30 px-6">
        {/* Admin Card */}
        <div className="neumorphic-card h-64 w-64">
          <ShieldCheck className="icon-style" />
          <Link to="/auth/admin" className="btn-style mt-5">Admin</Link>
        </div>

        {/* Reviewer Card */}
        <div className="neumorphic-card h-64 w-64">
          <ClipboardList className="icon-style" />
          <Link to="/auth/reviewer" className="btn-style mt-5">Reviewer</Link>
        </div>

        {/* Developer Card */}
        <div className="neumorphic-card h-64 w-64">
          <Code className="icon-style" />
          <Link to="/auth/developer" className="btn-style mt-5">Developer</Link>
        </div>

        {/* Playground Card - Wider and shorter */}
        <div className="neumorphic-card h-48 w-72 flex flex-col items-center justify-center py-4">
          <Sparkles className="icon-style mb-2" />
          <h1 className="text-lg font-medium">AI Playground</h1>
          <Link to="/play-ground" className="btn-style mt-3">Check Out</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
