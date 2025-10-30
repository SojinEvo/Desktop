import { FC, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { Spin } from "antd";
import "@ant-design/v5-patch-for-react-19";

import router from "@/router/config";

import "./App.less";

const APP: FC = () => {
  return (
    <Router>
      <Routes>
        {router.map((item) => {
          return (
            <Route
              path={item.path}
              element={
                <Suspense
                  fallback={
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Spin size="large" />
                    </div>
                  }
                >
                  {<item.element />}
                </Suspense>
              }
            ></Route>
          );
        })}
      </Routes>
    </Router>
  );
};

export default APP;
