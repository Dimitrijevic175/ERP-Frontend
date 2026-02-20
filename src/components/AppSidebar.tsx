import {
    Box,
    Users,
    ShoppingCart,
    Receipt,
    ChevronUp,
    User,
    Settings,
    Warehouse,
    LogOut
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

import { useNavigate } from "react-router-dom"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"

const items = [
    { title: "Products", path: "/products", icon: Box },
    { title: "Warehouses", path: "/warehouses", icon: Warehouse },
    { title: "Users", path: "/users", icon: Users },
    { title: "Sales", path: "/sales", icon: ShoppingCart },
    { title: "Purchase Orders", path: "/purchase-orders", icon: Receipt },
]


export function AppSidebar() {
    const navigate = useNavigate()

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: ""
    })

    const handleLogout = () => {
        localStorage.clear()
        navigate("/login")
    }

    useEffect(() => {
        const firstName = localStorage.getItem("firstName") || ""
        const lastName = localStorage.getItem("lastName") || ""
        const email = localStorage.getItem("email") || ""

        setUser({ firstName, lastName, email })
    }, [])

    return (
        <Sidebar
            variant="sidebar"
            collapsible="none"
            className="font-sans overflow-visible border-r"
        >
            {/* Sidebar Header */}
            <SidebarHeader className="relative border-b border-sidebar-border p-4 h-16 flex justify-center overflow-visible">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className="flex items-center gap-3 group-data-[state=collapsed]:justify-center transition-all">
                            <div
                                className="flex aspect-square w-8 h-8 shrink-0 items-center justify-center rounded-lg
                                        bg-primary text-primary-foreground cursor-pointer transform transition-all duration-200
                                        hover:scale-115 hover:bg-primary/90 hover:text-primary-foreground/90 hover:shadow-md "
                                onClick={() => navigate("/landing-page")}
                            >
                                <Box className="w-4 h-4" />
                            </div>
                            <div className="flex flex-col gap-0.5 leading-none overflow-hidden group-data-[state=collapsed]:hidden">
                                <span className="font-semibold whitespace-nowrap tracking-tight">ERP System</span>
                                <span className="text-[11px] text-muted-foreground">Enterprise</span>
                            </div>
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            {/* Sidebar Content */}
            <SidebarContent className="overflow-x-visible">
                <SidebarGroup>
                    <SidebarGroupLabel className="group-data-[state=collapsed]:hidden px-2">Platform</SidebarGroupLabel>
                    <SidebarMenu>
                        {items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild tooltip={item.title}>
                                    <button
                                        onClick={() => navigate(item.path)}
                                        className="flex items-center gap-3 w-full py-5 text-left"
                                    >
                                        <item.icon className="size-5" />
                                        <span className="font-medium">{item.title}</span>
                                    </button>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>

            </SidebarContent>

            {/* Sidebar Footer */}
            <SidebarFooter className="border-t border-sidebar-border p-2 overflow-visible">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <div className="flex aspect-square size-8 shrink-0 items-center justify-center rounded-lg bg-foreground shadow-inner">
                                        <User className="size-4 text-background" />
                                    </div>
                                    <div className="grid flex-1 text-left text-sm leading-tight group-data-[state=collapsed]:hidden">
                                    <span className="truncate font-bold">
                                        {user.firstName} {user.lastName}
                                    </span>
                                        <span className="truncate text-[11px] text-muted-foreground font-medium italic">
                                        {user.email}
                                    </span>
                                    </div>
                                    <ChevronUp className="ml-auto size-4 group-data-[state=collapsed]:hidden opacity-50" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="right"
                                align="end"
                                className="w-56 font-sans shadow-xl border-border"
                            >
                                <DropdownMenuItem className="cursor-pointer">
                                    <User className="mr-2 size-4" />
                                    <span>Account</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">
                                    <Settings className="mr-2 size-4" />
                                    <span>Change password</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="text-destructive cursor-pointer"
                                    onClick={handleLogout}
                                >
                                    <LogOut className="mr-2 size-4" />
                                    <span>Sign out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}