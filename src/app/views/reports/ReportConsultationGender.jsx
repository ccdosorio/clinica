import React, { useState } from "react";
import { Breadcrumb, Loading } from "@gull";
import { Table, Card } from "react-bootstrap";
import { classList } from "@utils";
import ReactPaginate from "react-paginate";
import moment from "moment";

import Https from "../../api/Https";

const ReportConsultationGender = (props) => {
  const [data, setData] = useState([]);
  const [isValues, setValues] = useState(null);
  const [gender, setGender] = useState(0);
  const [page, setPage] = useState(0);
  const [numberPages, setNumberPages] = useState(10);
  const [numberRecords, setNumberRecords] = useState(0);

  const getData = async () => {
    let options = {
      gender: gender,
      no_pagina: page,
      paginas: numberPages,
    };
    const res = await Https.post("consulta/report/gender", options);
    if (res.length === 0) setValues(false);
    if (res.length > 0) setNumberRecords(res[0].cantidad);
    setData(res);
  };

  const handleChange = async (event) => {
    setGender(event.target.value);
  };

  const handleSubmit = async (values) => {
    values.preventDefault();
    setValues(true);
    await getData();
  };

  const handeViewClick = async (id) => {
    props.history.push(`/consultation/${id}/detail`);
  };

  const handleShow = async (event) => {
    let pag = parseInt(event.target.value);
    setNumberPages(pag);
    let options = {
      gender: gender,
      no_pagina: page,
      paginas: pag,
    };
    const res = await Https.post("consulta/report/gender", options);
    setData(res);
    setPage(page);
  };

  const handlePageClick = async (data) => {
    console.log("handlePageClick");
    let pageSelected = data.selected * numberPages;
    let options = {
      gender: gender,
      no_pagina: page,
      paginas: numberPages,
    };
    const res = await Https.post("consulta/report/gender", options);
    console.log(res);
    setData(res);
    setPage(pageSelected);
  };

  const hasRecords = () => {
    if (isValues) {
      return <Loading></Loading>;
    }

    if (isValues === false) {
      return (
        <p className="text-muted">
          <b>No se encontraron registros</b>
        </p>
      );
    }
  };

  return (
    <div>
      <Breadcrumb
        routeSegments={[
          { name: "Inicio", path: "/home" },
          { name: "Consultas por género" },
        ]}
      ></Breadcrumb>
      <div className="row g-3">
        <div className="col-2">
          <select
            id="gender"
            className="form-control"
            name="gender"
            defaultValue={gender}
            onChange={handleChange}
          >
            <option value="0">Selecciona el género</option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </select>
        </div>
        <div className="col-auto">
          <button
            type="submit"
            className="btn btn-primary mb-3"
            onClick={handleSubmit}
          >
            Buscar
          </button>
        </div>
      </div>

      {data.length > 0 ? (
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
                  <th className="pl-sm-24">#</th>
                  <th className="px-0">Empleado</th>
                  <th className="px-0">Código Emp.</th>
                  <th className="px-0">Departamento</th>
                  <th className="px-0">Código Dep.</th>
                  <th className="px-0">Médico</th>
                  <th className="px-0">Fecha Consulta</th>
                  <th className="px-0">Género</th>
                  <th className="px-0">Estado</th>
                  <th className="px-0">Ver</th>
                </tr>
              </thead>
              <tbody>
                {data.map((value) => (
                  <tr key={value.id}>
                    <td className="pl-sm-24 capitalize" align="left">
                      {value.id}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {value.empleado}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {value.codigo}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {value.Depto}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {value.codigoDepto}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {value.medico}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {moment(value.fecha).format("LL")}
                    </td>
                    <td className="pl-0 capitalize">
                      <small
                        className={classList({
                          "badge rounded-pill text-white px-8 py-2": true,
                          "bg-primary": value.genero === "M",
                          "bg-warning": value.genero === "F",
                        })}
                      >
                        {value.genero}
                      </small>
                    </td>
                    <td className="pl-0 capitalize">
                      <small
                        className={classList({
                          "badge rounded-pill text-white px-8 py-2": true,
                          "bg-success": value.estado === "Activo",
                          "bg-danger": value.estado === "Inactivo",
                        })}
                      >
                        {value.estado}
                      </small>
                    </td>
                    <td className="pl-0">
                      <div className="d-flex">
                        <i
                          className="i-Arrow-Right mr-4 font-weight-900 text-primary cursor-pointer"
                          onClick={() => handeViewClick(value.id)}
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
      ) : (
        hasRecords()
      )}
    </div>
  );
};

export default ReportConsultationGender;
