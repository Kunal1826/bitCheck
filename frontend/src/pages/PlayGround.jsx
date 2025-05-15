import { useEffect, useState } from "react";
import React from 'react';
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import Editor from "react-simple-code-editor";
import Markdown from "react-markdown";
import axios from "axios";

const PlayGround = () => {
  useEffect(() => {
    prism.highlightAll();
  }, []);

  const [code, setCode] = useState("// Type your code here!");
  const [review, setReview] = useState("");
  const [improve, setImprove] = useState("");
  const [testCase, setTestCase] = useState("");
  const [instruction, setInstruction] = useState("");

  const clearResponses = () => {
    setReview("");
    setImprove("");
    setTestCase("");
  };

  async function reviewCode() {
    clearResponses();
    const response = await axios.post("https://bitcheck.onrender.com/api/ai/get-review", { code });
    setReview(response.data.data);
  }

  async function improveCode() {
    clearResponses();
    const response = await axios.post("https://bitcheck.onrender.com/api/ai/get-improve", { code });
    setImprove(response.data.data);
  }

  async function testCaseCode() {
    clearResponses();
    const response = await axios.post("https://bitcheck.onrender.com/api/ai/get-testcases", { code });
    setTestCase(response.data.data);
  }

  async function customInstruction() {
    clearResponses();
    const combined = `${instruction}\n\nCode:\n${code}`;
    const response = await axios.post("https://bitcheck.onrender.com/api/ai/generate", { code: combined });
    setReview(response.data.data);
  }

  return (
    <div className="w-full h-screen bg-black text-white px-4 py-1 md:px-10 lg:px-2">
      <div className="flex h-full flex-col lg:flex-row gap-1 w-full">
        {/* Code Editor Section */}
        <div className="w-full lg:w-1/2 bg-[#121212] rounded-xl p-4 flex flex-col ">
          <div className="flex-1 overflow-y-auto rounded-lg bg-black p-3 text-white scrollbar-hide">
            <Editor
              className="min-h-[300px] md:min-h-[400px] lg:min-h-[500px] scrollbar-hide"
              value={code}
              onValueChange={setCode}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
            />
          </div>
          <div className="flex flex-row sm:flex-row flex-wrap gap-1 sm:gap-3 mt-4 justify-center sm:justify-end w-full">
            <button onClick={reviewCode}className="bg-gradient-to-r from-black to-[#5e4ca2] text-white capitalize border border-[#5e4ca2] rounded-md px-4 py-2 text-base font-medium leading-[150%] no-underline transition-all duration-300 hover:text-[#baa8f5] active:scale-95 ">Review</button>
            <button onClick={improveCode} className="bg-gradient-to-r from-black to-[#5e4ca2] text-white capitalize border border-[#5e4ca2] rounded-md px-4 py-2 text-base font-medium leading-[150%] no-underline transition-all duration-300 hover:text-[#baa8f5] active:scale-95 ">Improve</button>
            <button onClick={testCaseCode} className="bg-gradient-to-r from-black to-[#5e4ca2] text-white capitalize border border-[#5e4ca2] rounded-md px-4 py-2 text-base font-medium leading-[150%] no-underline transition-all duration-300 hover:text-[#baa8f5] active:scale-95">Test Cases</button>
          </div>
        </div>

        {/* Output and Instruction Section */}
        <div className="w-full lg:w-1/2 bg-[#1f1f1f] rounded-xl p-4 flex flex-col">
          <div className="flex-1 overflow-y-auto border-b border-gray-700 pb-4 pr-1">
            {review || improve || testCase ? (
              <Markdown>{review || improve || testCase}</Markdown>
            ) : (
              <div className="h-full w-full flex justify-center items-center text-3xl md:text-4xl opacity-40 text-center flex-col text-[#a896ea]">
                Welcome to bitCheck<br /><span className="mt-4">Playground!</span>
              </div>
            )}
          </div>

          {/* Instruction Input */}
          <div className="pt-4 flex flex-col md:flex-row items-center gap-2">
            <input
              type="text"
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              placeholder="Enter instruction..."
              className="flex-1 p-2 rounded bg-zinc-800 text-white border border-gray-600"
            />
            <button
              onClick={customInstruction}
              className="bg-gradient-to-r from-black to-[#5e4ca2] text-white capitalize border border-[#5e4ca2] rounded-md px-5 py-2 text-base font-medium leading-[150%] no-underline transition-all duration-300 hover:text-[#baa8f5]"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayGround;
