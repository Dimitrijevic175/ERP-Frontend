import { useEffect, useState } from "react"
import { getUsers, getRoles, deleteUser } from "@/api/api.ts"

import type { UserResponse } from "@/model/User.ts"
import type { RoleResponse } from "@/model/User.ts"
import type { PageResponse } from "@/model/Product.ts"

import { UsersHeader } from "@/components/users/UsersHeader"
import { UsersFilters } from "@/components/users/UsersFilters"
import { UsersTable } from "@/components/users/UsersTable"
import UserUpdateDialog from "@/components/UserUpdateDialog.tsx"
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog.tsx"

export default function UsersPage() {
    const [users, setUsers] = useState<UserResponse[]>([])
    const [roles, setRoles] = useState<RoleResponse[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [page, setPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [fade, setFade] = useState(false)
    const [filters, setFilters] = useState({ email: "", roleName: "" })

    const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null)
    const [openDialog, setOpenDialog] = useState(false)
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false)

    const isAdmin = localStorage.getItem("role") === "ADMIN"

    const fetchUsers = async () => {
        setLoading(true)
        setError(null)
        try {
            const params: any = { page, size: 5 }
            if (filters.email) params.email = filters.email
            if (filters.roleName && filters.roleName !== "all") params.roleName = filters.roleName

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
        const timer = setTimeout(() => setFade(true), 50)
        return () => clearTimeout(timer)
    }, [])

    const handleSearch = () => {
        setPage(0)
        fetchUsers()
    }

    const handleDeleteClick = (user: UserResponse) => {
        setSelectedUser(user)
        setOpenDialog(true)
    }

    const handleUpdateClick = (user: UserResponse) => {
        setSelectedUser(user)
        setOpenUpdateDialog(true)
    }

    const handleDeleteConfirm = async () => {
        if (!selectedUser) return
        try {
            await deleteUser(selectedUser.id)
            fetchUsers()
            setOpenDialog(false)
        } catch (err) {
            console.error("Failed to delete user", err)
        }
    }

    return (
        <div className="w-full max-w-[1600px] mx-auto">
            {/* HEADER */}
            <UsersHeader fade={fade} />

            {/* FILTERS */}
            <UsersFilters
                filters={filters}
                setFilters={setFilters}
                roles={roles}
                onSearch={handleSearch}
            />

            {/* TABLE */}
            <UsersTable
                users={users}
                loading={loading}
                error={error}
                page={page}
                totalPages={totalPages}
                setPage={setPage}
                isAdmin={isAdmin}
                onDelete={handleDeleteClick}
                onUpdate={handleUpdateClick}
            />

            {/* DELETE DIALOG */}
            <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete user?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete{" "}
                            <strong>{selectedUser?.firstName} {selectedUser?.lastName}</strong>? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="flex justify-end gap-2 mt-4">
                        <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-destructive cursor-pointer text-background hover:bg-destructive/50 focus:bg-destructive/80 transition-colors duration-200"
                            onClick={handleDeleteConfirm}
                        >
                            Delete
                        </AlertDialogAction>
                    </div>
                </AlertDialogContent>
            </AlertDialog>

            {/* UPDATE DIALOG */}
            {selectedUser && (
                <UserUpdateDialog
                    user={selectedUser}
                    open={openUpdateDialog}
                    onOpenChange={setOpenUpdateDialog}
                    onUpdate={fetchUsers}
                />
            )}
        </div>
    )
}