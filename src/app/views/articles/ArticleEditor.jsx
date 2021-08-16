import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import Select from "react-select";

const ArticleEditor = ({
  show,
  toggleEditorDialog,
  initialValues,
  handleFormSubmit,
  brands,
  presentations,
  family,
  handleIdBrand,
  handleIdPresentation,
  handleIdFamily,
  defaultValuesBrand,
  defaultValuesFamily,
  defaultValuesPresentation,
}) => {
  return (
    <Modal show={show} onHide={toggleEditorDialog} size="lg" centered>
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          {initialValues ? "Editar" : "Nuevo"} Medicamento
        </h5>
        <button
          type="button"
          className="close"
          aria-label="Close"
          onClick={() => toggleEditorDialog(false)}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <Formik
          initialValues={
            initialValues
              ? initialValues
              : {
                  name: "",
                  description: "",
                  purchasePrice: "",
                  salePrice: "",
                  purchasedQuantity: "",
                  soldQuantity: "",
                  warranty: "",
                  expiration: "",
                  existence: "",
                  typeArticle: "",
                  idbrand: "",
                  idpresentation: "",
                  idfamily: "",
                }
          }
          validationSchema={articleSchema}
          enableReinitialize={true}
          onSubmit={handleFormSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit} className="position-relative">
              <div className="form-group row">
                <label htmlFor="name" className="col-sm-2 col-form-label">
                  Nombre:
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    value={values.name}
                    placeholder="Nombre"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div className="text-danger">
                    {errors.name && touched.name && errors.name}
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="description"
                  className="col-sm-2 col-form-label"
                >
                  Descripción:
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    value={values.description}
                    placeholder="Descripción"
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div className="text-danger">
                    {errors.description &&
                      touched.description &&
                      errors.description}
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="idbrand" className="col-sm-2 col-form-label">
                  Marca:
                </label>
                <div className="col-sm-10">
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    name="idbrand"
                    options={brands}
                    onChange={handleIdBrand}
                    defaultValue={defaultValuesBrand}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="idpresentation"
                  className="col-sm-2 col-form-label"
                >
                  Presentación:
                </label>
                <div className="col-sm-10">
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    name="idpresentation"
                    options={presentations}
                    onChange={handleIdPresentation}
                    defaultValue={defaultValuesPresentation}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="idfamily" className="col-sm-2 col-form-label">
                  Familia:
                </label>
                <div className="col-sm-10">
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    name="idfamily"
                    options={family}
                    onChange={handleIdFamily}
                    defaultValue={defaultValuesFamily}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="purchasePrice"
                  className="col-sm-2 col-form-label"
                >
                  Precio Compra:
                </label>
                <div className="col-sm-4">
                  <input
                    type="number"
                    className="form-control"
                    value={values.purchasePrice}
                    placeholder="Q."
                    name="purchasePrice"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div className="text-danger">
                    {errors.purchasePrice &&
                      touched.purchasePrice &&
                      errors.purchasePrice}
                  </div>
                </div>
                <label htmlFor="salePrice" className="col-sm-2 col-form-label">
                  Precio Venta:
                </label>
                <div className="col-sm-4">
                  <input
                    type="number"
                    className="form-control"
                    value={values.salePrice}
                    placeholder="Q."
                    name="salePrice"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div className="text-danger">
                    {errors.salePrice && touched.salePrice && errors.salePrice}
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="purchasedQuantity"
                  className="col-sm-2 col-form-label"
                >
                  Cant. Comprada:
                </label>
                <div className="col-sm-4">
                  <input
                    type="number"
                    className="form-control"
                    value={values.purchasedQuantity}
                    placeholder="Cant."
                    name="purchasedQuantity"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div className="text-danger">
                    {errors.purchasedQuantity &&
                      touched.purchasedQuantity &&
                      errors.purchasedQuantity}
                  </div>
                </div>
                <label
                  htmlFor="soldQuantity"
                  className="col-sm-2 col-form-label"
                >
                  Cant. Vendida:
                </label>
                <div className="col-sm-4">
                  <input
                    type="number"
                    className="form-control"
                    value={values.soldQuantity}
                    placeholder="Cant."
                    name="soldQuantity"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div className="text-danger">
                    {errors.soldQuantity &&
                      touched.soldQuantity &&
                      errors.soldQuantity}
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="warranty" className="col-sm-2 col-form-label">
                  Garantía:
                </label>
                <div className="col-sm-4">
                  <input
                    type="date"
                    className="form-control form-control"
                    value={values.warranty}
                    placeholder="yyyy-mm-dd"
                    name="warranty"
                    min="1800-01-01"
                    max="2050-12-31"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <label htmlFor="expiration" className="col-sm-2 col-form-label">
                  Expiración:
                </label>
                <div className="col-sm-4">
                  <input
                    type="date"
                    className="form-control form-control"
                    value={values.expiration}
                    placeholder="yyyy-mm-dd"
                    name="expiration"
                    min="1800-01-01"
                    max="2050-12-31"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="existence" className="col-sm-2 col-form-label">
                  Existencia:
                </label>
                <div className="col-sm-4">
                  <input
                    type="number"
                    className="form-control"
                    value={values.existence}
                    placeholder="Exist."
                    name="existence"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div className="text-danger">
                    {errors.existence && touched.existence && errors.existence}
                  </div>
                </div>
                <label
                  htmlFor="typeArticle"
                  className="col-sm-2 col-form-label"
                >
                  Tipo Artículo:
                </label>
                <div className="col-sm-4">
                  <select
                    className="form-control"
                    name="typeArticle"
                    value={values.typeArticle}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value={0}>Seleccione</option>
                    <option value={1}>Original</option>
                    <option value={2}>Generico</option>
                  </select>
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <Button type="submit">Guardar</Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

const articleSchema = yup.object().shape({
  name: yup.string().required("es requerido"),
  description: yup.string().required("es requerido"),
  purchasePrice: yup.string().required("es requerido"),
  salePrice: yup.string().required("es requerido"),
  purchasedQuantity: yup.string().required("es requerido"),
  soldQuantity: yup.string().required("es requerido"),
  existence: yup.string().required("es requerido"),
});

export default ArticleEditor;
