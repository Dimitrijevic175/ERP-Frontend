import { Button } from "@/components/ui/button"
import { Sun, Moon, LogOut } from "lucide-react"
import { useTheme } from "@/hooks/use-theme"
import { useNavigate, useLocation } from "react-router-dom"

export default function Navbar() {
    const { isDark, toggleTheme } = useTheme()
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogout = () => {
        localStorage.clear()
        navigate("/login")
    }

    // Sakrij dugmad na login stranici
    const showButtons = location.pathname !== "/login"

    return (
        <header className="fixed top-0 left-0 w-full h-16 z-50 flex items-center justify-between border-b px-8 bg-background/95 backdrop-blur">
            {/* Levo prazno za balans */}
            <div className="flex-1" />

            {/* Center */}
            <div className="text-xl font-bold tracking-tight">
                ERP System
            </div>

            {/* Desno */}
            <div className="flex flex-1 items-center justify-end gap-3">
                {showButtons && (
                    <>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleTheme}
                            className="rounded-full"
                        >
                            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </Button>

                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={handleLogout}
                            className="font-semibold"
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Logout
                        </Button>
                    </>
                )}
            </div>
        </header>
    )
}

