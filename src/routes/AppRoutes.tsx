import {Routes, Route, Navigate, useParams, useLocation} from "react-router-dom"
import Login from "@/pages/login/LoginPage.tsx"
import WarehousePage from "@/pages/warehouse/WarehousePage.tsx";
import WarehouseStockPage from "@/pages/warehouse/WarehouseStockPage.tsx";
import ProductsPage from "@/pages/product/ProductPage.tsx"
import UsersPage from "@/pages/users/UsersPage.tsx"
import SalesPage from "@/pages/sales/SalesPage.tsx"
import SalesDetailPage from "@/pages/sales/SalesDetailPage.tsx"
import PurchaseOrdersPage from "@/pages/purchaseOrder/PurchaseOrdersPage.tsx";
import PurchaseOrderDetailPage from "@/pages/purchaseOrder/PurchaseOrderDetailPage.tsx";
import LandingPage from "@/pages/landing/LandingPage.tsx"
import ChangePasswordPage from "@/pages/settings/ChangePasswordPage.tsx";
import AccountPage from "@/pages/settings/AccountPage.tsx";
import {ProtectedRoute} from "@/routes/ProtectedRoute.tsx";
import NoAccessPage from "@/pages/noAccess/NoAccessPage.tsx";
import CreatePurchaseOrderPage from "@/pages/purchaseOrder/CreatePurchaseOrderPage.tsx";
import SubmitPurchaseOrderPage from "@/pages/purchaseOrder/SubmitPurchaseOrderPage.tsx";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/landing-page" element={<LandingPage />} />
            <Route path="/warehouses" element={<WarehousePage />} />
            <Route path="/warehouse/:id/stock" element={<WarehouseStockPageWrapper />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route
                path="/users"
                element={
                    <ProtectedRoute roles={["ADMIN"]}>
                        <UsersPage />
                    </ProtectedRoute>
                }
            />
            <Route path="/sales" element={<SalesPage />} />
            <Route path="/sales/:id" element={<SalesDetailPage />} />
            <Route path="/purchase-orders" element={<PurchaseOrdersPage />} />
            <Route path="/purchase-orders/:id" element={<PurchaseOrderDetailPage />} />
            <Route path="/change-password" element={<ChangePasswordPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/no-access" element={<NoAccessPage />} />
            <Route path="/purchase-orders/new" element={<CreatePurchaseOrderPage />} />
            <Route path="/purchase-orders/submit/:id" element={<SubmitPurchaseOrderPage />} />
        </Routes>
    )
}

function WarehouseStockPageWrapper() {
    const { id } = useParams<{ id: string }>()
    const location = useLocation()

    // Ako korisnik dođe sa WarehousePage, ime je u state-u.
    // Ako ukuca direktno URL, stavljamo fallback "Warehouse"
    const name = (location.state)?.warehouseName || "Warehouse"

    if (!id) return <p>Invalid warehouse</p>

    return <WarehouseStockPage warehouseId={parseInt(id)} warehouseName={name} />
}
