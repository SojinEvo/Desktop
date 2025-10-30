import { FC, Fragment, useContext, useEffect, useRef } from "react";

import { FileContext } from "@/Model/FileContext";

import Mask from "@/pages/components/Mask/Mask";
import List from "@/pages/components/List/List";
import ListBox from "./component/ListBox/ListBox";

import yesImg from "@/assets/yes.png";
import warnImg from "@/assets/warn.png";
import safetyImg from "@/assets/safety.png";

import "./StartMenu.less";

const StartMenu: FC = () => {
  const { startMenuStatus, updateStartMenuStatus } = useContext(FileContext);

  const menuRef = useRef(null);

  useEffect(() => {
    document
      .getElementsByClassName("main")[0]
      .addEventListener("mousedown", mouseEvent);
    return () => {
      document
        .getElementsByClassName("main")[0]
        .removeEventListener("mousedown", mouseEvent);
    };
  });

  const mouseEvent = (event: { target: EventTarget | null }) => {
    const menuEle = menuRef.current as HTMLDivElement | null;
    if (menuEle && !menuEle?.contains(event.target as null)) {
      updateStartMenuStatus(false);
    }
  };

  const text =
    "你是角色啊，某公司产品事业部销售专员，负责维护客户联系方式，解答客户问题并录入客户数据。";

  const workData = [
    "通过邮件或IM与客户沟通",
    "解答客户关于产品的问题",
    "收集客户联系方式并录入系统",
    "注意识别可疑文件和链接",
  ];

  const safetyData = [
    "不要轻易打开未知来源的附件",
    "注意检查文件后缀名（.exe, .link等可疑格式）",
    "警惕要求安装特殊软件才能查看的文档",
    "遇到可疑情况及时举报",
  ];

  const MenuChildren = (
    <div className="menuChildren">
      <ListBox
        title={<h4>角色设定</h4>}
        content={<p style={{ fontSize: "13px" }}>{text}</p>}
      ></ListBox>

      <ListBox
        title={<h2 style={{ color: "#FFFFFF" }}>工作流程</h2>}
        content={<List listData={workData} icon={yesImg} />}
      ></ListBox>

      <ListBox
        title={<h4>安全提示</h4>}
        content={<List listData={safetyData} icon={warnImg} />}
      ></ListBox>
    </div>
  );

  return (
    <Fragment>
      <div
        className="menu"
        style={{
          display: startMenuStatus ? "block" : "none",
        }}
        ref={menuRef}
      >
        <Mask
          title={<h3>安全培训任务</h3>}
          children={MenuChildren}
          size={{ width: 360, height: 500 }}
          icon={safetyImg}
        ></Mask>
      </div>
    </Fragment>
  );
};

export default StartMenu;
