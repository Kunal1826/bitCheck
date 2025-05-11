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
        const response = await axios.get(`http://localhost:3000/api/code/get-code/${id}`, {
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
      const response = await axios.post("http://localhost:3000/api/ai/generate", {
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
      const res = await axios.put(
        `http://localhost:3000/api/code/review-code/${id}`,
        {
          status: action,
          comment,
        },
        {
          withCredentials: true,
        }
      );

      alert(`Code ${action} successfully.`);
      setStatus(action); // Optionally update UI
      setShowPopup(false);
    } catch (error) {
      console.error("Review failed:", error.response?.data || error.message);
      alert("Failed to submit review.");
    }
  };

  return (
    <div className="h-screen w-full bg-black/90 text-white flex flex-col p-2 overflow-hidden relative">
      {/* NavBar */}
      <nav className="flex justify-between items-center bg-zinc-800 px-6 py-4 shadow-md rounded-xl mb-2">
        <h1 className="text-2xl font-bold">{codeName || "Loading..."}</h1>
        <div className="flex items-center gap-4">
          <span className="px-3 py-1 rounded bg-blue-700 text-white font-medium">
            {status || "Pending"}
          </span>
          <button
            onClick={() => setShowPopup(true)}
            className="px-4 py-2 bg-yellow-500 rounded hover:bg-yellow-600 text-white font-semibold"
          >
            Review Code
          </button>
        </div>
      </nav>

      <div className="flex flex-1 h-[calc(100%-5rem)]">
        {/* Code Editor */}
        <div className="w-1/2 h-full bg-black p-4">
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={(code) =>
              prism.highlight(code, prism.languages.javascript, "javascript")
            }
            padding={10}
            className="bg-black text-white h-full overflow-auto border border-gray-700 rounded"
          />
        </div>

        {/* AI Assistant */}
        <div className="w-1/2 h-full bg-zinc-900 flex flex-col p-4">
          <div className="flex-1 overflow-y-auto mb-4 p-5 text-lg border border-gray-700 rounded scrollbar-hide">
            {responseText ? (
              <div className="markdown-output">
                <Markdown>{responseText}</Markdown>
              </div>
            ) : (
              <div className="text-center text-gray-500 mt-20 text-2xl opacity-40">
                BitCheck AI Assistant
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-gray-700">
            <input
              type="text"
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              placeholder="Enter instruction..."
              className="flex-1 p-2 rounded bg-zinc-800 text-white border border-gray-600"
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-blue-600 rounded text-white font-medium hover:bg-blue-700"
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
            <div className="flex justify-end gap-2">
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
