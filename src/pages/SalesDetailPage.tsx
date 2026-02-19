import { useEffect, useState, useCallback } from "react"
import { useParams } from "react-router-dom"
import {getSalesOrders, getProductById } from "@/api/api"
import type {SalesOrderDto, SalesOrderItemDto} from "@/model/Sales.ts";
import type {ProductResponse} from "@/model/Product.ts";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function SalesDetailPage() {
    const { id } = useParams<{ id: string }>()

    const [order, setOrder] = useState<SalesOrderDto | null>(null)
    const [products, setProducts] = useState<Record<number, ProductResponse>>({})
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const fetchOrder = useCallback(async () => {
        if (!id) return

        try {
            setLoading(true)
            setError(null)

            const data = await getSalesOrders({ page: 0, size: 100 })

            const found = data.content.find(
                (o: SalesOrderDto) => o.id === Number(id)
            )

            if (!found) {
                setError("Sales order not found.")
                return
            }

            setOrder(found)

            const productPromises = found.items.map(
                (item: SalesOrderItemDto) =>
                    getProductById(item.productId)
            )

            const productResponses = await Promise.all(productPromises)

            const productMap: Record<number, ProductResponse> = {}
            productResponses.forEach((product: ProductResponse) => {
                productMap[product.id] = product
            })

            setProducts(productMap)
        } catch {
            setError("Failed to load sales order.")
        } finally {
            setLoading(false)
        }
    }, [id])

    useEffect(() => {
        fetchOrder()
    }, [fetchOrder])

    if (loading) return <p className="text-muted-foreground">Loading...</p>
    if (error) return <p className="text-destructive">{error}</p>
    if (!order) return null

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            {/* HEADER */}
            <div>
                <h1 className="text-2xl font-bold">
                    Sales Order #{order.id}
                </h1>

                <div className="flex gap-4 items-center mt-2">
                    <Badge>{order.status}</Badge>

                    <span className="font-semibold text-lg">
            € {order.totalAmount.toFixed(2)}
          </span>
                </div>

                <p className="text-muted-foreground mt-2">
                    Created: {new Date(order.createdAt).toLocaleString()}
                </p>

                <p className="text-muted-foreground">
                    Closed:{" "}
                    {order.closedAt
                        ? new Date(order.closedAt).toLocaleString()
                        : "Not closed yet"}
                </p>
            </div>

            {/* TABLE */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Brand</TableHead>
                        <TableHead>SKU</TableHead>
                        <TableHead>Unit</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Unit Price</TableHead>
                        <TableHead>Subtotal</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {order.items.map((item: SalesOrderItemDto) => {
                        const product = products[item.productId]
                        if (!product) return null

                        return (
                            <TableRow key={item.productId}>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.brand}</TableCell>
                                <TableCell>{product.sku}</TableCell>
                                <TableCell>{product.unitOfMeasure}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>
                                    € {item.unitPrice.toFixed(2)}
                                </TableCell>
                                <TableCell>
                                    € {(item.quantity * item.unitPrice).toFixed(2)}
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )
}
