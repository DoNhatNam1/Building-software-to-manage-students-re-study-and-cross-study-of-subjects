'use client'

import AdminTeacherTable from '@/lib/NextUi/AdminTeacherTable';
import React from 'react'
import { GiTeacher } from "react-icons/gi";
import {Button} from "@nextui-org/react";
import { PlusIcon } from '@/utils/Icons/PlusIcon';
import { useRouter } from 'next/navigation'

const AdminSinhVienBody = () => {
  const router = useRouter()
  return (
    <div className='space-y-10 w-full light px-10'>
    {/* Title Group */}
    <div className='text-gray-700 w-full m-5 flex gap-2'>
    <GiTeacher className='size-10' />

    <span className='text-xl translate-y-1 font-semibold'>Giảng viên của tôi</span>
    </div>
    

    {/* Button Add */}
    <div className='w-full flex justify-end'>
      <Button 
      color="success" endContent={<PlusIcon/>}
      onClick={() => router.push('/Admin/TeacherAttendance/New')}
      className='text-white font-bold'
      >
        Thêm mới
      </Button>    
    </div>

      {/* Table Container */}
      <div>
        <AdminTeacherTable />
      </div>
    </div>
  )
}

export default AdminSinhVienBody