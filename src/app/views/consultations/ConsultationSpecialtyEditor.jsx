import React from "react";
import { useFormik } from "formik";
import { Modal, Button } from "react-bootstrap";
import { NotificationManager } from "react-notifications";
import Select from "react-select";

import Https from "../../api/Https";

const ConsultationSpecialtyEditor = ({
  show,
  toggleEditorDialog,
  getSpecialties,
  specialties,
  idconsultation,
}) => {
  const handleFormSubmit = async (values) => {
    let body = {
      idconsultation: idconsultation,
      idspecialty: values.specialty,
      description: values.description,
    };
    const res = await Https.post("consulta/create/specialty", body);
    if (res.code === 200) NotificationManager.success(res.message, res.status);
    formik.values.specialty = "";
    formik.values.description = "";
    await getSpecialties();
    await toggleEditorDialog(false);
  };

  const handleSpecialty = async (values) => {
    formik.values.specialty = values.value;
  };

  const validate = (values) => {
    const errors = {};

    if (!values.specialty) {
      errors.specialty = "Requerido";
    }

    if (!values.description) {
      errors.description = "Requerido";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      specialty: "",
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
          Nueva Especialidad
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
            <label htmlFor="specialty" className="col-sm-2 col-form-label">
              Especialidad:
            </label>
            <div className="col-sm-10">
              <Select
                className="basic-single"
                classNamePrefix="select"
                id="specialty"
                name="specialty"
                options={specialties}
                onChange={handleSpecialty}
                defaultValue={formik.values.specialty}
              />
              {formik.errors.specialty ? (
                <div className="text-danger">{formik.errors.specialty}</div>
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
                id="description2"
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

export default ConsultationSpecialtyEditor;
