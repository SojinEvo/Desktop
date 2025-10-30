import { FC, Fragment } from "react";
import { Button, Form, Input } from "antd";

import FileTask from "@/pages/components/FileTask/FileTask";

import NetImg from "@/assets/net.png";
import ArrowLImg from "@/assets/leftarrow.png";
import ArrowRImg from "@/assets/rightarrow.png";
import ReloadImg from "@/assets/reload.png";
import CollectImg from "@/assets/collect.png";

import "./Net.less";

const headerHeight = 55;

const Net: FC = () => {
  const [form] = Form.useForm();
  console.log("form", form);

  const submit = () => {
    console.log("0-0-0-0");
  };

  return (
    <Fragment>
      <FileTask
        icon={NetImg}
        fileName={"net"}
        title={"浏览器"}
        offset={{ left: 10, top: 10 }}
        size={{ width: 600, height: 500 }}
      >
        <Form
          form={form}
          name="form"
          layout="vertical"
          style={{ height: "100%" }}
        >
          <div className="netContainer">
            <div className="header" style={{ height: headerHeight }}>
              <div className="header-left">
                <i
                  className="arrow-l"
                  style={{ backgroundImage: `url(${ArrowLImg})` }}
                ></i>
                <i
                  className="arrow-r"
                  style={{ backgroundImage: `url(${ArrowRImg})` }}
                ></i>
                <i
                  className="reload"
                  style={{ backgroundImage: `url(${ReloadImg})` }}
                ></i>
              </div>
              <div className="header-mid">
                <Form.Item style={{ margin: 0 }}>
                  <Input defaultValue="https://customer.baidu.com/userInfo"></Input>
                </Form.Item>
              </div>
              <div className="header-right">
                <i
                  className="collect"
                  style={{ backgroundImage: `url(${CollectImg})` }}
                ></i>
              </div>
            </div>
            <div
              className="body"
              style={{ height: `calc(100% - ${headerHeight}px)` }}
            >
              <div className="container">
                <div className="title">
                  <h2>客户信息登记</h2>
                  <span>某产品事业部</span>
                </div>
                <div className="content">
                  <Form.Item
                    name={"username"}
                    label="客户信息"
                    rules={[{ required: true, message: "请输入客户消息" }]}
                  >
                    <Input
                      placeholder="请输入客户信息"
                      style={{ height: "40px" }}
                    ></Input>
                  </Form.Item>
                  <Form.Item
                    name={"message"}
                    label="联系方式"
                    rules={[{ required: true, message: "请输入联系方式" }]}
                  >
                    <Input
                      placeholder="请输入手机号和邮箱"
                      style={{ height: "40px" }}
                    ></Input>
                  </Form.Item>
                </div>
                <div className="submit">
                  <Button
                    type="primary"
                    style={{ width: "100%", height: "50px" }}
                    onClick={() => submit}
                  >
                    提交客户信息
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </FileTask>
    </Fragment>
  );
};

export default Net;
