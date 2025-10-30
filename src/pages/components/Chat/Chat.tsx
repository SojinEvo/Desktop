import React from "react";
import { Flex, type GetProp } from "antd";

import { UserOutlined } from "@ant-design/icons";
import { Bubble, Sender, useXAgent, useXChat } from "@ant-design/x";

const roles: GetProp<typeof Bubble.List, "roles"> = {
  ai: {
    placement: "start",
    avatar: { icon: <UserOutlined />, style: { background: "#fde3cf" } },
  },
  local: {
    placement: "end",
    avatar: { icon: <UserOutlined />, style: { background: "#87d068" } },
  },
};

const Chat = () => {
  const [content, setContent] = React.useState("");
  // 可使用props 根据角色id，请求接口获得当前用户的对话

  // Agent for request
  const [agent] = useXAgent<string, { message: string }, string>({
    request: async ({ message }, { onSuccess, onUpdate }) => {
      const fullContent = `mock 数据: ${message}`;
      let currentContent = "";

      const id = setInterval(() => {
        currentContent = fullContent.slice(0, currentContent.length + 2);
        onUpdate(currentContent);
        if (currentContent === fullContent) {
          clearInterval(id);
          onSuccess([fullContent]);
        }
      }, 100);
    },
  });

  // Chat messages
  const { onRequest, messages } = useXChat({
    agent,
    defaultMessages: [{ message: "欢迎来到AI智能聊天", status: "updating" }],
  });

  console.log("message", messages);

  return (
    <Flex vertical gap="middle">
      <Bubble.List
        roles={roles}
        style={{ maxHeight: 300 }}
        items={messages.map(({ id, message, status }) => ({
          key: id,
          role: status === "local" ? "local" : "ai",
          content: message,
        }))}
      />
      <Sender
        style={{ position: "absolute", bottom: 0 }}
        loading={agent.isRequesting()}
        value={content}
        onChange={setContent}
        onSubmit={(nextContent) => {
          onRequest(nextContent);
          setContent("");
        }}
      />
    </Flex>
  );
};

export default Chat;
