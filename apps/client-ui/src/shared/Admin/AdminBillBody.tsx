'use client'

import React, { useState, useEffect } from 'react'
import { SlCalender } from 'react-icons/sl'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";
import getUnpaidInvoices from '@/actions/GET/get-all-danh-sach-dang-ky-chua-dong-du-hoc-phi';
import { getDangKyInfoByIdSinhVien } from '@/actions/GET/get-dang-ky-info-by-id-sinh-vien';
import { formSchemaSearchDangKy } from '@/lib/zod/formSchemaSearchDangKy';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Spinner } from "@nextui-org/react";
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import styles from '@/utils/style';
import { getDangKyInfoListByIdSinhVien } from '@/actions/GET/get-dang-ky-info-list-by-id-student';
import updateDangKyDiem from '@/actions/PUT/update-dang-ky-diem';

type SearchDangKyTypeSchema = z.infer<typeof formSchemaSearchDangKy>

type OpenModelTypes = 'View' | 'Edit' | ''

    // Data
    const columns = [
      {
        key: "MaSinhVien",
        label: "Mã Sinh viên",
      },
      {
        key: "MaHocPhan",
        label: "Mã học phần",
      },
      {
        key: "NgayDangKy",
        label: "Ngày đăng ký",
      },

      {
        key: "DiemGiuaKi",
        label: "Điểm giữa kì",
      },
      
      {
        key: "DiemCuoiKi",
        label: "Điểm cuối kì",
      },

      {
        key: "KieuDangKy",
        label: "Kiểu đăng ký",
      },

    ];

    const columns2 = [
      {
        key: "MaSinhVien",
        label: "Mã Sinh viên",
      },
      {
        key: "MaHocPhan",
        label: "Mã học phần",
      },
      {
        key: "NgayDangKy",
        label: "Ngày đăng ký",
      },

      {
        key: "DiemGiuaKi",
        label: "Điểm giữa kì",
      },
      
      {
        key: "DiemCuoiKi",
        label: "Điểm cuối kì",
      },

      {
        key: "KieuDangKy",
        label: "Kiểu đăng ký",
      },

      {
        key: "Actions",
        label: "Actions",
      },
    ];

