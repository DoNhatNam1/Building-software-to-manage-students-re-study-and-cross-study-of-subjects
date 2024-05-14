'use client'

import React, { useEffect, useState } from 'react'
import styles from '@/utils/style'
import { FaArrowLeft } from 'react-icons/fa6'
import { formAddDiemSchema } from '@/lib/zod/formAddDiemSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { DatePicker } from "@nextui-org/react";
import { DateValue } from "@internationalized/date";
import { Spinner } from '@nextui-org/react'
import toast from 'react-hot-toast'
import { Select } from 'antd'
import getAllLesson from '@/actions/GET/get-all-lesson'
import { getByNameHocPhan } from '@/actions/GET/get-by-name-hoc-phan'
import { format } from 'date-fns';
import { useRouter } from 'next/navigation'
import createDiemSinhVien from '@/actions/POST/create-diem-sinh-vien'
import { filterOption, isUpperCase } from '@/utils/scripts/utils'

type TypeSchema = z.infer<typeof formAddDiemSchema>
type getMonHocSchemaType = {
  id: string
  TenHocPhan: string
}

const AdminTranscriptAddNewBody = ({
  idSinhVien
}: {
  idSinhVien: string
}) => {
  const router = useRouter()
  const [value, setValue] = React.useState<DateValue>();
  const [monHocInput, setMonHocInput] = useState<string | undefined>('')
  const [monHoc, setMonHoc] = useState<getMonHocSchemaType[]>([]);

  // Effects hook
  useEffect(() => {
    let isApiSubscribed = true;
    if (isApiSubscribed) {
      const fetchDataMonHoc = async () => {
        const dataMonHoc = await getAllLesson();
        setMonHoc(dataMonHoc as unknown as getMonHocSchemaType[]);
      };
      
      fetchDataMonHoc()
    }
return () => {
  isApiSubscribed = false;
};
}, []);


      const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
      } = useForm<TypeSchema>({
        resolver: zodResolver(formAddDiemSchema),
      })

      // Submit
      const onSubmit = async (data: TypeSchema) => {

        const DataSubmit = {
            MaSinhVien: idSinhVien,
            MaHocPhan: monHocInput,
            DiemGiuaKi: data.DiemGiuaKi,
            DiemCuoiKi: data.DiemCuoiKi,
            NgayThi: format(new Date(value!.year, value!.month - 1, value!.day), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
        }
        try {
            await createDiemSinhVien(DataSubmit)
            router.push('/Admin/Transcript')
            reset()
            toast.success('Thêm mới điểm thành công!')
          }
          catch (error: any) {
          toast.error(error.message)
        }
      }

    
      const dataMonHocWithLabelAndValue = monHoc.map((item: getMonHocSchemaType) => ({
        value: item.TenHocPhan,
        label: isUpperCase(item.TenHocPhan)
          ? item.TenHocPhan.toLowerCase()
          : item.TenHocPhan,
      }))

  //  OnChangeGroup
  const onChangeSelectMonHoc = async (value: string) => {
    let data = await getByNameHocPhan(value)

    if (data) {
      setMonHocInput(data?.id)
    }
  }

  return (
    <>
    <div className='w-full h-full flex flex-col gap-5 p-5 overflow-y-auto'>

        {/* Top Body */}
        <div>

            {/* BtnGroup */}
            <button
            onClick={() => router.push('/Admin/Transcript')}
            >
                <div className='w-full h-full flex gap-2'>
                    <FaArrowLeft className='size-5 text-gray-700 font-bold' />
                    <span 
                    className='text-gray-700 font-bold -translate-y-1'
                    >Back
                    </span>
                </div>
            </button>
        </div>

        {/* Bottom Body */}
        <div className='basis-4/5 px-32 py-10 flex justify-center'>
            <form 
            onSubmit={handleSubmit(onSubmit)}
            className='bg-white rounded-md p-8 light space-y-14 max-w-[500px]'
            >

                  {/* Title */}
                  <div className='w-full flex justify-center'>
                    <h2 className='font-semibold text-gray-800 text-large'>
                        Thêm mới điểm
                    </h2>
                </div>

                  {/* Group Bottom */}
                  <div className='space-y-5'>
                    
                  {/* Group Item */}
                  <div className="flex items-center">
                <label htmlFor="nhomHang" className={`${styles.formlabel}`}>
                  Môn học:
                  {/* <span className="text-orange-500">*</span> */}
                </label>
                <Select
                  showSearch
                  placeholder="--Lựa chọn--"
                  optionFilterProp="children"
                  onChange={onChangeSelectMonHoc}
                  // onSearch={onSearchSelect}
                  filterOption={filterOption}
                  options={dataMonHocWithLabelAndValue.map((option) => ({
                    label: option.label,
                    value: option.value,
                  }))}
                  className={`${styles.formInput} px-0 w-[62%]`}
                />
                </div>

                  {/* Group Item */}
                  <div className='w-full flex gap-2'>
                  <label 
                  htmlFor="DiemGiuaKi"
                  className={`${styles.formlabel}`}
                  >Điểm giữa kì *</label>
                  <div className='flex-grow'>
                    <input type="number"
                   {...register('DiemGiuaKi', { valueAsNumber: true })}
                   className={`${styles.formInput} w-full`}
                   />
                  {errors.DiemGiuaKi && (
                    <span className="text-red-500 block mt-1">
                      {`${errors.DiemGiuaKi.message}`}
                    </span>
                  )}
                   </div>
                  </div>

                  {/* Group Item */}
                    <div className='w-full flex gap-2'>
                  <label 
                  htmlFor="DiemCuoiKi"
                  className={`${styles.formlabel}`}
                  >Điểm cuối kì *</label>
                  <div className='flex-grow'>
                    <input type="number"
                   {...register('DiemCuoiKi', { valueAsNumber: true })}
                   className={`${styles.formInput} w-full`}
                   />
                  {errors.DiemCuoiKi && (
                    <span className="text-red-500 block mt-1">
                      {`${errors.DiemCuoiKi.message}`}
                    </span>
                  )}
                   </div>
                  </div>


            <div className="w-[400px] flex flex-row gap-4">
            <DatePicker 
            className="w-full" 
            label="Ngày thi" value={value} 
            onChange={setValue} 
            />
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
                    type='submit'
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

export default AdminTranscriptAddNewBody