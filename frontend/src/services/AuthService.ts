import {SocketEvent} from "../constants/SocketEvent.ts";
import LoginRequest from "../models/LoginRequest.ts";
import RegisterRequest from "../models/RegisterRequest.ts";
import {SocketResponse} from "../models/SocketResponse.ts";
import User from "../models/User.ts";
import socketService from "../services/SocketService.ts";


type CheckResponse = {
    status: boolean
}
class AuthService {
    async login(loginRequest: LoginRequest) {
        return new Promise<User>((resolve, reject) => {
            socketService.send(SocketEvent.Login, loginRequest, {
                onSuccess: (data: SocketResponse<never>) => {
                    const user: User = {name: loginRequest.user, code: data.data["RE_LOGIN_CODE"]} as User
                    resolve(user)
                },
                onError: data => {
                    reject(data)
                }
            })
        })
    }
    async reLogin(user: User) {
        return new Promise<User>((resolve, reject) => {
            socketService.send(SocketEvent.ReLogin, {
                user: user.name,
                code: user.code
            }, {
                onSuccess: (data) => {
                    console.log(data)
                    resolve({name: user.name, code: data.data["RE_LOGIN_CODE"]} as User)
                },
                onError: data => reject(data)
            })
        })
    }

    async register(request: RegisterRequest){
        return new Promise<string>((resolve, reject) => {
            socketService.send(SocketEvent.Register, request,{
                onSuccess: (data) => {
                    resolve(data.data)
                },
                onError: data => reject(data)
            })
        })
    }

    async logout() {
        return new Promise<string>((resolve, reject) => {
            socketService.send(SocketEvent.Logout,undefined,{
                onSuccess: (data) => {
                    resolve(data.data)
                },
                onError: data => reject(data)
            })
        })
    }


    async checkActivity(target: string) {
        return new Promise<CheckResponse>((resolve, reject) => {
            socketService.send(SocketEvent.CheckUser,{user: target},{
                onSuccess: (data) => {
                    resolve(data.data)
                },
                onError: data => reject(data)
            })
        })
    }
}

export default new AuthService();