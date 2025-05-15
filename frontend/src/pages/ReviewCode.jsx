import React, { useEffect, useState } from "react";
import prism from "prismjs";
import Editor from "react-simple-code-editor";
import Markdown from "react-markdown";
import axios from "axios";
import { useParams } from "react-router-dom";
import "prismjs/themes/prism-tomorrow.css";

const ReviewCodePage = () => {
  const [code, setCode] = useState("// Loading code...");
  const [codeName, setCodeName] = useState("");
  const [status, setStatus] = useState("");
  const [responseText, setResponseText] = useState("");
  const [instruction, setInstruction] = useState("");
  const [comment, setComment] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchCode = async () => {
      try {
        const response = await axios.get(`https://bitcheck.onrender.com/api/code/get-code/${id}`, {
          withCredentials: true,
        });
        setCodeName(response.data.codeName);
        setStatus(response.data.status);
        const fileRes = await axios.get(response.data.fileUrl);
        setCode(fileRes.data);
      } catch (error) {
        console.error("Failed to fetch code:", error);
      }
    };
    fetchCode();
  }, [id]);

  useEffect(() => {
    prism.highlightAll();
  }, [code]);

  const handleSend = async () => {
    try {
      const combined = `${instruction}\n\nCode:\n${code}`;
      const response = await axios.post("https://bitcheck.onrender.com/api/ai/generate", {
        code: combined,
      });
      setResponseText(response.data.data);
    } catch (error) {
      console.error("Error sending to AI:", error);
      setResponseText("An error occurred while processing your request.");
    }
  };

  const handleReview = async (action) => {
    if (!action || !comment.trim()) {
      alert("Please provide a comment and select an action.");
      return;
    }

    try {
      await axios.put(
        `https://bitcheck.onrender.com/api/code/review-code/${id}`,
        { status: action, comment },
        { withCredentials: true }
      );

      alert(`Code ${action} successfully.`);
      setStatus(action);
      setShowPopup(false);
    } catch (error) {
      console.error("Review failed:", error.response?.data || error.message);
      alert("Failed to submit review.");
    }
  };

  return (
    <div className="w-full h-full bg-black text-white px-4 py-2 md:px-10">
      {/* NavBar */}
      <div className="flex justify-between items-center py-4">
        <h1 className="md:text-3xl text-2xl font-bold">{codeName || "Loading..."}</h1>
        <div className="flex gap-2">
          <span className="md:px-3 md:py-1 px-2 py-2 rounded bg-blue-600 text-white font-medium text-sm md:flex md:justify-center md:items-center">
            {status || "Pending"}
          </span>
          <button
            onClick={() => setShowPopup(true)}
            className="bg-gradient-to-r from-yellow-600 to-yellow-400 text-black font-medium border border-yellow-500 rounded-md px-3 py-1 md:px-4 md:py-2 text-sm md:text-base hover:scale-105 transition-transform"
          >
            Review Code
          </button>
        </div>
      </div>

      <div className="flex flex-col h-full lg:flex-row md:h-[640px] gap-2">
        {/* Code Editor Section */}
        <div className="w-full lg:w-1/2 bg-[#121212] rounded-xl p-4">
          <Editor
            className="min-h-[325px] md:min-h-[400px] lg:min-h-[500px]"
            value={code}
            onValueChange={setCode}
            highlight={(code) => prism.highlight(code, prism.languages.javascript, "javascript")}
            padding={10}
          />
        </div>

        {/* AI Response Section */}
        <div className="w-full h-[220px] md:h-full lg:w-1/2 bg-[#1f1f1f] rounded-xl p-4 flex flex-col">
          <div className="flex-1 overflow-y-auto border-b border-gray-700 pb-4 pr-1 scrollbar-hide">
            {responseText ? (
              <Markdown>{responseText}</Markdown>
            ) : (
              <div className="h-full w-full flex justify-center items-center text-2xl md:text-3xl opacity-40 text-center text-[#a896ea]">
                BitCheck AI Assistant
              </div>
            )}
          </div>

          <div className="pt-4  flex flex-col md:flex-row items-center gap-2">
            <input
              type="text"
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              placeholder="Enter instruction..."
              className="flex-1 p-2 rounded bg-zinc-800 text-white border border-gray-600"
            />
            <button
              onClick={handleSend}
              className="bg-gradient-to-r from-black to-[#5e4ca2] text-white capitalize border border-[#5e4ca2] rounded-md px-5 py-2 text-base font-medium transition-all duration-300 hover:text-[#baa8f5]"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Review Popup */}
      {showPopup && (
        <div className="absolute inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-zinc-800 p-6 rounded-xl shadow-lg w-[400px] flex flex-col gap-4">
            <h2 className="text-2xl font-semibold mb-2">Review Code</h2>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add your review comment..."
              className="p-2 rounded bg-zinc-700 text-white border border-gray-600 resize-none"
              rows={4}
            />
            <div className="flex justify-end gap-2 flex-wrap">
              <button
                onClick={() => handleReview("rejected")}
                disabled={!comment.trim()}
                className="px-4 py-2 bg-red-600 rounded text-white hover:bg-red-700 disabled:opacity-50"
              >
                Reject
              </button>
              <button
                onClick={() => handleReview("approved")}
                disabled={!comment.trim()}
                className="px-4 py-2 bg-green-600 rounded text-white hover:bg-green-700 disabled:opacity-50"
              >
                Approve
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 bg-gray-600 rounded text-white hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewCodePage;
