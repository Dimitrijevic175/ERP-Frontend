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

// ---> INTERCEPTOR <---
userApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers = new AxiosHeaders(config.headers)
        config.headers.set("Authorization", `Bearer ${token}`)
    }
    return config
})