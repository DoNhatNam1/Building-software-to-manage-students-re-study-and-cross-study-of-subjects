
import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";

export default function AdminTeacherTable() {
    const data = [
        { name: "Tony Reichert", email: "tony@example.com", phone_nunber: "123-456-7890" },
        { name: "Zoey Lang", email: "zoey@example.com", phone_nunber: "987-654-3210" },
        { name: "Jane Fisher", email: "jane@example.com", phone_nunber: "555-123-4567" },
        { name: "William Howard", email: "william@example.com", phone_nunber: "777-888-9999" }
    ];
  return (
    <Table 
    isStriped aria-label="Example static collection table"
    className='light text-gray-700'
    >
      <TableHeader>
        <TableColumn>Tên</TableColumn>
        <TableColumn>Email liên lạc</TableColumn>
        <TableColumn>SĐT</TableColumn>
        <TableColumn> </TableColumn>
        <TableColumn> </TableColumn>
      </TableHeader>
      <TableBody>
                {data.map((item, index) => (
                    <TableRow key={index}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.phone_nunber}</TableCell>
                        <TableCell>Edit</TableCell>
                        <TableCell>Delete</TableCell>
                    </TableRow>
                ))}
            </TableBody>
    </Table>
  );
}