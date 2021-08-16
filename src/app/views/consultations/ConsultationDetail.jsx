import React, { useState, useEffect } from "react";
import Https from "../../api/Https";
import { Breadcrumb, Loading } from "@gull";
import { NotificationContainer } from "react-notifications";
import moment from "moment";
import swal from "sweetalert";
import ConsultationSymptomsList from "./ConsultationSymptomsList";
import ConsultationSpecialtyList from "./ConsultationSpecialtyList";
import ConsultationDiagnosisList from "./ConsultationDiagnosisList";
import ConsultationExamList from "./ConsultationExamList";
import ConsultationFormEdit from "./ConsultationFormEdit";
import PrescriptionList from "../prescription/PrescriptionList";
import PrescriptionInternalList from "../prescription/PrescriptionInternalList";

const ConsultationDetail = (props) => {
  const [consultation, setConsultation] = useState({});
  const [symptoms, setSymptoms] = useState({});
  const [specialties, setSpecialties] = useState({});
  const [diagnostics, setDiagnostics] = useState([]);
  const [exams, setExams] = useState([]);
  const [editValues, setEditValues] = useState(false);
  const [formEdit, setFormEdit] = useState({});
  const [prescriptions, setPrescriptions] = useState([]);
  const [prescriptionsInternals, setPrescriptionsInternals] = useState([]);

  const getSymptoms = async () => {
    let body = { idConsultation: props.match.params.id };
    const res = await Https.post("consulta/get/symptoms", body);
    setSymptoms(res);
  };

  const getSpecialties = async () => {
    let body = { idConsultation: props.match.params.id };
    const res = await Https.post("consulta/get/specialty", body);
    setSpecialties(res);
  };

  const getDiagnostics = async () => {
    let body = { idConsultation: props.match.params.id, select: false };
    const res = await Https.post("consulta/get/diagnostics", body);
    setDiagnostics(res);
  };

  const getExams = async () => {
    let body = { idConsultation: props.match.params.id };
    const res = await Https.post("consulta/get/exam", body);
    setExams(res);
  };

  const getPrescriptions = async () => {
    let body = { idconsultation: props.match.params.id };
    const res = await Https.post("consulta/get/prescriptions", body);
    setPrescriptions(res);
  };

  const getPrescriptionsInternals = async () => {
    let body = { idconsultation: props.match.params.id };
    const res = await Https.post("consulta/get/prescriptions/internals", body);
    setPrescriptionsInternals(res);
  };

  const getConsultationDetail = async () => {
    let body = { idconsultation: props.match.params.id };
    const res = await Https.post("consulta/detail", body);
    setConsultation(res[0]);
    setFormEdit({
      idconsultation: res[0].idconsulta,
      iddoctor: res[0].idmedico,
      temperature: res[0].temperatura,
      oxygen: res[0].oxigeno,
      idclinic: res[0].idclinica,
      blood_pressure: res[0].presionArterial,
      weight: res[0].peso,
      height: res[0].altura,
      heart_rate: res[0].frecuenciaCardiaca,
      respiratory_rate: res[0].frecuenciaRespiratoria,
      abdominal_circumference: res[0].circunferenciaAbdominal,
      next_consultation: res[0].proximaConsulta,
    });
  };

  const handleChange = async (event) => {
    setFormEdit({
      ...formEdit,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await Https.post("consulta/edit", formEdit);
    res.code === 200 && swal("¡Exitoso!", res.message, "success");
    setEditValues(false);
    await getConsultationDetail();
  };

  useEffect(() => {
    getSymptoms();
    getSpecialties();
    getDiagnostics();
    getExams();
    getPrescriptions();
    getPrescriptionsInternals();
    getConsultationDetail();
  }, []);

  return (
    <div>
      <Breadcrumb
        routeSegments={[
          {
            name: "Regresar",
            path: `/employee/${consultation.idempleado}/edit`,
          },
          { name: "Detalle de Consulta" },
        ]}
      ></Breadcrumb>
      {Object.keys(consultation).length === 0 ? (
        <Loading></Loading>
      ) : (
        <>
          <div className="card-title d-flex align-items-center">
            <p className="text-muted">
              {" "}
              Fecha consulta:{" "}
              <b>
                {moment(
                  consultation.fecha ? consultation.fecha : moment()
                ).format("LL")}
              </b>
            </p>
            <span className="flex-grow-1"></span>
            <p className="text-danger">
              Próxima Consulta:{" "}
              <b>
                {consultation.proximaConsulta !== null ? (
                  <>{moment(consultation.proximaConsulta).format("LL")} </>
                ) : (
                  "Sin"
                )}
              </b>
            </p>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card mb-6">
                <div className="card-body">
                  <div className="card-title d-flex align-items-center">
                    <h3 className="mb-0">Información del Paciente</h3>
                    <span className="flex-grow-1"></span>
                  </div>
                  <div className="row">
                    <div className="col-1">
                      <p className="text-muted">Nombre: </p>
                    </div>
                    <div className="col-3">
                      <p className="mt-0">{consultation.empleado}</p>
                    </div>
                    <div className="col-1">
                      <p className="text-muted">Puesto: </p>
                    </div>
                    <div className="col-3">
                      <p className="mt-0">{consultation.puesto}</p>
                    </div>
                    <div className="col-1">
                      <p className="text-muted">Código: </p>
                    </div>
                    <div className="col-3">
                      <p className="mt-0">{consultation.codigo}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-1">
                      <p className="text-muted">Departamento: </p>
                    </div>
                    <div className="col-3">
                      <p className="mt-0">{consultation.depto}</p>
                    </div>
                    <div className="col-1">
                      <p className="text-muted">Sección: </p>
                    </div>
                    <div className="col-3">
                      <p className="mt-0">{consultation.seccion}</p>
                    </div>
                    <div className="col-1">
                      <p className="text-muted">Área: </p>
                    </div>
                    <div className="col-3">
                      <p className="mt-0">{consultation.area}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-1">
                      <p className="text-muted">CUI: </p>
                    </div>
                    <div className="col-3">
                      <p className="mt-0">{consultation.cui}</p>
                    </div>
                    <div className="col-1">
                      <p className="text-muted">Empresa: </p>
                    </div>
                    <div className="col-3">
                      <p className="mt-0">{consultation.empresa}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          {consultation.idfamiliar !== null && (
            <div className="row">
              <div className="col-md-12">
                <div className="card mb-6">
                  <div className="card-body">
                    <div className="card-title d-flex align-items-center">
                      <h3 className="mb-0">Información del Familiar</h3>
                      <span className="flex-grow-1"></span>
                    </div>
                    <div className="row">
                      <div className="col-1">
                        <p className="text-muted">Nombre: </p>
                      </div>
                      <div className="col-3">
                        <p className="mt-0">{consultation.familiar}</p>
                      </div>
                      <div className="col-1">
                        <p className="text-muted">Parentezco: </p>
                      </div>
                      <div className="col-3">
                        <p className="mt-0">{consultation.parentezco}</p>
                      </div>
                      <div className="col-1">
                        <p className="text-muted">DPI: </p>
                      </div>
                      <div className="col-3">
                        <p className="mt-0">{consultation.dpiFamiliar}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-1">
                        <p className="text-muted">Celular: </p>
                      </div>
                      <div className="col-3">
                        <p className="mt-0">{consultation.celularFamiliar}</p>
                      </div>
                      <div className="col-1">
                        <p className="text-muted">Correo: </p>
                      </div>
                      <div className="col-3">
                        <p className="mt-0">{consultation.correoFamiliar}</p>
                      </div>
                      <div className="col-1">
                        <p className="text-muted">Fecha Nacimiento: </p>
                      </div>
                      <div className="col-3">
                        <p className="mt-0">
                          {moment(consultation.fechaFamiliar).format("LL")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <br />
          <div className="card mb-6">
            <div className="card-body">
              <div className="card-title d-flex align-items-center">
                <h3 className="mb-0">Información de Consulta</h3>
                <span className="flex-grow-1"></span>
                {editValues === false ? (
                  <span className="cursor-pointer text-success mr-2">
                    <i
                      className="nav-icon i-Pen-2 font-weight-bold"
                      onClick={() => setEditValues(true)}
                    ></i>
                  </span>
                ) : (
                  <span className="cursor-pointer text-danger mr-2">
                    <i
                      className="nav-icon i-Close-Window font-weight-bold"
                      onClick={() => setEditValues(false)}
                    ></i>
                  </span>
                )}
              </div>
              {editValues === false ? (
                <>
                  <div className="row">
                    <div className="col-2">
                      <p className="text-muted">Altura m: </p>
                    </div>
                    <div className="col-2">
                      <p className="mt-0">{consultation.altura}</p>
                    </div>
                    <div className="col-2">
                      <p className="text-muted">Peso kg: </p>
                    </div>
                    <div className="col-2">
                      <p className="mt-0">{consultation.peso}</p>
                    </div>
                    <div className="col-2">
                      <p className="text-muted">Oxígeno: </p>
                    </div>
                    <div className="col-2">
                      <p className="mt-0">{consultation.oxigeno}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-2">
                      <p className="text-muted">Temperatura: </p>
                    </div>
                    <div className="col-2">
                      <p className="mt-0">{consultation.temperatura}</p>
                    </div>
                    <div className="col-2">
                      <p className="text-muted">Temperatura ingreso: </p>
                    </div>
                    <div className="col-2">
                      <p className="mt-0">{consultation.temperaturaIngreso}</p>
                    </div>
                    <div className="col-2">
                      <p className="text-muted">PA: </p>
                    </div>
                    <div className="col-2">
                      <p className="mt-0">{consultation.presionArterial}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-2">
                      <p className="text-muted">F.C: </p>
                    </div>
                    <div className="col-2">
                      <p className="mt-0">{consultation.frecuenciaCardiaca}</p>
                    </div>
                    <div className="col-2">
                      <p className="text-muted">F.R: </p>
                    </div>
                    <div className="col-2">
                      <p className="mt-0">
                        {consultation.frecuenciaRespiratoria}
                      </p>
                    </div>
                    <div className="col-2">
                      <p className="text-muted">Circunferencia Abdominal: </p>
                    </div>
                    <div className="col-2">
                      <p className="mt-0">
                        {consultation.circunferenciaAbdominal}
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-2">
                      <p className="text-muted">IMC: </p>
                    </div>
                    <div className="col-2">
                      <p className="mt-0">{consultation.indiceMasaCorporal}</p>
                    </div>
                    <div className="col-2">
                      <p className="text-muted">Doctor: </p>
                    </div>
                    <div className="col-2">
                      <p className="mt-0">{consultation.doctor}</p>
                    </div>
                    <div className="col-2">
                      <p className="text-muted">Clínica: </p>
                    </div>
                    <div className="col-2">
                      <p className="mt-0">{consultation.clinica}</p>
                    </div>
                    <div className="col-2">
                      <p className="text-muted">Próxima Consulta: </p>
                    </div>
                    <div className="col-2">
                      <p className="mt-0">
                        {moment(consultation.proximaConsulta).format("LL") || (
                          <b>Sin</b>
                        )}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <ConsultationFormEdit
                  consultation={consultation}
                  onChange={handleChange}
                  onSubmit={handleSubmit}
                ></ConsultationFormEdit>
              )}
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-md-6">
              <ConsultationSymptomsList
                symptom={symptoms}
                idconsultation={props.match.params.id}
                getSymptoms={getSymptoms}
                option
              />
            </div>
            <div className="col-md-6">
              <ConsultationSpecialtyList
                specialty={specialties}
                idconsultation={props.match.params.id}
                getSpecialties={getSpecialties}
                option
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <ConsultationDiagnosisList
                diagnostic={diagnostics}
                idconsultation={props.match.params.id}
                getDiagnostics={getDiagnostics}
                option
              />
            </div>
            <div className="col-md-6">
              <ConsultationExamList
                exams={exams}
                idconsultation={props.match.params.id}
                getExams={getExams}
                option
              />
            </div>
          </div>
          <div className="row">
            <PrescriptionList prescriptions={prescriptions} title="Recetas" />
            <PrescriptionInternalList
              prescriptions={prescriptionsInternals}
              title="Recetas Internas"
            />
          </div>
        </>
      )}
      <NotificationContainer />
    </div>
  );
};

export default ConsultationDetail;
