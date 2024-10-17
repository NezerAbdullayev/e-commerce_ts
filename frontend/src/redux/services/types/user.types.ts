export interface User {
    _id: string;
    name: string;
    email: string;
}

export interface UserResponse {
    users: User[];
    currentPage: number;
    totalPages: number;
    totalUsers: number;
}
