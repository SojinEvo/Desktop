import { FC, Fragment } from "react";

import { ConfigProvider, Flex, Progress } from "antd";
import { UseTimer } from "@/hooks/system";

import Mask from "@/pages/components/Mask/Mask";
import safetyImg from "@/assets/safety.png";

import "./InfoBar.less";

const theme = {
  components: {
    Progress: {
      colorText: "#fff",
    },
  },
};

const userConfig = { name: "角色a", link: "第1环节/共5环节" };

const InfoBar: FC = () => {
  const size = { width: 300, height: 230 };
  const bgStyle = {
    boxShadow: "0 0 15px rgba(0, 0, 0, 0.3)",
    background: "rgba(0, 0, 0, 0.7)",
  };

  const { time } = UseTimer();

  const InfoChildren = (
    <div className="infoBox">
      <div className="progres-box">
        <div className="progress">
          <span className="text">训练进度</span>
          <span className="num">0/5</span>
        </div>

        <Flex vertical gap="small">
          <ConfigProvider theme={theme}>
            <Progress
              className="Progress"
              percent={30}
              size="small"
              trailColor="rgba(255,255,255,0.2)"
            />
          </ConfigProvider>
        </Flex>
      </div>

      <div className="userInfo">
        <span className="title">
          当前角色：<span className="content">{userConfig.name}</span>
        </span>
        <span className="title">
          当前环节：<span className="content">{userConfig.link}</span>
        </span>
      </div>

      <div className="timer">
        <i className="icon"></i>
        <span>用时</span>
        <span className="text">{time}</span>
      </div>
    </div>
  );

  return (
    <Fragment>
      <div className="infoBar">
        <Mask
          title={<h4>企业级应用</h4>}
          icon={safetyImg}
          children={InfoChildren}
          size={size}
          bgStyle={bgStyle}
        />
      </div>
    </Fragment>
  );
};

export default InfoBar;
