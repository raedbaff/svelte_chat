import type { User } from "$lib/session";

export interface Message {
    _id:string,
    Sender:string,
    Receiver:string,
    Content:string,
    timestamp:Date
}