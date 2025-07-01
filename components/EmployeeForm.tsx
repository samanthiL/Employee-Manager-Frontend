"use client";
import { EmployeeFormData, employeeSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Employee } from "../store/employeeSlice";

interface EmployeeFormProps {
  initialValues?: EmployeeFormData;
  onSubmit: (data: EmployeeFormData) => void;
  onClose: () => void;
  editEmployee?: Employee | null;
}

const genderOptions = [
  { value: "M", label: "Male" },
  { value: "F", label: "Female" },
];

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  initialValues,
  onSubmit,
  editEmployee,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      first_name: initialValues?.first_name ?? "",
      last_name: initialValues?.last_name ?? "",
      email: initialValues?.email ?? "",
      number: initialValues?.number ?? "",
      gender: initialValues?.gender ?? "M",
    },
  });
  const router = useRouter();

  useEffect(() => {
    if (editEmployee) {
      reset({
        first_name: editEmployee.first_name ?? "",
        last_name: editEmployee.last_name ?? "",
        email: editEmployee.email ?? "",
        number: editEmployee.number ?? "",
        gender: editEmployee.gender ?? "M",
      });
    }
  }, [editEmployee, reset]);
  return (
    <Box sx={{ px: 4, py: 9 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: 3,
        }}
      >
        <Button
          variant="contained"
          sx={{
            borderRadius: "20px",
            bgcolor: "#6200ee",
            color: "white",
            width: "145px",
          }}
          onClick={() => router.push("/employee/list")}
        >
          List View
        </Button>
      </Box>

      {/* Form Container */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Paper
          sx={{
            p: 4,
            width: "100%",
            maxWidth: 600,
            boxShadow: 3,
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={3}>
              {/* Input Fields */}
              {[
                { label: "First Name", name: "first_name", type: "text" },
                { label: "Last Name", name: "last_name", type: "text" },
                { label: "Email", name: "email", type: "email" },
                { label: "Phone Number", name: "number", type: "text" },
              ].map(({ label, name, type }, i) => (
                <Stack
                  key={i}
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography sx={{ minWidth: 100 }}>{label}</Typography>
                  <TextField
                    size="small"
                    type={type}
                    fullWidth
                    {...register(name as keyof EmployeeFormData)}
                    error={!!errors[name as keyof EmployeeFormData]}
                    helperText={errors[name as keyof EmployeeFormData]?.message}
                  />
                </Stack>
              ))}

              {/* Gender Dropdown */}
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography sx={{ minWidth: 100 }}>Gender</Typography>
                <TextField
                  select
                  fullWidth
                  size="small"
                  defaultValue="M" 
                  {...register("gender")}
                  error={!!errors.gender}
                  helperText={errors.gender?.message}
                >
                  {genderOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>

              {/* Action Buttons */}
              <Stack
                direction="row"
                spacing={2}
                justifyContent="flex-end"
                sx={{ mt: 2 }}
              >
                <Button
                  type="submit"
                  variant="outlined"
                  disabled={isSubmitting}
                  sx={{ color: "#6200ee", borderColor: "#6200ee" }}
                >
                  {editEmployee ? "Save" : "Add"}
                </Button>
              </Stack>
            </Stack>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default EmployeeForm;
