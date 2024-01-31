// // In your AdminAttendance component

// import { useSelector } from "react-redux";

// function AdminAttendance() {
//   const attendance = useSelector((state) => state.attendance.data);

//   // ... rest of your component

//   return (
//     // ... your component JSX using the updated 'attendance' state
//   );
// }

// // In your AdminAttendance component

// import { useDispatch } from "react-redux";
// import { deleteAttendance as deleteAttendanceAction } from "../../../../Redux/Features/AttendanceSlice/AttendanceSlice";

// function AdminAttendance() {
//   const dispatch = useDispatch();

//   const deleteAttendanceHandler = async (id, index) => {
//     try {
//       // Make API call to delete data on the server
//       await axios.delete(`http://localhost:8000/attendance/admin/del/${id}`);

//       // Dispatch the action to delete the record from the Redux store
//       dispatch(deleteAttendanceAction(id));
//     } catch (error) {
//       console.error("Error deleting attendance:", error);
//     }
//   };

//   // ... rest of your component

//   return (
//     // ... your component JSX
//   );
// }

// // In your Redux slice file (AttendanceSlice.js)

// import { createSlice } from "@reduxjs/toolkit";

// const attendanceSlice = createSlice({
//   name: "attendance",
//   initialState: {
//     data: [],
//     // ... other state properties
//   },
//   reducers: {
//     deleteAttendance: (state, action) => {
//       const index = state.data.findIndex((item) => item._id === action.payload);
//       if (index !== -1) {
//         state.data.splice(index, 1);
//       }
//     },
//   },
// });

// export const { deleteAttendance } = attendanceSlice.actions;
// export default attendanceSlice.reducer;
