import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


// Reusable Card Component
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
    <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-200">
      <h2 className="text-lg font-semibold mb-1">{code.codeName}</h2>

      <p className="text-sm text-gray-600 mb-1">
        Submitted by: <span className="font-medium">{creator}</span>
      </p>

      {code.comments.length > 0 && (
        <p className="text-sm text-gray-500 italic truncate mb-1">
          {code.comments[code.comments.length - 1].text}
        </p>
      )}

      <p className="text-xs text-gray-400 mb-2">Submitted on: {createdAt}</p>

      <button
        onClick={() => navigate(`/review-code/${code._id}`)}
        className="mt-2 text-sm text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-xl"
      >
        View
      </button>
    </div>
  );
};

const ReviewerDashboard = () => {
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
        const pendingCodes = res.data.codes.filter((code) => code.status === "pending");
        setCodes(pendingCodes);
      } catch (error) {
        console.error("Failed to fetch codes:", error);
      }
    };

    fetchCodes();
  }, []);

  const filteredAndSortedCodes = codes
    .filter((code) =>
      code.codeName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      return sortOrder === "newest"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt);
    });

     const logout = async()=>{
        try{
          await axios.get("http://localhost:3000/api/user/logout", { withCredentials: true });
          navigate("/");
        } catch (error) {
          console.error("Error during logout:", error);
        }
      }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Top Navbar */}
      <header className="flex items-center justify-between bg-white px-6 py-4 shadow">
        <div className="text-2xl font-bold">BitCheck</div>
        <button onClick={logout} className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl">
          Logout
        </button>
      </header>

      {/* Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4 gap-4">
        <input
          type="text"
          placeholder="Search by code name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-[300px] px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full md:w-[180px] px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="newest">Sort: Newest</option>
          <option value="oldest">Sort: Oldest</option>
        </select>
      </div>

      {/* Code Cards */}
      <main className="px-6 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedCodes.map((code) => (
            <CodeCard key={code._id} code={code} navigate={navigate} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ReviewerDashboard;
