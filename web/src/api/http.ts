import type { UserData } from "@/lib/type"
import { api } from "./client"


export const Register = async(data: UserData) => {
    const response = await api.post('/auth/register' , data)
    return await response.data
}

export const Login = async (email:string , password:string) => {
    const response = await api.post('/auth/login', {email , password})
    return await response.data
}

