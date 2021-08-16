import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import swal from "sweetalert2";
import ConsultationSpecialtyEditor from "./ConsultationSpecialtyEditor";

import Https from "../../api/Https";

const ConsultationSpecialtyList = (props) => {
  const [showEditorDialog, setShowEditorDialog] = useState(false);
  const [specialties, setSpecialties] = useState([]);

  const toggleEditorDialog = (arg) => {
    if (arg && arg.toString()) {
      setShowEditorDialog(true);
    } else {
      setShowEditorDialog(!showEditorDialog);
    }
  };

  const getSpecialties = async () => {
    const res = await Https.get("consulta/specialties");
    let specialties = res.map(({ idespecialidad, nombre }) => {
      if (nombre !== null) {
        return {
          label: nombre,
          value: idespecialidad,
        };
      } else {
        return false;
      }
    });
    setSpecialties(specialties);
  };

  const handleDelete = async (id) => {
    let body = { idspecialty: id };
    const res = await Https.post("consulta/delete/specialty", body);
    if (res) {
      await swal.fire({
        title: "¡Eliminado!",
        text: res.message,
        icon: "success",
        timer: 2000,
      });
    }
    await props.getSpecialties();
  };

  const getBadgeColor = (role) => {
    switch (role) {
      case "Activo":
        return "success";

      default:
        return "primary";
    }
  };

  useEffect(() => {
    getSpecialties();
  }, []);

  return (
    <div className="card mb-4">
      <div className="card-header card-title mb-0 d-flex align-items-center justify-content-between border-0">
        <h3 className="w-50 float-left card-title m-0">Especialidades</h3>
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
              {props.specialty.length > 0 ? (
                <table id="user_table" className="table  text-center">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Especialidad</th>
                      <th>Descripción</th>
                      <th>Estado</th>
                      <th>Eliminar</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.specialty.map((value, ind) => (
                      <tr key={ind}>
                        <td>{ind + 1}</td>
                        <td>{value.especialidad}</td>
                        <td>{value.descripcion}</td>
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
                                      handleDelete(value.idespecialidad);
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
                      <b>No hay especialidades registradas</b>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ConsultationSpecialtyEditor
        show={showEditorDialog}
        toggleEditorDialog={toggleEditorDialog}
        idconsultation={props.idconsultation}
        getSpecialties={props.getSpecialties}
        specialties={specialties}
      ></ConsultationSpecialtyEditor>
    </div>
  );
};

export default ConsultationSpecialtyList;
