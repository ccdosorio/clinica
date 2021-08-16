import React from "react";
import { useFormik } from "formik";
import { Modal, Button } from "react-bootstrap";
import moment from "moment";
import Select from "react-select";

const ConsultationEditor = ({
  show,
  initialValues,
  toggleEditorDialog,
  handleFormSubmit,
  filterFamily,
}) => {
  const handleFamily = async (values) => {
    formik.values.idfamily = values.value;
  };
  const validate = (values) => {
    const errors = {};

    if (!values.iddoctor) {
      errors.iddoctor = "Requerido";
    }

    if (!values.temperature) {
      errors.temperature = "Requerido";
    }

    if (!values.oxygen) {
      errors.oxygen = "Requerido";
    }

    if (!values.idclinic) {
      errors.idclinic = "Requerido";
    }

    if (!values.blood_pressure) {
      errors.blood_pressure = "Requerido";
    }

    if (!values.weight) {
      errors.weight = "Requerido";
    }

    if (!values.height) {
      errors.height = "Requerido";
    }

    if (!values.abdominal_circumference) {
      errors.abdominal_circumference = "Requerido";
    }

    if (!values.heart_rate) {
      errors.heart_rate = "Requerido";
    }

    if (!values.respiratory_rate) {
      errors.respiratory_rate = "Requerido";
    }

    if (!values.abdominal_circumference) {
      errors.abdominal_circumference = "Requerido";
    }

    return errors;
  };

  const stateInitial = () => {
    stateInitial = {};
    initialValues
      ? (stateInitial = initialValues)
      : (stateInitial = {
          iddoctor: "",
          temperature: "",
          oxygen: "",
          idclinic: "",
          blood_pressure: "",
          weight: "",
          height: "",
          heart_rate: "",
          respiratory_rate: "",
          abdominal_circumference: "",
          idfamily: "",
        });
    return stateInitial;
  };

  const formik = useFormik({
    initialValues: stateInitial,
    validate,
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });
  return (
    <Modal show={show} onHide={toggleEditorDialog} centered>
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          {initialValues ? "Editar" : "Nueva"} Consulta{" "}
          <b>{moment().format("LL")}</b>
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
            <label htmlFor="idfamily" className="col-sm-2 col-form-label">
              Familiar
            </label>
            <div className="col-sm-10">
              <Select
                className="basic-single"
                classNamePrefix="select"
                placeholder="Seleccione"
                id="idfamily"
                name="idfamily"
                options={filterFamily}
                onChange={handleFamily}
                defaultValue={formik.values.idfamily}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="iddoctor" className="col-sm-2 col-form-label">
              Doctor
            </label>
            <div className="col-sm-10">
              <select
                id="iddoctor"
                className="form-control"
                name="iddoctor"
                value={formik.values.iddoctor}
                onChange={formik.handleChange}
              >
                <option value="">Selecciona una opción</option>
                <option value={1}>Alfonso Ramírez</option>
              </select>
              {formik.errors.iddoctor ? (
                <div className="text-danger">{formik.errors.iddoctor}</div>
              ) : null}
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="temperature" className="col-sm-2 col-form-label">
              Temperatura
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="temperature"
                placeholder="Temperatura"
                name="temperature"
                onChange={formik.handleChange}
                value={formik.values.temperature}
              />
              {formik.errors.temperature ? (
                <div className="text-danger">{formik.errors.temperature}</div>
              ) : null}
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="oxygen" className="col-sm-2 col-form-label">
              Oxígeno
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="oxygen"
                placeholder="Oxígeno"
                name="oxygen"
                onChange={formik.handleChange}
                value={formik.values.oxygen}
              />
              {formik.errors.oxygen ? (
                <div className="text-danger">{formik.errors.oxygen}</div>
              ) : null}
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="idclinic" className="col-sm-2 col-form-label">
              Clínica
            </label>
            <div className="col-sm-10">
              <select
                id="idclinic"
                className="form-control"
                name="idclinic"
                value={formik.values.idclinic}
                onChange={formik.handleChange}
              >
                <option value="">Selecciona una opción</option>
                <option value={1}>Clinica Interna</option>
                <option value={2}>Clinica Externa</option>
              </select>
              {formik.errors.idclinic ? (
                <div className="text-danger">{formik.errors.idclinic}</div>
              ) : null}
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="blood_pressure" className="col-sm-2 col-form-label">
              Presión Arterial
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="blood_pressure"
                placeholder="Presión Arterial"
                name="blood_pressure"
                onChange={formik.handleChange}
                value={formik.values.blood_pressure}
              />
              {formik.errors.blood_pressure ? (
                <div className="text-danger">
                  {formik.errors.blood_pressure}
                </div>
              ) : null}
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="weight" className="col-sm-2 col-form-label">
              Peso kg.
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="weight"
                placeholder="Peso (Kilogramos)"
                name="weight"
                onChange={formik.handleChange}
                value={formik.values.weight}
              />
              {formik.errors.weight ? (
                <div className="text-danger">{formik.errors.weight}</div>
              ) : null}
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="height" className="col-sm-2 col-form-label">
              Altura m.
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="height"
                placeholder="Altura (metros)"
                name="height"
                onChange={formik.handleChange}
                value={formik.values.height}
              />
              {formik.errors.height ? (
                <div className="text-danger">{formik.errors.height}</div>
              ) : null}
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="heart_rate" className="col-sm-2 col-form-label">
              Frecuencia Cardiaca
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="heart_rate"
                placeholder="Frecuencia Cardiaca"
                name="heart_rate"
                onChange={formik.handleChange}
                value={formik.values.heart_rate}
              />
              {formik.errors.heart_rate ? (
                <div className="text-danger">{formik.errors.heart_rate}</div>
              ) : null}
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="respiratory_rate"
              className="col-sm-2 col-form-label"
            >
              Frecuencia Respiratoria
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="respiratory_rate"
                placeholder="Frecuencia Respiratoria"
                name="respiratory_rate"
                onChange={formik.handleChange}
                value={formik.values.respiratory_rate}
              />
              {formik.errors.respiratory_rate ? (
                <div className="text-danger">
                  {formik.errors.respiratory_rate}
                </div>
              ) : null}
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="abdominal_circumference"
              className="col-sm-2 col-form-label"
            >
              Circunferencia Abdominal
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="abdominal_circumference"
                placeholder="Circunferencia Abdominal"
                name="abdominal_circumference"
                onChange={formik.handleChange}
                value={formik.values.abdominal_circumference}
              />
              {formik.errors.abdominal_circumference ? (
                <div className="text-danger">
                  {formik.errors.abdominal_circumference}
                </div>
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

export default ConsultationEditor;
