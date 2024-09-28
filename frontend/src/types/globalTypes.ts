export interface LoginResponse {
    email: string;
    password: string;
}

export interface Signup extends LoginResponse {
    name: string;
}
