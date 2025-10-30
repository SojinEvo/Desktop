import request from "@/utils/axios/request";

import type { ChatHistoryRes, ChatHistoryType, ChatRes, UpdateChatType } from "./type";
import type { ResponseData } from "@/utils/axios/axios";

// 获得聊天
export const chatHistory = (query: ChatHistoryType): Promise<ResponseData<ChatHistoryRes>> => request.get('/api/sceneOne/history', query);

// 提交聊天
export const updateChat = (params: UpdateChatType): Promise<ResponseData<ChatRes>> => request.post('/api/sceneOne', params);