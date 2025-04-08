import { useState } from 'react'
import './App.css'
import { IoSearch } from "react-icons/io5";

// 2ff1fe9406c64c17ab963356251103

function App() {
  const [city, setCity] = useState("Dhaka")

  return (
    <div>
      <div className='bg-[#2F3543] rounded-2xl text-[rgba(255,255,255,0.8)]'>
        <div className='flex items-center w-fit bg-[rgba(255,255,255,0.3)] rounded-full px-2'>
          <input name='city' className=' p-2 focus:outline-none' type="text" placeholder='Search for Cities' />
          <button className='cursor-pointer'>< IoSearch className='size-6 text-[#D5F0F7]'/></button>
        </div>

      </div>
    </div>
  )
}

export default App
