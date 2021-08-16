import React, { useState, useEffect } from "react";
import { Breadcrumb, Loading } from "@gull";
import { Tabs, Tab } from "react-bootstrap";
import { NotificationManager } from "react-notifications";
import swal from "sweetalert";

import EmployeeFormEdit from "./EmployeeFormEdit";
import ConsultationEditor from "../consultations/ConsultationEditor";
import ConsultationEmployeeList from "../consultations/ConsultationEmployeeList";
import FamilyEditor from "../family/FamilyEditor";
import ConsultationNewEditor from "../consultations/ConsultationNewEditor";
import Https from "../../api/Https";

const EmpleadosEdit = (props) => {
  const [employee, setEmployee] = useState({});
  const [form, setForm] = useState({});
  const [business, setBusiness] = useState([]);
  const [showEditorDialog, setShowEditorDialog] = useState(false);
  const [dialogValues, setDialogValues] = useState(null);
  //Familia
  const [showEditorFamily, setShotEditorFamily] = useState(false);
  const [dataFamily, setDataFamily] = useState([]);
  const [filterFamily, setFilterFamily] = useState([]);
  const [formFamily, setFormFamily] = useState({
    idemployee: props.match.params.id,
    names: "",
    surname: "",
    gender: "",
    mobile: "",
    email: "",
    address: "",
    birthday: "",
    dpi: "",
    type: "",
  });
  //Nueva consulta
  const [showEditorNew, setShowEditorNew] = useState(false);

  useEffect(() => {
    getEmployee();
    getBusiness();
    getFamily();
    getFilterFamily();
  }, []);

  const getEmployee = async () => {
    const res = await Https.get(`empleado/get/${props.match.params.id}`);
    res.length > 0 && setEmployee(res[0]);
    setForm({
      idempleado: res[0].idempleado,
      nombre: res[0].nombres,
      apellido: res[0].apellidos,
      direccion: res[0].direccion,
      codigo: res[0].codigo,
      idempresa: res[0].idempresa,
      extension: res[0].extension,
      celular: res[0].celular,
      correo: res[0].correo,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await Https.post("empleado/edit", form);
    res.code === 200 && swal("¡Exitoso!", res.message, "success");
    await getEmployee();
    await props.history.push(`/employee/${props.match.params.id}/edit`);
  };

  const handleChange = async (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const getBusiness = async () => {
    const res = await Https.get(`ingreso/empresas`);
    setBusiness(res);
  };

  const toggleEditorDialog = (arg) => {
    if (arg && arg.toString()) {
      setShowEditorDialog(true);
      setDialogValues(null);
    } else {
      setShowEditorDialog(!showEditorDialog);
      setDialogValues(null);
    }
  };

  const handleFormSubmit = async (values) => {
    let id_family = "";
    if (values.idfamily === undefined) {
      id_family = null;
    } else {
      id_family = values.idfamily;
    }
    const id = props.match.params.id;
    let body = {
      iddoctor: values.iddoctor,
      idemployee: id,
      date: values.date,
      next_consultation: values.next_consultation,
      temperature: values.temperature,
      oxygen: values.oxygen,
      idclinic: values.idclinic,
      blood_pressure: values.blood_pressure,
      weight: values.weight,
      height: values.height,
      heart_rate: values.heart_rate,
      respiratory_rate: values.respiratory_rate,
      abdominal_circumference: values.abdominal_circumference,
      idfamily: id_family,
    };

    if (!dialogValues) {
      const res = await Https.post("consulta/create", body);
      if (res.code === 200) {
        swal("¡Exitoso!", res.message, "success");
        await props.history.push(
          `/employee/${props.match.params.id}/${res.idconsultation}/consultation`
        );
      } else {
        swal("Error!", "Ocurrió un error", "error");
      }
    }
    toggleEditorDialog(false);
  };

  const listBusiness = business.map((data, ind) => (
    <option key={ind} value={data.idempresa}>
      {data.empresa}
    </option>
  ));

  // Familia

  const getFamily = async () => {
    let body = { idemployee: props.match.params.id, select: false };
    const res = await Https.post("empleado/familiar/get", body);
    res.length > 0 && setDataFamily(res);
  };

  const getFilterFamily = async () => {
    let body = { idemployee: props.match.params.id, select: true };
    const res = await Https.post("empleado/familiar/get", body);
    res.length > 0 && setFilterFamily(res);
  };

  const toggleEditorFamily = (arg) => {
    if (arg && arg.toString()) {
      setShotEditorFamily(true);
      setFormFamily({
        idemployee: props.match.params.id,
        names: "",
        surname: "",
        gender: "",
        mobile: "",
        email: "",
        address: "",
        birthday: "",
        dpi: "",
        type: "",
      });
    } else {
      setShotEditorFamily(!showEditorFamily);
    }
  };

  const handleChangeFamily = async (event) => {
    setFormFamily({
      ...formFamily,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitFamily = async (event) => {
    event.preventDefault();
    formFamily.names === "" &&
      NotificationManager.warning("campo requerido", "Nombre", 2000);
    formFamily.surname === "" &&
      NotificationManager.warning("campo requerido", "Apellido", 2000);
    formFamily.gender === "" &&
      NotificationManager.warning("campo requerido", "Género", 2000);
    formFamily.mobile === "" &&
      NotificationManager.warning("campo requerido", "Celular", 2000);
    formFamily.email === "" &&
      NotificationManager.warning("campo requerido", "Correo", 2000);
    formFamily.dpi === "" &&
      NotificationManager.warning("campo requerido", "DPI", 2000);
    formFamily.type === "" &&
      NotificationManager.warning("campo requerido", "Parentezco", 2000);

    const res = await Https.post("empleado/familiar", formFamily);
    if (res.code === 200) {
      swal("¡Exitoso!", res.message, "success");
      toggleEditorFamily(false);
      await getFamily();
      await getFilterFamily();
    }
  };

  // Nueva consulta

  const toggleEditorNew = async (arg) => {
    if (arg && arg.toString()) {
      setShowEditorNew(true);
    } else {
      setShowEditorNew(!showEditorNew);
    }
  };

  const handleFormSubmitNew = async (values) => {
    let body = {
      ...values,
      idemployee: props.match.params.id,
      flag: "NEW_DATE",
    };
    const res = await Https.post("calendar", body);
    res.code === 200 && NotificationManager.success(res.message, res.status);
    await getFamily();
    await toggleEditorNew(false);
  };

  return (
    <div>
      <Breadcrumb
        routeSegments={[
          { name: "Regresar", path: "/employee/list" },
          { name: "Detalle Empleado" },
        ]}
      ></Breadcrumb>
      {Object.keys(employee).length === 0 ? (
        <Loading></Loading>
      ) : (
        <section className="ul-contact-detail">
          <div className="row">
            <div className="col-lg-4 col-xl-4">
              <div className="card o-hidden">
                <div className="card-body">
                  <div className="ul-contact-detail__info">
                    <div className="row">
                      <div className="col-6 text-center">
                        <div className="ul-contact-detail__info-1">
                          <h5>Nombre</h5>
                          <span>{employee.nombres}</span>
                        </div>
                        <div className="ul-contact-detail__info-1">
                          <h5>Código</h5>
                          <span>{employee.codigo}</span>
                        </div>
                      </div>
                      <div className="col-6 text-center">
                        <div className="ul-contact-detail__info-1">
                          <h5>Apellido</h5>
                          <span>{employee.apellidos}</span>
                        </div>
                        <div className="ul-contact-detail__info-1">
                          <h5>Empresa</h5>
                          <span>{employee.empresa}</span>
                        </div>
                      </div>
                      <div className="col-6 text-center">
                        <div className="ul-contact-detail__info-1">
                          <h5>Celular</h5>
                          <span>{employee.celular}</span>
                        </div>
                      </div>
                      <div className="col-6 text-center">
                        <div className="ul-contact-detail__info-1">
                          <h5>Extensión</h5>
                          <span>{employee.extension || "Sin"}</span>
                        </div>
                      </div>
                      <div className="col-12 text-center">
                        <div className="ul-contact-detail__info-1">
                          <h5>Correo electrónico</h5>
                          <span>{employee.correo}</span>
                        </div>
                      </div>
                      <div className="col-12 text-center">
                        <div className="ul-contact-detail__info-1">
                          <h5>Dirección</h5>
                          <span>{employee.direccion}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-xl-8">
              <div className="card mb-4">
                <div className="card-header bg-transparent">
                  Información Empleado
                </div>
                <div className="card-body">
                  <Tabs defaultActiveKey="Consultations">
                    <Tab eventKey="Consultations" title="Consultas">
                      <div className="form-group row">
                        <div className="col-sm-12 d-flex justify-content-end">
                          <div className="btn-group">
                            <button
                              type="submit"
                              className="btn btn-outline-primary"
                              onClick={toggleEditorNew}
                            >
                              Nueva Consulta
                            </button>
                            <button
                              type="submit"
                              className="btn btn-primary"
                              onClick={toggleEditorFamily}
                            >
                              Agregar Familiar
                            </button>
                            <button
                              type="submit"
                              className="btn btn-outline-primary"
                              onClick={toggleEditorDialog}
                            >
                              Agregar Consulta
                            </button>
                          </div>
                        </div>
                      </div>
                      <ConsultationEmployeeList
                        idemployee={props.match.params.id}
                      />
                    </Tab>
                    <Tab eventKey="EditEmployee" title="Editar Empleado">
                      <EmployeeFormEdit
                        onSubmit={handleSubmit}
                        onChange={handleChange}
                        employee={employee}
                        form={form}
                        listBusiness={listBusiness}
                      />
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      <ConsultationEditor
        show={showEditorDialog}
        toggleEditorDialog={toggleEditorDialog}
        initialValues={dialogValues}
        handleFormSubmit={handleFormSubmit}
        filterFamily={filterFamily}
      ></ConsultationEditor>
      <FamilyEditor
        show={showEditorFamily}
        toggleEditorDialog={toggleEditorFamily}
        initialValues={formFamily}
        title={"Nuevo"}
        onSubmit={handleSubmitFamily}
        onChange={handleChangeFamily}
        dataFamily={dataFamily}
      ></FamilyEditor>
      <ConsultationNewEditor
        show={showEditorNew}
        toggleEditorDialog={toggleEditorNew}
        handleFormSubmit={handleFormSubmitNew}
      ></ConsultationNewEditor>
    </div>
  );
};

export default EmpleadosEdit;
