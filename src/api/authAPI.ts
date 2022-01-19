import axios, {AxiosResponse} from "axios"

//const DEV_VERSION = false;
//! DEV_VERSION ? "http://localhost:7542/2.0/" : "https://neko-back.herokuapp.com/2.0/";
export const instance = axios.create({
        baseURL: "http://localhost:7542/2.0/",
        withCredentials: true,
    }
)

// dal
export const authAPI = {
    checkUserInfo() {
        return instance.post<{}, AxiosResponse<LoginUserInfo>>(`auth/me`, {})
    },
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<{}, AxiosResponse<LoginUserInfo>>('auth/login', {email, password, rememberMe})
    },
    logout(){
        return instance.delete('/auth/me');
    }
}

//type
export type LoginUserInfo = {
    avatar?: string
    created: string
    deviceTokens: Array<any>
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    token: string
    tokenDeathTime: number
    updated: string
    verified: boolean
    __v: number
    _id: string
}
