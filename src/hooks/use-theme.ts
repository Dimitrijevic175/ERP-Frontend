import { useState, useEffect } from "react"

export function useTheme() {
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== "undefined") {
            // prvo proveri localStorage
            const saved = localStorage.getItem("theme")
            if (saved === "dark") return true
            if (saved === "light") return false

            // fallback na sistemsku preferencu
            return window.matchMedia("(prefers-color-scheme: dark)").matches
        }
        return false
    })

    useEffect(() => {
        const root = window.document.documentElement
        if (isDark) {
            root.classList.add("dark")
            localStorage.setItem("theme", "dark")
        } else {
            root.classList.remove("dark")
            localStorage.setItem("theme", "light")
        }
    }, [isDark])

    const toggleTheme = () => setIsDark(prev => !prev)

    return { isDark, toggleTheme }
}