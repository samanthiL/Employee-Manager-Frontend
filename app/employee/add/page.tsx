"use client";
import React from "react";
import EmployeeForm from "@/components/EmployeeForm";
import { Provider } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { store, AppDispatch } from '../../../store';
import { addEmployee } from '../../../store/employeeSlice';
import { EmployeeFormData } from '../../../lib/schema';
const AddEmployee: React.FC = () => {
   const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const defaultPhoto = 'https://randomuser.me/api/portraits/lego/1.jpg';

  const handleSubmit = (data: EmployeeFormData) => {
    dispatch(addEmployee({ ...data, photo: defaultPhoto }));
    router.push('/employee/list');
  };
  return (
    <div>
      <EmployeeForm 
       onSubmit={handleSubmit}
      onClose={() => router.push('/employee/list')}
    />
    </div>
  );
};
export default AddEmployee;
