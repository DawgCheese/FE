import {SocketEvent} from "@constants/SocketEvent.ts";
import Message from "@models/Message.ts";
import RoomChat from "@models/RoomChat.ts";
import {SocketResponse} from "@models/SocketResponse.ts";
import socketService from "@services/SocketService.ts";
import GroupResponse from "@models/GroupResponse.ts";
import {ChatType} from "@constants/ChatType.ts";

class ChatService {
    async findPeopleChats(name: string, page: number = 1) {
        return new Promise<Message[]>((resolve, reject) => {
            socketService.send(SocketEvent.GetPeopleMessage,
                {
                    page,
                    name
                },
                {
                    onSuccess: (data: SocketResponse<never>) => {
                        const messages = data.data as Message[]
                        resolve(messages)
                    },
                    onError: data => {
                        reject(data)
                    }
                })
        })
    }

    sendMessage(message: string, target: string, type: ChatType) {
        socketService.send(SocketEvent.SendChat, {
            type: type,
            mes: message,
            to: target

        })
    }

    async findRoomChat() {
        return new Promise<RoomChat[]>((resolve, reject) =>
            socketService.send(SocketEvent.GetUserList, undefined, {
                onError: error => {
                    reject(error)
                },
                onSuccess: ({data}: SocketResponse<any[]>) => {
                    resolve(data.map((d) => {
                        return {name: d.name, type: d.type, actionTime: new Date(d.actionTime)} as RoomChat
                    }))
                }
            })
        )
    }

    async findRoomChats(name: string, page: number = 1) {
        return new Promise<GroupResponse>((resolve, reject) => {
            socketService.send(SocketEvent.GetRoomMessage,
                {
                    page,
                    name
                },
                {
                    onSuccess: (data: SocketResponse<never>) => {
                        const messages = data.data as GroupResponse
                        resolve(messages)
                    },
                    onError: data => {
                        reject(data)
                    }
                })
        })
    }

    async joinRoom(name: string) {
        return new Promise<GroupResponse>((resolve, reject) => {
            socketService.send(SocketEvent.JoinRoom,
                {
                    name: name
                },
                {
                    onSuccess: (data: SocketResponse<never>) => {
                        const messages = data.data as GroupResponse
                        resolve(messages)
                    },
                    onError: data => {
                        reject(data)
                    }
                })
        })
    }

    async createGroup(name: string){
        return new Promise<GroupResponse>((resolve, reject) => {
            socketService.send(SocketEvent.CreateRoom,
                {
                    name: name
                },
                {
                    onSuccess: (data: SocketResponse<never>) => {
                        const messages = data.data as GroupResponse
                        resolve(messages)
                    },
                    onError: data => {
                        reject(data)
                    }
                })
        })
    }
}

export default new ChatService();