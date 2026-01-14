import {SocketAction} from "../constants/SocketAction.ts";
import {SocketEvent} from "../constants/SocketEvent.ts";

export default interface SocketRequest<T>{
    action: SocketAction
    data: {
        data: T
        event: SocketEvent
    }
}