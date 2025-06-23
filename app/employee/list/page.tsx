"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Typography } from "@mui/material";
import ViewListIcon from "@mui/icons-material/ViewList";
import GridViewIcon from "@mui/icons-material/GridView";
import EmployeeList from "@/components/EmployeeList";
import EmployeeGrid from "@/components/EmployeeGrid";
import { useRouter } from "next/navigation";
import { store, RootState, AppDispatch } from '../../../store';

import {
  fetchEmployees,
  deleteEmployee,
} from '../../../store/employeeSlice';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { useUIContext } from "@/context/UIContext";
const Home: React.FC = () => {

  // const [view, setView] = useState<'list' | 'grid'>('list');
 const router = useRouter();
const dispatch = useDispatch<AppDispatch>();
  const { view, toggleView } = useUIContext();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const { employees, loading, error } = useSelector((state: RootState) => state.employees)
    useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleClick = () => {
    router.push("/employee/add");
  };

// const handleDelete = (id: string) => {
//     if (confirm('Delete this employee?')) {
//       // dispatch(deleteEmployee(id));
//             deleteEmployee(id);

//     }
//   };
  const handleDelete = async(id: string) => {
    //   setDeleteId(id);
    // setConfirmOpen(true);
    // if (confirm('Are you sure?')) dispatch(deleteEmployee(id));
    if (confirm("Are you sure?")) {
    await dispatch(deleteEmployee(id));
    dispatch(fetchEmployees()); // Force refresh from backend
  }
  };
  const handleConfirmDelete = () => {
    console.log("deleteid",deleteId

    )
    if (deleteId) {
      dispatch(deleteEmployee(deleteId));
    }
    setConfirmOpen(false);
    setDeleteId(null);
  };

  // Cancel delete
  const handleCancelDelete = () => {
    setConfirmOpen(false);
    setDeleteId(null);
  };

  console.log("view", view);
  return (
    <Box sx={{ padding: 11, position: "relative" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          mb: 4,
          gap: 2,
          
        }}
      >
        <Button variant="contained"      sx={{
     bgcolor: '#6200ee', // Background color is purple
                    color: 'white', // Text color is white
                    borderRadius: '20px', // Highly rounded corners
                    padding: '8px 20px', // Adjust padding as needed
                    '&:hover': {
                        bgcolor: '#5500c8', // A slightly darker purple on hover
                    },
    }}

  
  onClick={handleClick}>
          Add Employee
        </Button>
        <IconButton
    sx={{ bgcolor: '#6200ee', // Background color is purple
                    color: 'white', // Icon color is white
                    borderRadius: '50%', // Makes it perfectly round
                    width: 40, // Fixed width
                    height: 40, // Fixed height to make it a circle
                     }}
          onClick={
            // setView(view === "grid" ? "list" : "grid");
            toggleView
          }
        >
          {view === "grid" ? <ViewListIcon /> : <GridViewIcon />}
        </IconButton>
      </Box>

      <Typography variant="h6" gutterBottom>
        {view === "list" ? (
          <EmployeeList employees ={employees} onDelete={handleDelete}  />
        ) : (
          <EmployeeGrid employee={employees} onDelete={handleDelete} />
        )}
      </Typography>

      <Dialog open={confirmOpen} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this employee?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Home;