const AdminBillBody = () => {
  const [danhSachSVChuaDongHocPhiData, setDanhSachSVChuaDongHocPhiData] = useState<any[]>([])
  const [dangkyBySinhVienId, setDangKyBySinhVienId] = useState<any[]>([])
  const [dataViewHoaDon, setDataViewHoaDon] = useState<any>([])
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  const [openTypes, setOpenTypes] = useState<OpenModelTypes>('')
  const [diemGiuaKi, setDiemGiuaKi] = useState<any>(null)
  const [diemCuoiKi, setDiemCuoiKi] = useState<any>(null)
  const [id, setId] = useState<any>('')

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<SearchDangKyTypeSchema>({
    resolver: zodResolver(formSchemaSearchDangKy),
  })

  // UseEffects
  useEffect(() => {
    let isApiSubscribed = true;

    const fetchData = async () => {
        if (isApiSubscribed) {
            const [
                dataDanhSachDangKyChuaDongDuHocPhi,
            ] = await Promise.all([
                getUnpaidInvoices()
            ]);
            setDanhSachSVChuaDongHocPhiData(dataDanhSachDangKyChuaDongDuHocPhi as any[]);

        }
    };

    fetchData();

    return () => {
        isApiSubscribed = false;
    };
}, []);


      // Submit
      const onSubmit = async (data: SearchDangKyTypeSchema) => {
        try {
            const DangKyData = await getDangKyInfoListByIdSinhVien(data.MaSinhVien)
            if (DangKyData) {
                const updatedData = DangKyData.map((item: any) => {
                    return {
                        ...item,
                        NgayDangKy: format(new Date(item.NgayDangKy), 'dd/MM/yyyy') // Convert Date to dd/mm/yyyy format
                    };
                });
                setDangKyBySinhVienId(updatedData);
                reset();
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    }

    const onSubmitEdit = async () => {
    
      const DataSubmit = {
        id: id,
        DiemGiuaKi: diemGiuaKi,
        DiemCuoiKi: diemCuoiKi,
      }
    
      try {
        await updateDangKyDiem(DataSubmit);
        onClose();
        setOpenTypes('');
        window.location.reload();
        toast.success('Update Success');
      } catch (error: any) {
        toast.error(error.message);
      }
    }

    // Handle Event
    const handleEdit = async (id: string) => {
      let data = await getDangKyInfoByIdSinhVien(id)
    
      console.log(data)
      if(data){
        setId(data.id)
        setDiemCuoiKi(data.DiemCuoiKi);
        setDiemGiuaKi(data.DiemGiuaKi);
        setOpenTypes('Edit')
      } else {
        toast.error('Error 500, Server Error')
      }
    }

    const handleViewHoaDon = async (id: string) => {
      let data = await getDangKyInfoByIdSinhVien(id)

      if(data){
        setDataViewHoaDon(data);
        setOpenTypes('View')
      }

    }



  return (
    <>
    <div className='w-full h-full overflow-y-auto grid grid-rows-7 grid-cols-1'>

        {/* Title */}
        <div className='text-gray-700 w-full m-5 flex gap-2'>
        <SlCalender className='size-10' />

        <span className='text-xl translate-y-1 font-semibold'>Danh sách thông tin học phí đăng ký của sinh viên</span>
        </div>

        {/* Danh Sach SV Chua dong hoc phi */}
        <div className='row-span-3'>
        <span className='text-xl translate-y-1 font-semibold pl-5 text-gray-700'>Danh sách những sinh viên còn nợ học phí</span>
        {danhSachSVChuaDongHocPhiData.length <= 0 ? (
                        <Table 
                        aria-label="Example empty table"
                        className='light max-h-80 overflow-auto'
                        >
                        <TableHeader className='light'>
                          <TableColumn className='light'>Mã sinh viên</TableColumn>
                          <TableColumn className='light'>Mã học phần</TableColumn>
                          <TableColumn className='light'>Ngày đăng ký</TableColumn>
                          <TableColumn className='light'>Điểm giữa kì</TableColumn>
                          <TableColumn className='light'>Điểm cuối kì</TableColumn>
                          <TableColumn className='light'>Kiểu đăng ký</TableColumn>
                        </TableHeader>
                        <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
                      </Table>
                ) : (
                    <>
                  <Table 
                  className='light max-h-72 overflow-auto'
                  aria-label="Example table with dynamic content">
                    <TableHeader 
                    className='light'
                    columns={columns}>
                      {(column) => 
                      <TableColumn
                      className='light text-gray-700'
                      key={column.key}>{column.label}</TableColumn>}
                    </TableHeader>
                    <TableBody 
                      className='light'
                      items={danhSachSVChuaDongHocPhiData}>
                      {(item) => (
                        <TableRow 
                          className='light'
                          key={item.id}>
                          {(columnKey) => {
                            if (columnKey === "NgayDangKy") {
                              // Định dạng ngày tháng
                              return <TableCell className='light text-gray-700'>{new Date(item.NgayDangKy).toLocaleDateString('vi-VN')}</TableCell>;
                            }  else {
                              return <TableCell className='light text-gray-700'>{getKeyValue(item, columnKey)}</TableCell>;
                            }
                          }}
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                    </>
                )}
        </div>

        {/* Search Input */}
        <div className='row-span-1'>
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

        {/* Search result Table */}
        <div className='row-span-2'>
        {dangkyBySinhVienId.length <= 0 ? (
                        <Table 
                        aria-label="Example empty table"
                        className='light'
                        >
                        <TableHeader className='light'>
                        <TableColumn className='light'>Mã sinh viên</TableColumn>
                          <TableColumn className='light'>Mã học phần</TableColumn>
                          <TableColumn className='light'>Ngày đăng ký</TableColumn>
                          <TableColumn className='light'>Điểm giữa kì</TableColumn>
                          <TableColumn className='light'>Điểm cuối kì</TableColumn>
                          <TableColumn className='light'>Kiểu đăng ký</TableColumn>
                        </TableHeader>
                        <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
                      </Table>
                ) : (
                    <>
                  <Table 
                  className='light'
                  aria-label="Example table with dynamic content">
                    <TableHeader 
                    className='light'
                    columns={columns2}>
                      {(column) => 
                      <TableColumn
                      className='light text-gray-700'
                      key={column.key}>{column.label}</TableColumn>}
                    </TableHeader>
                    <TableBody 
                      className='light'
                      items={dangkyBySinhVienId}>
                      {(item) => (
                        <TableRow 
                          className='light'
                          key={item.id}>
                          {(columnKey) => {
                            if (columnKey === "NgayDangKy") {
                              // Định dạng ngày tháng
                              return <TableCell className='light text-gray-700'>{new Date(item.NgayDangKy).toLocaleDateString('vi-VN')}</TableCell>;
                            } else if (columnKey === "Actions") {

                              if(item.SoTienDaTra < item.SoTienPhaiTra){
                                return  <TableCell className='light'>
                                <div>
                                  <Button color='default' onPress={onOpen} onClick={() => handleViewHoaDon(item.id)}>
                                    View
                                  </Button>    
                                  </div>
                            </TableCell>
                              } else {
                                return  <TableCell className='light'>
                                <div className='space-x-6'>
                                  <Button color='primary' onPress={onOpen} onClick={() => handleEdit(item.id)}>
                                    Edit
                                  </Button>    
                                   <Button color='default' onPress={onOpen}  onClick={() => handleViewHoaDon(item.id)}>
                                    View
                                  </Button>   
                                  </div>
                            </TableCell>
                              }
                            } else {
                              return <TableCell className='light text-gray-700'>{getKeyValue(item, columnKey)}</TableCell>;
                            }
                          }}
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                    </>
                )}
        </div>
    </div>

    <Modal 
            isOpen={isOpen && openTypes === 'Edit'} 
            onOpenChange={onOpenChange}
            size='2xl'
            className='max-h-96'
            >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 text-center">Sửa Đăng ký điểm</ModalHeader>
                <form 
                  className='overflow-y-auto'
                  >
                  <ModalBody>
                    <div className='w-full h-full space-y-4'>

                    <div className='w-full flex gap-2'>
                        <label
                          className={`${styles.formlabel} text-white`}
                         htmlFor="DiemGiuaKi">Điểm giữa kì</label>
                        <input 
                        type="text" 
                        value={diemGiuaKi}
                        onChange={(e) => setDiemGiuaKi(e.target.value)}
                         className={`${styles.formInputModel} w-full  text-white`}
                        />
                      </div>

                      <div className='w-full flex gap-2'>
                      <label
                        className={`${styles.formlabel} text-white`}
                      htmlFor="DiemCuoiKi">Điểm cuối kì</label>
                        <input 
                        type="text" 
                        value={diemCuoiKi}
                        onChange={(e) => setDiemCuoiKi(e.target.value)}
                        className={`${styles.formInputModel} w-full text-white`}
                        />
                      </div>


                        <div>
                        </div>
                          </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={onSubmitEdit}>
                      Lưu
                    </Button>
                  </ModalFooter>
                    </form>
                </>
              )}

            </ModalContent>
            
          </Modal>


            <Modal 
            isOpen={isOpen && openTypes === 'View'} 
            onOpenChange={onOpenChange}
            size='2xl'
            className='max-h-[420px]'
            >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 text-center">Thông tin đóng học phí</ModalHeader>
                  <ModalBody>
                    <div className='space-y-4'>

                      <div>
                        <h4>Ngày bắt đầu thanh toán:</h4>
                        {format(new Date(dataViewHoaDon.NgayBatDauThanhToan), 'dd/MM/yyyy')}
                      </div>

                      <div>
                        <h4>Ngày thanh toán gần đây:</h4>
                        {format(new Date(dataViewHoaDon.NgayThanhToanGanDay), 'dd/MM/yyyy')}
                      </div>

                      <div>
                        <h4>Phương thức thanh toán:</h4>
                        {dataViewHoaDon.PhuongThucThanhToan}
                      </div>

                      <div className='space-y-2'>
                        <h4>Trạng thái học phí:</h4>
                        {dataViewHoaDon.SoTienDaTra < dataViewHoaDon.SoTienPhaiTra ? (
                          <div className='flex flex-col gap-2'>
                          <span className='text-red-500'>Chưa thanh toán đủ</span>
                          <span>{dataViewHoaDon.SoTienDaTra} / {dataViewHoaDon.SoTienPhaiTra}</span>
                          </div>
                        ) : (
                          <div className='flex flex-col gap-2'>
                          <span className='text-green-500'>Đã thanh toán đủ</span>
                          <span>{dataViewHoaDon.SoTienDaTra} / {dataViewHoaDon.SoTienPhaiTra}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" variant="light" onPress={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
    </>
  )
}

export default AdminBillBody