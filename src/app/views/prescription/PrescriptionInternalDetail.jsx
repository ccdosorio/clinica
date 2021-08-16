import React, { useState, useEffect } from "react";
import { Breadcrumb } from "@gull";
import { NotificationContainer } from "react-notifications";
import { NotificationManager } from "react-notifications";
import moment from "moment";
import Select from "react-select";

import Https from "../../api/Https";

const PrescriptionInternalDetail = (props) => {
  const [data, setData] = useState({});
  const [form, setForm] = useState({});
  const [diagnostic, setDiagnostic] = useState([]);
  const [articles, setArticles] = useState([]);

  const getData = async () => {
    let body = { idprescription: props.match.params.id };
    const res = await Https.post("prescription/internal/detail/", body);
    setData(res[0]);
    setForm({
      idprescription: res[0].idrecetaInterna,
      iddiagnostic: res[0].iddiagnostico,
      idarticle: res[0].idarticulo,
      quantity: res[0].cantidad,
      days: res[0].dias,
      description: res[0].descripcion,
    });
  };

  const getDiagnostics = async () => {
    let body = {
      idConsultation: props.match.params.idconsultation,
      select: true,
    };
    const res = await Https.post("consulta/get/diagnostics", body);
    setDiagnostic(res);
  };

  const getArticles = async () => {
    const res = await Https.get("consulta/articles");
    setArticles(res);
  };

  const handleChange = async (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleDiagnostic = async (values) => {
    setForm({
      ...form,
      iddiagnostic: values.value,
    });
  };

  const handleArticle = async (values) => {
    setForm({
      ...form,
      idarticle: values.value,
    });
  };

  const handleSubmit = async (values) => {
    const res = await Https.post("prescription/internal/edit", form);
    if (res.code === 200) {
      NotificationManager.success(res.message, res.status);
      await getData();
    } else {
      NotificationManager.error("Error", 500);
    }
  };

  useEffect(() => {
    getData();
    getArticles();
    getDiagnostics();
  }, []);

  return (
    <div>
      <Breadcrumb
        routeSegments={[
          { name: "Regresar", path: `/report/prescription/internal` },
          { name: "Detalle de Receta Interna" },
        ]}
      ></Breadcrumb>
      <div className="row">
        <div className="col-md-12">
          <div className="card mb-6">
            <div className="card-body">
              <div className="card-title d-flex align-items-center">
                <h3 className="mb-0">Receta No. {data.idrecetaInterna} </h3>
                <span className="flex-grow-1"></span>
              </div>
              <div className="row">
                <div className="col-1">
                  <p className="text-muted">Diagnóstico: </p>
                </div>
                <div className="col-3">
                  <p className="mt-0">{data.diagnostico}</p>
                </div>
                <div className="col-1">
                  <p className="text-muted">Artículo: </p>
                </div>
                <div className="col-3">
                  <p className="mt-0">{data.articulo}</p>
                </div>
                <div className="col-1">
                  <p className="text-muted">Cantidad: </p>
                </div>
                <div className="col-1">
                  <p className="mt-0">{data.cantidad}</p>
                </div>
                <div className="col-1">
                  <p className="text-muted">Días: </p>
                </div>
                <div className="col-1">
                  <p className="mt-0">{data.dias}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-1">
                  <p className="text-muted">Descripción: </p>
                </div>
                <div className="col-3">
                  <p className="mt-0">{data.descripcion}</p>
                </div>
                <div className="col-1">
                  <p className="text-muted">Enfermedad: </p>
                </div>
                <div className="col-3">
                  <p className="mt-0">{data.enfermedad}</p>
                </div>
                <div className="col-1">
                  <p className="text-muted">Dosis: </p>
                </div>
                <div className="col-3">
                  <p className="mt-0">{data.dosis}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-1">
                  <p className="text-muted">Paciente: </p>
                </div>
                <div className="col-3">
                  <p className="mt-0">{data.empleado}</p>
                </div>
                <div className="col-1">
                  <p className="text-muted">Doctor: </p>
                </div>
                <div className="col-3">
                  <p className="mt-0">{data.doctor}</p>
                </div>
                <div className="col-1">
                  <p className="text-muted">Fecha Consulta: </p>
                </div>
                <div className="col-3">
                  <p className="mt-0">
                    {moment(data.fechaConsulta).format("LL")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-md-12">
          <div className="card mb-6">
            <div className="card-body">
              <div className="row">
                <div className="col-1">
                  <p className="text-muted">Diagnóstico: </p>
                </div>
                <div className="col-3">
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder="Seleccione"
                    id="iddiagnostic"
                    name="iddiagnostic"
                    options={diagnostic}
                    onChange={handleDiagnostic}
                    defaultValue={data.iddiagnostico}
                  />
                </div>
                <div className="col-1">
                  <p className="text-muted">Artículo: </p>
                </div>
                <div className="col-3">
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder="Seleccione"
                    id="idarticle"
                    name="idarticle"
                    options={articles}
                    onChange={handleArticle}
                    defaultValue={data.idarticulo}
                  />
                </div>
                <div className="col-1">
                  <p className="text-muted">Cantidad: </p>
                </div>
                <div className="col-1">
                  <input
                    type="number"
                    className="form-control"
                    id="quantity"
                    placeholder="Cantidad"
                    name="quantity"
                    defaultValue={data.cantidad || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-1">
                  <p className="text-muted">Días: </p>
                </div>
                <div className="col-1">
                  <input
                    type="number"
                    className="form-control"
                    id="days"
                    placeholder="Días"
                    name="days"
                    defaultValue={data.dias || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-1">
                  <p className="text-muted">Descripción: </p>
                </div>
                <div className="col-3">
                  <textarea
                    className="form-control"
                    name="description"
                    id="description"
                    cols="10"
                    rows="5"
                    placeholder="Descripción"
                    onChange={handleChange}
                    defaultValue={data.descripcion}
                  ></textarea>
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Editar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NotificationContainer />
    </div>
  );
};

export default PrescriptionInternalDetail;
