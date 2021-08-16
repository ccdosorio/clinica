import React from "react";
import { useFormik } from "formik";
import { Modal, Button } from "react-bootstrap";
import { NotificationManager } from "react-notifications";
import Select from "react-select";

import Https from "../../api/Https";

const ConsultationExamEditor = ({
  show,
  toggleEditorDialog,
  getExams,
  exams,
  idconsultation,
}) => {
  const handleFormSubmit = async (values) => {
    let body = {
      idexam: values.exam,
      idconsultation: idconsultation,
      description: values.description,
      result: values.result,
    };
    const res = await Https.post("consulta/create/exam", body);
    if (res.code === 200) NotificationManager.success(res.message, res.status);
    formik.values.exam = "";
    formik.values.description = "";
    formik.values.result = "";
    await getExams();
    await toggleEditorDialog(false);
  };

  const handleExams = async (values) => {
    formik.values.exam = values.value;
  };

  const validate = (values) => {
    const errors = {};

    if (!values.exam) {
      errors.exam = "Requerido";
    }

    if (!values.description) {
      errors.description = "Requerido";
    }

    if (!values.result) {
      errors.result = "Requerido";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      exam: "",
      description: "",
      result: "",
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
          Nuevo Exámen
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
              Exámen:
            </label>
            <div className="col-sm-10">
              <Select
                className="basic-single"
                classNamePrefix="select"
                id="exam"
                name="exam"
                options={exams}
                onChange={handleExams}
                defaultValue={formik.values.exam}
              />
              {formik.errors.exam ? (
                <div className="text-danger">{formik.errors.exam}</div>
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
                id="description4"
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
          <div className="form-group row">
            <label htmlFor="result" className="col-sm-2 col-form-label">
              Resultado
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="result"
                placeholder="Resultado"
                name="result"
                value={formik.values.result}
                onChange={formik.handleChange}
              />
              {formik.errors.result ? (
                <div className="text-danger">{formik.errors.result}</div>
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

export default ConsultationExamEditor;
