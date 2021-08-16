import React from "react";
import { Redirect } from "react-router-dom";
import dashboardRoutes from "./views/dashboard/dashboardRoutes";
import sessionsRoutes from "./views/sessions/sessionsRoutes";
import AuthGuard from "./auth/AuthGuard";
import chartsRoute from "./views/charts/chartsRoute";
import employeesRoutes from "./views/employees/employeesRoutes";
import consultatiosRoutes from "./views/consultations/consultatiosRoutes";
import prescriptionRoutes from "./views/prescription/prescriptionRoutes";
import reportsRoutes from "./views/reports/reportsRoutes";
import medicineRoutes from "./views/medicines/medicineRoutes";
import articleRoutes from "./views/articles/articleRoutes";
import familyMedicinesRoutes from "./views/family-medicines/familyMedicinesRoutes";
import familyRoutes from "./views/family/familyRoutes";
import presentationMedicineRoutes from "./views/presentation/presentationMedicineRoutes";
import calendarRoutes from "./views/calendar/calendarRoutes";
import anamnesiRoutes from "./views/anamnesi/anamnesiRoutes";

const redirectRoute = [
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/session/signin" />,
  },
];

const errorRoute = [
  {
    component: () => <Redirect to="/session/404" />,
  },
];

const routes = [
  ...sessionsRoutes,
  {
    path: "/",
    component: AuthGuard,
    routes: [
      ...dashboardRoutes,
      ...chartsRoute,
      ...employeesRoutes,
      ...consultatiosRoutes,
      ...prescriptionRoutes,
      ...redirectRoute,
      ...reportsRoutes,
      ...medicineRoutes,
      ...articleRoutes,
      ...familyMedicinesRoutes,
      ...presentationMedicineRoutes,
      ...familyRoutes,
      ...calendarRoutes,
      ...anamnesiRoutes,
      ...errorRoute,
    ],
  },
];

export default routes;
