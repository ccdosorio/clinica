import React from "react";

const ConsultationFormEdit = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div className="row">
        <div className="col-2">
          <p className="text-muted">Altura m: </p>
        </div>
        <div className="col-2">
          <input
            name="height"
            type="text"
            className="form-control form-control-rounded form-control-sm"
            id="height"
            onChange={props.onChange}
            defaultValue={props.consultation.altura}
            placeholder="Altura"
          />
        </div>
        <div className="col-2">
          <p className="text-muted">Peso kg: </p>
        </div>
        <div className="col-2">
          <input
            name="weight"
            type="text"
            className="form-control form-control-rounded form-control-sm"
            id="weight"
            onChange={props.onChange}
            defaultValue={props.consultation.peso}
            placeholder="Peso"
          />
        </div>
        <div className="col-2">
          <p className="text-muted">Oxígeno: </p>
        </div>
        <div className="col-2">
          <input
            name="oxygen"
            type="text"
            className="form-control form-control-rounded form-control-sm"
            id="oxygen"
            onChange={props.onChange}
            defaultValue={props.consultation.oxigeno}
            placeholder="Oxígeno"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <p className="text-muted">Temperatura: </p>
        </div>
        <div className="col-2">
          <input
            name="temperature"
            type="text"
            className="form-control form-control-rounded form-control-sm"
            id="temperature"
            onChange={props.onChange}
            defaultValue={props.consultation.temperatura}
            placeholder="Temperatura"
          />
        </div>
        <div className="col-2">
          <p className="text-muted">Temperatura ingreso: </p>
        </div>
        <div className="col-2">
          <p className="mt-0">{props.consultation.temperaturaIngreso}</p>
        </div>
        <div className="col-2">
          <p className="text-muted">PA: </p>
        </div>
        <div className="col-2">
          <input
            name="blood_pressure"
            type="text"
            className="form-control form-control-rounded form-control-sm"
            id="blood_pressure"
            onChange={props.onChange}
            defaultValue={props.consultation.presionArterial}
            placeholder="PA"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <p className="text-muted">F.C: </p>
        </div>
        <div className="col-2">
          <input
            name="heart_rate"
            type="text"
            className="form-control form-control-rounded form-control-sm"
            id="heart_rate"
            onChange={props.onChange}
            defaultValue={props.consultation.frecuenciaCardiaca}
            placeholder="F.C."
          />
        </div>
        <div className="col-2">
          <p className="text-muted">F.R: </p>
        </div>
        <div className="col-2">
          <input
            name="respiratory_rate"
            type="text"
            className="form-control form-control-rounded form-control-sm"
            id="respiratory_rate"
            onChange={props.onChange}
            defaultValue={props.consultation.frecuenciaRespiratoria}
            placeholder="F.R."
          />
        </div>
        <div className="col-2">
          <p className="text-muted">Circunferencia Abdominal: </p>
        </div>
        <div className="col-2">
          <input
            name="abdominal_circumference"
            type="text"
            className="form-control form-control-rounded form-control-sm"
            id="abdominal_circumference"
            onChange={props.onChange}
            defaultValue={props.consultation.circunferenciaAbdominal}
            placeholder="CC"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <p className="text-muted">IMC: </p>
        </div>
        <div className="col-2">
          <p className="mt-0">{props.consultation.indiceMasaCorporal}</p>
        </div>
        <div className="col-2">
          <p className="text-muted">Doctor: </p>
        </div>
        <div className="col-2">
          <select
            id="iddoctor"
            className="form-control form-control-rounded form-control-sm"
            name="iddoctor"
            value={props.consultation.idmedico}
            onChange={props.onChange}
          >
            <option value="">Selecciona una opción</option>
            <option value={1}>Alfonso Ramírez</option>
          </select>
        </div>
        <div className="col-2">
          <p className="text-muted">Clínica: </p>
        </div>
        <div className="col-2">
          <select
            id="idclinic"
            className="form-control form-control-rounded form-control-sm"
            name="idclinic"
            value={props.consultation.idclinica}
            onChange={props.onChange}
          >
            <option value="">Selecciona una opción</option>
            <option value={1}>Clinica Interna</option>
            <option value={2}>Clinica Externa</option>
          </select>
        </div>
        <div className="col-2">
          <p className="text-muted">Próxima Consulta: </p>
        </div>
        <div className="col-2">
          <input
            name="next_consultation"
            type="date"
            className="form-control form-control-rounded form-control-sm"
            id="next_consultation"
            onChange={props.onChange}
            defaultValue={props.consultation.proximaConsulta}
            placeholder="yyyy-mm-dd"
            min="1800-01-01"
            max="2050-12-31"
          />
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <button type="submit" className="btn btn-primary btn-sm">
          Editar
        </button>
      </div>
    </form>
  );
};

export default ConsultationFormEdit;
