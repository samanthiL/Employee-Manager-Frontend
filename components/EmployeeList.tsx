import React from 'react'
import { Table, TableHead, TableBody, TableRow, TableCell, Button, Avatar, Paper, TableContainer } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Employee } from '../store/employeeSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './EmployeeList.module.css';  

type Props = {
  employees : Employee[];
  onDelete: (id: string) => void;
}

const EmployeeList: React.FC<Props> = ({ employees , onDelete }) => {
  const router = useRouter();

  const handleEditClick = (id: string) => {
    router.push(`/employee/edit/${id}`);
  };

  return (
    <TableContainer
      component={Paper}
     className={styles.tableContainer}
    >
      <Table className={styles.table}>
        <TableHead>
          <TableRow className={styles.tableHeadRow}>
            {['Image', 'First Name', 'Last Name', 'Email', 'Phone', 'Gender', 'Actions'].map((header) => (
              <TableCell key={header} sx={{ color: 'white', fontWeight: 'bold' }}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {employees .map((emp) => (
            <TableRow
              key={emp.id}
              hover
              sx={{
                '&:hover': { backgroundColor: '#f9f9f9' },
              }}
            >
              <TableCell>
                <Avatar alt={emp.first_name} src={emp.photo}  sx={{ width: 80, height: 80 }}
                />
              </TableCell>
              <TableCell>{emp.first_name}</TableCell>
              <TableCell>{emp.last_name}</TableCell>
              <TableCell>{emp.email}</TableCell>
              <TableCell>{emp.number}</TableCell>
              <TableCell>{emp.gender === 'F' ? 'Female' : 'Male' }</TableCell>
              <TableCell>
                <Button
                  onClick={() => handleEditClick(emp.id)}
                  variant="contained"
                  size="small"
                    sx={{  backgroundColor:'#666565'}}
                  className={styles.editButton}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => onDelete(emp.id)}
                  variant="text"
                  color="error"
                  size="medium"
                className={styles.deleteButton}

                >
                  <DeleteIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default EmployeeList

