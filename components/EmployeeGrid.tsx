import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Employee } from '../store/employeeSlice';
import { useRouter } from 'next/navigation';
import styles from './EmployeeList.module.css'; 

type Props = {
  employee: Employee[];
  onDelete?: (id: string) => void;
};

const EmployeeGrid: React.FC<Props> = ({ employee, onDelete }) => {
  const router = useRouter();

  const handleEditClick = (id: string) => {
    router.push(`/employee/edit/${id}`);
  };
  return (
    <Box display="grid" gap={2} className={styles.employeeGrid}>
      {" "}
      {employee.map((emp) => (
        <Card key={emp.id}>
          <CardMedia
            sx={{ height: 160 }}
            image={emp.photo}
            title={`${emp.first_name} ${emp.last_name}`}
          />
          <CardContent>
            <Typography fontWeight="bold">
              {emp.first_name} {emp.last_name}
            </Typography>
            <Typography fontWeight="bold" className={styles.cardEmail}>
              {emp.email}</Typography>
            <Typography fontWeight="bold"> {emp.number}</Typography>
            <Box
              className={styles.cardBox}
            >
              <Typography>{emp.gender === "M" ? "Male" : "Female"}</Typography>
              <Box>
                <IconButton aria-label="delete" color="error" onClick={() => onDelete?.(emp.id)} size="small">
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
                <IconButton aria-label="edit" onClick={() => handleEditClick(emp.id)}>
                  <ModeEditIcon fontSize="inherit" />
                </IconButton>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};
export default EmployeeGrid;
