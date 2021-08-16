import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Button } from "react-bootstrap";
import Select from "react-select";
import { NotificationManager } from "react-notifications";

import ConsultationSpecialtyList from "./ConsultationSpecialtyList";
import Https from "../../api/Https";

const ConsultationSpecialty = ({ nextStep, idConsultation }) => {
  const [specialties, setSpecialties] = useState([]);
  const [consultationSpecialty, setConsultationSpecialty] = useState([]);

  const getSpecialties = async () => {
    const res = await Https.get("consulta/specialties");
    let specialties = res.map(({ idespecialidad, nombre }) => {
      if (nombre !== null) {
        return {
          label: nombre,
          value: idespecialidad,
        };
      } else {
        return false;
      }
    });
    setSpecialties(specialties);
  };

  const getConsultationSpecialty = async () => {
    const res = await Https.post("consulta/get/specialty", { idConsultation });
    setConsultationSpecialty(res);
  };

  const handleFormSubmit = async (values) => {
    let body = {
      idconsultation: idConsultation,
      idspecialty: values.specialty,
      description: values.description,
    };
    const res = await Https.post("consulta/create/specialty", body);
    if (res.code === 200) {
      NotificationManager.success(res.message, res.status);
      // nextStep();
    }
    formik.values.specialty = "";
    formik.values.description = "";
    await getConsultationSpecialty();
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

  useEffect(() => {
    getSpecialties();
    getConsultationSpecialty();
  }, []);

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="position-relative">
        <div className="card">
          <div className="card-body">
            <div className="form-group row">
              <label htmlFor="specialty" className="col-sm-2 col-form-label">
                Especialidad:
              </label>
              <div className="col-sm-6">
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
          </div>
        </div>
        <br />
        <div className="d-flex justify-content-end">
          <Button type="submit">Guardar</Button>
        </div>
      </form>
      <br />
      {consultationSpecialty.length > 0 && (
        <ConsultationSpecialtyList
          specialty={consultationSpecialty}
          getSpecialties={getConsultationSpecialty}
        />
      )}
    </div>
  );
};

export default ConsultationSpecialty;
