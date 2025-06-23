"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import ViewListIcon from "@mui/icons-material/ViewList";
import GridViewIcon from "@mui/icons-material/GridView";
import EmployeeList from "@/components/EmployeeList";
import EmployeeGrid from "@/components/EmployeeGrid";
import { useRouter } from "next/navigation";

const Home: React.FC = () => {
  const [view, setView] = useState("list");
  const [employees, setEmployees] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:5000/employee")
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.error("Error fetching employees:", err));
  }, []);
  const handleClick = () => {
    router.push("/addEmployee");
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
        <Button variant="contained" onClick={handleClick}>
          Add Employee
        </Button>
        <IconButton
          color="primary"
          onClick={() => {
            setView(view === "grid" ? "list" : "grid");
          }}
        >
          {view === "grid" ? <ViewListIcon /> : <GridViewIcon />}
        </IconButton>
      </Box>

      <Typography variant="h6" gutterBottom>
        {view === "list" ? (
          <EmployeeList employee={employees} />
        ) : (
          <EmployeeGrid employee={employees} />
        )}
      </Typography>
    </Box>
  );
};

export default Home;
