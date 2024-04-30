'use client'

import AdminTeacherTable from '@/lib/NextUi/AdminTeacherTable';
import React from 'react'
import { GiTeacher } from "react-icons/gi";
import {Button} from "@nextui-org/react";
import { PlusIcon } from '@/utils/Icons/PlusIcon';
import { useRouter } from 'next/navigation'
import { deleteTeacherById } from '@/actions/DELETE/delete-teacher';
import toast from 'react-hot-toast';

interface AdminGoodsTableComponentProps {
  dataTeacher: any
}



const AdminTeacherBody: React.FC<AdminGoodsTableComponentProps> = ({dataTeacher}) => {
  const router = useRouter()
  const [deleteNotification, setDeleteNotification] = React.useState<string>("close");
  const [selectedItem, setSelectedItem] = React.useState('');
  const [DataTeacherUpdate, setDataTeacherUpdate] = React.useState(dataTeacher)

  const handleDeleteConfirmTeacher = async () => {

    try {
      await deleteTeacherById(selectedItem);
      setDeleteNotification('close');
      toast.success('Xóa giảng viên thành công')
      setDataTeacherUpdate(DataTeacherUpdate.filter((item: any) => item.id !== selectedItem));
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <>
    <div className='space-y-10 z-10 w-full light px-10'>
    {/* Title Group */}
    <div className='text-gray-700 w-full m-5 flex gap-2'>
    <GiTeacher className='size-10' />

    <span className='text-xl translate-y-1 font-semibold'>Danh sách giảng viên</span>
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
        <AdminTeacherTable 
        dataTeacher={DataTeacherUpdate}
        setSelectedItem={setSelectedItem}
        setDeleteNotification={setDeleteNotification}
        />
      </div>
    </div>

    {deleteNotification === 'Open' ? (
        <div className="absolute right-1 bottom-1 w-screen h-screen z-30 backdrop-brightness-50">
        <div className="h-full grid place-content-center">
        <div className='bg-white w-[600px] h-auto rounded-lg mx-16 p-10 shadow-lg space-y-10 divide-y-2'>
          <div className='w-full text-center'>
            <h2 className='text-gray-700 font-semibold text-lg'>Xóa giảng viên</h2>
          </div>

          <div className='w-full text-center'>
            <p className='text-gray-700 translate-y-3'>Bạn có chắc chắn muốn xóa giảng viên này?</p>
          </div>

          <div className='flex justify-center pt-3 gap-2'>
            <Button
            color="primary"
            onClick={() => setDeleteNotification('close')}
            className='text-white font-bold'
            >
              Hủy
            </Button>
            <Button
            color="danger"
            onClick={handleDeleteConfirmTeacher}
            className='text-white font-bold'
            >
              Xóa
            </Button>
          </div>
        </div>
        </div>
      </div>
    ): null}
    </>
  )
}

export default AdminTeacherBody