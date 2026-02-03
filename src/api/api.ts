import {productApi, userApi, warehouseApi} from '@/lib/axios'
import type {LoginRequest} from "@/model/AuthModel.ts";
import type {LoginResponse} from "@/model/AuthModel.ts";
import type {WarehouseDto, WarehouseStockDto} from "@/model/Warehouse.ts";
import type {ProductResponse} from "@/model/Product.ts";

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
// ---> PRODUCT SERVIS <---
export const getProductById = async (productId: number): Promise<ProductResponse> => {
    const res = await productApi.get(`/product/${productId}`);
    return res.data;
}