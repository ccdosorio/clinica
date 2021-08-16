import React from "react";
import { Modal, Button } from "react-bootstrap";
import { NotificationContainer } from "react-notifications";
import { Formik } from "formik";
import * as yup from "yup";

const ConsultationNewEditor = ({
  show,
  toggleEditorDialog,
  handleFormSubmit,
}) => {
  return (
    <Modal show={show} onHide={toggleEditorDialog} centered>
      <div className="modal-header">
        <h5 className="modal-title">Nueva consulta</h5>
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
          initialValues={{ date: "", title: "" }}
          validationSchema={validateSchema}
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
                  Próxima consulta:
                </label>
                <div className="col-sm-10">
                  <input
                    type="date"
                    placeholder="yyyy-mm-dd"
                    min="1800-01-01"
                    max="2050-12-31"
                    className="form-control"
                    id="date"
                    value={values.date}
                    onChange={handleChange}
                    name="date"
                  />
                  <div className="text-danger">
                    {errors.date && touched.date && errors.date}
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="title" className="col-sm-2 col-form-label">
                  Título:
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    value={values.title}
                    placeholder="Título"
                    name="title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div className="text-danger">
                    {errors.title && touched.title && errors.title}
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
      <NotificationContainer />
    </Modal>
  );
};

const validateSchema = yup.object().shape({
  date: yup.string().required("es requerido"),
  title: yup.string().required("es requerido"),
});

export default ConsultationNewEditor;
