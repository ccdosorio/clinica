import React, { useState } from "react";
import { useFormik } from "formik";
import Select from "react-select";
import { NotificationManager } from "react-notifications";

import Https from "../../api/Https";

const PrescriptionInternalCreate = (props) => {
  const [flag, setFlag] = useState(false);

  const handleDiagnostic = async (values) => {
    formik.values.diagnostic = values.value;
  };

  const handleArticle = async (values) => {
    formik.values.article = values.value;
  };

  const handleFormSubmitPrescriptionInternal = async (values) => {
    let body = {
      idconsultation: props.idconsultation,
      iddiagnostic: values.diagnostic,
      idarticle: values.article,
      quantity: values.quantity,
      days: values.days,
      description: values.description,
    };
    const res = await Https.post("consulta/create/prescription/internal", body);
    if (res.code === 200) {
      NotificationManager.info(res.message, res.status);
      setFlag(true);
    }
    setTimeout(() => {
      formik.values.quantity = "";
      formik.values.days = "";
      formik.values.description = "";
      setFlag(false);
    }, 2000);
    await props.getPrescriptions();
  };

  const validate = (values) => {
    const errors = {};

    if (!values.diagnostic) {
      errors.diagnostic = "Requerido";
    }

    if (!values.article) {
      errors.article = "Requerido";
    }

    if (!values.quantity) {
      errors.quantity = "Requerido";
    }

    if (!values.days) {
      errors.days = "Requerido";
    }

    if (!values.description) {
      errors.description = "Requerido";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      diagnostic: 0,
      article: 0,
      quantity: "",
      days: "",
      description: "",
    },
    validate,
    onSubmit: (values) => {
      handleFormSubmitPrescriptionInternal(values);
    },
  });
  return (
    <div className="col-lg-6 mb-3">
      <div className="card" style={{ width: "100%", height: "100%" }}>
        <div className="card-header bg-transparent">
          <h3 className="card-title">Receta Interna</h3>
        </div>
        {flag ? (
          <div className="card-body">
            <span className="spinner-glow spinner-glow-primary mr-5"></span>
          </div>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <div className="card-body">
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label htmlFor="diagnostic" className="ul-form__label">
                    Diagnóstico:
                  </label>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    id="diagnostic"
                    name="diagnostic"
                    options={props.diagnostics}
                    onChange={handleDiagnostic}
                    defaultValue={formik.values.diagnostic}
                  />
                  {formik.errors.diagnostic ? (
                    <small className="ul-form__text form-text text-danger">
                      {formik.errors.diagnostic}
                    </small>
                  ) : null}
                </div>
                <div className="form-group col-md-12">
                  <label htmlFor="article" className="ul-form__label">
                    Artículo:
                  </label>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    id="article"
                    name="article"
                    options={props.articles}
                    onChange={handleArticle}
                    defaultValue={formik.values.article}
                  />
                  {formik.errors.article ? (
                    <small className="ul-form__text form-text text-danger">
                      {formik.errors.article}
                    </small>
                  ) : null}
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputEmail4" className="ul-form__label">
                    Cantidad:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="quantity2"
                    placeholder="Cantidad"
                    name="quantity"
                    value={formik.values.quantity}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.quantity ? (
                    <small className="ul-form__text form-text text-danger">
                      {formik.errors.quantity}
                    </small>
                  ) : null}
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputEmail4" className="ul-form__label">
                    Días:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="days2"
                    placeholder="Días"
                    name="days"
                    value={formik.values.days}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.days ? (
                    <small className="ul-form__text form-text text-danger">
                      {formik.errors.days}
                    </small>
                  ) : null}
                </div>
                <div className="form-group col-md-12">
                  <label htmlFor="inputEmail4" className="ul-form__label">
                    Descripción:
                  </label>
                  <textarea
                    className="form-control"
                    name="description"
                    id="description2"
                    cols="10"
                    rows="5"
                    placeholder="Descripción"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                  ></textarea>
                  {formik.errors.description ? (
                    <small className="ul-form__text form-text text-danger">
                      {formik.errors.description}
                    </small>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="card-footer bg-transparent">
              <div className="mc-footer">
                <div className="row">
                  <div className="col-lg-12">
                    <button
                      type="submit"
                      className="btn  btn-outline-secondary m-1 footer-delete-right"
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default PrescriptionInternalCreate;
