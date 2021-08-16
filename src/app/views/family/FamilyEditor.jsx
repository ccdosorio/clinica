import React from "react";
import { Modal, Button, Table, Card } from "react-bootstrap";
import { NotificationContainer } from "react-notifications";
import { classList } from "@utils";

const FamilyEditor = ({
  show,
  toggleEditorDialog,
  onChange,
  onSubmit,
  title,
  initialValues,
  dataFamily,
}) => {
  return (
    <Modal show={show} onHide={toggleEditorDialog} size="lg" centered>
      <div className="modal-header">
        <h5 className="modal-title" id="modalSymptom">
          {title} Familiar
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
        <form onSubmit={onSubmit} className="position-relative">
          <div className="form-group row">
            <label htmlFor="names" className="col-sm-2 col-form-label">
              Nombre:
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="names"
                placeholder="Nombre"
                name="names"
                defaultValue={initialValues.names}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="surname" className="col-sm-2 col-form-label">
              Apellido:
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="surname"
                placeholder="Apellido"
                name="surname"
                defaultValue={initialValues.surname}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="gender" className="col-sm-2 col-form-label">
              Género:
            </label>
            <div className="col-sm-4">
              <select
                id="gender"
                className="form-control"
                name="gender"
                defaultValue={initialValues.gender}
                onChange={onChange}
              >
                <option value="">Selecciona el género</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
            </div>
            <label htmlFor="mobile" className="col-sm-2 col-form-label">
              Celular:
            </label>
            <div className="col-sm-4">
              <input
                type="text"
                className="form-control"
                id="mobile"
                placeholder="Celular"
                name="mobile"
                defaultValue={initialValues.mobile}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="email" className="col-sm-2 col-form-label">
              Correo:
            </label>
            <div className="col-sm-10">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Correo electrónico"
                name="email"
                defaultValue={initialValues.email}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="address" className="col-sm-2 col-form-label">
              Dirección:
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="Dirección"
                name="address"
                defaultValue={initialValues.address}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="birthday" className="col-sm-2 col-form-label">
              Fecha de Nacimiento:
            </label>
            <div className="col-sm-4">
              <input
                type="date"
                className="form-control form-control"
                id="birthday"
                onChange={onChange}
                defaultValue={initialValues.birthday}
                placeholder="yyyy-mm-dd"
                name="birthday"
                min="1800-01-01"
                max="2050-12-31"
              />
            </div>
            <label htmlFor="dpi" className="col-sm-2 col-form-label">
              DPI:
            </label>
            <div className="col-sm-4">
              <input
                type="text"
                className="form-control"
                id="dpi"
                placeholder="DPI"
                name="dpi"
                defaultValue={initialValues.dpi}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="type" className="col-sm-2 col-form-label">
              Parentezco:
            </label>
            <div className="col-sm-4">
              <select
                id="type"
                className="form-control"
                name="type"
                defaultValue={initialValues.type}
                onChange={onChange}
              >
                <option value="0">Selecciona el parentezco</option>
                <option value="1">Papá</option>
                <option value="2">Mamá</option>
                <option value="3">Hijo</option>
                <option value="4">Hija</option>
                <option value="5">Tio</option>
                <option value="6">Tia</option>
                <option value="7">Esposa</option>
                <option value="8">Esposo</option>
                <option value="9">Abuelo</option>
                <option value="10">Abuela</option>
                <option value="11">Hermano</option>
                <option value="12">Hermana</option>
              </select>
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <Button type="submit">Guardar</Button>
          </div>
        </form>
      </div>
      {dataFamily.length > 0 && (
        <div className="card-body">
          <Card elevation={6} className="w-100 overflow-auto">
            <Table style={{ minWidth: 750 }}>
              <thead>
                <tr>
                  <th className="pl-sm-24">Id</th>
                  <th className="px-0">Nombre</th>
                  <th className="px-0">Apellido</th>
                  <th className="px-0">Cel.</th>
                  <th className="px-0">Correo</th>
                  <th className="px-0">Fecha Nac.</th>
                  <th className="px-0">DPI</th>
                  <th className="px-0">Tipo</th>
                  <th className="px-0">Gén.</th>
                </tr>
              </thead>
              <tbody>
                {dataFamily.map((item) => (
                  <tr key={item.idfamiliar}>
                    <td className="pl-sm-24 capitalize" align="left">
                      {item.idfamiliar}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {item.nombres}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {item.apellidos}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {item.celular}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {item.correo}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {item.fecha_nacimiento}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {item.dpi}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {item.familiar}
                    </td>
                    <td className="pl-0 capitalize">
                      <small
                        className={classList({
                          "badge rounded-pill text-white px-8 py-2": true,
                          "bg-info": item.genero === "M",
                          "bg-warning": item.genero === "F",
                        })}
                      >
                        {item.genero}
                      </small>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </div>
      )}
      <NotificationContainer />
    </Modal>
  );
};

export default FamilyEditor;
