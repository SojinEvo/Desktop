import { FC, useContext, useEffect, useRef } from "react";

import Email from "./component/Email/Email";
import Message from "./component/Message/Message";
import Net from "./component/Net/Net";
import InfoBar from "./component/InfoBar/InfoBar";
import File from "@/pages/components/File/File";
import StartMenu from "./component/StartMenu/StartMenu";

import emailImg from "@/assets/email.png";
import netImg from "@/assets/net.png";
import messageImg from "@/assets/message.png";

import { NotificatioContext } from "@/Model/NotificatioContext";

import "./Content.less";

import type { fileType } from "@/types/public";

const Content: FC = () => {
  const files = [
    { name: "email", fileName: "邮件客户端", img: emailImg },
    { name: "net", fileName: "浏览器", img: netImg },
    { name: "message", fileName: "即时通信", img: messageImg },
  ];

  const hasNotificationShown = useRef(false);
  const { openNotification } = useContext(NotificatioContext);

  useEffect(() => {
    if (!hasNotificationShown.current) {
      hasNotificationShown.current = true
      openNotification('消息通知', '您有一条新的消息，请点击即时通信查看！', "topRight");
    }

  }, [])

  return (
      <div className="main">
        {files.map((ite) => {
          return (
            <File
              name={ite.name as fileType}
              fileName={ite.fileName}
              img={ite.img}
              key={ite.name}
            />
          );
        })}
        <StartMenu />
        <InfoBar />
        <Email />
        <Message />
        <Net />
      </div>
  );
};

export default Content;
