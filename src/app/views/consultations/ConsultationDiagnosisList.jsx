import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import swal from "sweetalert2";
import ConsultationDiagnosisEditor from "./ConsultationDiagnosisEditor";
import Https from "../../api/Https";

const ConsultationDiagnosisList = (props) => {
  const [showEditorDialog, setShowEditorDialog] = useState(false);
  const [diseases, setDiseases] = useState([]);

  useEffect(() => {
    getDiseases();
  }, []);

  const toggleEditorDialog = (arg) => {
    if (arg && arg.toString()) {
      setShowEditorDialog(true);
    } else {
      setShowEditorDialog(!showEditorDialog);
    }
  };

  const getDiseases = async () => {
    const res = await Https.get("consulta/diseases");
    setDiseases(res);
  };

  const handleDelete = async (id) => {
    let body = { iddiagnostic: id };
    const res = await Https.post("consulta/delete/diagnosis", body);
    if (res) {
      await swal.fire({
        title: "¡Eliminado!",
        text: res.message,
        icon: "success",
        timer: 2000,
      });
    }
    await props.getDiagnostics();
  };

  const getBadgeColor = (role) => {
    switch (role) {
      case "Activo":
        return "success";

      default:
        return "primary";
    }
  };
  return (
    <div className="card mb-4">
      <div className="card-header card-title mb-0 d-flex align-items-center justify-content-between border-0">
        <h3 className="w-50 float-left card-title m-0">Diagnósticos</h3>
        {props.option && (
          <Dropdown alignRight>
            <Dropdown.Toggle as="span" className="toggle-hidden cursor-pointer">
              <i className="nav-icon i-Gear-2"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={toggleEditorDialog}>
                Agregar
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>
      <div className="row">
        <div className="col-md-12 mb-4">
          <div>
            <div className="table-responsive">
              {props.diagnostic.length > 0 ? (
                <table id="user_table" className="table  text-center">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Enfermedad</th>
                      <th>Descripción</th>
                      <th>Estado</th>
                      <th>Eliminar</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.diagnostic.map((value, ind) => (
                      <tr key={ind}>
                        <td>{ind + 1}</td>
                        <td>{value.descripcion}</td>
                        <td>{value.enfermedad}</td>
                        <td valign="middle">
                          <div
                            className={`badge badge-${getBadgeColor(
                              value.estado
                            )} p-2 text-capitalize`}
                          >
                            {value.estado ? value.estado : "Activo"}
                          </div>
                        </td>
                        <td>
                          {/* <span className="cursor-pointer text-success mr-2">
                            <i className="nav-icon i-Pen-2 font-weight-bold"></i>
                          </span> */}
                          <span className="cursor-pointer text-danger mr-2">
                            <i
                              className="nav-icon i-Close-Window font-weight-bold"
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
                                      handleDelete(value.iddiagnostico);
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
                            ></i>
                          </span>
                        </td>
                        <td></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center">
                  <br />
                  <div className="col-12">
                    <p className="text-muted">
                      <b>No hay diagnósticos registrados</b>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ConsultationDiagnosisEditor
        show={showEditorDialog}
        toggleEditorDialog={toggleEditorDialog}
        idconsultation={props.idconsultation}
        getDiagnostics={props.getDiagnostics}
        diseases={diseases}
      ></ConsultationDiagnosisEditor>
    </div>
  );
};

export default ConsultationDiagnosisList;
