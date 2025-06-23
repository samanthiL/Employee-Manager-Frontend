"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Typography } from "@mui/material";
import ViewListIcon from "@mui/icons-material/ViewList";
import GridViewIcon from "@mui/icons-material/GridView";
import EmployeeList from "@/components/EmployeeList";
import EmployeeGrid from "@/components/EmployeeGrid";
import { useRouter } from "next/navigation";
import { RootState, AppDispatch } from '../../../store';
import styles from '../Home.module.css';

import {
  fetchEmployees,
  deleteEmployee,
} from '../../../store/employeeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useUIContext } from "@/context/UIContext";

const Home: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { view, toggleView } = useUIContext();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const { employees } = useSelector((state: RootState) => state.employees)
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleClick = () => {
    router.push("/employee/add");
  };

  const handleDelete = async (id: string) => {
    setDeleteId(id);
    setConfirmOpen(true);

  };
  const handleConfirmDelete = async () => {
    if (deleteId) {
      await dispatch(deleteEmployee(deleteId));
      dispatch(fetchEmployees());
    }
    setConfirmOpen(false);
    setDeleteId(null);
  };

  const handleCancelDelete = () => {
    setConfirmOpen(false);
    setDeleteId(null);
  };
  return (
    <Box className={styles.homeContainer}>
      <Box className={styles.buttonSection}>
        <Button variant="contained" className={styles.addButton}
          onClick={handleClick}>
          Add Employee
        </Button>
        <IconButton className={styles.toggleButton}
          onClick={toggleView} >
          {view === "grid" ? <ViewListIcon /> : <GridViewIcon />}
        </IconButton>
      </Box>

      <Typography variant="h6" gutterBottom>
        {view === "list" ? (
          <EmployeeList employees={employees} onDelete={handleDelete} />
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
