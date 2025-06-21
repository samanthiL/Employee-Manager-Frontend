import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import EmployeeForm from "@/components/EmployeeForm";
import { FormData } from "@/lib/schema";

const EditEmployeePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [initialValues, setInitialValues] = useState<FormData | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/employee/${id}`)
        .then((res) => res.json())
        .then((data) => setInitialValues(data));
    }
  }, [id]);

  const handleUpdate = async (data: FormData) => {
    await fetch(`http://localhost:5000/employee/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    router.push("/employee-list");
  };

  if (!initialValues) return <div>Loading...</div>;

  return (
    <EmployeeForm
      initialValues={initialValues}
      onSubmit={handleUpdate}
      isEditing
    />
  );
};

export default EditEmployeePage;
