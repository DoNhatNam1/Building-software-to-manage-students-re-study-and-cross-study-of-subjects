'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import styles from '@/utils/style'
import { FaArrowLeftLong } from "react-icons/fa6";
import { formSchemaCreateTeacher } from '@/lib/zod/formSchemaCreateTeacher'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Spinner } from "@nextui-org/react";
import toast from 'react-hot-toast'
import CreateTeacher from '@/actions/POST/create-teacher';

type CreateTeacherTypeSchema = z.infer<typeof formSchemaCreateTeacher>

const AdminTeacherAddNewBody = () => {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
      } = useForm<CreateTeacherTypeSchema>({
        resolver: zodResolver(formSchemaCreateTeacher),
      })

    //   Submit
      const onSubmit = async (data: CreateTeacherTypeSchema) => {
    
        try {
            await CreateTeacher(data)
            router.push('/Admin/TeacherAttendance')
            reset()
            toast.success('Thêm mới giảng viên thành công!')
            window.location.reload()
        } catch (error:any) {
          toast.error(error.message)
        }
      }

  return (
    <>
    <div className='w-full h-full flex flex-col overflow-y-auto'>

        {/* Top body */}
        <div className='basis-1/5'>

            {/* Btn Group */}
            <button className='px-6 py-3 translate-y-10'
            onClick={() => router.push('/Admin/TeacherAttendance')}
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
                        Thêm mới giáo viên
                    </h2>
                </div>

                {/* Group Bottom */}
                <div className='space-y-5'>
                
                {/* Group Item */}
                <div className='w-full flex gap-2'>
                  <label 
                  htmlFor="id"
                  className={`${styles.formlabel}`}
                  >Mã Giảng viên</label>
                  <div className='flex-grow'>
                    <input type="text"
                   {...register('id')}
                   placeholder='Mã giảng viên tự động'
                   className={`${styles.formInput} w-full`}
                   />
                   </div>
                  </div>

                  {/* Group Item */}
                  <div className='w-full flex gap-2'>
                  <label 
                  htmlFor="TenGiangVien"
                  className={`${styles.formlabel}`}
                  >Tên giáo viên *</label>
                  <div className='flex-grow'>
                    <input type="text"
                   {...register('TenGiangVien')}
                   className={`${styles.formInput} w-full`}
                   />
                  {errors.TenGiangVien && (
                    <span className="text-red-500 block mt-1">
                      {`${errors.TenGiangVien.message}`}
                    </span>
                  )}
                   </div>
                  </div>

                    {/* Group Item */}
                <div className='w-full flex gap-2'>
                <label 
                htmlFor="email"
                className={`${styles.formlabel} pr-14`}
                >email</label>
                   <div className='flex-grow'>
                    <input type="text"    
                     {...register('email')}           
                     className={`${styles.formInput} w-full`}
                     />
                    {errors.email && (
                      <span className="text-red-500 block mt-1">
                      {`${errors.email.message}`}
                    </span>
                  )}
                  </div>
                </div>

                  {/* Group Item */}
                  <div className='w-full flex gap-2'>
                  <label 
                  htmlFor="phone_number"
                  className={`${styles.formlabel} pr-16`}
                  >SDT *</label>

                  <div className='flex-grow'>
                    <input type="number"
                   {...register('phone_number', { valueAsNumber: true })}
                    className={`${styles.formInput} w-full`}
                    />
                    {errors.phone_number && (
                      <span className="text-red-500 block mt-1">
                      {`${errors.phone_number.message}`}
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

export default AdminTeacherAddNewBody