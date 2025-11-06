export interface Auth {
    id: string
    password: string
}

export type SignupDto = Auth
export type SigninDto = Auth

export interface SigninResponse {
    accessToken: string
    id: string
}
