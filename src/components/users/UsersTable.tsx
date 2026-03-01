import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"

import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell
} from "@/components/ui/table"

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination"

import { MoreHorizontal, Trash2, Edit2 } from "lucide-react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu.tsx"

import type { UserResponse } from "@/model/User"

interface Props {
    users: UserResponse[]
    loading: boolean
    error: string | null
    page: number
    totalPages: number
    setPage: (page: number) => void
    isAdmin: boolean
    onUpdate: (user: UserResponse) => void
    onDelete: (user: UserResponse) => void
}

export function UsersTable({
                               users,
                               loading,
                               error,
                               page,
                               totalPages,
                               setPage,
                               isAdmin,
                               onUpdate,
                               onDelete
                           }: Props) {

    const pages = Array.from({ length: totalPages }, (_, i) => i)

    return (
        <Card>
            <CardHeader>
                <CardTitle>User list</CardTitle>
            </CardHeader>

            <CardContent>
                {loading && <p className="text-center py-10 text-muted-foreground">Loading...</p>}
                {error && <p className="text-center py-10 text-destructive">{error}</p>}
                {!loading && !error && users.length === 0 && <p className="text-center py-10 text-muted-foreground">No users found.</p>}

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
                                        {isAdmin && <TableHead></TableHead>}
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {users.map(user => (
                                        <TableRow key={user.id} className="hover:bg-muted">
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.firstName}</TableCell>
                                            <TableCell>{user.lastName}</TableCell>
                                            <TableCell>{user.roleName}</TableCell>
                                            <TableCell>
                                                {user.active ? (
                                                    <span className="text-green-600 font-medium">Active</span>
                                                ) : (
                                                    <span className="text-destructive font-medium">Inactive</span>
                                                )}
                                            </TableCell>

                                            {isAdmin && (
                                                <TableCell>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <button className="p-1 rounded cursor-pointer">
                                                                <MoreHorizontal className="w-5 h-5" />
                                                            </button>
                                                        </DropdownMenuTrigger>

                                                        <DropdownMenuContent align="end" className="w-40">
                                                            <DropdownMenuItem
                                                                className="flex items-center gap-2 cursor-pointer"
                                                                onClick={() => onUpdate(user)}
                                                            >
                                                                <Edit2 className="w-4 h-4" />
                                                                Update
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                className="flex items-center gap-2 text-destructive cursor-pointer"
                                                                onClick={() => onDelete(user)}
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            )}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            {/* PAGINATION */}
                            {totalPages > 1 && (
                                <Pagination className="mt-6 justify-center flex">
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious onClick={() => setPage(Math.max(page - 1, 0))} />
                                        </PaginationItem>

                                        {pages.map(p => (
                                            <PaginationItem key={p}>
                                                <PaginationLink onClick={() => setPage(p)} isActive={p === page}>{p + 1}</PaginationLink>
                                            </PaginationItem>
                                        ))}

                                        <PaginationItem>
                                            <PaginationNext onClick={() => setPage(Math.min(page + 1, totalPages - 1))} />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            )}
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    )
}