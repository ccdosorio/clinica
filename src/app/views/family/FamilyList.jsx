import React, { useState, useEffect } from "react";
import { Breadcrumb, Loading } from "@gull";
import { Table, Card } from "react-bootstrap";
import { classList } from "@utils";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { MdEdit, MdDelete } from "react-icons/md";
import ReactPaginate from "react-paginate";
import moment from "moment";
import swal from "sweetalert2";
import Https from "../../api/Https";
import FamilyEditor2 from "./FamilyEditor2";

const FamilyList = () => {
  const [family, setFamily] = useState([]);
  const [page, setPage] = useState(0);
  const [numberPages, setNumberPages] = useState(10);
  const [numberRecords, setNumberRecords] = useState(0);
  const [showEditorDialog, setShowEditorDialog] = useState(false);
  const [dialogValues, setDialogValues] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [defaultValuesEmployee, setDefaultValuesEmployee] = useState(null);

  const getFamily = async () => {
    let body = { flag: "GET", no_pagina: page, paginas: numberPages };
    const res = await Https.post("familiar", body);
    setNumberRecords(res[0].cantidad);
    setFamily(res);
  };

  const handlePageClick = async (data) => {
    let pageSelected = data.selected * numberPages;
    let body = { flag: "GET", no_pagina: pageSelected, paginas: numberPages };
    const res = await Https.post("familiar", body);
    setFamily(res);
    setPage(pageSelected);
  };

  const handleShow = async (event) => {
    let pag = parseInt(event.target.value);
    setNumberPages(pag);
    let body = { flag: "GET", no_pagina: page, paginas: pag };
    const res = await Https.post("familiar", body);
    setFamily(res);
    setPage(page);
  };

  // Filtro

  const getEmployees = async () => {
    let options = { select: true, no_pagina: page, paginas: numberPages };
    const res = await Https.post("empleado/all", options);
    setEmployees(res);
  };

  // Agregar y Editar

  const handleFormSubmit = async (values) => {
    if (!dialogValues) {
      let body = { ...values, flag: "POST" };
      const res = await Https.post("familiar", body);
      res.code === 200 && NotificationManager.success(res.message, res.status);
    } else {
      let body = { ...values, flag: "EDIT" };
      const res = await Https.post("familiar", body);
      res.code === 200 && NotificationManager.success(res.message, res.status);
    }
    await getFamily();
    await toggleEditorDialog(false);
  };

  const handleEditFamily = async (dialogValues) => {
    let dialog = {
      idfamily: dialogValues.idfamiliar,
      idemployee: dialogValues.idempleado,
      names: dialogValues.nombres,
      surname: dialogValues.apellidos,
      gender: dialogValues.genero,
      mobile: dialogValues.celular,
      email: dialogValues.correo,
      address: dialogValues.direccion,
      birthday: dialogValues.fecha_nacimiento,
      dpi: dialogValues.dpi,
      type: dialogValues.idtipoFamilia,
    };

    let defaultEmployee = {
      label: dialogValues.nombreEmpleado,
      value: dialogValues.idempleado,
    };

    setDefaultValuesEmployee(defaultEmployee);
    setDialogValues(dialog);
    setShowEditorDialog(true);
  };

  const handleDeleteFamily = async (values) => {
    let body = { flag: "DELETE", idfamily: values.idfamiliar };
    const res = await Https.post("familiar", body);
    res.code === 200 && NotificationManager.success(res.message, res.status);
    await getFamily();
  };

  const toggleEditorDialog = async (arg) => {
    if (arg && arg.toString()) {
      setShowEditorDialog(true);
      setDialogValues(null);
    } else {
      setShowEditorDialog(!showEditorDialog);
      setDialogValues(null);
    }
  };

  useEffect(() => {
    getFamily();
    getEmployees();
  }, []);

  return (
    <div>
      <Breadcrumb
        routeSegments={[
          { name: "Inicio", path: "/home" },
          { name: "Listado de Familiares" },
        ]}
      ></Breadcrumb>
      <div className="card-header text-right bg-transparent">
        <button
          type="button"
          className="btn btn-primary btn-md m-1"
          onClick={toggleEditorDialog}
        >
          <i className="i-Medicine text-white mr-2"></i> Agregar Familiar
        </button>
      </div>
      {family.length < 1 ? (
        <Loading></Loading>
      ) : (
        <>
          <Card elevation={6} className="w-100">
            <div className="row px-4 mt-3">
              <div className="col-sm-12 col-md-6 mb-2">
                <div className="d-flex align-items-center">
                  <span className="mr-1">Mostrar</span>
                  <div className="mr-1">
                    <select
                      className="form-control"
                      onChange={handleShow}
                      value={numberPages}
                    >
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                    </select>
                  </div>
                  <span>registros</span>
                </div>
              </div>
            </div>
            <Table style={{ minWidth: 750 }}>
              <thead>
                <tr>
                  <th className="pl-sm-24">Id</th>
                  <th className="px-0">Nombre</th>
                  <th className="px-0">Apellidos</th>
                  <th className="px-0">DPI</th>
                  <th className="px-0">Correo</th>
                  <th className="px-0">Celular</th>
                  <th className="px-0">Parentezco</th>
                  <th className="px-0">Nacimiento</th>
                  <th className="px-0">Género</th>
                  <th className="px-0">Estado</th>
                  <th className="px-0">Opciones</th>
                </tr>
              </thead>
              <tbody>
                {family.map((item) => (
                  <tr key={item.idfamiliar}>
                    <td className="pl-sm-24 capitalize" align="left">
                      {item.idfamiliar}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {item.nombres}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {item.apellidos}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {item.dpi}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {item.correo || <p className="text-muted">Sin</p>}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {item.celular || <p className="text-muted">Sin</p>}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {item.familiar}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {moment(item.fecha_nacimiento).format("LL")}
                    </td>
                    <td className="pl-0 capitalize">
                      <small
                        className={classList({
                          "badge rounded-pill text-white px-8 py-2": true,
                          "bg-success": item.estado === "Activo",
                          "bg-danger": item.estado === "Inactivo",
                        })}
                      >
                        {item.estado}
                      </small>
                    </td>
                    <td className="pl-0 capitalize">
                      <small
                        className={classList({
                          "badge rounded-pill text-white px-8 py-2": true,
                          "bg-warning": item.genero === "F",
                          "bg-info": item.genero === "M",
                        })}
                      >
                        {item.genero}
                      </small>
                    </td>
                    <td>
                      <div className="d-flex">
                        <div className="cursor-pointer mr-3">
                          <MdEdit
                            className="text-success"
                            size={18}
                            onClick={() => handleEditFamily(item)}
                          ></MdEdit>
                        </div>
                        <div className="cursor-pointer">
                          <MdDelete
                            className="text-danger"
                            size={18}
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
                                    handleDeleteFamily(item);
                                  } else {
                                    swal.fire({
                                      title: "¡Cencelado!",
                                      text: "Permiso denegado",
                                      icon: "error",
                                      timer: 1500,
                                    });
                                  }
                                });
                            }}
                          ></MdDelete>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="px-3 pb-3 mt-3 d-flex flex-row justify-content-end">
              <ReactPaginate
                previousLabel={"Anterior"}
                nextLabel={"Siguiente"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={Math.ceil(numberRecords / numberPages)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              />
            </div>
          </Card>
        </>
      )}
      <FamilyEditor2
        show={showEditorDialog}
        toggleEditorDialog={toggleEditorDialog}
        handleFormSubmit={handleFormSubmit}
        initialValues={dialogValues}
        employees={employees}
        defaultValueEmployee={defaultValuesEmployee}
      ></FamilyEditor2>
      <NotificationContainer />
    </div>
  );
};

export default FamilyList;
