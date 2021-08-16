import React, { useState, useEffect } from "react";
import Https from "../../api/Https";
import moment from "moment";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import swal from "sweetalert2";

const ConsultationEmployeeList = ({ idemployee }) => {
  const [consultatios, setConsultations] = useState([]);
  const [isValues, setValues] = useState(true);

  const getConsultations = async () => {
    const res = await Https.post("consulta/employee", { idemployee });
    if (res.length === 0) setValues(false);
    setConsultations(res);
  };

  const isValid = () => {
    if (isValues) {
      return <span className="spinner-glow spinner-glow-primary mr-5"></span>;
    }

    if (isValues === false) {
      return (
        <p className="text-muted">
          <b>El empleado no cuenta con consultas</b>
        </p>
      );
    }
  };

  const handleDeleteConsultation = async (value) => {
    let body = { idconsultation: value };
    const res = await Https.post("consulta/delete", body);
    if (res) {
      await swal.fire({
        title: "¡Eliminado!",
        text: res.message,
        icon: "success",
        timer: 2000,
      });
    }
    await getConsultations();
  };

  useEffect(() => {
    getConsultations();
  }, []);

  return (
    <div>
      {consultatios.length > 0
        ? consultatios.map((value) => (
            <div className="ul-contact-detail__timeline" key={value.idconsulta}>
              <div className="row">
                <div className="col-lg-12 col-xl-12">
                  <div className="ul-contact-detail__timeline-row">
                    <div className="row">
                      <div className="col-lg-11">
                        <div className="ul-contact-detail__right-timeline">
                          <span className="ul-widget4__title d-block">
                            <b>{moment(value.fecha).format("LL")}</b>
                          </span>
                          <div className="row">
                            <div className="col-12">
                              {value.idfamiliar !== null ? (
                                <p style={{ color: "#2BB69B" }}>
                                  <i className="i-MaleFemale"></i>{" "}
                                  <b>Familiar</b>
                                </p>
                              ) : (
                                <p style={{ color: "#2BB69B" }}>
                                  <i className="i-Male"></i> <b>Empleado</b>
                                </p>
                              )}
                              <span className="text-muted">
                                Temperatura: {value.temperatura}
                              </span>
                            </div>
                            <div className="col-12">
                              <span className="text-muted">
                                Temperatura Ingreso:{" "}
                                {value.temperaturaIngreso || "Sin"}
                              </span>
                            </div>
                            <div className="col-12">
                              <span className="text-muted">
                                Oxígeno: {value.oxigeno || "Sin"}
                              </span>
                            </div>
                          </div>

                          <div className="ul-contact-detail__timeline-image-2 mt-3">
                            <div className="ul-contact-detail__timeline-image-info">
                              <p style={{ width: "80%" }}>
                                Consulta realizada por el doctor {value.doctor}{" "}
                                en la {value.clinica}.
                              </p>
                              <p>
                                <span className="">
                                  Próxima Consulta:
                                  {value.proximaConsulta === null ? (
                                    <b>Sin</b>
                                  ) : (
                                    <>
                                      {" "}
                                      {moment(value.proximaConsulta).format(
                                        "LL"
                                      )}
                                    </>
                                  )}
                                </span>
                              </p>
                            </div>
                            <Link
                              to={`/consultation/${value.idconsulta}/detail`}
                            >
                              <button
                                type="button"
                                className="btn btn-primary btn-small m-1"
                              >
                                Ver
                              </button>
                            </Link>
                            <MdDelete
                              className="text-danger"
                              size={35}
                              onClick={() => {
                                swal
                                  .fire({
                                    title: "¿Estas seguro?",
                                    text: "¡No podrás revertir este cambio!",
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                    confirmButtonText: "Si, eliminar",
                                    cancelButtonText: "No",
                                  })
                                  .then((result) => {
                                    if (result.value) {
                                      handleDeleteConsultation(
                                        value.idconsulta
                                      );
                                    } else {
                                      swal.fire({
                                        title: "Cencelado!",
                                        text: "Permiso denegado",
                                        icon: "error",
                                        timer: 1500,
                                      });
                                    }
                                  });
                              }}
                            ></MdDelete>
                          </div>
                          <hr />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        : isValid()}
    </div>
  );
};

export default ConsultationEmployeeList;
