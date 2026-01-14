import {SocketEvent} from "../constants/SocketEvent.ts";

export interface SocketResponse<T> {
    data: T
    event: SocketEvent
    status: string;
}