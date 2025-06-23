// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// const API_URL = 'http://localhost:5001/employees';

// export interface Employee {
//   id: string;
//   first_name: string;
//   last_name: string;
//   email: string;
//   number: string;
//   gender: 'M' | 'F';
//   photo: string;
// }

// interface EmployeesState {
//   employees: Employee[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: EmployeesState = {
//   employees: [],
//   loading: false,
//   error: null,
// };

// export const fetchEmployees = createAsyncThunk<Employee[]>(
//   'employees/fetchEmployees',
//   async () => {
//     const res = await fetch(API_URL);
//     if (!res.ok) throw new Error('Failed to fetch employees');
//     return await res.json();
//   }
// );

// export const addEmployee = createAsyncThunk('employees/add', async (employee: Omit<Employee, 'id'>) => {
//     const res = await fetch(API_URL, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(employee),
//     });
//     if (!res.ok) throw new Error('Failed to add');
//     return (await res.json()) as Employee;
  
// });

// export const updateEmployee = createAsyncThunk(
//   'employees/update',
//   async (updatedEmployee: Employee) => {
//     const res = await fetch(`${API_URL}/${updatedEmployee.id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(updatedEmployee),
//     });
//     if (!res.ok) throw new Error('Failed to update');
//     return (await res.json()) as Employee;
//   }
// );

// // export const updateEmployee = createAsyncThunk('employees/update',   async (updatedEmployee: Employee) => {
// //     const res = await fetch(${API_URL}/${updatedEmployee.id}, {
// //       method: 'PUT',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify(updatedEmployee),
// //     });
// //     if (!res.ok) throw new Error('Failed to update');
// //     return (await res.json()) as Employee;
// //   }
// // );

// // export const deleteEmployee = createAsyncThunk('employees/delete',
// //   async (id: string) => {
// //     const res = await fetch(${API_URL}/${id}, { method: 'DELETE' });
// //     if (!res.ok) throw new Error('Failed to delete');
// //     return id;
  
// // });

// const employeesSlice = createSlice({
//   name: 'employees',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {


//     builder
//       .addCase(fetchEmployees.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchEmployees.fulfilled, (state, action) => {
//         state.loading = false;
//         state.employees = action.payload;
//       })
//       .addCase(fetchEmployees.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message ?? 'Failed to fetch employees';
//       })

//       .addCase(addEmployee.fulfilled, (state, action) => {
//         state.employees.push(action.payload);
//       })
// .addCase(updateEmployee.fulfilled, (state, action) => {
//   const index = state.employees.findIndex(e => e.id === action.payload.id);
//   if (index !== -1) {
//     state.employees[index] = action.payload;
//   }
// })

//     //   .addCase(updateEmployee.fulfilled, (state, action) => {
//     //     const index = state.employees.findIndex((e) => e.id === action.payload.id);
//     //     if (index !== -1) state.employees[index] = action.payload;
//     //   })

//     //   .addCase(deleteEmployee.fulfilled, (state, action) => {
//     //     state.employees = state.employees.filter((e) => e.id !== action.payload);
//     //   });
//   },
// });

// export default employeesSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API_URL = 'http://localhost:5000/employee';

export interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  number: string;
  gender: 'M' | 'F';
  photo: string;
}

interface EmployeesState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
}

const initialState: EmployeesState = {
  employees: [],
  loading: false,
  error: null,
};

export const fetchEmployees = createAsyncThunk<Employee[]>(
  'employee',
  async () => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Failed to fetch employees');
    return await res.json();
  }
);

export const addEmployee = createAsyncThunk('employees/add', async (employee: Omit<Employee, 'id'>) => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(employee),
    });
    if (!res.ok) throw new Error('Failed to add');
    return (await res.json()) as Employee;
  
});

export const updateEmployee = createAsyncThunk('employees/update',   async (updatedEmployee: Employee) => {
  console.log("updatedEmployee",updatedEmployee)
    const res = await fetch(`${API_URL}/${updatedEmployee.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedEmployee),
    });
    if (!res.ok) throw new Error('Failed to update');
    return (await res.json()) as Employee;
  }
);

export const deleteEmployee = createAsyncThunk('employees/delete',
  async (id: string) => {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete');
    return id;
  
});



const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch employees';
      })

      .addCase(addEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })

      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.employees.findIndex((e) => e.id === action.payload.id);
        if (index !== -1) state.employees[index] = action.payload;
      })

    .addCase(deleteEmployee.fulfilled, (state, action) => {
  state.employees = state.employees.filter((e) => e.id !== action.payload);
});
  },
});

export default employeesSlice.reducer;
