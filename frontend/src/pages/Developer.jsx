import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const categories = ["Pending", "Rejected", "Approved"];

const statusColors = {
  approved: "text-blue-400 border-blue-400",
  rejected: "text-red-400 border-red-400",
  pending: "text-yellow-400 border-yellow-400",
};

const Developer = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [codes, setCodes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCodes = async () => {
      try {
        const response = await axios.get("https://bitcheck.onrender.com/api/code/get-codes", { withCredentials: true });
        setCodes(response.data.codes || []);
      } catch (error) {
        console.error("Error fetching codes:", error);
      }
    };

    fetchCodes();
  }, []);

  const filteredCodes = selectedCategory === "All"
    ? codes
    : codes.filter((code) => code.status.toLowerCase() === selectedCategory.toLowerCase());

  const logout = async () => {
    try {
      await axios.get("https://bitcheck.onrender.com/api/user/logout", { withCredentials: true });
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black text-white font-sans">
      {/* Header */}
      <header className="flex justify-between items-center  py-4 px-6 md:px-20 border-b border-white/20 bg-black sticky top-0 z-50">
        <Link to="/" className="text-xl md:text-3xl  text-white">BitCheck</Link>
        <div className="flex items-center gap-4">
          <Link
            to="/submit-code"
            className="bg-gradient-to-r from-black to-[#5e4ca2] text-white border border-[#5e4ca2] md:px-4 md:py-2 rounded-md px-2 py-1 text-sm"
          >
            Submit New Code
          </Link>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white md:px-4 md:py-2 px-2 py-1 rounded-md text-sm"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Filter Buttons */}
      <section className="py-6 px-6 md:px-20">
        <h1 className="text-3xl font-semibold mb-4">Developer Dashboard</h1>
        <div className="flex gap-4 flex-wrap">
          {['All', ...categories].map((category, index) => (
            <button
              key={index}
              className={`px-4 py-2 border rounded-2xl text-sm transition-all duration-200 ${selectedCategory === category
                ? 'bg-[#5e4ca2] border-[#5e4ca2] text-white'
                : 'border-white/30 text-white hover:bg-white/10'}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Code Cards */}
      <section className="px-6 md:px-20 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCodes.map((code) => (
          <div key={code._id} className="bg-gradient-to-r from-[#1b1b1b] to-[#ad70fb33] border border-[#ad70fb] rounded-xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-2">{code.codeName}</h2>
            <p className="text-gray-300 mb-1">
              Status:  <span className={`text-sm ${statusColors[code.status?.toLowerCase()]}`}>
                {code.status ? code.status.charAt(0).toUpperCase() + code.status.slice(1) : "Unknown"}
              </span>
            </p>
            {code.comments && code.comments.length > 0 && (
              <p className="text-sm italic text-gray-400 mb-2">
                "{code.comments[code.comments.length - 1].text}"
              </p>
            )}
            <button
              onClick={() => navigate(`/view-code/${code._id}`)}
              className="mt-4 inline-block bg-[#5e4ca2] hover:bg-[#734ef2] text-white text-sm px-4 py-2 rounded-md"
            >
              View Submission
            </button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Developer;
