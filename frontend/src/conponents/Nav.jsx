import React from 'react'

const Nav = () => {
  return (
    <div>
      <div className='w-full p-6 rounded-[5px] h-20vh bg-black/40 flex  justify-between items-center '>
        
        <div><h1 className='left text-3xl text-white'>bitCheck</h1></div>

        <div className='right text-white text-sm flex gap-5'>
        <button className=' px-3 py-2 rounded-[5px] bg-black'>Register</button>
        {/* <button className=' px-3 py-2 rounded-[5px] bg-black'>Login</button> */}
        <button className=' px-3 py-2 rounded-[5px] bg-black '>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default Nav
