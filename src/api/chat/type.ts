export interface ChatType {
    userId: string;
    question: string;
    sceneId: string;
    role: string;
};

export interface ChatHistoryType extends Omit<ChatType, "question"> { };

export interface UpdateChatType extends Omit<ChatType, "sceneId"> { };

export interface historyContext {
    role: string;
    assistant: string;
    content: string;
    createTime: string;
}

export interface historyType {
    content: string;
    role: string;
}

export interface ChatHistoryData {
    company: string;
    history: historyType[];
    roleName: string;
    scene: string;
    userId: string;
    sceneRole:string
}

export interface ChatData extends Omit<historyContext, "assistant"> { }

export interface ChatRes {
    scene: string;
    messages: ChatData[];
    status: string;
    history: string;
}

export interface ChatHistoryRes extends Omit<ChatRes, "messages"> {
    histories: ChatHistoryData[];
    scene:string;
    userId:string;

}