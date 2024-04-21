'use client'

import React from 'react'
import { IoIosMenu, IoIosNotifications} from 'react-icons/io'
import { IoBookSharp } from "react-icons/io5";
import {  FaCashRegister, FaPhoneAlt, FaDollarSign } from "react-icons/fa";
import { AiFillCloud } from "react-icons/ai";
import { BiAdjust } from "react-icons/bi";
import { GiTreeDoor } from "react-icons/gi";
import { GoHome } from "react-icons/go";

const ThongTinnav = () => {
  return (
    <>
    <button className='flex gap-3  '>
    <IoIosNotifications className='text-slate-300 size-7' />
    <span className='text-black'> Thông Báo và tin tức </span>
    </button>
    </>
  )
  
}

const ThongTinnav2 = () => {
  return (
    <>
    <button className='flex gap-3'>
    <IoIosMenu  className='text-slate-300 size-7'/>
    <span className='text-black'> Lịch Học </span>
    </button>
    </>
  )
}
const ThongTinnav3 = () => {
  return (
    <>
    <button className='flex gap-3'>
    <IoBookSharp className='text-slate-300 size-7'/>
    <span className='text-black'> Điểm </span>
    </button>
    </>
  )
}

const ThongTinnav5 = () => {
  return (
    <>
    <button className='flex gap-3'>
    <FaDollarSign className='text-slate-300 size-7'/>
    <span className='text-black'>Học Phí </span>
    </button>
    </>
  )
}
const ThongTinnav6 = () => {
  return (
    <>
    <button className='flex gap-3'>
    <FaCashRegister className='text-slate-300 size-7'/>
    <span className='text-black'> Đăng Ký dịch vụ </span>
    </button>
    </>
  )
}
const ThongTinnav7 = () => {
  return (
    <>
    <button className='flex gap-3'>
    <AiFillCloud className='text-slate-300 size-7'/>
    <span className='text-black'> Dịch vụ đã đăng ký </span>
    </button>
    </>
  )
}
const ThongTinnav8 = () => {
  return (
    <>
    <button className='flex gap-3'>
    <FaPhoneAlt className='text-slate-300 size-7'/>
    <span className='text-black'> Liên lạc </span>
    </button>
    </>
  )
}

const ThongTinnav9 = () => {
  return (
    <>
    <button className='flex gap-3 ml-auto mr-4'>
    <BiAdjust className='text-cyan-500 mt-5 size-7'/>
    <span className='text-black mt-5 '> Xin chào, Hùng </span>
    </button>
    </>
  )
}
const ThongTinnav10 = () => {
  return (
    <>
    <button className='flex gap-4 mt-4 ml-4'>
    <GoHome className='text-slate-300 size-8'/>
    <span className='text-black text-2xl'> Trang chủ </span>
    </button>
    </>
  )
}
const ThongTinnav11 = () => {
  return (
    <>
    <button className='flex gap-4 mt-4 ml-4'>
    <GiTreeDoor className='text-slate-300 size-7'/>
    <span className='text-black text-2xl'> 2024 HCMUNRE </span>
    </button>
    </>
  )
}

const ThongTinnav12 = () => {
  return (
    <>
    <button className='flex gap-4 mt-4 ml-4'>
    <FaCashRegister className='text-slate-300 size-8'/>
    <span className='text-black text-3xl '> Đăng ký sinh viên </span>
    </button>
    </>
  )
}
const ThongTinnav13 = () => {
  return (
    <>
    <button className='flex gap-3 mt-4 ml-4  '>
    <IoIosNotifications className='text-slate-300 size-7' />
    <span className='text-black text-2xl'> Thông Báo và tin tức </span>
    </button>
    </>
  )
  
}
const ThongTinnav14 = () => {
  return (
    <>
    <button className='flex gap-3 mt-4 ml-4'>
    <IoBookSharp className='text-slate-300 size-7'/>
    <span className='text-black text-2xl'> Điểm </span>
    </button>
    </>
  )
}
const ThongTinnav15 = () => {
  return (
    <>
    <button className='flex gap-3 mt-4 ml-4'>
    <FaDollarSign className='text-slate-300 size-7'/>
    <span className='text-black text-2xl'>Học Phí </span>
    </button>
    </>
  )
}
const ThongTinnav16 = () => {
  return (
    <>
    <button className='flex gap-3 mt-4 ml-4'>
    <AiFillCloud className='text-slate-300 size-7'/>
    <span className='text-black text-2xl'> Dịch vụ đã đăng ký </span>
    </button>
    </>
  )
}
const ThongTinnav17 = () => {
  return (
    <>
    <button className='flex gap-3 mt-4 ml-4'>
    <IoIosMenu  className='text-slate-300 size-7'/>
    <span className='text-black text-2xl'> Lịch Học </span>
    </button>
    </>
  )
}
const ThongTinnav18 = () => {
  return (
    <>
    <button className='flex gap-3 mt-4 ml-4'>
    <FaPhoneAlt className='text-slate-300 size-7'/>
    <span className='text-black text-2xl'> Liên lạc </span>
    </button>
    </>
  )
}
export  {
  ThongTinnav,  
  ThongTinnav2, 
  ThongTinnav3,  
  ThongTinnav5, 
  ThongTinnav6, 
  ThongTinnav7, 
  ThongTinnav8, 
  ThongTinnav9, 
  ThongTinnav10, 
  ThongTinnav11,
  ThongTinnav12,
  ThongTinnav13,
  ThongTinnav14,
  ThongTinnav15,
  ThongTinnav16,
  ThongTinnav17,
  ThongTinnav18
}


