'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import styles from '@/utils/style'
import { FaArrowLeftLong } from "react-icons/fa6";
import { formSchemaCreateLesson } from '@/lib/zod/formSchemaCreateLesson'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Spinner } from "@nextui-org/react";
import toast from 'react-hot-toast'
import CreateLesson from '@/actions/POST/create-lesson';

type CreateLessonTypeSchema = z.infer<typeof formSchemaCreateLesson>

const AdminLessonAddNewBody = () => {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
      } = useForm<CreateLessonTypeSchema>({
        resolver: zodResolver(formSchemaCreateLesson),
      })

    //   Submit
      const onSubmit = async (data: CreateLessonTypeSchema) => {
    
        try {
            await CreateLesson(data)
            router.push('/Admin/Lessons')
            reset()
            toast.success('Thêm mới học phần thành công!')
            window.location.reload()
        } catch (error:any) {
          toast.error(error.message)
        }
      }

  return (
    <>
    <div className='w-full h-full flex flex-col'>

        {/* Top body */}
        <div className='basis-1/5'>

            {/* Btn Group */}
            <button className='px-6 py-3 translate-y-10'
            onClick={() => router.push('/Admin/Lessons')}
            >
                <div className='flex gap-3'>
                    <FaArrowLeftLong className='size-5 text-gray-700 translate-y-1' />
                    <span className='font-bold text-gray-700 text-large'>Back</span>
                </div>
            </button>
        </div>

        {/* Bottom body */}
        <div className='basis-4/5 px-32 py-10'>
            <form 
            onSubmit={handleSubmit(onSubmit)}
            className='bg-white rounded-md p-8 light space-y-14'
            >
                {/* Title */}
                <div className='w-full flex justify-center'>
                    <h2 className='font-semibold text-gray-800 text-large'>
                        Thêm mới học phần
                    </h2>
                </div>

                {/* Group Bottom */}
                <div className='space-y-5'>
                
                {/* Group Item */}
                <div className='w-full flex gap-2'>
                  <label 
                  htmlFor="id"
                  className={`${styles.formlabel}`}
                  >Mã Học phần</label>
                  <div className='flex-grow'>
                    <input type="text"
                   {...register('id')}
                   placeholder='Mã học phần tự động'
                   className={`${styles.formInput} w-full`}
                   />
                   </div>
                  </div>

                  {/* Group Item */}
                  <div className='w-full flex gap-2'>
                  <label 
                  htmlFor="TenHocPhan"
                  className={`${styles.formlabel}`}
                  >Tên học phần *</label>
                  <div className='flex-grow'>
                    <input type="text"
                   {...register('TenHocPhan')}
                   className={`${styles.formInput} w-full`}
                   />
                  {errors.TenHocPhan && (
                    <span className="text-red-500 block mt-1">
                      {`${errors.TenHocPhan.message}`}
                    </span>
                  )}
                   </div>
                  </div>


                  {/* Group Item */}
                  <div className='w-full flex gap-2'>
                  <label 
                  htmlFor="SoTinChi"
                  className={`${styles.formlabel} pr-16`}
                  >Số tín chỉ *</label>

                  <div className='flex-grow'>
                    <input type="number"
                   {...register('SoTinChi', { valueAsNumber: true })}
                    className={`${styles.formInput} w-full`}
                    />
                    {errors.SoTinChi && (
                      <span className="text-red-500 block mt-1">
                      {`${errors.SoTinChi.message}`}
                    </span>
                  )}
                  </div>
                </div>

                {/* Group Item */}
            <div className='w-full flex gap-2'>
                  <label 
                  htmlFor="GiaCa"
                  className={`${styles.formlabel} pr-16`}
                  >Giá tiền *</label>

                  <div className='flex-grow'>
                    <input type="number"
                   {...register('GiaCa', { valueAsNumber: true })}
                    className={`${styles.formInput} w-full`}
                    />
                    {errors.GiaCa && (
                      <span className="text-red-500 block mt-1">
                      {`${errors.GiaCa.message}`}
                    </span>
                  )}
                  </div>
                </div>

                </div>

                {/* Btn group */}
                <div>
                  {isSubmitting ? (
                    <button 
                    disabled
                      className='w-full px-6 py-3 bg-blue-200 text-gray-500 rounded-md font-bold'>
                          <div className='flex gap-4 justify-center'>
                          <Spinner color="success" />
                           <span>Loading</span>
                          </div>
                      </button>
                  ) : (
                    <button 
                    className='w-full px-6 py-3 bg-blue-500 text-white rounded-md font-bold hover:bg-blue-200 hover:text-gray-500'>
                        Lưu
                    </button>
                  )}
                </div>
             

               
            </form>
        </div>
    </div>
    </>
  )
}

export default AdminLessonAddNewBody