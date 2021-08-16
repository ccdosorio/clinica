import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useFormik } from "formik";
import { NotificationManager } from "react-notifications";
import Https from "../../api/Https";
import ConsultationSymptomsList from "./ConsultationSymptomsList";

const ConsultationSymptoms = ({ nextStep, idConsultation }) => {
  const [symptoms, setSymptoms] = useState([]);

  const getSymptoms = async () => {
    const res = await Https.post("consulta/get/symptoms", { idConsultation });
    setSymptoms(res);
  };

  const handleFormSubmit = async (values) => {
    let body = {
      idconsultation: idConsultation,
      description: values.description,
      dateInitial: values.dateInitial,
    };
    const res = await Https.post("consulta/create/symptoms", body);
    if (res.code === 200) {
      NotificationManager.success(res.message, res.status);
      // nextStep();
    }
    formik.values.dateInitial = "";
    formik.values.description = "";
    await getSymptoms();
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

  const formik = useFormik({
    initialValues: {
      dateInitial: "",
      description: "",
    },
    validate,
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });

  useEffect(() => {
    getSymptoms();
  }, []);

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="position-relative">
        <div className="card">
          <div className="card-body">
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
          </div>
        </div>
        <br />
        <div className="d-flex justify-content-end">
          <Button type="submit">Guardar</Button>
        </div>
      </form>
      <br />
      {symptoms.length > 0 && (
        <ConsultationSymptomsList
          symptom={symptoms}
          getSymptoms={getSymptoms}
        />
      )}
    </div>
  );
};

export default ConsultationSymptoms;
