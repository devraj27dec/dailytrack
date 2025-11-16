import type { LoginCredentials, TaskData, UserData } from "@/lib/type"
import { api, getAuthToken } from "./client"

const token = getAuthToken();


export const Register = async(data: UserData) => {
    const response = await api.post('/auth/register' , data)
    return await response.data
}

export const Login = async (credentials:LoginCredentials) => {
    const response = await api.post('/auth/login', credentials)
    return await response.data
}


export const CreateTask = async (data: TaskData) => {
    const response = await api.post('/api/v1/task/create' , data ,{
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
    })
    return await response.data
}


export const GetAllTasks = async () => {
    const response = await api.get('/api/v1/task/tasks' , {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
    })
    return await response.data
}

export const GetTask = async (id:string) => {
    const response = await api.get(`/api/v1/task/task/${id}` , {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
    })
    return await response.data
}   

export const DeleteTask = async (id:string) => {
    const response = await api.delete(`/api/v1/task/delete/${id}` , {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
    })
    return await response.data
}       