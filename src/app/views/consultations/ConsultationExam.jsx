import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Button } from "react-bootstrap";
import Select from "react-select";
import { NotificationManager } from "react-notifications";
import swal from "sweetalert2";

import ConsultationExamList from "./ConsultationExamList";
import Https from "../../api/Https";

const ConsultationExam = ({ history, idConsultation, idEmployee }) => {
  const [exams, setExams] = useState([]);
  const [consultationExams, setConsultationExams] = useState([]);

  const getExams = async () => {
    const res = await Https.get("consulta/exam");
    setExams(res);
  };

  const getConsultationExams = async () => {
    const res = await Https.post("consulta/get/exam", {
      idConsultation,
    });
    setConsultationExams(res);
  };

  const handleFormSubmit = async (values) => {
    let body = {
      idexam: values.exam,
      idconsultation: idConsultation,
      description: values.description,
      result: values.result,
    };
    const res = await Https.post("consulta/create/exam", body);
    if (res.code === 200) {
      NotificationManager.success(res.message, res.status);
    }
    formik.values.exam = "";
    formik.values.description = "";
    formik.values.result = "";
    await getConsultationExams();
  };

  const handleExams = async (values) => {
    formik.values.exam = values.value;
  };

  const handleFinish = () => {
    swal
      .fire({
        title: "¿Estas seguro de finalizar?",
        text: "¡Se procederá a crear la receta!",
        icon: "warning",
        type: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, finalizar",
        cancelButtonText: "No",
      })
      .then((result) => {
        if (result.value) {
          history.push(`/prescription/${idEmployee}/${idConsultation}`);
        } else {
          swal.fire({
            title: "¡Cencelado!",
            text: "Permiso denegado",
            type: "error",
            icon: "error",
            timer: 1500,
          });
        }
      });
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

  useEffect(() => {
    getExams();
    getConsultationExams();
  }, []);

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="position-relative">
        <div className="card">
          <div className="card-body">
            <div className="form-group row">
              <label htmlFor="disease" className="col-sm-2 col-form-label">
                Exámen:
              </label>
              <div className="col-sm-6">
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
          </div>
        </div>
        <br />
        <div className="d-flex justify-content-end">
          <Button type="submit">Guardar</Button>
          <Button className="mx-1" variant="info" onClick={handleFinish}>
            Finalizar consulta
          </Button>
        </div>
      </form>
      <br />
      {consultationExams.length > 0 && (
        <ConsultationExamList
          exams={consultationExams}
          getExams={getConsultationExams}
        />
      )}
    </div>
  );
};

export default ConsultationExam;
