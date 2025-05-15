import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Reusable Code Card
const CodeCard = ({ code, navigate }) => {
  const [creator, setCreator] = useState("Loading...");
  const [createdAt, setCreatedAt] = useState("");

  useEffect(() => {
    const fetchCreator = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/code/get-code-details/${code._id}`, {
          withCredentials: true,
        });
        setCreator(res.data.userName);
        setCreatedAt(new Date(res.data.createdAt).toLocaleString());
      } catch (error) {
        console.error("Failed to fetch code details", error);
        setCreator("Unknown");
        setCreatedAt("N/A");
      }
    };

    fetchCreator();
  }, [code._id]);

  return (
    <div className="bg-gradient-to-r from-[#1b1b1b] to-[#ad70fb33] border border-[#ad70fb] text-white rounded-xl p-6 shadow-xl">
      <h2 className="text-lg font-semibold mb-2">{code.codeName}</h2>
      <p className="text-sm text-gray-300 mb-1">
        Submitted by: <span className="font-medium text-white">{creator}</span>
      </p>
      {code.comments.length > 0 && (
        <p className="text-sm italic text-gray-400 mb-1">
          "{code.comments[code.comments.length - 1].text}"
        </p>
      )}
      <p className="text-xs text-gray-500 mb-4">Submitted on: {createdAt}</p>
      <button
        onClick={() => navigate(`/admin-code/${code._id}`)}
        className="text-sm bg-[#5e4ca2] hover:bg-[#734ef2] text-white px-4 py-2 rounded-md"
      >
        View
      </button>
    </div>
  );
};

const AdminDashboard = () => {
  const [codes, setCodes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCodes = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/code/get-All-codes", {
          withCredentials: true,
        });
        const approvedCodes = res.data.codes.filter((code) => code.status === "approved");
        setCodes(approvedCodes);
      } catch (error) {
        console.error("Failed to fetch codes:", error);
      }
    };

    fetchCodes();
  }, []);

  const filteredAndSortedCodes = codes
    .filter((code) => code.codeName.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) =>
      sortOrder === "newest"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );

  const logout = async () => {
    try {
      await axios.get("http://localhost:3000/api/user/logout", { withCredentials: true });
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Top Navbar */}
      <header className="flex justify-between items-center py-4 px-6 md:px-20 border-b border-white/20 bg-black sticky top-0 z-50">
        <div className="text-xl md:text-3xl text-white md:font-medium">BitCheck </div>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
        >
          Logout
        </button>
      </header>

      {/* Controls */}
      <section className="px-6 md:px-20 pt-8">
        <h1 className="text-3xl mb-6">Admin Dashboard</h1>
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center mb-6">
          <input
            type="text"
            placeholder="Search by code name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-[300px] px-4 py-2 bg-black border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5e4ca2]"
          />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-[150px] md:w-[180px] px-4 py-2 bg-black border border-white/30 rounded-xl text-white/80 focus:outline-none focus:ring-2 focus:ring-[#5e4ca2]"
          >
            <option value="newest">Sort: Newest</option>
            <option value="oldest">Sort: Oldest</option>
          </select>
        </div>
      </section>

      {/* Cards */}
      <main className="px-6 md:px-20 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedCodes.map((code) => (
            <CodeCard key={code._id} code={code} navigate={navigate} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
