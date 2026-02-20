import { Button } from "@/components/ui/button"
import { useTheme } from "@/hooks/use-theme"
import {useLocation, useNavigate} from "react-router-dom"
import {Sun, Moon, ArrowLeft} from "lucide-react"


export default function Header() {
    const { isDark, toggleTheme } = useTheme()
    const location = useLocation()
    const navigate = useNavigate()

    const isStockPage = location.pathname.startsWith("/warehouse/") && location.pathname.endsWith("/stock")
    const isLoginPage = location.pathname === "/login"
    const isSalesDetailPage = location.pathname.startsWith("/sales/")
    const isPurchaseOrderDetailPage = location.pathname.startsWith("/purchase-orders/")

    return (
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-8 bg-background/95 backdrop-blur">

            <div className="flex-1">
                {(isStockPage || isSalesDetailPage || isPurchaseOrderDetailPage) && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(-1)}
                        className="gap-2  hover:bg-muted rounded-md transition-colors px-2 py-1 hover:scale-110
                            hover:text-primary/80 duration-300 tracking-tight cursor-pointer font-bold"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Button>
                )}
            </div>

            <div
                className={`text-xl font-bold tracking-tight rounded-md px-2 py-1 transition-all duration-200
                ${!isLoginPage
                    ? "cursor-pointer hover:text-primary/80 hover:bg-muted hover:scale-105"
                    : "cursor-default opacity-70"
                }`}
                onClick={!isLoginPage ? () => navigate("/landing-page") : undefined}
            >
                ERP System
            </div>


            <div className="flex flex-1 items-center justify-end gap-3">
                {!isLoginPage && (
                    <>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleTheme}
                            className="rounded-full font-bold tracking-tight cursor-pointer hover:text-primary/80
                            hover:bg-muted px-2 py-1 hover:scale-115 transition-all duration-200"
                        >
                            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </Button>
                    </>
                )}
            </div>
        </header>
    )
}