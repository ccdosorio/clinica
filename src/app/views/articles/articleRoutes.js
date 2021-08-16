import React from "react";
import { lazy } from "react";
import { PrivateRoute } from "../../PrivateRoute";

const ArticleList = lazy(() => import("./ArticleList"));

const articleRoutes = [
  {
    path: "/articles/list",
    component: () => <PrivateRoute component={ArticleList} />,
  },
];

export default articleRoutes;
