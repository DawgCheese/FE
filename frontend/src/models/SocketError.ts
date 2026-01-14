import {SocketEvent} from "../constants/SocketEvent.ts";

export default interface SocketError{
    event: SocketEvent
    status: string,
    mes: string
}