import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { setUserData, storeTokenInLS } from "../constants/utilities";
import apiService, { BASE_URL } from "../service/apiService";

export const loginUser = createAsyncThunk('auth/loginUser', async (formData) => {
    // const response = await fetch(`${BASE_URL}/auth/login`, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(formData),
    // });
    return await apiService.postRequest('auth/login', formData);
    // return await middleware(response);
});

export const addUser = createAsyncThunk('auth/addUser', async (newUser) => {
    return await apiService.postRequest('auth/register', newUser);
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
    // const response = await fetch(`${BASE_URL}/auth/logout`, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: '',
    // });
    // return await middleware(response);

    return await apiService.postRequest('auth/logout', {});
});


const middleware = async (response) => {
    if (response.ok && [200, 201].includes(response.status)) {
        return await response.json();
    }
    const data = await response.json();
    if (
        ["token expired. please login again",
            "Access denied. User is not an admin."].includes(data.message)
    ) {
        toast.error(data.message);
        localStorage.clear();
        window.location.replace('/login');
    }
    toast.error(data.message);
    return { isError: true, response: data };
}

const userData = localStorage.getItem("loginUserData") ? JSON.parse(localStorage.getItem("loginUserData")) : null;
const initialState = {
    loginUserData: userData || {
        email: "",
        password: "",
        isAdmin: false,
        name: "",
        _id: "",
    },
    isLoggedIn: userData,
    isAdmin: userData?.isAdmin,
    isAPIRunning: false,
    loading: false,
    error: null,
    isUserAdded: false,
    response: null,
}
const authReducer = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setLoadingState: (state, action) => {
            state.loading = action.payload.loading;
            console.log('setLoadingState caaled', state.loading)
        },
        resetState: (state, action) => {
            state.isUserAdded = false;
            state.loading = false;
            state.error = null;
            state.isUserAdded = false;
            state.response = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.isUserAdded = false;
        }).addCase(loginUser.fulfilled, (state, action) => {
            const data = action.payload;
            state.isUserAdded = false;
            state.loading = false;
            state.error = data.message;
            if (!data.isError) {
                toast.success(data.message);
                const { token, user } = action.payload;
                if (token && user) {
                    localStorage.setItem('token', token);
                    state.token = user.token;
                    state.loginUserData = user;
                    storeTokenInLS(token);
                    setUserData(state.loginUserData);
                    state.isLoggedIn = true;
                    state.isAdmin = user?.isAdmin;
                }
            }

        }).addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.isUserDeleted = false;
            console.log('state', state);
            state.isUserAdded = false;
        }).addCase(logoutUser.fulfilled, (state, action) => {
            state.loginUserData = {};
            state.isAdmin = false;
            state.isLoggedIn = false;
            state.token = null;
        }).addCase(addUser.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.isUserAdded = false;
            state.status = 'loading';
            state.response = null;
        }).addCase(addUser.fulfilled, (state, action) => {
            const data = action.payload;
            state.loading = false;
            state.status = 'succeeded';
            state.response = action.payload;
            if (!data.isError) {
                toast.success(data.message);
                state.isUserAdded = true;
            }
        }).addCase(addUser.rejected, (state, action) => {
            state.loading = false;
            state.status = 'rejected';
            state.response = null;
            state.error = action.error.message;
            state.isUserAdded = false;

        })
    }
})

export const { setLoadingState, resetState } = authReducer.actions;
export default authReducer.reducer;