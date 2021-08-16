import React from "react";
import { lazy } from "react";
import { PrivateRoute } from "../../PrivateRoute";

const EmployeeList = lazy(() => import("./EmployeeList"));
const EmployeeAdd = lazy(() => import("./EmployeeAdd"));
const EmployeeEdit = lazy(() => import("./EmployeeEdit"));

const employeesRoutes = [
  {
    path: "/employee/create",
    component: () => <PrivateRoute component={EmployeeAdd} />,
  },
  {
    path: "/employee/list",
    component: () => <PrivateRoute component={EmployeeList} />,
  },
  {
    path: "/employee/:id/edit",
    component: () => <PrivateRoute component={EmployeeEdit} />,
  },
];

export default employeesRoutes;
