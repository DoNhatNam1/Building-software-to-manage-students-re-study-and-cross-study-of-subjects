
import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button} from "@nextui-org/react";

type LessonType = any;

export default function AdminLessonTable({
    dataLessons,
  setDeleteNotification,
  setSelectedItem
} : {
    dataLessons: LessonType[],
  setDeleteNotification: (e: string) => void
  setSelectedItem: (e: string) => void
}) {


  // Handle Delete
  const handleDelete = (id: string) => {
    setSelectedItem(id)
    setDeleteNotification("Open")
  }

    
  return (
    <Table 
    isStriped aria-label="Example static collection table"
    className='light text-gray-700 max-h-96 overflow-x-auto overflow-y-auto'
    >
      <TableHeader className="sticky top-0 z-10">
        <TableColumn>Mã học phần</TableColumn>
        <TableColumn>Tên học phần</TableColumn>
        <TableColumn>Số tín chỉ</TableColumn>
        <TableColumn>Giá cả</TableColumn>
        <TableColumn> </TableColumn>
      </TableHeader>
      <TableBody>
                {dataLessons.map((item, index) => (
                    <TableRow key={index}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.TenHocPhan}</TableCell>
                        <TableCell>{item.SoTinChi}</TableCell>
                        <TableCell>{item.GiaCa}</TableCell>
                        <TableCell>
                          <div className="flex justify-center gap-2">
                          <Button color="primary">
                          Edit
                          </Button>  
                          <Button 
                          onClick={() => handleDelete(item.id)}
                          color="danger">
                          Delete
                          </Button> 
                          </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
    </Table>
  );
}