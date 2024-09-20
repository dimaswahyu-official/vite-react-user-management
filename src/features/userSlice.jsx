import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
  users: [],
  photos:[],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users?_limit=10"
  );
  const data = await response.json();
  return data.map((user) => ({
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
  }));
});


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state,action) => {
            state.users.push(action.payload)
        },
        editUser: (state,action) => {
            state.users = state.users.map( user => (
                user.id === action.payload.id ? action.payload : user
            ))
        },
        deleteUser: (state, action) => {
            state.users = state.users.filter(user => user.id !== action.payload)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true;
            state.error = null
        }),
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload
        }),
        builder.addCase(fetchUsers.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message
        })  
    }
})
export const  {addUser, editUser,deleteUser} = userSlice.actions
export default userSlice.reducer
