
'use client'
import { PlusIcon } from '@/utils/Icons/PlusIcon';
import React, { useEffect, useState } from 'react'
import { SlCalender } from "react-icons/sl";
import { FiSearch } from "react-icons/fi";
import { useRouter } from 'next/navigation'
import {Autocomplete, AutocompleteItem, Select, SelectItem} from "@nextui-org/react";
import getAllLesson from '@/actions/GET/get-all-lesson';
import getAllTeacher from '@/actions/GET/get-all-teacher';
import getAllSheduleWithStatusActive from '@/actions/GET/get-all-shedule-with-status-active';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import getShedulebyNames from '@/actions/GET/get-schedule-by-names';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";
import toast from 'react-hot-toast';
import { deleteScheduleById } from '@/actions/DELETE/delete-schedule';
import { formScheduleSchema } from '@/lib/zod/formScheduleSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { getScheduleById } from '@/actions/GET/get-schedule-by-id';
import styles from '@/utils/style';
import updateScheduleById from '@/actions/PUT/update-schedule';


type TypeSchema = z.infer<typeof formScheduleSchema>

interface HocPhanItem {
    id: string;
    TenHocPhan: string;
}
interface GiangVienItem {
    id: string;
    TenGiangVien: string;
}

interface LichHocData {
    id: string;
    MaGiangVien: string;
    MaHocPhan: string;
    MaPhongHoc: string;
    ThoiGianHoc: Date;
    StatusDeXemLichHoc: 'Active' | 'Close'
}

type OpenModelTypes = 'Create' | 'Edit' | 'Delete' | ''

    // Data
    const columns = [
        {
          key: "MaGiangVien",
          label: "Mã Giảng Viên",
        },
        {
          key: "MaPhongHoc",
          label: "Mã phòng học",
        },
        {
          key: "MaHocPhan",
          label: "Mã học phần",
        },

        {
          key: "ThoiGianHoc",
          label: "Thời gian học",
        },
        
        {
          key: "StatusDeXemLichHoc",
          label: "STATUS",
        },

        {
          key: "Actions",
          label: "Actions",
        },
      ];



