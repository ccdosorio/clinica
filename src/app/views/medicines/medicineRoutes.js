import React from "react";
import { lazy } from "react";
import { PrivateRoute } from "../../PrivateRoute";

const MedicineList = lazy(() => import("./MedicineList"));

const medicineRoutes = [
  {
    path: "/medicines/list",
    component: () => <PrivateRoute component={MedicineList} />,
  },
];

export default medicineRoutes;
