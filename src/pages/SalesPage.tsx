import { useEffect, useState, useCallback } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { getSalesOrders } from "@/api/api.ts"
import type { SalesOrderDto } from "@/model/Sales.ts"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

export default function SalesPage() {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    const [orders, setOrders] = useState<SalesOrderDto[]>([])
    const [page, setPage] = useState<number>(0)
    const [totalPages, setTotalPages] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [fade, setFade] = useState(false)

    const updatePageInUrl = (p: number) => {
        setSearchParams({ page: String(p) })
        setPage(p)
    }

    const fetchOrders = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)

            const data = await getSalesOrders({ page, size: 3 })
            setOrders(data.content)
            setTotalPages(data.totalPages)
        } catch {
            setError("Failed to fetch sales orders.")
        } finally {
            setLoading(false)
        }
    }, [page])

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
    }, [fetchOrders])


    const pages = Array.from({ length: totalPages }, (_, i) => i)

    return (
        <div className="max-w-5xl mx-auto space-y-4">
            <h1
                className={`text-2xl font-bold transition-opacity duration-1000 ${
                    fade ? "opacity-100" : "opacity-0"
                }`}
            >
                Sales Orders
            </h1>

            {loading && <p className="text-muted-foreground">Loading...</p>}
            {error && <p className="text-destructive">{error}</p>}

            {!loading && !error && orders.length === 0 && (
                <p className="text-muted-foreground">No sales orders found.</p>
            )}

            {!loading && !error &&
                orders.map((order) => (
                    <Card
                        key={order.id}
                        className="cursor-pointer hover:shadow-md dark:hover:shadow-white/20 transition"
                        onClick={() => navigate(`/sales/${order.id}`)}
                    >
                        <CardContent className="flex justify-between items-center p-6">
                            <div>
                                <h2 className="font-semibold text-lg ">
                                    Sales Order #{order.id}
                                </h2>

                                <p className="text-muted-foreground text-sm">
                                    Created:{" "}
                                    {new Date(order.createdAt).toLocaleString()}
                                </p>

                                <p className="text-muted-foreground text-sm">
                                    Closed:{" "}
                                    {order.closedAt
                                        ? new Date(order.closedAt).toLocaleString()
                                        : "Not closed yet"}
                                </p>
                            </div>

                            <div className="text-right space-y-2">
                                <Badge>{order.status}</Badge>

                                <div className="font-semibold text-lg">
                                    € {order.totalAmount.toFixed(2)}
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
                                onClick={() => updatePageInUrl(Math.max(page - 1, 0))}
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
                                onClick={() => updatePageInUrl(Math.min(page + 1, totalPages - 1))}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    )
}