const  AdminScheduleBody = ({
} : {
}) => {
    const router = useRouter()
    const [valueHocPhan, setValueHocPhan] = useState<any>("");
    const [valueGiangVien, setValueGiangVien] = useState<any>("");
    const [hocPhanData, setHocPhanData] = useState<HocPhanItem[]>([])
    const [giangvienData, setGiangVienData] = useState<GiangVienItem[]>([])
    const [lichHocStatusActiveData, setLichHocStatusActiveData] = useState<any[]>([])
    const [lichHocByNames, setLichHocByNames] = useState<any[]>([])
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const [openTypes, setOpenTypes] = useState<OpenModelTypes>('')
    
    // DataSubmit
    const [selectedItem, setSelectedItem] = useState<string>('');
    const [maGiangVien, setMaGiangVien] = useState<string>('')
    const [maHocPhan, setMaHocPhan] = useState<string>('')
    const [maPhongHoc, setMaPhongHoc] = useState<string>('')
    const [valueSelectStatus, setValueSelectStatus] = useState<string>('');
    const [thoiGianHoc, setThoiGianHoc] = useState<string>('');

    const {
      handleSubmit,
      formState: { isSubmitting }
    } = useForm<TypeSchema>({
      resolver: zodResolver(formScheduleSchema),
    })


    useEffect(() => {
        let isApiSubscribed = true;
    
        const fetchData = async () => {
            if (isApiSubscribed) {
                const [
                    dataHocPhan, 
                    dataGiangVien,
                ] = await Promise.all([
                    getAllLesson(),
                    getAllTeacher(),
                ]);
                setHocPhanData(dataHocPhan as HocPhanItem[]);
                setGiangVienData(dataGiangVien as GiangVienItem[]);
            }
        };
    
        fetchData();
    
        return () => {
            isApiSubscribed = false;
        };
    }, []);


    useEffect(() => {
      let isApiSubscribed = true;
  
      const fetchData = async () => {
          if (isApiSubscribed) {
              const [
                  dataLichHocStatusActive,
              ] = await Promise.all([
                  getAllSheduleWithStatusActive()
              ]);
              setLichHocStatusActiveData(dataLichHocStatusActive as any[]);
          }
      };
  
      fetchData();
  
      return () => {
          isApiSubscribed = false;
      };
  }, [lichHocStatusActiveData]);

    


    useEffect(() => {
        let isApiSubscribed = true;
        
        setValueHocPhan('')
        setValueGiangVien('')
        setLichHocByNames([])
    
      return () => {
        isApiSubscribed = false;
      }
    }, [])
// 


    // Submit
    const onSubmit = async () => {
      const formattedDate = new Date(thoiGianHoc).toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    
      const DataSubmit = {
        id: selectedItem,
        MaGiangVien: maGiangVien,
        MaHocPhan: maHocPhan,
        MaPhongHoc: maPhongHoc,
        ThoiGianHoc: new Date(thoiGianHoc),
        StatusDeXemLichHoc: valueSelectStatus,
      }
    
      const DataViewAfterUpdate = {
        ...DataSubmit,
        ThoiGianHoc: formattedDate,
      }
    
      try {
        await updateScheduleById(DataSubmit);
        onClose();
        setOpenTypes('');
    
        // Cập nhật lichHocByNames
        setLichHocByNames([DataViewAfterUpdate]);
    
        // Xử lý thêm hoặc xóa trong lichHocStatusActiveData
        if (DataViewAfterUpdate.StatusDeXemLichHoc === 'Active') {
          const existingItem = lichHocStatusActiveData.find(item => item.id === DataViewAfterUpdate.id);
          if (!existingItem) {
            setLichHocStatusActiveData([...lichHocStatusActiveData, DataViewAfterUpdate]);
          }
        } else if (DataViewAfterUpdate.StatusDeXemLichHoc === 'Close') {
          const filteredItems = lichHocStatusActiveData.filter(item => item.id !== DataViewAfterUpdate.id);
          setLichHocStatusActiveData(filteredItems);
        }
    
        toast.success('Update Success');
      } catch (error: any) {
        toast.error(error.message);
      }
    }
    // 

    
// Handles event
const handleSearch = async () => {
    // Chỉ thay đổi trạng thái tìm kiếm nếu có sự thay đổi trong giá trị tìm kiếm
    if (valueHocPhan !== '' || valueGiangVien !== '') {
        try {
            const dataLichHocByNames = await getShedulebyNames({ dataHocPhan: valueHocPhan, dataGiangVien: valueGiangVien });
            setLichHocByNames(dataLichHocByNames as any[]);
            setValueHocPhan('')
            setValueGiangVien('')
        } catch (error: any) {
            toast.error(error.message)
        }

    } else {
        setLichHocByNames([])
    }
}

const handleEdit = async (id: string) => {
  let data = await getScheduleById(id)

  console.log(data)
  if(data){
    setSelectedItem(data.id);
    setMaGiangVien(data.MaGiangVien)
    setMaPhongHoc(data.MaPhongHoc)
    setMaHocPhan(data.MaHocPhan)
    setThoiGianHoc(data.ThoiGianHoc.toISOString());
    setValueSelectStatus(data.StatusDeXemLichHoc)
    setOpenTypes('Edit')
  } else {
    toast.error('Error 500, Server Error')
  }
}

const handleDelete = (id: string) => {
  setSelectedItem(id);
  setOpenTypes('Delete')
};

const handleConfirmDelete = async () => {

  try {
      await deleteScheduleById(selectedItem)
      const updatedData = lichHocByNames.filter(item => item.id !== selectedItem);
      setLichHocByNames(updatedData);
      onClose()
      toast.success('Xoá lịch học thành công')

  } catch (error: unknown) {
      toast.error((error as Error).message);
  }
};

const handleSelectionStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setValueSelectStatus(e.target.value);
};


    
  return (
    <>
    <div className='w-full h-full overflow-y-auto grid grid-cols-2 grid-rows-7'>

        {/* Title */}
    <div className='text-gray-700 w-full m-5 flex gap-2'>
    <SlCalender className='size-10' />

    <span className='text-xl translate-y-1 font-semibold'>Danh sách lịch học</span>
    </div>

        {/* Add Btn */}
        <div className='w-full flex justify-end pt-8 pr-6'>
        <Button 
        color="success" endContent={<PlusIcon/>}
        onClick={() => router.push('/Admin/Schedule/New')}
        className='text-white font-bold'
        >
            Thêm mới
        </Button>    
        </div>

        {/* Table Schedule Active */}
        <div className='col-span-2 row-span-3 space-y-2'>

            {/* Title */}
            <div className='w-full text-center font-bold'>
            <h3 className='text-gray-700 text-medium'>Danh sách đang hiển thị công khai</h3>
            </div>

            {/* Table Active */}
            <div className='px-5'>
            {lichHocStatusActiveData.length <= 0 ? (
                        <Table 
                        aria-label="Example empty table"
                        className='light max-h-80 overflow-auto'
                        >
                        <TableHeader className='light'>
                          <TableColumn className='light'>Mã giảng viên</TableColumn>
                          <TableColumn className='light'>Mã Học Phần</TableColumn>
                          <TableColumn className='light'>Mã Phòng học</TableColumn>
                          <TableColumn className='light'>Thời gian học</TableColumn>
                          <TableColumn className='light'>Status</TableColumn>
                          <TableColumn className='light'>Actions</TableColumn>
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
                      items={lichHocStatusActiveData}>
                      {(item) => (
                        <TableRow 
                          className='light'
                          key={item.id}>
                          {(columnKey) => {
                            if (columnKey === "ThoiGianHoc") {
                              // Định dạng ngày tháng
                              return <TableCell className='light text-gray-700'>{new Date(item.ThoiGianHoc).toLocaleDateString('vi-VN')}</TableCell>;
                            } else if (columnKey === "Actions") {
                              // Thêm các nút Edit và Delete
                              return (
                                <TableCell className='light'>
                                    <div className='space-x-6'>
                                      <Button isIconOnly color="primary" aria-label="Edit" onPress={onOpen} onClick={() => handleEdit(item.id)}>
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                      <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                      </svg>
                                      </Button>    

                                      <Button isIconOnly color="danger" aria-label="Delete" onPress={onOpen} onClick={() => handleDelete(item.id)}>
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                      <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                      </svg>
                                      </Button>  
                                      </div>
                                </TableCell>
                              );
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

        {/* Table list group */}
        <div className='col-span-2 row-span-3 grid grid-cols-5 grid-rows-3 gap-y-2'>

            {/* input HocPhan search */}
            <div className='col-span-2 row-span-1 pt-5 px-2'>
            <Autocomplete
            defaultItems={hocPhanData}
            label="Học phần"
            placeholder="Tìm kiếm theo học phần"
            selectedKey={valueHocPhan}
            onSelectionChange={(key) => setValueHocPhan(key ? key.toString() : "")}
            className="w-full light"
            >
            {(item) => 
            <AutocompleteItem
                className='light'
                key={item.id}
                >
                    {item.TenHocPhan}
             </AutocompleteItem>}
            </Autocomplete>
            </div>

            {/* input GiangVien search */}
            <div className='col-span-2 row-span-1 pt-5 px-2'>
            <Autocomplete
            defaultItems={giangvienData}
            label="Giảng viên"
            placeholder="Tìm kiếm theo giảng viên"
            selectedKey={valueGiangVien}
            onSelectionChange={(key) => setValueGiangVien(key ? key.toString() : "")}
            className="w-full light"
            >
            {(item) => 
            <AutocompleteItem
                className='light'
                key={item.id}
                >
                    {item.TenGiangVien}
             </AutocompleteItem>}
            </Autocomplete>
            </div>

            {/* btn search */}
            <div className='col-span-1 row-span-1 pt-6'>
            <Button 
            onClick={handleSearch}
            isIconOnly color="primary" aria-label="search">
                <FiSearch className='size-5' />
            </Button>    
            </div>

            {/* Table */}
            <div className='col-span-5 row-span-2 px-5'>
                {lichHocByNames.length <= 0 ? (
                        <Table 
                        aria-label="Example empty table"
                        className='light'
                        >
                        <TableHeader className='light'>
                          <TableColumn className='light'>Mã giảng viên</TableColumn>
                          <TableColumn className='light'>Mã Học Phần</TableColumn>
                          <TableColumn className='light'>Mã Phòng học</TableColumn>
                          <TableColumn className='light'>Thời gian học</TableColumn>
                          <TableColumn className='light'>Status</TableColumn>
                          <TableColumn className='light'>Actions</TableColumn>
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
                    columns={columns}>
                      {(column) => 
                      <TableColumn
                      className='light text-gray-700'
                      key={column.key}>{column.label}</TableColumn>}
                    </TableHeader>
                    <TableBody 
                      className='light'
                      items={lichHocByNames}>
                      {(item) => (
                        <TableRow 
                          className='light'
                          key={item.id}>
                          {(columnKey) => {
                            if (columnKey === "ThoiGianHoc") {
                              // Định dạng ngày tháng
                              return <TableCell className='light text-gray-700'>{new Date(item.ThoiGianHoc).toLocaleDateString('vi-VN')}</TableCell>;
                            } else if (columnKey === "Actions") {
                              // Thêm các nút Edit và Delete
                              return (
                                <TableCell className='light'>
                                    <div className='space-x-6'>
                                      <Button isIconOnly color="primary" aria-label="Edit" onPress={onOpen} onClick={() => handleEdit(item.id)}>
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                      <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                      </svg>
                                      </Button>    

                                      <Button isIconOnly color="danger" aria-label="Delete" onPress={onOpen} onClick={() => handleDelete(item.id)}>
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                      <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                      </svg>
                                      </Button>  
                                      </div>
                                </TableCell>
                              );
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
                  <ModalHeader className="flex flex-col gap-1 text-center">Sửa lịch học</ModalHeader>
                <form 
                  className='overflow-y-auto'
                  >
                  <ModalBody>
                    <div className='w-full h-full space-y-4'>

                    <div className='w-full flex gap-2'>
                        <label
                          className={`${styles.formlabel} text-white`}
                         htmlFor="MaGiangVien">Mã giảng viên</label>
                        <input 
                        // {...register('MaGiangVien')}
                        type="text" 
                        value={maGiangVien}
                        onChange={(e) => setMaGiangVien(e.target.value)}
                         className={`${styles.formInputModel} w-full  text-white`}
                        />
                      </div>

                      <div className='w-full flex gap-2'>
                      <label
                        className={`${styles.formlabel} text-white`}
                      htmlFor="MaHocPhan">Mã môn học</label>
                        <input 
                        // {...register('MaHocPhan')}
                        type="text" 
                        value={maHocPhan}
                        onChange={(e) => setMaHocPhan(e.target.value)}
                        className={`${styles.formInputModel} w-full text-white`}
                        />
                      </div>

                      <div className='w-full flex gap-2'>
                      <label 
                       className={`${styles.formlabel} text-white`}
                      htmlFor="MaPhongHoc">Mã phòng học</label>
                        <input 
                        // {...register('MaPhongHoc')}
                        type="text" 
                        value={maPhongHoc}
                        onChange={(e) => setMaPhongHoc(e.target.value)}
                        className={`${styles.formInputModel} w-full  text-white`}
                        />
                      </div>

                        <Select
                          label="Status"
                          variant="bordered"
                          placeholder="Select status"
                          selectedKeys={[valueSelectStatus]}
                          className="w-full"
                          onChange={handleSelectionStatusChange}
                        >

                            <SelectItem key='Active' value='Active'>
                              Active
                            </SelectItem>
                            <SelectItem key='Close' value='Close'>
                               Close
                            </SelectItem>
                        </Select>

                        <div>
                        </div>
                          </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={onSubmit}>
                      Lưu
                    </Button>
                  </ModalFooter>
                    </form>
                </>
              )}

            </ModalContent>
            
          </Modal>


            <Modal 
            isOpen={isOpen && openTypes === 'Delete'} 
            onOpenChange={onOpenChange}
            size='sm'
            className="max-h-80"
            >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 text-center">Cảnh báo hành động</ModalHeader>
                  <ModalBody>
                    <p>Bạn có chắc muốn xóa thông tin lịch học này ?</p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="danger" onClick={handleConfirmDelete}>
                      Xóa
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
    </>
  )
}

export default AdminScheduleBody