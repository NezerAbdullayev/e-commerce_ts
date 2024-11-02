export interface Login {
    email: string;
    password: string;
}
export interface Signup extends Login {
    name: string;
}

export interface AuthResponse {
    _id: string;
    role: string;
    name: string;
    email: string;
}

export interface Auth extends Login {
    name?: string;
}
