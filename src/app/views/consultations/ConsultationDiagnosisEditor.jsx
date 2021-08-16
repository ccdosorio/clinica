import React from "react";
import { useFormik } from "formik";
import { Modal, Button } from "react-bootstrap";
import { NotificationManager } from "react-notifications";
import Select from "react-select";

import Https from "../../api/Https";

const ConsultationDiagnosisEditor = ({
  show,
  toggleEditorDialog,
  getDiagnostics,
  diseases,
  idconsultation,
}) => {
  const handleFormSubmit = async (values) => {
    let body = {
      idconsultation: idconsultation,
      iddisease: values.disease,
      description: values.description,
    };
    const res = await Https.post("consulta/create/diagnostic", body);
    if (res.code === 200) NotificationManager.success(res.message, res.status);
    formik.values.disease = "";
    formik.values.description = "";
    await getDiagnostics();
    await toggleEditorDialog(false);
  };

  const handleDiseases = async (values) => {
    formik.values.disease = values.value;
  };

  const validate = (values) => {
    const errors = {};

    if (!values.disease) {
      errors.disease = "Requerido";
    }

    if (!values.description) {
      errors.description = "Requerido";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      disease: "",
      description: "",
    },
    validate,
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });
  return (
    <Modal show={show} onHide={toggleEditorDialog} centered>
      <div className="modal-header">
        <h5 className="modal-title" id="modalSymptom">
          Nuevo Diagnóstico
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
            <label htmlFor="disease" className="col-sm-2 col-form-label">
              Enfermedad:
            </label>
            <div className="col-sm-10">
              <Select
                className="basic-single"
                classNamePrefix="select"
                id="disease"
                name="disease"
                options={diseases}
                onChange={handleDiseases}
                defaultValue={formik.values.disease}
              />
              {formik.errors.disease ? (
                <div className="text-danger">{formik.errors.disease}</div>
              ) : null}
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="description" className="col-sm-2 col-form-label">
              Descripción
            </label>
            <div className="col-sm-10">
              <textarea
                className="form-control"
                name="description"
                id="description3"
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
          <br />
          <div className="d-flex justify-content-end">
            <Button type="submit">Guardar</Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ConsultationDiagnosisEditor;
