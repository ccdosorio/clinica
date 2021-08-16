import React from "react";
import { lazy } from "react";
import { PrivateRoute } from "../../PrivateRoute";

const PrescriptionsCreate = lazy(() => import("./PrescriptionsCreate"));
const PrescriptionInvoice = lazy(() => import("./PrescriptionInvoice"));
const PrescriptionDetail = lazy(() => import("./PrescriptionDetail"));
const PrescriptionInternalDetail = lazy(() =>
  import("./PrescriptionInternalDetail")
);

const prescriptionRoutes = [
  {
    path: "/prescription/:idemployee/:idconsultation",
    component: () => <PrivateRoute component={PrescriptionsCreate} />,
  },
  {
    path: "/invoice/prescription/:idconsultation",
    component: () => <PrivateRoute component={PrescriptionInvoice} />,
  },
  {
    path: "/prescription-detail/:id/:idconsultation",
    component: () => <PrivateRoute component={PrescriptionDetail} />,
    exact: true,
  },
  {
    path: "/prescription-detail/internal/:id/:idconsultation",
    component: () => <PrivateRoute component={PrescriptionInternalDetail} />,
    exact: true,
  },
];

export default prescriptionRoutes;
