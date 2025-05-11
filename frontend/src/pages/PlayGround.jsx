import { useEffect, useState } from "react"
import React from 'react'
import "prismjs/themes/prism-tomorrow.css"
import prism from "prismjs"
import Editor from "react-simple-code-editor"
import Markdown from "react-markdown"
import axios from "axios"

const PlayGround = () => {
  useEffect(() => {
    prism.highlightAll()
  }, [])

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
    const response = await axios.post("http://localhost:3000/api/ai/get-review", { code });
    setReview(response.data.data);
  }

  async function improveCode() {
    clearResponses();
    const response = await axios.post("http://localhost:3000/api/ai/get-improve", { code });
    setImprove(response.data.data);
  }

  async function testCaseCode() {
    clearResponses();
    const response = await axios.post("http://localhost:3000/api/ai/get-testcases", { code });
    setTestCase(response.data.data);
  }

  async function customInstruction() {
    clearResponses();
    const combined = `${instruction}\n\nCode:\n${code}`;
    const response = await axios.post("http://localhost:3000/api/ai/generate", { code: combined });
    setReview(response.data.data);
  }

  return (
    <div className='h-screen w-full bg-black/40 p-2 overflow-hidden'>
      <div className='main flex justify-between h-screen w-full mt-2'>

        {/* Code Editor Section */}
        <div className='left w-[49.5%] h-[97%] bg-black rounded-[5px] relative'>

          {/* Scrollable Editor Area */}
          <div className='code h-[90%] w-full bg-black text-white p-5 overflow-y-auto scrollbar-hide'>
            <Editor
              className="!black text-white"
              value={code}
              onValueChange={setCode}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
            />
          </div>

          {/* Fixed Buttons at Bottom-Right */}
          <div className="absolute bottom-[2%] right-[2%] flex gap-2 z-10">
            <button onClick={reviewCode} className='px-3 py-2 rounded bg-[#5C5C5C] text-white active:scale-95 hover:bg-white hover:text-black'>Review</button>
            <button onClick={improveCode} className='px-3 py-2 rounded bg-[#5C5C5C] text-white active:scale-95 hover:bg-white hover:text-black'>Improve</button>
            <button onClick={testCaseCode} className='px-3 py-2 rounded bg-[#5C5C5C] text-white active:scale-95 hover:bg-white hover:text-black'>Test Cases</button>
          </div>
        </div>

        {/* Output and Instruction Section */}
        <div className='right w-[50%] h-[97%] p-5 bg-black/40 rounded-[5px] flex flex-col justify-between'>

          {/* Output Area */}
          <div className="flex-1 overflow-y-auto text-white border-b border-gray-700 pb-4 pr-1 scrollbar-hide">
            {
              review || improve || testCase ? (
                <Markdown>{review || improve || testCase}</Markdown>
              ) : (
                <div className="h-full w-full flex justify-center items-center text-5xl opacity-40 text-center flex-col">
                  Welcome to bitCheck<br /><span className="mt-4">Playground!</span>
                </div>
              )
            }
          </div>

          {/* Instruction Input Bottom */}
          <div className="pt-4 flex items-center gap-2">
            <input
              type="text"
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              placeholder="Enter instruction..."
              className="flex-1 p-2 rounded bg-zinc-800 text-white border border-gray-600"
            />
            <button
              onClick={customInstruction}
              className="px-4 py-2 bg-blue-600 rounded text-white font-medium hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayGround;
