import {ChatType} from "../constants/ChatType.ts";
import {SocketEvent} from "../constants/SocketEvent.ts";
import Message from "../models/Message.ts";
import RoomChat from "../models/RoomChat.ts";
import {SocketResponse} from "../models/SocketResponse.ts";
import socketService from "../services/SocketService.ts";

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

    sendMessage(message: string, target: string) {
        socketService.send(SocketEvent.SendChat, {
            type: "people",
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
}

export default new ChatService();