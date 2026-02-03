// src/pages/WarehouseStockPage.tsx
import { useEffect, useState } from "react";
import { getWarehouseStock, getProductById } from "@/api/api";
import type { WarehouseStockDto } from "@/model/Warehouse.ts";
import type {WarehouseStockWithProduct} from "@/model/Warehouse.ts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table" // ShadCN DataTable
import { useLocation } from "react-router-dom"

interface Props {
    warehouseId: number
    warehouseName: string
}

export default function WarehouseStockPage({ warehouseId }: Props) {
    const [stock, setStock] = useState<WarehouseStockWithProduct[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const location = useLocation()
    const warehouseName = (location.state)?.warehouseName || "Warehouse"


    useEffect(() => {
        const fetchStock = async () => {
            setLoading(true)
            setError(null)

            try {
                const warehouseStock: WarehouseStockDto[] = await getWarehouseStock(warehouseId)

                const stockWithProducts: WarehouseStockWithProduct[] = await Promise.all(
                    warehouseStock.map(async (item) => {
                        const product = await getProductById(item.productId)
                        return { ...item, product }
                    })
                )

                setStock(stockWithProducts)
            } catch (err: any) {
                setError("Failed to fetch warehouse stock.")
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchStock()
    }, [warehouseId])

    return (
        <div className="p-4 ml-5 mr-5 pt-30 min-h-screen bg-background text-foreground">
            <h1 className="text-2xl font-bold mb-4">{warehouseName}</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Warehouse Stock</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-destructive">{error}</p>}

                    {!loading && !error && (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Product Name</TableHead>
                                    <TableHead>Brand</TableHead>
                                    <TableHead>SKU</TableHead>
                                    <TableHead>Selling Price</TableHead>
                                    <TableHead>Purchase Price</TableHead>
                                    <TableHead>Unit</TableHead>
                                    <TableHead>Quantity</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {stock.map((item) => (
                                    <TableRow key={item.id} className="hover:bg-muted cursor-pointer">
                                        <TableCell>{item.product.name}</TableCell>
                                        <TableCell>{item.product.brand}</TableCell>
                                        <TableCell>{item.product.sku}</TableCell>
                                        <TableCell>{item.product.sellingPrice}</TableCell>
                                        <TableCell>{item.product.purchasePrice}</TableCell>
                                        <TableCell>{item.product.unitOfMeasure}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
