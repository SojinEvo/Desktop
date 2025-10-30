import { FC } from "react";

import TaskCard from "./component/TaskCard/TaskCard";

import { useNavigate } from "react-router-dom";

import "./SelectPage.less";

const SelectPage: FC = () => {
  const navigate = useNavigate();

  const taskConfig = [
    {
      name: "场景一",
      id: 1,
    },
    {
      name: "场景二",
      id: 2,
    },
    {
      name: "场景三",
      id: 3,
    },
    {
      name: "场景四",
      id: 4,
    },
    {
      name: "场景五",
      id: 5,
    },
    {
      name: "场景六",
      id: 6,
    },
  ];

  const taskClick = (id: number) => {
    if (id !== 1) return;
    navigate("/task");
  };

  return (
    <div className="selectPage">
      <div className="header">
        <h1>《xxx》</h1>
        <div className="text">
          <p style={{ textAlign: "center" }}>企业级平台</p>
          <p style={{ textIndent: "2em" }}>这是一个描述文本</p>
        </div>
      </div>
      <div className="main">
        <h2>选择场景</h2>
        <div className="container">
          {taskConfig.map((item, index) => {
            return (
              <div
                className="box"
                onClick={() => taskClick(item.id)}
                key={index}
              >
                <TaskCard title={item.name} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="footer">
        <p>@2025《xxx》-xxx平台 保留所有权利。</p>
      </div>
    </div>
  );
};

export default SelectPage;
