import React from "react";
const EmployeeFormEdit = (props) => {
  return (
    <form className="mt-3" onSubmit={props.onSubmit}>
      <div className="form-group row">
        <label htmlFor="nombre" className="col-sm-2 col-form-label">
          Nombre
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="nombre"
            placeholder="Nombre"
            name="nombre"
            defaultValue={props.employee.nombres || ""}
            onChange={props.onChange}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="apellido" className="col-sm-2 col-form-label">
          Apellido
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="apellido"
            placeholder="Apellido"
            name="apellido"
            defaultValue={props.employee.apellidos || ""}
            onChange={props.onChange}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="direccion" className="col-sm-2 col-form-label">
          Direccion
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="direccion"
            placeholder="Dirección"
            name="direccion"
            defaultValue={props.employee.direccion || ""}
            onChange={props.onChange}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="codigo" className="col-sm-2 col-form-label">
          Código Empleado
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="codigo"
            placeholder="Código"
            name="codigo"
            defaultValue={props.employee.codigo || ""}
            onChange={props.onChange}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="extension" className="col-sm-2 col-form-label">
          Extensión
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="extension"
            placeholder="Extensión"
            name="extension"
            defaultValue={props.employee.extension || ""}
            onChange={props.onChange}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="celular" className="col-sm-2 col-form-label">
          Celular
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="celular"
            placeholder="Celular"
            name="celular"
            defaultValue={props.employee.celular || ""}
            onChange={props.onChange}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="correo" className="col-sm-2 col-form-label">
          Correo Electrónico
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="correo"
            placeholder="Correo Electrónico"
            name="correo"
            defaultValue={props.employee.correo || ""}
            onChange={props.onChange}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="idempresa" className="col-sm-2 col-form-label">
          Empresa
        </label>
        <div className="col-sm-10">
          <select
            id="idempresa"
            className="form-control"
            name="idempresa"
            value={props.form.idempresa || ""}
            onChange={props.onChange}
          >
            {props.listBusiness}
          </select>
        </div>
      </div>
      <div className="form-group row">
        <div className="col-sm-10">
          <button type="submit" className="btn btn-primary">
            Editar
          </button>
        </div>
      </div>
    </form>
  );
};

export default EmployeeFormEdit;
