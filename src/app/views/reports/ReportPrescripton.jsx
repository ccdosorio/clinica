import React, { useState } from "react";
import { Breadcrumb, Loading } from "@gull";
import { Table, Card } from "react-bootstrap";
import { classList } from "@utils";
import ReactPaginate from "react-paginate";
import moment from "moment";

import Https from "../../api/Https";

const ReportPrescripton = (props) => {
  const [data, setData] = useState([]);
  const [isValues, setValues] = useState(null);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [page, setPage] = useState(0);
  const [numberPages, setNumberPages] = useState(10);
  const [numberRecords, setNumberRecords] = useState(0);

  const getData = async () => {
    let options = {
      month: month,
      year: year,
      no_pagina: page,
      paginas: numberPages,
    };
    const res = await Https.post("consulta/report/prescription", options);
    if (res.length === 0) setValues(false);
    if (res.length > 0) setNumberRecords(res[0].cantidad);
    setData(res);
  };

  const handleChangeMonth = async (event) => {
    setMonth(event.target.value);
  };

  const handleChangeYear = async (event) => {
    setYear(event.target.value);
  };

  const handleSubmit = async (values) => {
    values.preventDefault();
    setValues(true);
    await getData();
  };

  const handeViewClick = async (value) => {
    props.history.push(`/prescription-detail/${value.id}/${value.idconsulta}`);
  };

  const handleShow = async (event) => {
    let pag = parseInt(event.target.value);
    setNumberPages(pag);
    let options = {
      month: month,
      year: year,
      no_pagina: page,
      paginas: pag,
    };
    const res = await Https.post("consulta/report/prescription", options);
    setData(res);
    setPage(page);
  };

  const handlePageClick = async (data) => {
    let pageSelected = data.selected * numberPages;
    let options = {
      month: month,
      year: year,
      no_pagina: pageSelected,
      paginas: numberPages,
    };
    const res = await Https.post("consulta/report/prescription", options);
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
          { name: "Reporte Recetas" },
        ]}
      ></Breadcrumb>
      <div className="row g-3">
        <div className="col-2">
          <select
            id="month"
            className="form-control"
            name="month"
            defaultValue={month}
            onChange={handleChangeMonth}
          >
            <option value={0}>Selecciona el mes</option>
            <option value={1}>Enero</option>
            <option value={2}>Febrero</option>
            <option value={3}>Marzo</option>
            <option value={4}>Abril</option>
            <option value={5}>Mayo</option>
            <option value={6}>Junio</option>
            <option value={7}>Julio</option>
            <option value={8}>Agosto</option>
            <option value={9}>Septiembre</option>
            <option value={10}>Octubre</option>
            <option value={11}>Noviembre</option>
            <option value={12}>Diciembre</option>
          </select>
        </div>
        <div className="col-2">
          <input
            type="text"
            className="form-control"
            id="year"
            placeholder="Ingresa el año"
            name="year"
            defaultValue={year}
            onChange={handleChangeYear}
          />
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
              <div className="col-sm-12 col-md-6 mb-2">
                <div className="d-flex align-items-center">
                  <span className="mr-1 text-muted">
                    <b>Número de recetas: {numberRecords}</b>
                  </span>
                </div>
              </div>
            </div>
            <Table style={{ minWidth: 750 }}>
              <thead>
                <tr>
                  <th className="pl-sm-24"># Consulta</th>
                  <th className="px-0">Descripcion</th>
                  <th className="px-0">Cant.</th>
                  <th className="px-0">Días</th>
                  <th className="px-0">Medicamento</th>
                  <th className="px-0">Paciente</th>
                  <th className="px-0">Código</th>
                  <th className="px-0">Empresa</th>
                  <th className="px-0">Área</th>
                  <th className="px-0">Fecha</th>
                  <th className="px-0">Estado</th>
                  <th className="px-0">Ver</th>
                </tr>
              </thead>
              <tbody>
                {data.map((value) => (
                  <tr key={value.id}>
                    <td className="pl-sm-24 capitalize" align="left">
                      {value.idconsulta}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {value.descripcion}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {value.cantidad}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {value.dias}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {value.medicamento}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {value.paciente}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {value.codigo}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {value.empresa}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {value.area}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {moment(value.fecha_insercion).format("LL")}
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
                          onClick={() => handeViewClick(value)}
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

export default ReportPrescripton;
