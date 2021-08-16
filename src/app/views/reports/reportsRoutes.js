import React from "react";
import { lazy } from "react";
import { PrivateRoute } from "../../PrivateRoute";

const ReportConsultationMonthly = lazy(() =>
  import("./ReportConsultationMonthly")
);
const ReportConsultationFamily = lazy(() =>
  import("./ReportConsultationFamily")
);
const ReportConsultationDepartment = lazy(() =>
  import("./ReportConsultationDepartment")
);
const ReportConsultationGender = lazy(() =>
  import("./ReportConsultationGender")
);
const ReportConsultationDisease = lazy(() =>
  import("./ReportConsultationDisease")
);
const ReportPrescripton = lazy(() => import("./ReportPrescripton"));
const ReportPrescriptionInternal = lazy(() =>
  import("./ReportPrescriptionInternal")
);

const consultationsRoutes = [
  {
    path: "/report/consultation/monthly",
    component: () => <PrivateRoute component={ReportConsultationMonthly} />,
  },
  {
    path: "/report/consultation/family",
    component: () => <PrivateRoute component={ReportConsultationFamily} />,
  },
  {
    path: "/report/consultation/department",
    component: () => <PrivateRoute component={ReportConsultationDepartment} />,
  },
  {
    path: "/report/consultation/gender",
    component: () => <PrivateRoute component={ReportConsultationGender} />,
  },
  {
    path: "/report/consultation/disease",
    component: () => <PrivateRoute component={ReportConsultationDisease} />,
  },
  {
    path: "/report/prescription",
    component: () => <PrivateRoute component={ReportPrescripton} />,
    exact: true,
  },
  {
    path: "/report/prescription/internal",
    component: () => <PrivateRoute component={ReportPrescriptionInternal} />,
    exact: true,
  },
];

export default consultationsRoutes;
