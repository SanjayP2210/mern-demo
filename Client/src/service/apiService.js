import { toast } from "react-toastify";
import { getJWTToken } from "../constants/utilities";
import { setLoadingState } from "../reducers/authReducer";

export let BASE_URL = import.meta.env.VITE_APP_API_URL;
console.log('import.meta.env', import.meta.env)

const middleware = async (response) => {
    if (response.ok && [200, 201].includes(response.status)) {
        return await response.json();
    }
    const data = await response?.json();
    if (
        ["token expired. please login again", "unauthorized user token not provided",
            "Access denied. User is not an admin."].includes(data.message)
    ) {
        toast.error(data.message);
        localStorage.clear();
        window.location.replace('/login');
    }
    toast.error(data.message || 'Something went wrong');
    return { isError: true, response };
}

// Helper function to make API calls
export const apiRequest = async (endpoint, method = 'GET', data = null) => {
    const token = getJWTToken();
    setLoadingState({ loading: true });
    const config = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (data) {
        config.body = JSON.stringify(data);
    }

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}/${endpoint}`, config);
    // const responseData = await response.json();
    return middleware(response);
};

// Exported API methods
const apiService = {
    getRequest: (endpoint) => apiRequest(endpoint, 'GET', null),
    postRequest: (endpoint, payload) => apiRequest(endpoint, 'POST', payload),
    putRequest: (endpoint, payload) => apiRequest(endpoint, 'PUT', payload),
    patchRequest: (endpoint, payload) => apiRequest(endpoint, 'PATCH', payload),
    deleteRequest: (endpoint) => apiRequest(endpoint, 'DELETE', null),
};

export default apiService;
