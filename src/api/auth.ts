import { SigninDto, SigninResponse, SignupDto } from '@/types/auth'
import { axiosInstance } from './axios'

export const postSignup = async (body: SignupDto): Promise<string> => {
    const { data } = await axiosInstance.post(`/user/signup`, body)
    return data
}

export const postSignin = async (body: SigninDto): Promise<SigninResponse> => {
    const { data } = await axiosInstance.post(`/user/login`, body)
    return data
}
