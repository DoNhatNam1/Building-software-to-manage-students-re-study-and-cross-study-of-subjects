'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import styles from '@/utils/style'
import { FaArrowLeftLong } from "react-icons/fa6";
import { formSchemaCreateTeacher } from '@/lib/zod/formSchemaCreateTeacher'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { useForm } from 'react-hook-form'

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
        const DataCreateTeacher = {
            TenGiangVien: data.TenGiangVien,
            email: data.email,
            phone_number: data.phone_number,
            ...(data.id && { id: data.id }),
        }
    
        try {
            // await createTeacher(DataCreateTeacher)
          toast.success('Thêm mới nhóm hàng hóa thành công!')
          reset()
          router.push('/Admin/TeacherAttendance')
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
            className='bg-white rounded-md p-8 light space-y-10'
            >
                {/* Title */}
                <div className='w-full flex justify-center'>
                    <h2 className='font-semibold text-gray-800 text-large'>
                        Thêm mới giáo viên
                    </h2>
                </div>

                {/* Group Bottom */}
                <div>
                {/* Group Item */}
                <div className='space-x-5 w-full'>
                    <label 
                    htmlFor="MaGiaoVien"
                    className={`${styles.formlabel}`}
                    >Mã giáo viên</label>
                    <input type="text"
                    placeholder='Mã giáo viên tự động'
                    className={`${styles.formInput} w-[80%]`}
                    />
                </div>

                  {/* Group Item */}
                  <div className='space-x-5 w-full'>
                  <label 
                  htmlFor="TenGiaoVien"
                  className={`${styles.formlabel}`}
                  >Tên giáo viên *</label>
                    <input type="text"
                    className={`${styles.formInput} w-[80%]`}
                    />
                  </div>

                    {/* Group Item */}
                <div className='space-x-5 w-full'>
                <label 
                htmlFor="email"
                className={`${styles.formlabel} pr-14`}
                >email</label>
                    <input type="text"               
                    className={`${styles.formInput} w-[80%]`}
                    />
                </div>

                  {/* Group Item */}
                  <div className='space-x-5 w-full'>
                  <label 
                  htmlFor="phone_number"
                  className={`${styles.formlabel} pr-16`}
                  >SDT *</label>
                    <input type="number"
                    className={`${styles.formInput} w-[80%]`}
                    />
                  </div>
                </div>

                {/* Btn group */}
                <div>
                    <button className='w-full px-6 py-3 bg-blue-500 text-white rounded-md font-bold hover:bg-blue-200 hover:text-gray-500'>
                        Lưu
                    </button>
                </div>

               
            </form>
        </div>
    </div>
    </>
  )
}

export default AdminTeacherAddNewBody