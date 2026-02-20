import { useEffect, useState } from "react"
import {
    getWarehouseStock,
    getProductById,
    getLowStockByWarehouse
} from "@/api/api"

import type { WarehouseStockWithProduct } from "@/model/Warehouse"
import type { LowStockItemDto } from "@/model/Warehouse.ts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table"

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

interface Props {
    warehouseId: number
    warehouseName: string
}

export default function WarehouseStockPage({ warehouseId, warehouseName }: Props) {
    const [stock, setStock] = useState<WarehouseStockWithProduct[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [lowStockMode, setLowStockMode] = useState(false)
    const [fade, setFade] = useState(false)


    // Pagination
    const [currentPage, setCurrentPage] = useState(0)
    const pageSize = 5
    const totalPages = Math.ceil(stock.length / pageSize)

    const pages = Array.from({ length: totalPages }, (_, i) => i)

    const fetchFullStock = async () => {
        setLoading(true)
        setError(null)

        try {
            const warehouseStock = await getWarehouseStock(warehouseId)

            const stockWithProducts = await Promise.all(
                warehouseStock.map(async (item) => {
                    const product = await getProductById(item.productId)
                    return { ...item, product }
                })
            )

            setStock(stockWithProducts)
            setLowStockMode(false)
            setCurrentPage(0) // reset pagination
        } catch {
            setError("Failed to fetch warehouse stock.")
        } finally {
            setLoading(false)
        }
    }

    const fetchLowStock = async () => {
        setLoading(true)
        setError(null)

        try {
            const lowStock: LowStockItemDto[] = await getLowStockByWarehouse(warehouseId)

            const lowStockWithProducts = await Promise.all(
                lowStock.map(async (item) => {
                    const product = await getProductById(item.productId)
                    return {
                        id: item.warehouseStockId,
                        productId: item.productId,
                        quantity: item.quantity,
                        product,
                    }
                })
            )

            setStock(lowStockWithProducts)
            setLowStockMode(true)
            setCurrentPage(0) // reset pagination
        } catch {
            setError("Failed to fetch low stock items.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchFullStock()
    }, [warehouseId])

    useEffect(() => {
        const timer = setTimeout(() => setFade(true), 50)
        return () => clearTimeout(timer)
    }, []);

    // Slicing stock for current page
    const displayedStock = stock.slice(
        currentPage * pageSize,
        currentPage * pageSize + pageSize
    )

    return (
        <div className="w-full max-w-[1600px] mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h1
                    className={`text-2xl font-bold transition-opacity duration-1000 ${
                        fade ? "opacity-100" : "opacity-0"
                    }`}
                >
                    {warehouseName}
                </h1>

                <Button
                    variant={lowStockMode ? "outline" : "destructive"}
                    onClick={lowStockMode ? fetchFullStock : fetchLowStock}
                >
                    {lowStockMode ? "Back to full stock" : "View low stock"}
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>
                        {lowStockMode ? "Low stock products" : "Warehouse stock"}
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    {loading && <p className="text-center py-10 text-muted-foreground">Loading...</p>}
                    {error && <p className="text-center py-10 text-destructive">{error}</p>}

                    {!loading && !error && stock.length === 0 && (
                        <p className="text-center py-10 text-muted-foreground">No items found.</p>
                    )}

                    {!loading && !error && stock.length > 0 && (
                        <>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Product</TableHead>
                                            <TableHead>Brand</TableHead>
                                            <TableHead>SKU</TableHead>
                                            <TableHead>Unit</TableHead>
                                            <TableHead className="text-right">Quantity</TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                        {displayedStock.map((item) => (
                                            <TableRow
                                                key={item.id}
                                                className={
                                                    lowStockMode
                                                        ? "bg-destructive/10 hover:bg-destructive/20"
                                                        : "hover:bg-muted"
                                                }
                                            >
                                                <TableCell>{item.product.name}</TableCell>
                                                <TableCell>{item.product.brand}</TableCell>
                                                <TableCell>{item.product.sku}</TableCell>
                                                <TableCell>{item.product.unitOfMeasure}</TableCell>
                                                <TableCell className="text-right font-semibold">
                                                    {item.quantity}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Pagination Controls */}
                            {/* Pagination Controls */}
                            {totalPages > 1 && (
                                <Pagination className="mt-6 justify-center flex cursor-pointer">
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious
                                                onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
                                            />
                                        </PaginationItem>

                                        {pages.map((p, idx) => (
                                            <PaginationItem key={idx}>
                                                <PaginationLink
                                                    onClick={() => setCurrentPage(p)}
                                                    isActive={p === currentPage}
                                                >
                                                    {p + 1}
                                                </PaginationLink>
                                            </PaginationItem>
                                        ))}

                                        <PaginationItem>
                                            <PaginationNext
                                                onClick={() =>
                                                    setCurrentPage((p) => Math.min(p + 1, totalPages - 1))
                                                }
                                            />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            )}
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

