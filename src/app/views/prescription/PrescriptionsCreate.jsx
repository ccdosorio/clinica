import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Prescription from "./Prescription";
import PrescriptionInternal from "./PrescriptionInternal";
import { NotificationContainer } from "react-notifications";

import Https from "../../api/Https";
import PrescriptionList from "./PrescriptionList";
import PrescriptionInternalList from "./PrescriptionInternalList";

const PrescriptionsCreate = (props) => {
  const [diagnostic, setDiagnostic] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [articles, setArticles] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [prescriptionsInternals, setPrescriptionsInternals] = useState([]);

  const getDiagnostics = async () => {
    let body = {
      idConsultation: props.match.params.idconsultation,
      select: true,
    };
    const res = await Https.post("consulta/get/diagnostics", body);
    setDiagnostic(res);
  };

  const getMedicines = async () => {
    let body = { select: true };
    const res = await Https.post("consulta/medicines", body);
    setMedicines(res);
  };

  const getArticles = async () => {
    let body = { select: true };
    const res = await Https.post("consulta/articles", body);
    setArticles(res);
  };

  const getPrescriptions = async () => {
    let body = { idconsultation: props.match.params.idconsultation };
    const res = await Https.post("consulta/get/prescriptions", body);
    setPrescriptions(res);
  };

  const getPrescriptionsInternals = async () => {
    let body = { idconsultation: props.match.params.idconsultation };
    const res = await Https.post("consulta/get/prescriptions/internals", body);
    setPrescriptionsInternals(res);
  };

  useEffect(() => {
    getDiagnostics();
    getMedicines();
    getArticles();
    getPrescriptions();
    getPrescriptionsInternals();
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-lg-12">
          <Link
            to={`/invoice/prescription/${props.match.params.idconsultation}`}
          >
            <button className="btn  btn-info m-1 footer-delete-right">
              Generar Receta
            </button>
          </Link>
          <Link
            to={`/employee/372/${props.match.params.idconsultation}/consultation#step4`}
          >
            <button
              type="submit"
              className="btn  btn-outline-secondary m-1 footer-delete-right"
            >
              Regresar a Consulta
            </button>
          </Link>
        </div>
      </div>
      <section className="basic-action-bar">
        <div className="row">
          <Prescription
            diagnostics={diagnostic}
            medicines={medicines}
            idconsultation={props.match.params.idconsultation}
            getPrescriptions={getPrescriptions}
          />
          <PrescriptionInternal
            diagnostics={diagnostic}
            articles={articles}
            idconsultation={props.match.params.idconsultation}
            getPrescriptions={getPrescriptionsInternals}
          />
        </div>
        <NotificationContainer />
      </section>
      <section className="basic-action-bar">
        <div className="row">
          <PrescriptionList prescriptions={prescriptions} title="Recetas" />
          <PrescriptionInternalList
            prescriptions={prescriptionsInternals}
            title="Recetas Creadas"
          />
        </div>
      </section>
    </div>
  );
};

export default PrescriptionsCreate;
