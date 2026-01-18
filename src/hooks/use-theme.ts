import { useState, useEffect } from "react"

export function useTheme() {
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== "undefined") {
            return document.documentElement.classList.contains("dark")
        }
        return false
    })

    useEffect(() => {
        const root = window.document.documentElement
        if (isDark) {
            root.classList.add("dark")
        } else {
            root.classList.remove("dark")
        }
    }, [isDark])

    const toggleTheme = () => setIsDark((prev) => !prev)

    return { isDark, toggleTheme }
}