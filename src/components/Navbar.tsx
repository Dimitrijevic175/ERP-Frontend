// src/components/Navbar.tsx
import { Button } from "@/components/ui/button"
import { useTheme } from "@/hooks/use-theme"
import { useNavigate, useLocation } from "react-router-dom"
import { Sun, Moon } from "lucide-react"

export default function Navbar() {
    const { isDark, toggleTheme } = useTheme()
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogout = () => {
        localStorage.clear()
        navigate("/login")
    }

    const showButtons = location.pathname !== "/login"

    return (
        <nav className="fixed top-0 left-0 w-full bg-background border-b border-border z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Levo prazno za balans */}
                    <div className="flex-1"></div>

                    {/* Center */}
                    <div className="text-xl font-bold text-foreground text-center flex-1">
                        ERP System
                    </div>

                    {/* Desno */}
                    <div className="flex items-center space-x-2 flex-1 justify-end">
                        {showButtons && (
                            <>
                                <Button variant="outline" onClick={toggleTheme} className="flex items-center space-x-2">
                                    {isDark ? (
                                        <>
                                            <Sun className="w-4 h-4" />
                                            <span>Light</span>
                                        </>
                                    ) : (
                                        <>
                                            <Moon className="w-4 h-4" />
                                            <span>Dark</span>
                                        </>
                                    )}
                                </Button>
                                <Button variant="destructive" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}
