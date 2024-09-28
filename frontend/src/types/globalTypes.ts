export interface LoginResponce {
    email: string;
    password: string;
}

export interface Signup extends LoginResponce {
    name: string;
}
