import axios from 'axios';

export const userApi = axios.create({
    baseURL: import.meta.env.VITE_USER_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
})

export const warehouseApi = axios.create({
    baseURL: import.meta.env.VITE_WAREHOUSE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
})

export const productApi = axios.create({
    baseURL: import.meta.env.VITE_PRODUCT_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});


