import React from "react";
import { lazy } from "react";
import { authRoles } from "app/auth/authRoles";
import { PrivateRoute } from "../../PrivateRoute";

const Dashboard1 = lazy(() => import("./dashboard1/Dashboard1"));

const Dashboard2 = lazy(() => import("./dashboard2/Dashboard2"));

const dashboardRoutes = [
  {
    path: "/home",
    component: () => <PrivateRoute component={Dashboard1} />,
  },
  {
    path: "/dashboard/v2",
    component: Dashboard2,
    auth: authRoles.admin,
  },
];

export default dashboardRoutes;
