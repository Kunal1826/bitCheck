import { useEffect, useState } from "react"
import React from 'react'
import Nav from './conponents/Nav'
import "prismjs/themes/prism-tomorrow.css"
import prism from "prismjs"
import Editor from "react-simple-code-editor"
import Markdown from "react-markdown"
import axios from "axios"

const Reviewer = () => {

  useEffect(() => {
    prism.highlightAll()
  })

  const [code, setcode] = useState("//Type your code here!");
  const [review, setreview] = useState("");
  const [improve, setimprove] = useState("");
  const [testCase, settestCase] = useState("");


  async function reviewCode(){
    settestCase("")
    setimprove("")
    const response = await axios.post("https://bitcheck.onrender.com/api/ai/get-review",{code})
    console.log(response.data.data)
    setreview(response.data.data)
  }

  
  async function improveCode(){
    settestCase("")
    setreview("")
    const response = await axios.post("https://bitcheck.onrender.com/api/ai/get-improve",{code})
    console.log(response.data.data)
    setimprove(response.data.data)
  }

  
  async function testCaseCode(){
    setreview("")
    setimprove("")
    const response = await axios.post("https://bitcheck.onrender.com/api/ai/get-testcases",{code})
    console.log(response.data.data)
    settestCase(response.data.data)
  }

  return (
    <div className='h-screen w-full bg-black/40 p-2 overflow-hidden'>
      <Nav />
      <div className='main flex justify-between h-161 w-full mt-2'>

        <div className='left w-[49.5%] h-[97%] bg-black rounded-[5px] relative'>

          <div className='code h-[88%] w-full  !bg-black text-white p-5'>
            <Editor 
            className="!black text-white"
              value={code}
              onValueChange={code => setcode(code)}
              highlight={code => prism.highlight(code ,prism.languages.javascript, "javascript")}
              padding={10}
            />
          </div>

          <div className="absolute bottom-[2%] right-[2%] flex gap-2">
          <button onClick={reviewCode}  className=' px-3 py-2 rounded-[5px] bg-[#5C5C5C] text-white  active:scale-95 hover:bg-white hover:text-black'>Review</button>
          <button onClick={improveCode}  className=' px-3 py-2 rounded-[5px] bg-[#5C5C5C] text-white  active:scale-95 hover:bg-white hover:text-black'>Improve</button>
          <button onClick={testCaseCode}  className=' px-3 py-2 rounded-[5px] bg-[#5C5C5C] text-white  active:scale-95 hover:bg-white hover:text-black'>Generate test cases</button>
          </div>


        </div>
        <div className='right w-[50%]  h-[97%] p-5 overflow-scroll scrollbar-hide bg-black/40 rounded-[5px]'>
         {
          review || improve || testCase ? <Markdown >{review || improve || testCase}</Markdown> : <div className="h-full w-full flex justify-center items-center text-5xl opacity-40">Welcome to bitCheck!</div>
         }
        </div>
      </div>
    </div>
  )
}

export default Reviewer
