'use client'

import AdminTranscriptTableComponent from '@/components/Tables/AdminTranscriptTableComponent'
import { Button } from '@nextui-org/react'
import { Empty } from 'antd'
import React from 'react'
import { FaPlus } from 'react-icons/fa6'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Spinner } from "@nextui-org/react";
import { formSchemaSearchDiem } from '@/lib/zod/formSchemaSearchDiem'
import getTranscriptByIdStudent from '@/actions/GET/get-transcript-by-id-student'
import toast from 'react-hot-toast'
import { format } from 'date-fns';
import { useRouter } from 'next/navigation'

type SearchDiemTypeSchema = z.infer<typeof formSchemaSearchDiem>

const AdminTranscriptBody = () => {
    const router = useRouter()
    const [data, setdata] = React.useState<any>([])
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
      } = useForm<SearchDiemTypeSchema>({
        resolver: zodResolver(formSchemaSearchDiem),
      })



      // Submit
      const onSubmit = async (data: SearchDiemTypeSchema) => {
          try {
              const DiemData = await getTranscriptByIdStudent(data.MaSinhVien)
              if (DiemData && DiemData.length > 0) {
                  const updatedData = DiemData.map(item => {
                      return {
                          ...item,
                          NgayThi: format(new Date(item.NgayThi), 'dd/MM/yyyy') // Convert Date to dd/mm/yyyy format
                      };
                  });
                  setdata(updatedData);
                  reset();
              }
          } catch (error: any) {
              toast.error(error.message);
          }
      }
      
      
  return (
    <>
    <div className='w-full h-full flex flex-col p-8 gap-20'>

    {/* TopContainerBody */}
    <div className='basis-2/12 w-full h-full'>

        {/* SearchGroup */}
        <div className='translate-y-6'>
            <form 
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-center max-w-sm mx-auto"
            >   
                <label htmlFor="simple-search" className="sr-only">Search</label>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
                        </svg>
                    </div>
                    <input 
                        {...register("MaSinhVien")}
                    type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tìm kiếm mã sinh viên..." required />
                </div>

                {isSubmitting ? (
                    <button 
                    disabled
                    className="py-2 px-4 ms-2 text-sm font-medium text-white bg-blue-300 rounded-md">
                          <div className='flex gap-4 justify-center'>
                          <Spinner 
                          color="success" />
                          </div>
                      </button>
                ) : (
                    <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                    <span className="sr-only">Search</span>
                    </button>
                )}

            </form>
        </div>
    </div>

    {/* BottomContainerBody */}
    <div className='basis-10/12 flex flex-col gap-3'>

        {data.length > 0 ? (
            <>
                    <div className='flex justify-end'>
                    {/* Btn Group */}
                    <Button 
                    onClick={() => router.push(`/Admin/Transcript/${data[0]?.MaSinhVien}/new`)}
                    color='success' className='w-[140px]'>
                            <div className='w-full h-full flex gap-2 translate-y-2'>
                                <FaPlus className='size-5 text-white font-bold'/>
                                <span className='text-white font-bold'>Thêm mới</span>
                            </div>
                        </Button>
                    </div>
            <AdminTranscriptTableComponent 
            setdata={setdata}
            data={data} 
            />
            </>
        ) : (
            <div className='translate-y-20'>
                <Empty />
            </div>
        )}
    </div>
    </div>
    </>
  )
}

export default AdminTranscriptBody