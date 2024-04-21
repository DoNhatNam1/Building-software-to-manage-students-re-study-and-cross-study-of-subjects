'use client'

import AdminSinhVienTable from '@/lib/NextUi/AdminSinhVienTable';
import React from 'react'
import { PiStudentBold } from "react-icons/pi";

const AdminSinhVienBody = () => {
  return (
    <div className='space-y-4 w-full light px-10'>
    {/* Title Group */}
    <div className='text-gray-700 w-full m-5 flex gap-2'>
    <PiStudentBold className='size-10' />

    <span className='text-xl translate-y-1 font-semibold'>Sinh viên của tôi</span>
    </div>

      {/* Table Container */}
      <div>
        <AdminSinhVienTable />
      </div>
    </div>
  )
}

export default AdminSinhVienBody