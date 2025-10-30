import { lazy } from "react";

const router = [
  {
    path: "/",
    element: lazy(() => import("@/pages/SelectPage/SelectPage")),
  },
  {
    path: "/task",
    element: lazy(() => import("@/pages/Task/Task")),
  },
  {
    path: "/desktop",
    element: lazy(() => import("@/pages/Desktop/Desktop")),
  },
];

export default router;
