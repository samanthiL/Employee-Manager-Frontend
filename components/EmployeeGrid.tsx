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
    <Box display="grid" gap={2} sx={{
    gridTemplateColumns: {
      xs: 'repeat(1, 1fr)',  // 1 column on extra-small screens (mobile)
      sm: 'repeat(2, 1fr)',  // 2 columns on small screens (tablet)
      md: 'repeat(3, 1fr)',  // 3 columns on medium screens (desktop)
      lg: 'repeat(4, 1fr)',  // 4 columns on large screens
      xl: 'repeat(5, 1fr)',  // 5 columns on extra-large screens
    },
  }}>
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
            {/* <Typography color="text.secondary"> {emp.email}</Typography> */}
            <Typography fontWeight="bold" sx={{ textDecoration: 'underline' }}>
 {emp.email}</Typography>
            <Typography  fontWeight="bold"> {emp.number}</Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography>{emp.gender === "M" ? "Male" : "Female"}</Typography>
              <Box>
                <IconButton aria-label="delete" color="error" onClick={() => onDelete?.(emp.id)}   size="small">
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
                <IconButton aria-label="edit"  onClick={() => handleEditClick(emp.id)}>
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
