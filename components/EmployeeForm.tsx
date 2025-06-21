import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FormData, schema } from "@/lib/schema";

interface EmployeeFormProps {
  initialValues?: FormData;
  onSubmit: (data: FormData) => void;
  isEditing?: boolean;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  initialValues,
  onSubmit,
  isEditing = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialValues || {
      first_name: "",
      last_name: "",
      email: "",
      number: "",
      gender: undefined,
    },
  });

  return (
    <Box sx={{ p: 10, display: "flex", justifyContent: "center" }}>
      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={2} direction={"column"}>
            {[
              { label: "First Name", name: "first_name", type: "text" },
              { label: "Last Name", name: "last_name", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Phone Number", name: "number", type: "text" },
            ].map(({ label, name, type }, i) => (
              <Stack
                key={i}
                direction={"row"}
                spacing={1}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography>{label}</Typography>
                <TextField
                  size="small"
                  type={type}
                  {...register(name as keyof FormData)}
                  error={!!errors[name as keyof FormData]}
                  helperText={errors[name as keyof FormData]?.message}
                />
              </Stack>
            ))}

            {/* Gender */}
            {/* <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Grid size={{ xs: 10, sm: 4 }}>
            <Typography>Gender</Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 8 }}>
            <TextField
              select
              fullWidth
              {...register("gender")}
              error={!!errors.gender}
              helperText={errors.gender?.message}
            >
              <MenuItem value="">Select Gender</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>
          </Grid>
        </Grid> */}

            <Box sx={{ textAlign: "right" }}>
              <Button variant="contained" type="submit">
                {isEditing ? "Update" : "Submit"}
              </Button>
            </Box>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default EmployeeForm;
