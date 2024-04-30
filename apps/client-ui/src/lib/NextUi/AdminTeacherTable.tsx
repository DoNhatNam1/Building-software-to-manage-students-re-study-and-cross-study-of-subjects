
import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button} from "@nextui-org/react";

type TeacherType = any;

export default function AdminTeacherTable({
  dataTeacher,
  setDeleteNotification,
  setSelectedItem
} : {
  dataTeacher: TeacherType[],
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
    className='light text-gray-700'
    >
      <TableHeader>
        <TableColumn>STT</TableColumn>
        <TableColumn>Tên</TableColumn>
        <TableColumn>Email liên lạc</TableColumn>
        <TableColumn>SĐT</TableColumn>
        <TableColumn> </TableColumn>
      </TableHeader>
      <TableBody>
                {dataTeacher.map((item, index) => (
                    <TableRow key={index}>
                        <TableCell>{index}</TableCell>
                        <TableCell>{item.TenGiangVien}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.phone_number}</TableCell>
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