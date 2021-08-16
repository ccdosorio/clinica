import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";

const MedicineEditor = ({
  show,
  toggleEditorDialog,
  initialValues,
  handleFormSubmit,
}) => {
  return (
    <Modal show={show} onHide={toggleEditorDialog} centered>
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
                }
          }
          validationSchema={medicineSchema}
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

const medicineSchema = yup.object().shape({
  name: yup.string().required("es requerido"),
  description: yup.string().required("es requerido"),
});

export default MedicineEditor;
