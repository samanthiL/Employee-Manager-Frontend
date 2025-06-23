"use client";
import EmployeeForm from "@/components/EmployeeForm";
import { useRouter } from 'next/navigation';
import React from "react";
import { useDispatch } from 'react-redux';
import { EmployeeFormData } from '../../../lib/schema';
import { AppDispatch } from '../../../store';
import { addEmployee } from '../../../store/employeeSlice';
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
