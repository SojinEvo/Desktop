import { FC } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

import Card from "@/pages/components/Card/Card";
import Scenario from "@/pages/components/Scenario/Scenario";

import "./Task.less";

const Task: FC = () => {
  const navigate = useNavigate();
  const start = () => {
    navigate("/desktop");
  };

  return (
    <div className="task">
      <div className="task-box">
        <div className="task-header">
          <h1>角色a</h1>
          <h1>客户大闯关</h1>
          <p>闯关 · 请开始</p>
        </div>

        <div className="task-main">
          <Card icon={""} title={"您的角色卡"} headerJustify={"center"}>
            <div>
              <Scenario>
                角色a如往常一样接受客户的咨询。但是今天似乎有一些客户不对劲...
              </Scenario>
            </div>
          </Card>
        </div>

        <div className="task-footer">
          <Button
            type="primary"
            style={{
              width: 200,
              height: 50,
              borderRadius: 10,
              fontSize: 24,
              backgroundColor: "#0078d4",
            }}
            onClick={start}
          >
            开始闯关
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Task;
