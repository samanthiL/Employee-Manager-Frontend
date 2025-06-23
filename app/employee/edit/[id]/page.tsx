'use client'
import { useEffect, useState } from "react";
import EmployeeForm from "@/components/EmployeeForm";
import { useRouter, useParams } from 'next/navigation'; // ✅ useParams for App Router
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../../store';
import { Employee, updateEmployee, fetchEmployees } from '../../../../store/employeeSlice';
import { EmployeeFormData } from '../../../../lib/schema';

const EditEmployeePage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string; // ✅ safely cast

  const dispatch = useDispatch<AppDispatch>();
  const employees = useSelector((state: RootState) => state.employees.employees);
  const [loading, setLoading] = useState(true);
  const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null);

  useEffect(() => {
    if (!employees.length) {
      dispatch(fetchEmployees());
    }
  }, [dispatch, employees.length]);

  useEffect(() => {
    if (id && employees.length) {
      const emp = employees.find((e) => e.id === id);
      if (emp) {
        setEmployeeToEdit(emp);
      } else {
        alert('Employee not found');
        router.push('/employee/list');
      }
      setLoading(false);
    }
  }, [id, employees, router]);

  const handleSubmit = (data: EmployeeFormData) => {
    console.log("employeeToEdit",employeeToEdit)
        console.log("data",data)

    if (employeeToEdit) {

      dispatch(updateEmployee({ ...employeeToEdit, ...data }));
        router.push('/employee/list');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!employeeToEdit) return null;

 

  return (
    <EmployeeForm
     editEmployee={employeeToEdit}
      onSubmit={handleSubmit}
      onClose={() => router.push('/')}
    />
  );
};

export default EditEmployeePage;
