import {ChatType} from "../constants/ChatType.ts";

export default  interface Message{
    id: number;
    name: string;
    to: string;
    mes: string;
    createAt: string;
    type: ChatType;
}