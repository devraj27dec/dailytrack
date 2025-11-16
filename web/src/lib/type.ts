

export interface UserData {
    id?: number;
    username:string;
    email:string;
    password:string
}

export interface TaskData {
    id?: number;
    title: string;
    description?: string;
    userId?: number;
}   


export interface LoginCredentials {
    email: string;
    password: string;
}