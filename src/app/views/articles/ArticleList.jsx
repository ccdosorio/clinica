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
import ArticleEditor from "./ArticleEditor";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(0);
  const [numberPages, setNumberPages] = useState(10);
  const [numberRecords, setNumberRecords] = useState(0);
  const [showEditorDialog, setShowEditorDialog] = useState(false);
  const [dialogValues, setDialogValues] = useState(null);
  const [brands, setBrands] = useState([]);
  const [id_brand, setIdBrand] = useState(null);
  const [presentations, setPresentations] = useState([]);
  const [id_presentation, setIdPresentation] = useState(null);
  const [family, setFamily] = useState([]);
  const [id_family, setIdFamily] = useState(null);
  const [defaultValuesBrand, setDefaultValuesBrand] = useState(null);
  const [defaultValuesFamily, setDefaultValuesFamily] = useState(null);
  const [defaultValuesPresentation, setDefaultValuesPresentation] =
    useState(null);

  const getArticles = async () => {
    let body = { select: false, no_pagina: page, paginas: numberPages };
    const res = await Https.post("consulta/articles", body);
    setNumberRecords(res[0].cantidad);
    setArticles(res);
    setIdBrand(res[0].idmarca);
    setIdPresentation(res[0].idpresentacion);
    setIdFamily(res[0].idfamilia);
  };

  const handlePageClick = async (data) => {
    let pageSelected = data.selected * numberPages;
    let body = { select: false, no_pagina: pageSelected, paginas: numberPages };
    const res = await Https.post("consulta/articles", body);
    setArticles(res);
    setPage(pageSelected);
  };

  const handleShowMedicines = async (event) => {
    let pag = parseInt(event.target.value);
    setNumberPages(pag);
    let body = { select: false, no_pagina: page, paginas: pag };
    const res = await Https.post("consulta/articles", body);
    setArticles(res);
    setPage(page);
  };

  // Agregar y Editar

  const handleFormSubmit = async (values) => {
    let body = {
      ...values,
      idbrand: id_brand,
      idpresentation: id_presentation,
      idfamily: id_family,
    };
    if (!dialogValues) {
      const res = await Https.post("articles/create", body);
      res.code === 200 && NotificationManager.success(res.message, res.status);
    } else {
      const res = await Https.post("articles/edit", body);
      res.code === 200 && NotificationManager.success(res.message, res.status);
    }
    await getArticles();
    await toggleEditorDialog(false);
  };

  const handleEditArticle = async (dialogValues) => {
    let dialog = {
      idarticle: dialogValues.idarticulo,
      name: dialogValues.nombre,
      description: dialogValues.descripcion,
      purchasePrice: dialogValues.precioCompra,
      salePrice: dialogValues.precioVenta,
      purchasedQuantity: dialogValues.cantidadComprada,
      soldQuantity: dialogValues.cantidadVentidad,
      warranty: dialogValues.garantia,
      expiration: dialogValues.expiracion,
      existence: dialogValues.existencia,
      typeArticle: dialogValues.idTipoArticulo,
      idbrand: id_brand,
      idpresentation: id_presentation,
      idfamily: id_family,
    };

    let defaultValuesBrand = {
      label: dialogValues.marca,
      value: dialogValues.idmarca,
    };

    let defaultValuesFamily = {
      label: dialogValues.familia,
      value: dialogValues.idfamilia,
    };

    let defaultValuesPresentation = {
      label: dialogValues.presentacion,
      value: dialogValues.idpresentacion,
    };

    setDefaultValuesBrand(defaultValuesBrand);
    setDefaultValuesFamily(defaultValuesFamily);
    setDefaultValuesPresentation(defaultValuesPresentation);
    setDialogValues(dialog);
    setShowEditorDialog(true);
  };

  const handleDeleteArticle = async (values) => {
    let body = { idarticle: values.idarticulo };
    const res = await Https.post("articles/delete", body);
    res.code === 200 && NotificationManager.success(res.message, res.status);
    await getArticles();
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

  const getBrands = async () => {
    let body = { type: 1 };
    const res = await Https.post("articles/filters", body);
    setBrands(res);
  };

  const handleIdBrand = async (value) => {
    setIdBrand(value.value);
  };

  const getPresentations = async () => {
    let body = { type: 2 };
    const res = await Https.post("articles/filters", body);
    setPresentations(res);
  };

  const handleIdPresentation = async (value) => {
    setIdPresentation(value.value);
  };

  const getFamily = async () => {
    let body = { type: 3 };
    const res = await Https.post("articles/filters", body);
    setFamily(res);
  };

  const handleIdFamily = async (value) => {
    setIdFamily(value.value);
  };

  useEffect(() => {
    getArticles();
    getBrands();
    getPresentations();
    getFamily();
  }, []);

  return (
    <div>
      <Breadcrumb
        routeSegments={[
          { name: "Inicio", path: "/home" },
          { name: "Listado de Artículos" },
        ]}
      ></Breadcrumb>
      <div className="card-header text-right bg-transparent">
        <button
          type="button"
          className="btn btn-primary btn-md m-1"
          onClick={toggleEditorDialog}
        >
          <i className="i-Medicine text-white mr-2"></i> Agregar Artículo
        </button>
      </div>
      {articles.length < 1 ? (
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
                      onChange={handleShowMedicines}
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
                  <th className="px-0">Descripción</th>
                  <th className="px-0">Presentación</th>
                  <th className="px-0">Marca</th>
                  <th className="px-0">Familia</th>
                  <th className="px-0">Cant. C</th>
                  <th className="px-0">Cant. V</th>
                  <th className="px-0">Exis.</th>
                  <th className="px-0">P.C</th>
                  <th className="px-0">P.V</th>
                  <th className="px-0">Fecha C.</th>
                  <th className="px-0">Estado</th>
                  <th className="px-0">Opciones</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((item) => (
                  <tr key={item.idarticulo}>
                    <td className="pl-sm-24 capitalize" align="left">
                      {item.idarticulo}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {item.nombre}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {item.descripcion}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {item.presentacion}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {item.marca}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {item.familia}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {item.cantidadComprada}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {item.cantidadVentidad}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {item.existencia}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      Q. {item.precioCompra}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      Q. {item.precioVenta}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {moment(item.fecha_insercion).format("LL")}
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
                    <td>
                      <div className="d-flex">
                        <div className="cursor-pointer mr-3">
                          <MdEdit
                            className="text-success"
                            size={18}
                            onClick={() => handleEditArticle(item)}
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
                                    handleDeleteArticle(item);
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
      <ArticleEditor
        show={showEditorDialog}
        toggleEditorDialog={toggleEditorDialog}
        handleFormSubmit={handleFormSubmit}
        initialValues={dialogValues}
        brands={brands}
        presentations={presentations}
        family={family}
        handleIdBrand={handleIdBrand}
        handleIdPresentation={handleIdPresentation}
        handleIdFamily={handleIdFamily}
        defaultValuesBrand={defaultValuesBrand}
        defaultValuesFamily={defaultValuesFamily}
        defaultValuesPresentation={defaultValuesPresentation}
      ></ArticleEditor>
      <NotificationContainer />
    </div>
  );
};

export default ArticleList;
