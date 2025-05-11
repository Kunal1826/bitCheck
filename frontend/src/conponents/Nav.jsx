import React from 'react'
import 'remixicon/fonts/remixicon.css'

const Nav = () => {
  return (
    <div>
      <div className='w-full p-6 rounded-[5px]  h-20vh bg-zinc-300 flex  justify-between items-center neumorphic'>
        
        <div><h1 className='left font-medium text-3xl'>bitCheck</h1></div>

        <div className='right text-white text-sm flex gap-10 items-center'>
          <a href="">
          <i className="ri-sun-fill text-black text-2xl "></i>
          <i className="ri-sun-line text-black text-2xl hidden"></i>
          </a>
        {/* <button className=' px-3 py-2 rounded-[5px] bg-black'>Register</button> */}
        <button className=' px-3 py-2 rounded-[5px] bg-black'>About</button>
        {/* <button className=' px-3 py-2 rounded-[5px] bg-black '>Logout</button> */}
        </div>
      </div>
    </div>
  )
}

export default Nav
