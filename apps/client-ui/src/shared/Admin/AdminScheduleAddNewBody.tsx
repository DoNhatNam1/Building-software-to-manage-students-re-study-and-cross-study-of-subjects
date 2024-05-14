'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from '@/utils/style'
import { FaArrowLeftLong } from "react-icons/fa6";
import { formSchemaCreateSchedule } from '@/lib/zod/formSchemaCreateSchedule'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { DatePicker, Spinner } from "@nextui-org/react";
import toast from 'react-hot-toast'
import { DateValue } from "@internationalized/date";
import { Select } from 'antd';
import { createLabelValueArray, filterOption } from '@/utils/scripts/utils';
import getAllLesson from '@/actions/GET/get-all-lesson';
import getAllTeacher from '@/actions/GET/get-all-teacher';
import { format } from 'date-fns';
import { getGiangVienSchemaType, getMonHocSchemaType, getPhongHocSchemaType } from '@/types/get-data';
import getAllPhongHoc from '@/actions/GET/get-all-phong-hoc';
import { getByNameHocPhan } from '@/actions/GET/get-by-name-hoc-phan';
import { getByNameTeacher } from '@/actions/GET/get-by-name-giang-vien';
import { getByNamePhongHoc } from '@/actions/GET/get-by-name-phong-hoc';
import CreateSchedule from '@/actions/POST/create-schedule';



const AdminScheduleAddNewBody = () => {
    const router = useRouter()
    const [value, setValue] = React.useState<DateValue>();
    const [monHocInput, setMonHocInput] = useState<string | undefined>('')
    const [giangVienInput, setGiangVienInput] = useState<string | undefined>('')
    const [phongHocInput, setPhongHocInput] = useState<string | undefined>('')
    const [monHoc, setMonHoc] = useState<getMonHocSchemaType[]>([]);
    const [phongHoc, setPhongHoc] = useState<getPhongHocSchemaType[]>([]);
    const [giangVien, setGiangVien] = useState<getGiangVienSchemaType[]>([]);
  
    // Effects hook
    useEffect(() => {
      let isApiSubscribed = true;

        const fetchData = async () => {
            if (isApiSubscribed) {
                const [
                    dataMonHoc,
                    dataPhongHoc,
                    dataGiangVien
                ] = await Promise.all([
                    getAllLesson(),
                    getAllPhongHoc(),
                    getAllTeacher()
                ]);
                setMonHoc(dataMonHoc as unknown as getMonHocSchemaType[]);
                setPhongHoc(dataPhongHoc as unknown as getPhongHocSchemaType[]);
                setGiangVien(dataGiangVien as unknown as getGiangVienSchemaType[]);
            }
        };
    
        fetchData();
  return () => {
    isApiSubscribed = false;
  };
  }, []);

    const {
        handleSubmit,
        formState: { isSubmitting },
        reset,
      } = useForm({})

    //   Submit
      const onSubmit = async () => {
    const dataSubmit = {
      MaGiangVien: giangVienInput,
      MaHocPhan: monHocInput,
      MaPhongHoc: phongHocInput,
      ThoiGianHoc: format(new Date(value!.year, value!.month - 1, value!.day), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    }
        try {
            await CreateSchedule(dataSubmit)
            router.push('/Admin/Schedule')
            reset()
            toast.success('Thêm mới lịch học thành công!')
            window.location.reload()
        } catch (error:any) {
          toast.error(error.message)
        }
      }
 
      const dataGiangVienWithLabelAndValue = createLabelValueArray(giangVien, 'TenGiangVien');
      const dataPhongHocWithLabelAndValue = createLabelValueArray(phongHoc, 'TenPhongHoc');
    const dataMonHocWithLabelAndValue = createLabelValueArray(monHoc, 'TenHocPhan');


  //  OnChangeGroup
  const onChangeSelectHocPhan = async (value: string) => {
    let data = await getByNameHocPhan(value)

    if (data) {
      setMonHocInput(data?.id)
    }
  }

  const onChangeSelectGiangVien = async (value: string) => {
    let data = await getByNameTeacher(value)

    if (data) {
      setGiangVienInput(data?.id)
    }
  }

  const onChangeSelectPhongHoc = async (value: string) => {
    let data = await getByNamePhongHoc(value)

    if (data) {
      setPhongHocInput(data?.id)
    }
  }
  
  
  return (
    <>
    <div className='w-full h-full flex flex-col overflow-y-auto'>

        {/* Top body */}
        <div className='basis-1/5'>

            {/* Btn Group */}
            <button className='px-6 py-3 translate-y-10'
            onClick={() => router.push('/Admin/Schedule')}
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
                        Thêm mới lịch học
                    </h2>
                </div>

                {/* Group Bottom */}
                <div className='space-y-5'>
                
                  {/* Group Item */}
                  <div className="flex items-center">
                <label htmlFor="MaGiangVien" className={`${styles.formlabel}`}>
                  Giảng viên:
                  {/* <span className="text-orange-500">*</span> */}
                </label>
                <Select
                  showSearch
                  placeholder="--Lựa chọn--"
                  optionFilterProp="children"
                  onChange={onChangeSelectGiangVien}
                  // onSearch={onSearchSelect}
                  filterOption={filterOption}
                  options={dataGiangVienWithLabelAndValue.map((option) => ({
                    label: option.label,
                    value: option.value,
                  }))}
                  className={`${styles.formInput} px-0 w-[62%]`}
                />
                </div>

                  {/* Group Item */}
                  <div className="flex items-center">
                <label htmlFor="MaHocPhan" className={`${styles.formlabel}`}>
                  Học phần:
                  {/* <span className="text-orange-500">*</span> */}
                </label>
                <Select
                  showSearch
                  placeholder="--Lựa chọn--"
                  optionFilterProp="children"
                  onChange={onChangeSelectHocPhan}
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
                  <div className="flex items-center">
                <label htmlFor="MaPhongHoc" className={`${styles.formlabel}`}>
                  Phòng học:
                  {/* <span className="text-orange-500">*</span> */}
                </label>
                <Select
                  showSearch
                  placeholder="--Lựa chọn--"
                  optionFilterProp="children"
                  onChange={onChangeSelectPhongHoc}
                  // onSearch={onSearchSelect}
                  filterOption={filterOption}
                  options={dataPhongHocWithLabelAndValue.map((option) => ({
                    label: option.label,
                    value: option.value,
                  }))}
                  className={`${styles.formInput} px-0 w-[62%]`}
                />
                </div>

                {/* Group Item */}
                <div className="w-[80%] flex flex-row gap-4">
                  <DatePicker 
                  className="w-full" 
                  label="Thời gian thi" value={value} 
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

export default AdminScheduleAddNewBody