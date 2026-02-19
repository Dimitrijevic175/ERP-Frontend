import { useEffect, useState } from "react"
import { getProducts } from "@/api/api"

import type { ProductResponse } from "@/model/Product"
import type { PageResponse } from "@/model/Product"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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

export default function ProductsPage() {
    const [products, setProducts] = useState<ProductResponse[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [page, setPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    const [filters, setFilters] = useState({
        name: "",
        sku: "",
        brand: "",
        priceMin: "",
        priceMax: "",
        active: "",
    })

    const fetchProducts = async () => {
        setLoading(true)
        setError(null)

        try {
            const params: any = {
                page,
                size: 5,
            }

            if (filters.name) params.name = filters.name
            if (filters.sku) params.sku = filters.sku
            if (filters.brand) params.brand = filters.brand
            if (filters.priceMin) params.priceMin = filters.priceMin
            if (filters.priceMax) params.priceMax = filters.priceMax
            if (filters.active !== "")
                params.active = filters.active === "true"

            const data: PageResponse<ProductResponse> = await getProducts(params)

            setProducts(data.content)
            setTotalPages(data.totalPages)
        } catch {
            setError("Failed to fetch products.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [page])

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({ ...filters, [e.target.name]: e.target.value })
    }

    const handleSearch = () => {
        setPage(0)
        fetchProducts()
    }

    // Helper: generiši niz stranica za ShadCN Pagination
    const pages = Array.from({ length: totalPages }, (_, i) => i)

    return (
        <div className="w-full max-w-[1600px] mx-auto">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Products</h1>
            </div>

            {/* FILTER */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-5">
                <div>
                    <Label>Name</Label>
                    <Input
                        name="name"
                        value={filters.name}
                        onChange={handleFilterChange}
                    />
                </div>

                <div>
                    <Label>SKU</Label>
                    <Input
                        name="sku"
                        value={filters.sku}
                        onChange={handleFilterChange}
                    />
                </div>

                <div>
                    <Label>Brand</Label>
                    <Input
                        name="brand"
                        value={filters.brand}
                        onChange={handleFilterChange}
                    />
                </div>

                <div className="flex items-end">
                    <Button onClick={handleSearch}>Search</Button>
                </div>
            </div>

            {/* TABLE */}
            <Card>
                <CardHeader>
                    <CardTitle>Product list</CardTitle>
                </CardHeader>

                <CardContent>
                    {loading && (
                        <p className="text-center py-10 text-muted-foreground">
                            Loading...
                        </p>
                    )}

                    {error && (
                        <p className="text-center py-10 text-destructive">
                            {error}
                        </p>
                    )}

                    {!loading && !error && products.length === 0 && (
                        <p className="text-center py-10 text-muted-foreground">
                            No products found.
                        </p>
                    )}

                    {!loading && !error && products.length > 0 && (
                        <>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Brand</TableHead>
                                            <TableHead>SKU</TableHead>
                                            <TableHead>Unit</TableHead>
                                            <TableHead className="text-right">
                                                Price
                                            </TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                        {products.map((product) => (
                                            <TableRow key={product.id} className="hover:bg-muted">
                                                <TableCell>{product.name}</TableCell>
                                                <TableCell>{product.brand}</TableCell>
                                                <TableCell>{product.sku}</TableCell>
                                                <TableCell>{product.unitOfMeasure}</TableCell>
                                                <TableCell className="text-right font-semibold">
                                                    {product.sellingPrice}
                                                </TableCell>
                                                <TableCell>
                                                    {product.active ? (
                                                        <span className="text-green-600 font-medium">
                                                            Active
                                                        </span>
                                                    ) : (
                                                        <span className="text-destructive font-medium">
                                                            Inactive
                                                        </span>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* SHADCN PAGINATION */}
                            {totalPages > 1 && (
                                <Pagination className="mt-6 justify-center flex cursor-pointer">
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious
                                                onClick={() => setPage((p) => Math.max(p - 1, 0))}
                                            />
                                        </PaginationItem>

                                        {pages.map((p, idx) => {
                                            return (
                                                <PaginationItem key={idx}>
                                                    <PaginationLink
                                                        onClick={() => setPage(p)}
                                                        isActive={p === page}
                                                    >
                                                        {p + 1}
                                                    </PaginationLink>
                                                </PaginationItem>
                                            )
                                        })}

                                        <PaginationItem>
                                            <PaginationNext
                                                onClick={() =>
                                                    setPage((p) => Math.min(p + 1, totalPages - 1))
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
