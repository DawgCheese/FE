import Message from "@models/Message.ts";

export default interface GroupResponse {
    "id": 1514,
    "name": string,
    "own": string,
    "userList": [],
    "chatData": Message[]
}