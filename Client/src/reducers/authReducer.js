import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { setUserData, storeTokenInLS } from "../constants/utilities";
import { BASE_URL } from "../service/apiService";

export const loginUser = createAsyncThunk('login/loginUser', async (formData) => {
    const response = await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });
    return await middleware(response);
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
    error: null
}
const loginReducer = createSlice({
    name: 'login',
    initialState: initialState,
    reducers: {
        logoutUser: (state) => {
            state.loginUserData = {};
            state.isAdmin = false;
            state.isLoggedIn = false;
            state.token = null;
        },
        setLoadingState: (state, action) => {
            state.loading = action.payload.loading;
            console.log('setLoadingState caaled', state.loading)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(loginUser.fulfilled, (state, action) => {
            const data = action.payload;
            state.loading = false;
            state.error = data.message;
            if (!data.isError) {
                toast.success(data.message);
                const { token, user } = action.payload;
                if (token && user) {
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('token', token);
                    state.token = user.token;
                    state.loginUserData = user;
                    storeTokenInLS(token);
                    setUserData(state.loginUserData);
                    state.isLoggedIn = true;
                    state.isAdmin = user?.isAdmin
                }
            }

        }).addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.isUserDeleted = false;
            console.log('state', state);
        });
    }
})

export const { logoutUser, setLoadingState } = loginReducer.actions;
export default loginReducer.reducer;