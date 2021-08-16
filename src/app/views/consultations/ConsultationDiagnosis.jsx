import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Button } from "react-bootstrap";
import Select from "react-select";
import { NotificationManager } from "react-notifications";

import ConsultationDiagnosisList from "./ConsultationDiagnosisList";
import Https from "../../api/Https";

const ConsultationDiagnosis = ({ nextStep, idConsultation }) => {
  const [diseases, setDiseases] = useState([]);
  const [diagnostics, setDiagnostics] = useState([]);

  const getDiseases = async () => {
    const res = await Https.get("consulta/diseases");
    setDiseases(res);
  };

  const getDiagnostics = async () => {
    const res = await Https.post("consulta/get/diagnostics", {
      idConsultation,
      select: false,
    });
    setDiagnostics(res);
  };

  const handleFormSubmit = async (values) => {
    let body = {
      idconsultation: idConsultation,
      iddisease: values.disease,
      description: values.description,
    };
    const res = await Https.post("consulta/create/diagnostic", body);
    if (res.code === 200) {
      NotificationManager.success(res.message, res.status);
      // nextStep();
    }
    formik.values.disease = "";
    formik.values.description = "";
    await getDiagnostics();
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

  useEffect(() => {
    getDiseases();
    getDiagnostics();
  }, []);

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="position-relative">
        <div className="card">
          <div className="card-body">
            <div className="form-group row">
              <label htmlFor="disease" className="col-sm-2 col-form-label">
                Enfermedad:
              </label>
              <div className="col-sm-6">
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
          </div>
        </div>
        <br />
        <div className="d-flex justify-content-end">
          <Button type="submit">Guardar</Button>
        </div>
      </form>
      <br />
      {diagnostics.length > 0 && (
        <ConsultationDiagnosisList
          diagnostic={diagnostics}
          getDiagnostics={getDiagnostics}
        />
      )}
    </div>
  );
};

export default ConsultationDiagnosis;
