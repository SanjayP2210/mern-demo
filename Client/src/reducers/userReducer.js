import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify";
import apiService from "../service/apiService";

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    return await apiService.getRequest('user');
});

export const fetchUsersById = createAsyncThunk('users/fetchUsersById', async (id) => {
    return await apiService.getRequest(`user/${id}`);
    // return await middleware(response);
});

export const addUser = createAsyncThunk('users/addUser', async (newUser) => {
    return await apiService.postRequest('user/register', newUser);
});

export const updateUser = createAsyncThunk('users/updateUser', async (updatedUser) => {
    return await apiService.patchRequest(`user/${updatedUser._id}`, updateUser);
});

export const removeUser = createAsyncThunk('users/removeUser', async (userId) => {
    return await apiService.deleteRequest(`user/${userId}`);
});

const getUsersFLS = () => {
    if (localStorage.getItem('user')) {
        return JSON.parse(localStorage.getItem('user'));
    }
    return [];
}

const initState = {
    users: getUsersFLS(),
    isUserAdded: false,
    isUserUpdated: false,
    isUserDeleted: false,
    data: null,
    loading: false,
    error: null,
    userData: {
        userName: "",
        email: "",
        mobileNumber: "",
    },
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
}

const userReducer = createSlice({
    name: 'user',
    initialState: initState,
    reducers: {
        // getUser: (state) => {
        //     return state.users;
        // },
        // updateAddUserFlag: (state, action) => {
        //     return state.isUserAdded = action.payload;
        // },
        // addUser: (state, action) => {
        //     const user = action.payload;
        //     try {
        //         fetch(`${BASE_URL}user/register`, {
        //             method: "POST",
        //             headers: {
        //                 "Content-Type": "application/json",
        //             },
        //             body: JSON.stringify(user),
        //         })
        //             .then(response => {
        //                 if (!response.ok) {
        //                     throw new Error('Network response was not ok');
        //                 }
        //                 return response.json();
        //             })
        //             .then(data => {
        //                 // Do something with the parsed data
        //                 
        //                 if (data) {
        //                     toast.success(data.message);
        //                     
        //                     // state.isUserAdded = true;
        //                     dispatch(updateAddUserFlag(true));
        //                     // useState.users.push(data);
        //                 } else {
        //                     state.isUserAdded = false;
        //                     toast.error(data.message);
        //                 }
        //             })
        //             .catch(error => {
        //                 // Handle any errors that occurred during the fetch
        //                 console.error('There was a problem with the fetch operation:', error);
        //             });
        //     } catch (error) {
        //         console.log("getting error while submitting", error);
        //         // toast.error("getting error while submitting");
        //     }
        // },
        // removeUser: (state, action) => {
        //     state.users = state.users.filter(item => item._id != action.payload);
        //     localStorage.setItem('user', JSON.stringify(state.users));
        // },
        // updateUser: (state, action) => {
        //     state.users.map(item => {
        //         if (item._id === action.payload._id) {
        //             item.userName = action.payload.userName;
        //             item.email = action.payload.email;
        //             item.password = action.payload.password;
        //             item.mobileNumber = action.payload.mobileNumber;
        //             item.isAdmin = action.payload.isAdmin;
        //         }
        //     })
        //     localStorage.setItem('user', JSON.stringify(state.users));
        // }
    }, extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = 'loading';

            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.status = 'succeeded';
                state.users = action.payload.users;

            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.status = 'rejected';
                state.error = action.error.message;

            })
            .addCase(fetchUsersById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = 'loading';
            })
            .addCase(fetchUsersById.fulfilled, (state, action) => {
                state.loading = false;
                state.status = 'succeeded';
                state.userData = action.payload.userData;

            })
            .addCase(fetchUsersById.rejected, (state, action) => {
                state.loading = false;
                state.status = 'rejected';
                state.error = action.error.message;

            })
            .addCase(addUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.isUserAdded = false;
                state.status = 'loading';
            })
            .addCase(addUser.fulfilled, (state, action) => {
                const data = action.payload;
                state.loading = false;
                state.status = 'succeeded';
                if (data.isError) return toast.error(data.message);

                toast.success(data.message);
                state.users.push(data.user);
                state.isUserAdded = true;

            })
            .addCase(addUser.rejected, (state, action) => {
                state.loading = false;
                state.status = 'rejected';
                state.error = action.error.message;
                state.isUserAdded = false;

            })
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.isUserUpdated = false;
                state.status = 'loading';
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const data = action.payload;
                state.loading = false;
                state.status = 'succeeded';
                if (data.isError) return toast.error(data.message);

                toast.success(data.message);
                state.loading = false;
                state.status = 'succeeded';
                state.isUserUpdated = true;

            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.status = 'rejected';
                state.error = action.error.message;
                state.isUserUpdated = false;

            })
            .addCase(removeUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.isUserDeleted = false;
                state.status = 'loading';
            })
            .addCase(removeUser.fulfilled, (state, action) => {
                const data = action.payload;
                state.loading = false;
                state.status = 'succeeded';
                if (data.isError) return toast.error(data.message);

                toast.success(data.message);
                state.isUserDeleted = true;

            })
            .addCase(removeUser.rejected, (state, action) => {
                state.loading = false;
                state.status = 'rejected';
                state.error = action.error.message;
                state.isUserDeleted = false;

            });
    },
})

// export const { getUser, addUser, removeUser, updateUser } = userReducer.actions;

export default userReducer.reducer;