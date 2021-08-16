import React from "react";
import { lazy } from "react";
import { PrivateRoute } from "../../PrivateRoute";

const AnamnesiList = lazy(() => import("./AnamnesiList"));

const anamnesiRoutes = [
  {
    path: "/anamnesi/list",
    component: () => <PrivateRoute component={AnamnesiList} />,
  },
];

export default anamnesiRoutes;
