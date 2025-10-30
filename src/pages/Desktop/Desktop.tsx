import { FC, Fragment } from "react";
import { Button } from "antd";

import Main from "@/pages/Main/Content";

import Footer from "@/pages/Footer/Footer";

import FileContext from "@/Model/FileContext";

import NotificatioContextProvider from "@/Model/NotificatioContext";
import LinkMask from "@/pages/components/LinkMask/LinkMask";

import "./Desktop.less";


const Desktop: FC = () => {

  const linkMaskConfig = {
    status: false,
    description: "恭喜完成客户信息录入环节！",
    linkText: "🎉 环节1完成",
    btnText: '继续'
  }

  const linkMaskClick = () => {

    
  };

  return (
    <Fragment>
      <FileContext>
        <div className="desktop">
          <NotificatioContextProvider >
            <Main />
          </NotificatioContextProvider>
          <Footer />
          <LinkMask linkStatus={"success"} config={linkMaskConfig} footerRender={<Button type="primary" className="btn" onClick={linkMaskClick}>{linkMaskConfig.btnText}</Button>} />
        </div>
      </FileContext>
    </Fragment>
  );
};

export default Desktop;
