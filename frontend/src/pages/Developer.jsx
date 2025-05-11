import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const categories = ["Pending", "Rejected", "Approved"];

const Developer = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [codes, setCodes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCodes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/code/get-codes", { withCredentials: true });
        setCodes(response.data.codes || []);
      } catch (error) {
        console.error("Error fetching codes:", error);
      }
    };

    fetchCodes();
  }, []);

  const filteredCodes =
    selectedCategory === "All"
      ? codes
      : codes.filter((code) => code.status.toLowerCase() === selectedCategory.toLowerCase());


      const logout = async()=>{
        try{
          await axios.get("http://localhost:3000/api/user/logout", { withCredentials: true });
          navigate("/");
        } catch (error) {
          console.error("Error during logout:", error);
        }
      }

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      {/* Sidebar */}
        <nav className="h-screen w-[15%] bg-zinc-100 p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex flex-col items-center">
          <Link
            className="text-xs font-semibold text-sky-500 border border-sky-500 px-3 py-2 hover:bg-sky-600 hover:text-white rounded"
            to={`/submit-code`}
          >
            Submit New Code
          </Link>
          <div className="w-[85%] h-[2px] bg-black/20 mt-3"></div>
            </div>
            <div className="Categories px-4 py-3">
          <h1 className="font-medium mb-2">Status Filter</h1>
          <ul className="space-y-2">
            <li>
              <button
            className={`flex items-center gap-2 text-xs font-medium hover:text-blue-600 ${selectedCategory === "All" && "text-blue-600"}`}
            onClick={() => setSelectedCategory("All")}
              >
            <div className="h-2 w-2 rounded-full bg-gray-400"></div>
            All
              </button>
            </li>
            {categories.map((cat, id) => (
              <li key={id}>
            <button
              className={`flex items-center gap-2 text-xs font-medium hover:text-blue-600 ${selectedCategory === cat && "text-blue-600"}`}
              onClick={() => setSelectedCategory(cat)}
            >
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              {cat}
            </button>
              </li>
            ))}
          </ul>
            </div>
          </div>
          <div className="px-4 py-3">
            <button onClick={logout} className="w-full py-2 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-xl">
          Logout
            </button>
          </div>
        </nav>

        {/* Main content */}
      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl font-bold mb-6">Developer Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCodes.map((code) => (
            <div
              key={code._id}
              className="bg-white p-4 rounded-2xl shadow-md border border-gray-200"
            >
              <h2 className="text-lg font-semibold mb-1">{code.codeName}</h2>
              <p className="text-sm text-gray-600 mb-2">
                Status: <span className="font-medium">{code.status}</span>
              </p>
              {code.comments.length > 0 && (
                <p className="text-sm text-gray-500 italic">
                  {code.comments[code.comments.length - 1].text}
                </p>
              )}
              <button
                onClick={() => navigate(`/view-code/${code._id}`)}
                className="mt-3 text-sm text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-xl"
              >
                View
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Developer;
