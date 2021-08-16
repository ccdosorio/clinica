import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useFormik } from "formik";
import { NotificationManager } from "react-notifications";

import Https from "../../api/Https";

const ConsultationSymptomsEditor = ({
  show,
  toggleEditorDialog,
  getSymptoms,
  idconsultation,
  valuesInitial,
}) => {
  const handleFormSubmit = async (values) => {
    let body = {
      idconsultation: idconsultation,
      description: values.description,
      dateInitial: values.dateInitial,
    };
    const res = await Https.post("consulta/create/symptoms", body);
    if (res.code === 200) NotificationManager.success(res.message, res.status);
    formik.values.dateInitial = "";
    formik.values.description = "";
    await getSymptoms();
    await toggleEditorDialog(false);
  };

  const validate = (values) => {
    const errors = {};

    if (!values.dateInitial) {
      errors.dateInitial = "Requerido";
    }

    if (!values.description) {
      errors.description = "Requerido";
    }

    return errors;
  };

  const initialValues = () => {
    const stateDialog = {};
    if (valuesInitial) {
      stateDialog = valuesInitial;
    } else {
      stateDialog = { dateInitial: "", description: "" };
    }

    return stateDialog;
  };

  const formik = useFormik({
    initialValues: { dateInitial: "", description: "" },
    validate,
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });
  return (
    <Modal show={show} onHide={toggleEditorDialog} centered>
      <div className="modal-header">
        <h5 className="modal-title" id="modalSymptom">
          {initialValues ? "Editar" : "Nuevo"} Síntoma
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
        <form onSubmit={formik.handleSubmit} className="position-relative">
          <div className="form-group row">
            <label htmlFor="date" className="col-sm-2 col-form-label">
              Fecha Inicial
            </label>
            <div className="col-sm-10">
              <input
                type="date"
                placeholder="yyyy-mm-dd"
                min="1800-01-01"
                max="2050-12-31"
                className="form-control"
                id="dateInitial"
                value={formik.values.dateInitial}
                onChange={formik.handleChange}
                name="dateInitial"
              />
              {formik.errors.dateInitial ? (
                <div className="text-danger">{formik.errors.dateInitial}</div>
              ) : null}
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="temperature" className="col-sm-2 col-form-label">
              Descripción
            </label>
            <div className="col-sm-10">
              <textarea
                className="form-control"
                name="description"
                id="description"
                cols="20"
                rows="10"
                placeholder="Descripción"
                onChange={formik.handleChange}
                value={formik.values.description}
              ></textarea>
              {formik.errors.description ? (
                <div className="text-danger">{formik.errors.description}</div>
              ) : null}
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <Button type="submit">Guardar</Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ConsultationSymptomsEditor;
