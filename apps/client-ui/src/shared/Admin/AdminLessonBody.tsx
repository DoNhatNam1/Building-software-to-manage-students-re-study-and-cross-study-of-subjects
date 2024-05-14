'use client'
import { PlusIcon } from '@/utils/Icons/PlusIcon'
import React, { useState } from 'react'
import { GiBookmarklet } from 'react-icons/gi'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation'
import { Button } from '@nextui-org/react';
import { deleteLessonById } from '@/actions/DELETE/delete-lesson';
import AdminLessonTable from '@/lib/NextUi/AdminLessonTable';

const AdminLessonBody = ({
    dataLessons
} : {
    dataLessons: any
}
    ) => {
    const router = useRouter()
    const [deleteNotification, setDeleteNotification] = useState<string>("close");
    const [selectedItem, setSelectedItem] = useState('');
    const [DataLessonUpdate, setDataLessonUpdate] = useState(dataLessons)

    const handleDeleteConfirmLesson = async () => {

        try {
          await deleteLessonById(selectedItem);
          setDeleteNotification('close');
          toast.success('Xóa học phần thành công')
          setDataLessonUpdate(DataLessonUpdate.filter((item: any) => item.id !== selectedItem));
        } catch (error: any) {
          toast.error(error.message)
        }
      }

  return (
    <>
       <div className='space-y-10 z-10 w-full light px-10 overflow-y-auto'>
    {/* Title Group */}
    <div className='text-gray-700 w-full m-5 flex gap-2'>
    <GiBookmarklet className='size-10' />

    <span className='text-xl translate-y-1 font-semibold'>Danh sách học phần</span>
    </div>

        {/* Button Add */}
        <div className='w-full flex justify-end'>
      <Button 
      color="success" endContent={<PlusIcon/>}
      onClick={() => router.push('/Admin/Lessons/New')}
      className='text-white font-bold'
      >
        Thêm mới
      </Button>    
    </div>

        {/* Table Container */}
          <div>
        <AdminLessonTable 
        dataLessons={DataLessonUpdate}
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
            <h2 className='text-gray-700 font-semibold text-lg'>Xóa học phần</h2>
          </div>

          <div className='w-full text-center'>
            <p className='text-gray-700 translate-y-3'>Bạn có chắc chắn muốn xóa học phần này?</p>
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
            onClick={handleDeleteConfirmLesson}
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

export default AdminLessonBody