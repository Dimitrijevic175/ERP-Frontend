import { useEffect, useState } from "react"
import { getUsers, getRoles } from "@/api/api"

import type { UserResponse } from "@/model/User"
import type { RoleResponse } from "@/model/User"
import type { PageResponse } from "@/model/Product"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
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

export default function UsersPage() {
    const [users, setUsers] = useState<UserResponse[]>([])
    const [roles, setRoles] = useState<RoleResponse[]>([])

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [page, setPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    const [filters, setFilters] = useState({
        email: "",
        roleName: "",
    })

    const fetchUsers = async () => {
        setLoading(true)
        setError(null)

        try {
            const params: any = {
                page,
                size: 5,
            }

            if (filters.email) params.email = filters.email
            if (filters.roleName && filters.roleName !== "all") {
                params.roleName = filters.roleName
            }

            const data: PageResponse<UserResponse> = await getUsers(params)

            setUsers(data.content)
            setTotalPages(data.totalPages)
        } catch {
            setError("Failed to fetch users.")
        } finally {
            setLoading(false)
        }
    }

    const fetchRoles = async () => {
        try {
            const data = await getRoles()
            setRoles(data)
        } catch {
            console.error("Failed to fetch roles")
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [page])

    useEffect(() => {
        fetchRoles()
    }, [])

    const handleSearch = () => {
        setPage(0)
        fetchUsers()
    }

    const pages = Array.from({ length: totalPages }, (_, i) => i)

    return (
        <div className="w-full max-w-[1600px] mx-auto">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Users</h1>
            </div>

            {/* FILTERS */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-5">
                <div>
                    <Label>Email</Label>
                    <Input
                        value={filters.email}
                        onChange={(e) =>
                            setFilters({ ...filters, email: e.target.value })
                        }
                    />
                </div>

                <div>
                    <Label>Role</Label>
                    <Select
                        value={filters.roleName || "all"}
                        onValueChange={(value) =>
                            setFilters({ ...filters, roleName: value })
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="All roles" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            {roles.map((role) => (
                                <SelectItem key={role.id} value={role.name}>
                                    {role.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-end">
                    <Button onClick={handleSearch}>Search</Button>
                </div>
            </div>

            {/* TABLE */}
            <Card>
                <CardHeader>
                    <CardTitle>User list</CardTitle>
                </CardHeader>

                <CardContent>
                    {loading && (
                        <p className="text-center py-10 text-muted-foreground">
                            Loading...
                        </p>
                    )}

                    {error && (
                        <p className="text-center py-10 text-destructive">{error}</p>
                    )}

                    {!loading && !error && users.length === 0 && (
                        <p className="text-center py-10 text-muted-foreground">
                            No users found.
                        </p>
                    )}

                    {!loading && !error && users.length > 0 && (
                        <>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Email</TableHead>
                                            <TableHead>First name</TableHead>
                                            <TableHead>Last name</TableHead>
                                            <TableHead>Role</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                        {users.map((user) => (
                                            <TableRow key={user.id} className="hover:bg-muted">
                                                <TableCell>{user.email}</TableCell>
                                                <TableCell>{user.firstName}</TableCell>
                                                <TableCell>{user.lastName}</TableCell>
                                                <TableCell>{user.roleName}</TableCell>
                                                <TableCell>
                                                    {user.active ? (
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

                                        {pages.map((p) => (
                                            <PaginationItem key={p}>
                                                <PaginationLink
                                                    onClick={() => setPage(p)}
                                                    isActive={p === page}
                                                >
                                                    {p + 1}
                                                </PaginationLink>
                                            </PaginationItem>
                                        ))}

                                        <PaginationItem>
                                            <PaginationNext
                                                onClick={() =>
                                                    setPage((p) =>
                                                        Math.min(p + 1, totalPages - 1)
                                                    )
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
