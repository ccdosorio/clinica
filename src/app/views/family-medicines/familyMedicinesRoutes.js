import React from "react";
import { lazy } from "react";
import { PrivateRoute } from "../../PrivateRoute";

const FamilyList = lazy(() => import("./FamilyList"));

const familyMedicinesRoutes = [
  {
    path: "/family/medicines/list",
    component: () => <PrivateRoute component={FamilyList} />,
  },
];

export default familyMedicinesRoutes;
