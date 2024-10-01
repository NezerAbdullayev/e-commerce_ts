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

export interface FormItem {
    label: string;
    type: string;
    options?: Array<{ value: string; label: string }>;
}
