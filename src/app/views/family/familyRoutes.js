import React from "react";
import { lazy } from "react";
import { PrivateRoute } from "../../PrivateRoute";

const FamilyEditor = lazy(() => import("./FamilyEditor"));
const FamilyList = lazy(() => import("./FamilyList"));

const familyRoutes = [
  {
    path: "/family",
    component: () => <PrivateRoute component={FamilyEditor} />,
    exact: true,
  },
  {
    path: "/family/list",
    component: () => <PrivateRoute component={FamilyList} />,
    exact: true,
  },
];

export default familyRoutes;
