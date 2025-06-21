import React from 'react'
import { Table, TableHead, TableBody, TableRow, TableCell, Button } from '@mui/material';

type Employee = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  number: string;
  gender: 'M' | 'F'; 
    photo:string;
};

type Props = {
  employee: Employee[];
};

const EmployeeList: React.FC<Props> = ({ employee }) => {
  return (
    
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>First Name</TableCell>
          <TableCell>Last Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Phone</TableCell>
          <TableCell>Gender</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {employee.map((emp) => (
          <TableRow key={emp.id}>
            <TableCell>{emp.first_name}</TableCell>
            <TableCell>{emp.last_name}</TableCell>
            <TableCell>{emp.email}</TableCell>
            <TableCell>{emp.number}</TableCell>
            <TableCell>{emp.gender}</TableCell>
            <TableCell>
              <Button>Edit</Button>
              <Button color="error">Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
export default EmployeeList

