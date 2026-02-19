// import { useEffect, useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { getAllWarehouses } from "@/api/api"
// import type {WarehouseDto} from "@/model/Warehouse.ts";
// import { useNavigate } from "react-router-dom"
//
// export default function WarehousePage() {
//     const [warehouses, setWarehouses] = useState<WarehouseDto[]>([])
//     const [loading, setLoading] = useState<boolean>(false)
//     const [error, setError] = useState<string | null>(null)
//     const navigate = useNavigate()
//
//     useEffect(() => {
//         const fetchWarehouses = async () => {
//             setLoading(true)
//             try {
//                 const response = await getAllWarehouses()
//                 setWarehouses(response.content || []) // Assuming response is Page<WarehouseDto>
//             } catch (err: any) {
//                 setError("Failed to fetch warehouses")
//             } finally {
//                 setLoading(false)
//             }
//         }
//         fetchWarehouses()
//     }, [])
//
//     return (
//         <div className="p-4 ml-5 mr-5 pt-30 min-h-screen bg-background text-foreground">
//             <h1 className="text-2xl font-bold mb-4">Warehouses</h1>
//
//             {loading && <p>Loading...</p>}
//             {error && <p className="text-destructive">{error}</p>}
//
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                 {warehouses.map((warehouse) => (
//                     <Card key={warehouse.id} className="cursor-pointer hover:shadow-lg transition-shadow">
//                         <CardHeader>
//                             <CardTitle>{warehouse.name}</CardTitle>
//                             <CardDescription>{warehouse.location}</CardDescription>
//                         </CardHeader>
//                         <CardContent>
//                             <Button
//                                 variant="outline"
//                                 size="sm"
//                                 onClick={() => navigate(`/warehouse/${warehouse.id}/stock`, {
//                                     state: { warehouseName: warehouse.name }
//                                 })}
//                             >
//                                 View Stock
//                             </Button>
//                         </CardContent>
//                     </Card>
//                 ))}
//             </div>
//         </div>
//
//     )
// }

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getAllWarehouses } from "@/api/api"
import type { WarehouseDto } from "@/model/Warehouse.ts";
import { useNavigate } from "react-router-dom"

export default function WarehousePage() {
    const [warehouses, setWarehouses] = useState<WarehouseDto[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchWarehouses = async () => {
            setLoading(true)
            try {
                const response = await getAllWarehouses()
                setWarehouses(response.content || [])
            } catch (err: any) {
                setError("Failed to fetch warehouses")
            } finally {
                setLoading(false)
            }
        }
        fetchWarehouses()
    }, [])

    return (
        <div className="w-full max-w-[1600px] mx-auto p-6 transition-all duration-300">
            <h1 className="text-2xl font-bold mb-6">Warehouses</h1>

            {loading && <p className="text-center py-10">Loading...</p>}
            {error && <p className="text-destructive text-center py-10">{error}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {warehouses.map((warehouse) => (
                    <Card key={warehouse.id} className=" cursor-pointer hover:shadow-lg transition-all border-border/50 ">
                        <CardHeader>
                            <CardTitle className="text-lg">{warehouse.name}</CardTitle>
                            <CardDescription className="line-clamp-1">{warehouse.location}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button
                                className="w-full font-semibold cursor-pointer"
                                variant="outline"
                                size="sm"
                                onClick={() => navigate(`/warehouse/${warehouse.id}/stock`, {
                                    state: { warehouseName: warehouse.name }
                                })}
                            >
                                View Stock
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
