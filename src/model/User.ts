export interface UserResponse {
    id: number
    email: string
    firstName: string
    lastName: string
    roleName: string
    active: boolean
}

export interface RoleResponse {
    id: number
    name: string
}
