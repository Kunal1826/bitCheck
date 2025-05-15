import React, { useEffect, useState } from "react";
import prism from "prismjs";
import Editor from "react-simple-code-editor";
import Markdown from "react-markdown";
import axios from "axios";
import "prismjs/themes/prism-tomorrow.css";
import { useNavigate } from "react-router-dom";

const CodeSubmissionPage = () => {
  const [code, setCode] = useState("// Type your code here!");
  const [responseText, setResponseText] = useState("");
  const [instruction, setInstruction] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [codeName, setCodeName] = useState("");
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

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

  const handleSubmit = async () => {
    try {
      const blob = new Blob([code], { type: "text/plain" });
      const file = new File([blob], `${codeName || "code"}.js`, {
        type: "text/plain",
      });

      const formData = new FormData();
      formData.append("file", file);
      formData.append("comment", comment);
      formData.append("codeName", codeName);

      const response = await axios.post("https://bitcheck.onrender.com/api/code/upload-code", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      alert("Submission successful!");
      setShowPopup(false);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed");
    }
  };

  const logout = async () => {
    try {
      await axios.get("https://bitcheck.onrender.com/api/user/logout", { withCredentials: true });
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="w-full md:h-screen h-full bg-black text-white px-4 py-1 md:px-10 lg:px-2">
      <div className="flex justify-between items-center py-4">
        <h1 className="md:text-3xl text-2xl font-bold text-white">bitCheck</h1>
        <div className="flex md:gap-4 gap-1">
          <button
            onClick={() => setShowPopup(true)}
            className="bg-gradient-to-r from-green-700 to-green-500 text-white border border-green-500 rounded-md md:px-4 md:py-2 py-1 px-2 md:h-auto h-fit text-sm  md:font-medium  hover:scale-105 transition-transform"
          >
            Submit Code
          </button>
          <button
            onClick={logout}
            className="bg-gradient-to-r from-red-700 to-red-500 text-white border border-red-500 rounded-md md:px-4 md:py-2 py-1 px-2 md:h-auto h-fit text-sm  md:font-medium  hover:scale-105 transition-transform"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex h-[calc(100%-6rem)] flex-col lg:flex-row md:gap-1 w-full">
        {/* Code Editor Section */}
        <div className="w-full lg:w-1/2 bg-[#121212] rounded-xl p-4 flex flex-col">
          <div className="flex-1 overflow-y-auto rounded-lg bg-black p-3 text-white">
            <Editor
              className="min-h-[300px] md:min-h-[400px] lg:min-h-[500px]"
              value={code}
              onValueChange={setCode}
              highlight={(code) => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
            />
          </div>
        </div>

        {/* Output + Instruction Section */}
        <div className="w-full lg:w-1/2 bg-[#1f1f1f] rounded-xl p-4 flex flex-col">
          <div className="flex-1 overflow-y-auto border-b border-gray-700 pb-4 pr-1 scrollbar-hide">
            {responseText ? (
              <Markdown>{responseText}</Markdown>
            ) : (
              <div className="h-full w-full flex justify-center items-center text-3xl md:text-4xl opacity-40 text-center flex-col text-[#a896ea]">
                Welcome to bitCheck<br /><span className="mt-4">Assistant!</span>
              </div>
            )}
          </div>
          <div className="pt-4 flex flex-col md:flex-row items-center gap-2">
            <input
              type="text"
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              placeholder="Enter instruction..."
              className="flex-1 p-2 rounded bg-zinc-800 text-white border border-gray-600"
            />
            <button
              onClick={handleSend}
              className="bg-gradient-to-r from-black to-[#5e4ca2] text-white capitalize border border-[#5e4ca2] rounded-md px-5 py-2 text-base font-medium leading-[150%] no-underline transition-all duration-300 hover:text-[#baa8f5]"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Submission Popup */}
      {showPopup && (
        <div className="absolute inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-zinc-800 p-6 rounded-xl shadow-lg w-[400px] flex flex-col gap-4">
            <h2 className="text-2xl font-semibold mb-2">Submit Code</h2>
            <input
              type="text"
              value={codeName}
              onChange={(e) => setCodeName(e.target.value)}
              placeholder="Code name"
              className="p-2 rounded bg-zinc-700 text-white border border-gray-600"
            />
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="p-2 rounded bg-zinc-700 text-white border border-gray-600 resize-none"
              rows={4}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 bg-gray-600 rounded text-white hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-600 rounded text-white hover:bg-green-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeSubmissionPage;
