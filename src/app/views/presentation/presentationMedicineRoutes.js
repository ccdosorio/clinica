import React from "react";
import { lazy } from "react";
import { PrivateRoute } from "../../PrivateRoute";

const PresentationMedicineList = lazy(() =>
  import("./PresentationMedicineList")
);

const presentationMedicineRoutes = [
  {
    path: "/presentation/medicines/list",
    component: () => <PrivateRoute component={PresentationMedicineList} />,
  },
];

export default presentationMedicineRoutes;
