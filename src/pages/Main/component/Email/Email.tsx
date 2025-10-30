import { FC } from "react";
import FileTask from "@/pages/components/FileTask/FileTask";

import Email from "@/assets/email.png";

import "./Email.less";
import { Empty, Tabs } from "antd";

const Emile: FC = () => {
  const list: Record<string, string>[] = [
    { name: "用户a", key: "a", content: "这是a的mock数据" },
    { name: "用户b", key: "b", content: "这是b的mock数据" },
  ];
  const size = { width: 900, height: 560 };

  const empty = (
    <div className="email">
      <div className="list">
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="收件箱为空" />
      </div>
      <div className="show">数据为空</div>
    </div>
  );

  return (
    <FileTask
      fileName={"email"}
      title={"邮件客户端"}
      icon={Email}
      offset={{ left: 30, top: 100 }}
      size={size}
    >
      {list.length > 0 ? (
        <Tabs
          className={"Message"}
          style={{ width: "100%", height: "100%" }}
          defaultActiveKey="key"
          tabPosition={"left"}
          items={list?.map((item, index) => {
            return {
              label: `${item.name}`,
              key: `${index}`,
              children: <div className="content">{item.content}</div>,
            };
          })}
        ></Tabs>
      ) : (
        empty
      )}
    </FileTask>
  );
};

export default Emile;
