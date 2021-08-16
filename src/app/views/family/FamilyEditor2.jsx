import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Formik } from "formik";
import Select from "react-select";
import * as yup from "yup";

const FamilyEditor = ({
  show,
  toggleEditorDialog,
  initialValues,
  handleFormSubmit,
  employees,
  defaultValueEmployee,
}) => {
  return (
    <Modal show={show} onHide={toggleEditorDialog} size="lg" centered>
      <div className="modal-header">
        <h5 className="modal-title">
          {initialValues ? "Editar" : "Nuevo"} Familiar
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
                  idemployee: "",
                  names: "",
                  surname: "",
                  gender: "",
                  mobile: "",
                  email: "",
                  address: "",
                  birthday: "",
                  dpi: "",
                  type: "",
                }
          }
          validationSchema={familySchema}
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
                <label htmlFor="idemployee" className="col-sm-2 col-form-label">
                  Empleado:
                </label>
                <div className="col-sm-10">
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    name="idemployee"
                    options={employees}
                    onChange={(selected) => {
                      values.idemployee = selected.value;
                    }}
                    onBlur={handleBlur}
                    defaultValue={defaultValueEmployee}
                  />
                  <div className="text-danger">
                    {errors.idemployee &&
                      touched.idemployee &&
                      errors.idemployee}
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="name" className="col-sm-2 col-form-label">
                  Nombre:
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    value={values.names}
                    placeholder="Nombre"
                    name="names"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div className="text-danger">
                    {errors.names && touched.names && errors.names}
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="surname" className="col-sm-2 col-form-label">
                  Apellido:
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="surname"
                    placeholder="Apellido"
                    name="surname"
                    value={values.surname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div className="text-danger">
                    {errors.surname && touched.surname && errors.surname}
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="gender" className="col-sm-2 col-form-label">
                  Género:
                </label>
                <div className="col-sm-4">
                  <select
                    id="gender"
                    className="form-control"
                    name="gender"
                    value={values.gender}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="">Selecciona el género</option>
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                  </select>
                  <div className="text-danger">
                    {errors.gender && touched.gender && errors.gender}
                  </div>
                </div>
                <label htmlFor="mobile" className="col-sm-2 col-form-label">
                  Celular:
                </label>
                <div className="col-sm-4">
                  <input
                    type="text"
                    className="form-control"
                    id="mobile"
                    placeholder="Celular"
                    name="mobile"
                    value={values.mobile}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div className="text-danger">
                    {errors.mobile && touched.mobile && errors.mobile}
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="email" className="col-sm-2 col-form-label">
                  Correo:
                </label>
                <div className="col-sm-10">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Correo electrónico"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div className="text-danger">
                    {errors.email && touched.email && errors.email}
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="address" className="col-sm-2 col-form-label">
                  Dirección:
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="Dirección"
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="birthday" className="col-sm-2 col-form-label">
                  Fecha de Nacimiento:
                </label>
                <div className="col-sm-4">
                  <input
                    type="date"
                    className="form-control form-control"
                    id="birthday"
                    value={values.birthday}
                    placeholder="yyyy-mm-dd"
                    name="birthday"
                    min="1800-01-01"
                    max="2050-12-31"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <label htmlFor="dpi" className="col-sm-2 col-form-label">
                  DPI:
                </label>
                <div className="col-sm-4">
                  <input
                    type="text"
                    className="form-control"
                    id="dpi"
                    placeholder="DPI"
                    name="dpi"
                    value={values.dpi}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div className="text-danger">
                    {errors.dpi && touched.dpi && errors.dpi}
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="type" className="col-sm-2 col-form-label">
                  Parentezco:
                </label>
                <div className="col-sm-4">
                  <select
                    id="type"
                    className="form-control"
                    name="type"
                    value={values.type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="0">Selecciona el parentezco</option>
                    <option value="1">Papá</option>
                    <option value="2">Mamá</option>
                    <option value="3">Hijo</option>
                    <option value="4">Hija</option>
                    <option value="5">Tio</option>
                    <option value="6">Tia</option>
                    <option value="7">Esposa</option>
                    <option value="8">Esposo</option>
                    <option value="9">Abuelo</option>
                    <option value="10">Abuela</option>
                    <option value="11">Hermano</option>
                    <option value="12">Hermana</option>
                  </select>
                  <div className="text-danger">
                    {errors.type && touched.type && errors.type}
                  </div>
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

const familySchema = yup.object().shape({
  names: yup.string().required("es requerido"),
  idemployee: yup.string().required("es requerido"),
  surname: yup.string().required("es requerido"),
  gender: yup.string().required("es requerido"),
  mobile: yup.string().required("es requerido"),
  dpi: yup
    .string()
    .required("es requerido")
    .matches(/^[0-9]{4}\s?[0-9]{5}\s?[0-9]{4}$/, "ingresa un DPI válido"),
  type: yup.string().required("es requerido"),
  email: yup.string().email("correo inválido").required("es requerido"),
});

export default FamilyEditor;
