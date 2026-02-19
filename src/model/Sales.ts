export interface SalesOrderItemDto {
    productId: number
    quantity: number
    unitPrice: number
}

export interface SalesOrderDto {
    id: number
    customerId: number
    status: string
    createdAt: string
    closedAt?: string | null
    totalAmount: number
    items: SalesOrderItemDto[]
}