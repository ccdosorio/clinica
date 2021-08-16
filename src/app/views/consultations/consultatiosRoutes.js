import React from "react";
import { lazy } from "react";
import { PrivateRoute } from "../../PrivateRoute";

const ConsultationWizard = lazy(() => import("./ConsultationWizard"));
const ConsultationDetail = lazy(() => import("./ConsultationDetail"));

const consultationsRoutes = [
  {
    path: "/employee/:idemployee/:id/consultation",
    component: () => <PrivateRoute component={ConsultationWizard} />,
  },
  {
    path: "/consultation/:id/detail",
    component: () => <PrivateRoute component={ConsultationDetail} />,
  },
];

export default consultationsRoutes;
