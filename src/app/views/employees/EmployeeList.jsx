import React, { useState, useEffect } from "react";
import { Breadcrumb, Loading } from "@gull";
import { Table, Card } from "react-bootstrap";
import { classList } from "@utils";
import { MdDelete } from "react-icons/md";
import ReactPaginate from "react-paginate";
import swal from "sweetalert2";
import Select from "react-select";

import Http from "../../api/Https";

const EmpleadosList = (props) => {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(0);
  const [numberPages, setNumberPages] = useState(10);
  const [numberRecords, setNumberRecords] = useState(0);
  const [names, setName] = useState([]);
  const [codes, setCode] = useState([]);

  const getEmployees = async () => {
    let options = { select: false, no_pagina: page, paginas: numberPages };
    const res = await Http.post("empleado/all", options);
    setNumberRecords(res[0].cantidad);
    setEmployees(res);
  };

  const handeViewClick = async (id) => {
    props.history.push(`/employee/${id}/edit`);
  };

  const handleName = (value) => {
    props.history.push(`/employee/${value.value}/edit`);
  };

  const handleCode = (value) => {
    props.history.push(`/employee/${value.value}/edit`);
  };

  const handlePageClick = async (data) => {
    let pageSelected = data.selected * numberPages;
    let options = {
      select: false,
      no_pagina: pageSelected,
      paginas: numberPages,
    };
    const res = await Http.post("empleado/all", options);
    setEmployees(res);
    setPage(pageSelected);
  };

  const handleShowEmployees = async (event) => {
    let pag = parseInt(event.target.value);
    setNumberPages(pag);
    let options = { select: false, no_pagina: page, paginas: pag };
    const res = await Http.post("empleado/all", options);
    setEmployees(res);
    setPage(page);
  };

  const handleDelete = async (values) => {
    let empleado = {
      idempleado: values,
    };
    const res = await Http.post("baja-empleado", empleado);
    if (res) {
      await swal.fire({
        title: "¡Eliminado!",
        text: res.message,
        icon: "success",
        timer: 2000,
      });
    }
    await getEmployees();
  };

  const getFilterEmployee = async () => {
    const res = await Http.get("empleado/all");
    let filterName = [];
    let filterCode = [];
    res.map(({ nombres, codigo, idempleado }) => {
      if (nombres !== null && nombres !== "") {
        filterName.push({
          value: idempleado,
          label: nombres,
        });
      }
      filterCode.push({
        value: idempleado,
        label: codigo,
      });
    });
    setName(filterName);
    setCode(filterCode);
  };

  useEffect(() => {
    getEmployees();
    getFilterEmployee();
  }, []);

  return (
    <div>
      <Breadcrumb
        routeSegments={[
          { name: "Inicio", path: "/home" },
          { name: "Lista de Empleados" },
        ]}
      ></Breadcrumb>
      {employees.length < 1 ? (
        <Loading></Loading>
      ) : (
        <>
          <div className="mb-12">
            <div className="form-row">
              <div className="col-md-4 form-group mb-4">
                <label htmlFor="">Nombre Empleado: </label>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  name="color"
                  options={names}
                  onChange={handleName}
                />
              </div>
              <div className="col-md-4 form-group mb-4">
                <label htmlFor="">Código Empleado:</label>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  name="color"
                  options={codes}
                  onChange={handleCode}
                />
              </div>
            </div>
          </div>
          <Card elevation={6} className="w-100">
            <div className="row px-4 mt-3">
              <div className="col-sm-12 col-md-6 mb-2">
                <div className="d-flex align-items-center">
                  <span className="mr-1">Mostrar</span>
                  <div className="mr-1">
                    <select
                      className="form-control"
                      onChange={handleShowEmployees}
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
                  <th className="px-0">Empresa</th>
                  <th className="px-0">Nombre</th>
                  <th className="px-0">Apellido</th>
                  <th className="px-0">Codigo</th>
                  <th className="px-0">Estado</th>
                  <th className="px-0">Dar de baja</th>
                  <th className="px-0">Administrar</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((value) => (
                  <tr key={value.idempleado}>
                    <td className="pl-sm-24 capitalize" align="left">
                      {value.idempleado}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {value.empresa || (
                        <p className="text-muted">Sin empresa</p>
                      )}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {value.nombres || (
                        <p className="text-muted">Sin nombre</p>
                      )}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {value.apellidos || (
                        <p className="text-muted">Sin apellidos</p>
                      )}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {value.codigo || <p className="text-muted">Sin código</p>}
                    </td>
                    <td className="pl-0 capitalize">
                      <small
                        className={classList({
                          "badge rounded-pill text-white px-8 py-2": true,
                          "bg-success": value.estado === "A",
                          "bg-danger": value.estado === "I",
                        })}
                      >
                        {value.estado}
                      </small>
                    </td>
                    <td className="pl-0">
                      <div className="d-flex">
                        <div className="cursor-pointer mr-3">
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
                                    handleDelete(value.idempleado);
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
                      </div>
                    </td>
                    <td className="pl-0">
                      <div className="d-flex">
                        <i
                          className="i-Arrow-Right mr-4 font-weight-900 text-primary cursor-pointer"
                          onClick={() => handeViewClick(value.idempleado)}
                        ></i>
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
    </div>
  );
};

export default EmpleadosList;
