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
type Employee = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  number: string;
  gender: "M" | "F";
  photo: string;
};

type Props = {
  employee: Employee[];
};

const EmployeeGrid: React.FC<Props> = ({ employee }) => {
  return (
    <Box display="grid" gridTemplateColumns="repeat(5, 1fr)" gap={2}>
      {" "}
      {employee.map((emp) => (
        <Card key={emp.id}>
          <CardMedia
            sx={{ height: 160 }}
            image={emp.photo}
            title="green iguana"
          />
          <CardContent>
            <Typography>
              {emp.first_name} {emp.last_name}
            </Typography>
            <Typography>{emp.email}</Typography>
            <Typography>{emp.number}</Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography>{emp.gender === "M" ? "Male" : "Female"}</Typography>
              <Box>
                <IconButton aria-label="delete" color="error">
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
                <IconButton aria-label="edit">
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
