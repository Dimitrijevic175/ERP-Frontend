import { useEffect, useState, useCallback } from "react"
import { useParams } from "react-router-dom"
import { getPurchaseOrders } from "@/api/api.ts"
import type { PurchaseOrder, PurchaseOrderItem } from "@/model/PurchaseOrder.ts"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function PurchaseOrderDetailPage() {
    const { id } = useParams<{ id: string }>()
    const [order, setOrder] = useState<PurchaseOrder | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const fetchOrder = useCallback(async () => {
        if (!id) return

        try {
            setLoading(true)
            setError(null)

            // dohvat svih purchase orders da bismo našli pravi
            const data = await getPurchaseOrders({ page: 0, size: 100 })
            const found = data.content.find((o: PurchaseOrder) => o.id === Number(id))

            if (!found) {
                setError("Purchase order not found.")
                return
            }

            setOrder(found)
        } catch {
            setError("Failed to load purchase order.")
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

    const calculateTotal = (items: PurchaseOrderItem[] | null) => {
        if (!items) return 0
        return items.reduce((sum, item) => sum + item.purchasePrice * item.quantity, 0)
    }

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            {/* HEADER */}
            <div>
                <h1 className="text-2xl font-bold">
                    Purchase Order #{order.id}
                </h1>

                <div className="flex gap-4 items-center mt-2">
                    <Badge>{order.status}</Badge>
                    <span className="font-semibold text-lg">
                        € {calculateTotal(order.items).toFixed(2)}
                    </span>
                </div>

                <p className="text-muted-foreground mt-2">
                    Created: {new Date(order.createdAt).toLocaleString()}
                </p>
            </div>

            {/* TABLE */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Product Name</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Unit Price</TableHead>
                        <TableHead>Subtotal</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {order.items?.map((item: PurchaseOrderItem) => (
                        <TableRow key={item.productId}>
                            <TableCell>{item.productName}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>€ {item.purchasePrice.toFixed(2)}</TableCell>
                            <TableCell>
                                € {(item.quantity * item.purchasePrice).toFixed(2)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
