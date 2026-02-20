import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { getPurchaseOrders } from "@/api/api.ts"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import type { PurchaseOrder, PurchaseOrderItem } from "@/model/PurchaseOrder.ts"
import type { PageResponse } from "@/model/Product.ts"

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

export default function PurchaseOrdersPage() {
    const [orders, setOrders] = useState<PurchaseOrder[]>([])
    const [page, setPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const [fade, setFade] = useState(false)


    // Kad se page promeni, update query param
    const updatePageInUrl = (p: number) => {
        setSearchParams({ page: String(p) })
        setPage(p)
    }

    const fetchOrders = async () => {
        setLoading(true)
        setError(null)
        try {
            const data: PageResponse<PurchaseOrder> = await getPurchaseOrders({ page, size: 3 })
            setOrders(data.content)
            setTotalPages(data.totalPages)
        } catch (err) {
            setError("Failed to fetch purchase orders.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const pageFromUrl = Number(searchParams.get("page"))
        if (!isNaN(pageFromUrl) && pageFromUrl >= 0) {
            setPage(pageFromUrl)
        }
        const timer = setTimeout(() => setFade(true), 50)
        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        fetchOrders()
    }, [page])

    const calculateTotal = (items: PurchaseOrderItem[]) => {
        return items.reduce((sum, item) => sum + item.purchasePrice * item.quantity, 0)
    }

    const pages = Array.from({ length: totalPages }, (_, i) => i)

    return (
        <div className="max-w-5xl mx-auto space-y-4">
            <h1
                className={`text-2xl font-bold transition-opacity duration-1000 ${
                    fade ? "opacity-100" : "opacity-0"
                }`}
            >
                Purchase Orders
            </h1>

            {loading && <p className="text-center py-10 text-muted-foreground">Loading...</p>}
            {error && <p className="text-center py-10 text-destructive">{error}</p>}
            {!loading && !error && orders.length === 0 && (
                <p className="text-center py-10 text-muted-foreground">No purchase orders found.</p>
            )}

            {!loading && !error && orders.length > 0 && (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <Card
                            key={order.id}
                            className="cursor-pointer hover:shadow-md dark:hover:shadow-white/20 transition-all"
                            onClick={() => navigate(`/purchase-orders/${order.id}`)}
                        >
                            <CardContent className="flex justify-between items-center p-6">
                                <div>
                                    <h2 className="font-semibold text-lg">
                                        Purchase Order #{order.id}
                                    </h2>
                                    <p className="text-muted-foreground text-sm mt-1">
                                        Created: {new Date(order.createdAt).toLocaleString()}
                                    </p>
                                </div>

                                <div className="text-right space-y-2">
                                    <Badge>{order.status}</Badge>
                                    <div className="font-semibold text-lg">
                                        € {calculateTotal(order.items).toFixed(2)}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {/* SHADCN PAGINATION */}
                    {totalPages > 1 && (
                        <Pagination className="mt-6 justify-center flex cursor-pointer">
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() =>
                                            updatePageInUrl(Math.max(page - 1, 0))
                                        }
                                    />
                                </PaginationItem>

                                {pages.map((p, idx) => (
                                    <PaginationItem key={idx}>
                                        <PaginationLink
                                            onClick={() => updatePageInUrl(p)}
                                            isActive={p === page}
                                        >
                                            {p + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() =>
                                            updatePageInUrl(Math.min(page + 1, totalPages - 1))
                                        }
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    )}
                </div>
            )}
        </div>
    )
}
