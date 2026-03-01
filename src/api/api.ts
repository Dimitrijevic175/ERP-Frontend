import {productApi, userApi, warehouseApi, salesApi, procurementApi} from '@/lib/axios'
import type {LoginRequest} from "@/model/AuthModel.ts";
import type {LoginResponse} from "@/model/AuthModel.ts";
import type {WarehouseDto, WarehouseStockDto} from "@/model/Warehouse.ts";
import type {PageResponse, ProductResponse} from "@/model/Product.ts";
import type { UserResponse } from "@/model/User.ts"
import type { RoleResponse } from "@/model/User.ts"
import {AxiosHeaders} from "axios";
import type {SalesOrderDto} from "@/model/Sales.ts";
import type {PurchaseOrder} from "@/model/PurchaseOrder.ts";
import type {SubmitPurchaseOrderRequest} from "@/model/Procurement.ts";
import type {PurchaseOrderSubmitResponse} from "@/model/Procurement.ts";

// ---> LOGIN <---
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
    const res = await userApi.post("/auth/login", data)
    return res.data
}
// ---> WAREHOUSE SERVIS <---
export const getAllWarehouses = async (): Promise<{ content: WarehouseDto[] }> => {
    const res = await warehouseApi.get("/warehouses")
    return res.data
}

export const getWarehouseStock = async (warehouseId: number): Promise<WarehouseStockDto[]> => {
    const res = await warehouseApi.get(`/warehouses/${warehouseId}/stock`);
    return res.data;
}

export const getLowStockByWarehouse = async (warehouseId: number) => {
    const res = await warehouseApi.get(`/warehouses/${warehouseId}/lowStock`)
    return res.data
}
// ---> PRODUCT SERVIS <---
export const getProductById = async (productId: number): Promise<ProductResponse> => {
    const res = await productApi.get(`/product/${productId}`);
    return res.data;
}

export const getProducts = async (params: any): Promise<PageResponse<ProductResponse>> => {
    const response = await productApi.get(`/product`, {
        params,
    })
    return response.data
}
// ---> USER SERVIS <---
export const getUsers = async (params: any): Promise<PageResponse<UserResponse>> => {
    const response = await userApi.get(`/user`, { params })
    return response.data
}

export const getRoles = async (): Promise<RoleResponse[]> => {
    const response = await userApi.get(`/role`)
    return response.data
}

export const verifyPassword = async (
    userId: number,
    oldPassword: string
): Promise<void> => {
    await userApi.put(`/user/${userId}/verify-password`, {
        oldPassword,
    })
}

export const getUserById = async (userId: number): Promise<UserResponse> => {
    const response = await userApi.get(`/user/${userId}`);
    return response.data;
}

export const changePassword = async (
    userId: number,
    newPassword: string
): Promise<UserResponse> => {
    const response = await userApi.put(`/user/${userId}/password`, {
        newPassword,
    })
    return response.data
}

export const deleteUser = async (userId: number): Promise<void> => {
    await userApi.delete(`/user/${userId}`);
}

// ---> USER SERVIS <---
export const updateUser = async (
    userId: number,
    data: {
        email: string
        firstName: string
        lastName: string
        roleName: string
        active: boolean
    }
): Promise<void> => {
    await userApi.put(`/user/${userId}`, data)
}

// ---> SALES SERVIS <---
export const getSalesOrders = async (params: {
    page: number
    size: number
}) => {
    const res = await salesApi.get(`/orders`, { params })
    return res.data as PageResponse<SalesOrderDto>
}


// ---> PROCUREMENT SERVIS <---
export const getPurchaseOrders = async (params: { page: number; size: number }): Promise<PageResponse<PurchaseOrder>> => {
    const response = await procurementApi.get(`/purchase-orders`, { params })
    return response.data
}

export const getPurchaseOrder = async (id: number): Promise<PurchaseOrder> => {
    const response = await procurementApi.get(`/purchase-orders/${id}`)
    return response.data
}

export const createPurchaseOrder = async (data: {
    warehouseId: number
    supplierId: number
}) => {
    const res = await procurementApi.post("/purchase-orders", data)
    return res.data
}

export const getSuppliers = async () => {
    const response = await procurementApi.get(`/suppliers`)
    return response.data
}

export const submitPurchaseOrder = async (
    id: number,
    payload: SubmitPurchaseOrderRequest
): Promise<PurchaseOrderSubmitResponse> => {
    const response = await procurementApi.post<PurchaseOrderSubmitResponse>(
        `/purchase-orders/${id}/submit`,
        payload
    )
    return response.data
}

// ---> INTERCEPTOR <---

const apis = [userApi, productApi, warehouseApi, salesApi, procurementApi];

apis.forEach((api) => {
    api.interceptors.request.use((config) => {
        const token = localStorage.getItem("token");

        if (config.url?.includes("/login")) {
            return config;
        }

        if (token) {
            config.headers = new AxiosHeaders(config.headers);
            config.headers.set("Authorization", `Bearer ${token}`);
        }

        return config;
    });
});