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

export interface ErrorRes {
    error: {
        error: string;
        type: string;
    };
}
// {_id: '67052d407a3ec4123a641faa',
//  name: 'nezer', email: 'nezer@g', role: 'customer'}
