import { configureStore } from "@reduxjs/toolkit";
// import rootReducer from "../reducers";
import userReducer from "../reducers/userReducer";
import loginReducer from '../reducers/authReducer';
import contactReducer from "../reducers/contactReducer";

const store = configureStore({
    reducer: {
        user: userReducer,
        login: loginReducer,
        contact: contactReducer
    }
})

export default store;