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
      const response = await axios.post("http://localhost:3000/api/ai/generate", {
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
      // formData.append("userId", "user123"); // Replace with real user ID
      // formData.append("role", "developer");  // Replace with dynamic role
      formData.append("comment", comment);
      formData.append("codeName", codeName);

      console.log(formData)

      const response = await axios.post("http://localhost:3000/api/code/upload-code", formData, {
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

    const logout = async()=>{
        try{
          await axios.get("http://localhost:3000/api/user/logout", { withCredentials: true });
          navigate("/");
        } catch (error) {
          console.error("Error during logout:", error);
        }
      }


  return (
    <div className="h-screen w-full bg-black/90 text-white flex flex-col p-2 overflow-hidden relative">
      {/* NavBar */}
      <nav className="flex justify-between items-center bg-zinc-800 px-6 py-4 shadow-md rounded-xl mb-2">
        <h1 className="text-3xl">bitCheck</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setShowPopup(true)}
            className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 text-white font-semibold"
          >
            Submit Code
          </button>
          <button onClick={logout} className="text-white font-semibold px-4 py-2 bg-red-600 rounded hover:bg-red-700">
            Logout
          </button>
        </div>
      </nav>

      <div className="flex flex-1 h-[calc(100%-5rem)]">
        {/* Code Editor Section */}
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

        {/* AI Response Section */}
        <div className="w-1/2 h-full bg-zinc-900 flex flex-col p-4">
          <div className="flex-1 overflow-y-auto mb-4 p-5 text-lg border border-gray-700 rounded scrollbar-hide">
            {responseText ? (
              <div className="markdown-output">
                <Markdown>{responseText}</Markdown>
              </div>
            ) : (
              <div className="text-center text-gray-500 mt-20 text-2xl opacity-40">
                Welcome to bitCheck Assistant!
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
