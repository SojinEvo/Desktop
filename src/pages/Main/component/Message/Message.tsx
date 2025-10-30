import { FC, Fragment, useEffect, useState } from "react";
import { Empty, Tabs } from "antd";

import FileTask from "@/pages/components/FileTask/FileTask";
import Chat from "@/pages/components/Chat/Chat";

import MessageImg from "@/assets/message.png";
// import { chatHistory } from "@/api/chat/chat";

import type { ChatHistoryData } from "@/api/chat/type";

import "./Message.less";

const Message: FC = () => {
  const [messageDate, setMessageData] = useState<Partial<ChatHistoryData>[]>(
    []
  );
  const getChat = async (userId: string, sceneId: string, role: string) => {
    // 请求历史对话聊天内容接口逻辑
    // const { data } = await chatHistory({ userId, sceneId, role });
    // console.log("data", data);
    // const res = data.histories.reduce(
    //   (pre: any, cur: any) => pre && pre.concat(cur),
    //   []
    // );
    const mock = [
      { roleName: "用户1", sceneRole: "1", company: "a公司" },
      { roleName: "用户2", sceneRole: "2" },
    ];
    setMessageData(mock);
  };

  const change = (item: string) => {
    console.log("item", item);
  };

  const emptyEle = (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Empty description="无用户数据"></Empty>
    </div>
  );

  const tabsEle = (
    <Tabs
      className={"Message"}
      style={{ width: "100%", height: "100%" }}
      defaultActiveKey="key"
      tabPosition={"left"}
      onChange={change}
      items={messageDate?.map((item) => {
        return {
          label: `${item.roleName}`,
          key: `${item.sceneRole}`,
          children: (
            <div className="communication">
              <div className="header">{item.roleName}</div>
              <div className="content">
                <div
                  style={{
                    width: "95%",
                    height: "100%",
                    margin: "0 auto",
                    position: "relative",
                  }}
                >
                  <Chat />
                </div>
              </div>
            </div>
          ),
        };
      })}
    ></Tabs>
  );

  useEffect(() => {
    getChat("1", "1", "");
  }, []);

  return (
    <Fragment>
      <FileTask
        icon={MessageImg}
        fileName={"message"}
        title={"即时消息"}
        offset={{ left: 70, top: 100 }}
        size={{ width: 700, height: 500 }}
      >
        {messageDate?.length > 0 ? tabsEle : emptyEle}
      </FileTask>
    </Fragment>
  );
};

export default Message;
