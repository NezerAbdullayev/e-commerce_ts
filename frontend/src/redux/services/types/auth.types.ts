export interface Login {
    email: string;
    password: string;
}
export interface Signup extends Login {
    name: string;
}

export interface Auth extends Login {
    name?: string;
}

export interface ErrorRes {
    error: {
        error: string;
        type: string;
    };
}
