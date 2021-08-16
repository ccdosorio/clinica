import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { format } from "date-fns";

import Https from "../../api/Https";

const PrescriptionInvoice = (props) => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [prescriptionsInternals, setPrescriptionsInternals] = useState([]);
  const [date, setDate] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [collegiate, setCollegiate] = useState(null);
  const [employee, setEmployee] = useState(null);

  const getPrescriptions = async () => {
    let body = { idconsultation: props.match.params.idconsultation };
    const res = await Https.post("consulta/get/prescriptions", body);
    if (res.length > 0) {
      setDate(res[0].fechaConsulta);
      setEmployee(res[0].empleado);
      setDoctor(res[0].doctor);
      setCollegiate(res[0].colegiado);
      setPrescriptions(res);
    }
  };

  const getPrescriptionsInternals = async () => {
    let body = { idconsultation: props.match.params.idconsultation };
    const res = await Https.post("consulta/get/prescriptions/internals", body);
    if (res.length > 0) {
      setDate(res[0].fechaConsulta);
      setEmployee(res[0].empleado);
      setDoctor(res[0].doctor);
      setCollegiate(res[0].colegiado);
      setPrescriptionsInternals(res);
    }
  };

  useEffect(() => {
    getPrescriptions();
    getPrescriptionsInternals();
  }, []);

  return (
    <Card>
      <div className="invoice-viewer py-16">
        <div className="viewer_actions px-3 mb-3 d-flex align-items-center justify-content-between">
          <Link
            to={`/prescription/${props.match.params.idconsultation}/invoice`}
          >
            <i className="i-Left1 text-20 font-weight-700"> </i>
          </Link>
          <div>
            <Link to="/employee/list">
              <Button className="mr-3 py-2" variant="primary">
                Finalizar
              </Button>
            </Link>
            <Button
              onClick={() => window.print()}
              className="py-2"
              variant="warning"
            >
              Imprimir Receta
            </Button>
          </div>
        </div>
        <div id="print-area" className="px-3">
          <div className="col-md-6">
            <img
              src="https://s3.amazonaws.com/nd.s3.rep.documentos-electronicos/public/nd/logon_nd.png"
              width="20%"
            />
          </div>
          <div className="row">
            <div className="col-md-6">
              <h4 className="font-weight-bold">Receta Médica No.</h4>
              <p>#{props.match.params.idconsultation}</p>
            </div>
            <div className="col-md-6 text-sm-right">
              <p className="text-capitalize">
                <strong>Guatemala, Ave. Petapa 23-01</strong>
              </p>
              <p>
                <strong>Fecha Consulta: </strong>
                <span>
                  {format(
                    new Date(date ? date : new Date()).getTime(),
                    "dd MMM, yyyy"
                  )}
                </span>
              </p>
            </div>
          </div>
          <div className="mt-3 mb-4 border-top"></div>
          <div className="row mb-5">
            <div className="col-md-6 mb-3 mb-sm-0">
              <h5 className="font-weight-bold">Paciente</h5>
              <span className="white-space-pre-line">{employee}</span>
            </div>
            <div className="col-md-6 text-sm-right">
              <h5 className="font-weight-bold">Doctor</h5>
              <p>{doctor}</p>
              <span className="white-space-pre-line">{collegiate}</span>
            </div>
          </div>
          <div className="row">
            {prescriptions.length > 0 && (
              <div className="col-md-12 table-responsive">
                <table className="table table-hover mb-4">
                  <thead className="bg-gray-300">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Receta</th>
                      <th scope="col">Enfermedad</th>
                      <th scope="col">Medicamento</th>
                      <th scope="col">Dosis</th>
                      <th scope="col">Cantidad</th>
                      <th scope="col">Tomar durante</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prescriptions.map((item, index) => (
                      <tr key={index}>
                        <td className="text-capitalize">{index + 1}</td>
                        <td className="text-capitalize">{item.descripcion}</td>
                        <td className="text-capitalize">{item.enfermedad}</td>
                        <td className="text-capitalize">{item.medicamento}</td>
                        <td className="text-capitalize">{item.dosis}</td>
                        <td>{item.cantidad}</td>
                        <td>{item.dias} días</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {prescriptionsInternals.length > 0 && (
              <div className="col-md-12 table-responsive">
                <table className="table table-hover mb-4">
                  <thead className="bg-gray-300">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Receta Interna</th>
                      <th scope="col">Enfermedad</th>
                      <th scope="col">Artículo</th>
                      <th scope="col">Dosis</th>
                      <th scope="col">Cantidad</th>
                      <th scope="col">Tomar durante</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prescriptionsInternals.map((item, index) => (
                      <tr key={index}>
                        <td className="text-capitalize">{index + 1}</td>
                        <td className="text-capitalize">{item.descripcion}</td>
                        <td className="text-capitalize">{item.enfermedad}</td>
                        <td className="text-capitalize">{item.articulo}</td>
                        <td className="text-capitalize">{item.dosis}</td>
                        <td>{item.cantidad}</td>
                        <td>{item.dias} días</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PrescriptionInvoice;
