export const navigations = [
  {
    name: "Inicio",
    description: "Lorem ipsum dolor sit.",
    type: "dropDown",
    icon: "i-Bar-Chart",
    sub: [
      {
        icon: "i-Clock-3",
        name: "Inicio",
        path: "/home",
        type: "link",
      },
    ],
  },
  {
    name: "Empleados",
    type: "dropDown",
    icon: "i-Business-Mens",
    sub: [
      {
        icon: "i-Add-User",
        name: "Agregar",
        path: "/employee/create",
        type: "link",
      },
      {
        icon: "i-Business-Mens",
        name: "Consultar",
        path: "/employee/list",
        type: "link",
      },
    ],
  },
  {
    name: "Familiares",
    type: "dropDown",
    icon: "i-Business-ManWoman",
    sub: [
      {
        icon: "i-Business-ManWoman",
        name: "Consultar",
        path: "/family/list",
        type: "link",
      },
    ],
  },
  {
    name: "Reportes",
    type: "dropDown",
    icon: "i-Folders",
    sub: [
      {
        icon: "i-File-Copy-2",
        name: "Consultas mensuales",
        path: "/report/consultation/monthly",
        type: "link",
      },
      {
        icon: "i-File-Copy-2",
        name: "Consultas familiares",
        path: "/report/consultation/family",
        type: "link",
      },
      {
        icon: "i-File-Copy-2",
        name: "Consultas por género",
        path: "/report/consultation/gender",
        type: "link",
      },
      {
        icon: "i-File-Copy-2",
        name: "Consultas por depto.",
        path: "/report/consultation/department",
        type: "link",
      },
      {
        icon: "i-File-Copy-2",
        name: "Consultas por enfer.",
        path: "/report/consultation/disease",
        type: "link",
      },
    ],
  },
  {
    name: "Recetas",
    type: "dropDown",
    icon: "i-First-Aid",
    sub: [
      {
        icon: "i-Receipt-4",
        name: "Recetas Internas",
        path: "/report/prescription/internal",
        type: "link",
      },
      {
        icon: "i-Receipt-4",
        name: "Recetas",
        path: "/report/prescription",
        type: "link",
      },
    ],
  },
  {
    name: "Medicamentos",
    type: "dropDown",
    icon: "i-Ambulance",
    sub: [
      {
        icon: "i-Medicine",
        name: "Medicamentos",
        path: "/medicines/list",
        type: "link",
      },
      {
        icon: "i-Medicine",
        name: "Artículos",
        path: "/articles/list",
        type: "link",
      },
      {
        icon: "i-Medicine",
        name: "Presentación de medicamentos",
        path: "/presentation/medicines/list",
        type: "link",
      },
      {
        icon: "i-Medicine",
        name: "Familia de medicamentos",
        path: "/family/medicines/list",
        type: "link",
      },
    ],
  },
  {
    name: "Citas",
    type: "dropDown",
    icon: "i-Calendar-4",
    sub: [
      {
        icon: "i-Calendar-3",
        name: "Agengar citas",
        path: "/calendar",
        type: "link",
      },
    ],
  },
  {
    name: "Anamnesis",
    type: "dropDown",
    icon: "i-Medicine",
    sub: [
      {
        icon: "i-Medicine",
        name: "Consultar",
        path: "/anamnesi/list",
        type: "link",
      },
    ],
  },
];
