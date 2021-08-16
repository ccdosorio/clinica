import React, { Component } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { Breadcrumb } from "@gull";
import { Button } from "react-bootstrap";
import Http from "../../api/Https";
import swal from "sweetalert";
class EmpleadosAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayEmpresa: [],
      arrayArea: [],
      arrayDepartamento: [],
      arraySeccion: [],
      arrayPuesto: [],
      nombres: "",
      apellidos: "",
      direccion: "",
      cui: "",
      nit: "",
      codigoEmpleado: "",
      empresa: "",
      idempresa: "",
      area: "",
      idarea: "",
      departamento: "",
      iddepartamento: "",
      seccion: "",
      idseccion: "",
      puesto: "",
      idpuesto: "",
      correo: "",
      celular: "",
      genero: "",
      extension: "",
      banderaArea: false,
      banderaDepartamento: false,
      banderaSeccion: false,
      banderaPuesto: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeSelectEmpresa = this.handleChangeSelectEmpresa.bind(this);
    this.handleChangeSelectArea = this.handleChangeSelectArea.bind(this);
    this.handleChangeSelectDepartamento =
      this.handleChangeSelectDepartamento.bind(this);
    this.handleChangeSelectSeccion = this.handleChangeSelectSeccion.bind(this);
    this.handleChangeSelectPuesto = this.handleChangeSelectPuesto.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.listEmpresas();
  }

  listEmpresas = (bandera) => {
    if (bandera === false) {
      this.setState({
        banderaArea: false,
        banderaDepartamento: false,
        banderaSeccion: false,
        banderaPuesto: false,
      });
    } else {
      this.Empresas().then((res) => {
        this.setState({
          arrayEmpresa: res,
        });
      });
    }
  };

  listAreas = (empresa, idempresa, bandera) => {
    if (bandera === true) {
      this.areas(idempresa).then((res) => {
        this.setState({
          arrayArea: res,
          empresa: empresa,
          idempresa: idempresa,
          banderaArea: true,
        });
      });
    } else {
      this.setState({
        empresa: empresa,
        idempresa: idempresa,
        banderaDepartamento: false,
        banderaSeccion: false,
        banderaPuesto: false,
      });
    }
  };

  listDepartamentos = (codigo, idempresa, area, bandera) => {
    if (bandera === true) {
      this.departamento(codigo, idempresa).then((res) => {
        this.setState({
          arrayDepartamento: res,
          area: area,
          idarea: codigo,
          banderaDepartamento: true,
        });
      });
    } else {
      this.setState({
        area: area,
        idarea: codigo,
        banderaDepartamento: false,
        banderaSeccion: false,
        banderaPuesto: false,
      });
    }
  };

  listSeccion = (codigo, idempresa, departamento, bandera) => {
    if (bandera === true) {
      this.secciones(codigo, idempresa).then((res) => {
        this.setState({
          arraySeccion: res,
          departamento: departamento,
          iddepartamento: codigo,
          banderaSeccion: true,
        });
      });
    } else {
      this.setState({
        departamento: departamento,
        iddepartamento: codigo,
        banderaSeccion: false,
        banderaPuesto: false,
      });
    }
  };

  listPuesto = (codigo, idempresa, seccion, bandera) => {
    if (bandera === true) {
      this.puestos(codigo, idempresa).then((res) => {
        this.setState({
          arrayPuesto: res,
          banderaPuesto: true,
          seccion: seccion,
          idseccion: codigo,
        });
      });
    } else {
      this.setState({
        banderaPuesto: false,
        seccion: seccion,
        idseccion: codigo,
      });
    }
  };

  listPuesto2 = (codigo, puesto) => {
    this.setState({
      puesto: puesto,
      idpuesto: codigo,
    });
  };

  Empresas = async () => {
    const res = await Http.get(`ingreso/empresas`);

    return res;
  };

  areas = async (idempresa) => {
    const res = await Http.get(`ingreso/area/${idempresa}`);

    return res;
  };

  departamento = async (codigo, idempresa) => {
    const res = await Http.get(`ingreso/departamento/${codigo}/${idempresa}`);

    return res;
  };

  secciones = async (codigo, idempresa) => {
    const res = await Http.get(`ingreso/seccion/${codigo}/${idempresa}`);

    return res;
  };

  puestos = async (codigo, idempresa) => {
    const res = await Http.get(`ingreso/puesto/${codigo}/${idempresa}`);

    return res;
  };

  handleChange(event) {
    const { name, value } = event.target;
    console.log(name, value);
    this.setState({
      [name]: value,
    });
  }

  handleChangeSelectEmpresa(event) {
    let id = event.target.value;
    let empresa;
    if (id !== "") {
      let index = event.target.selectedIndex;
      empresa = event.target.options[index].text;

      this.listAreas(empresa, id, true);
    } else {
      empresa = "";
      this.listAreas(empresa, id, false);
      this.listEmpresas(false);
    }
  }

  handleChangeSelectArea(event) {
    let id = event.target.value;
    let area;
    if (id !== "") {
      let index = event.target.selectedIndex;
      area = event.target.options[index].text;
      this.listDepartamentos(id, this.state.idempresa, area, true);
    } else {
      area = "";
      this.listDepartamentos(id, this.state.idempresa, area, false);
    }
  }

  handleChangeSelectDepartamento(event) {
    let id = event.target.value;
    let departamento;
    if (id !== "") {
      let index = event.target.selectedIndex;
      departamento = event.target.options[index].text;
      this.listSeccion(id, this.state.idempresa, departamento, true);
    } else {
      departamento = "";
      this.listSeccion(id, this.state.idempresa, departamento, false);
    }
  }

  handleChangeSelectSeccion(event) {
    let id = event.target.value;
    let seccion;
    if (id !== "") {
      let index = event.target.selectedIndex;
      seccion = event.target.options[index].text;

      this.listPuesto(id, this.state.idempresa, seccion, true);
    } else {
      seccion = "";
      this.listPuesto(id, this.state.idempresa, seccion, false);
    }
  }

  handleChangeSelectPuesto(event) {
    let id = event.target.value;
    let puesto;
    if (id !== "") {
      let index = event.target.selectedIndex;
      puesto = event.target.options[index].text;

      this.listPuesto2(id, puesto);
    } else {
      puesto = "";

      this.listPuesto2(id, puesto);
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.state.nombres === "" || this.state.nombres === null) {
      NotificationManager.warning(
        "Este campo no puede ir vacio",
        "Campo Nombres"
      );
    }

    if (this.state.apellidos === "" || this.state.apellidos === null) {
      NotificationManager.warning(
        "Este campo no puede ir vacio",
        "Campo Apellidos"
      );
    }

    if (this.state.apellidos === "" || this.state.apellidos === null) {
      NotificationManager.warning(
        "Este campo no puede ir vacio",
        "Campo Apellidos"
      );
    }

    if (this.state.cui === "" || this.state.cui === null) {
      NotificationManager.warning("Este campo no puede ir vacio", "Campo Cui");
    }

    if (this.state.nit === "" || this.state.nit === null) {
      NotificationManager.warning("Este campo no puede ir vacio", "Campo Nit");
    }

    if (
      this.state.codigoEmpleado === "" ||
      this.state.codigoEmpleado === null
    ) {
      NotificationManager.warning(
        "Este campo no puede ir vacio",
        "Campo Codigo Empleado"
      );
    }

    if (this.state.empresa === "" || this.state.empresa === null) {
      NotificationManager.warning(
        "Este campo no puede ir vacio",
        "Campo Empresa"
      );
    }

    if (this.state.area === "" || this.state.area === null) {
      NotificationManager.warning("Este campo no puede ir vacio", "Campo Area");
    }

    if (this.state.departamento === "" || this.state.departamento === null) {
      NotificationManager.warning(
        "Este campo no puede ir vacio",
        "Campo Departamento"
      );
    }

    if (this.state.seccion === "" || this.state.seccion === null) {
      NotificationManager.warning(
        "Este campo no puede ir vacio",
        "Campo Seccion"
      );
    }

    if (this.state.puesto === "" || this.state.puesto === null) {
      NotificationManager.warning(
        "Este campo no puede ir vacio",
        "Campo Puesto"
      );
    }

    if (this.state.genero === "" || this.state.genero === null) {
      NotificationManager.warning(
        "Este campo no puede ir vacio",
        "Campo género"
      );
    }

    let jsonDatos = {
      idempresa: this.state.idempresa,
      empresa: this.state.empresa,
      idarea: this.state.idarea,
      area: this.state.area,
      iddepartamento: this.state.iddepartamento,
      departamento: this.state.departamento,
      idseccion: this.state.idseccion,
      seccion: this.state.seccion,
      idpuesto: this.state.idpuesto,
      puesto: this.state.puesto,
      codigo: this.state.codigoEmpleado,
      nombres: this.state.nombres,
      apellidos: this.state.apellidos,
      direccion: this.state.direccion,
      nit: this.state.nit,
      cui: this.state.cui,
      correo: this.state.correo,
      celular: this.state.celular,
      genero: this.state.genero,
      extension: this.state.extension,
    };

    const res = await Http.post("registro-empleado", jsonDatos);
    if (res) {
      swal("¡Exitoso!", res.message, "success");
      await this.props.history.push("/employee/list");
    } else {
      swal("¡Error!", "No se pudo agregar su registro", "error");
    }
  };

  render() {
    const listEmpresas = this.state.arrayEmpresa.map((data) => (
      <option key={data.idempresa} value={data.idempresa}>
        {data.empresa}
      </option>
    ));

    const listAreas = this.state.arrayArea.map((data) => (
      <option key={data.codigoArea} value={data.codigoArea}>
        {data.area}
      </option>
    ));

    const listDepartamentos = this.state.arrayDepartamento.map((data) => (
      <option key={data.codigoDepto} value={data.codigoDepto}>
        {data.depto}
      </option>
    ));

    const listSeccion = this.state.arraySeccion.map((data) => (
      <option key={data.codigoSeccion} value={data.codigoSeccion}>
        {data.seccion}
      </option>
    ));

    const listPuesto = this.state.arrayPuesto.map((data) => (
      <option key={data.codigoPuesto} value={data.codigoPuesto}>
        {data.puesto}
      </option>
    ));

    return (
      <div>
        <Breadcrumb
          routeSegments={[
            { name: "Inicio", path: "/home" },
            { name: "Agregar Empleados" },
          ]}
        ></Breadcrumb>
        <form onSubmit={this.handleSubmit}>
          <div className="col-md-12">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4 form-group mb-3">
                    <label htmlFor="nombres">Nombre(s)</label>
                    <input
                      name="nombres"
                      type="text"
                      className="form-control "
                      id="nombres"
                      onChange={this.handleChange}
                      value={this.state.nombres}
                      placeholder="Ingrese Nombre(s)"
                    />
                  </div>

                  <div className="col-md-4 form-group mb-3">
                    <label htmlFor="apellidos">Apellido(s)</label>
                    <input
                      name="apellidos"
                      type="text"
                      className="form-control"
                      id="apellidos"
                      onChange={this.handleChange}
                      value={this.state.apellidos}
                      placeholder="Ingrese Apellido(s)"
                    />
                  </div>

                  <div className="col-md-4 form-group mb-3">
                    <label htmlFor="direccion">Dirección</label>
                    <input
                      name="direccion"
                      onChange={this.handleChange}
                      value={this.state.direccion}
                      className="form-control "
                      id="direccion"
                      type="text"
                      placeholder="Ingrese dirección."
                    />
                  </div>

                  <div className="col-md-4 form-group mb-3">
                    <label htmlFor="cui">Cui</label>
                    <input
                      /*disabled="enabled"*/
                      name="cui"
                      type="text"
                      className="form-control "
                      id="cui"
                      onChange={this.handleChange}
                      value={this.state.cui}
                      placeholder="Ingrese Cui"
                    />
                  </div>

                  <div className="col-md-4 form-group mb-3">
                    <label htmlFor="nit">Nit</label>
                    <input
                      name="nit"
                      type="text"
                      className="form-control "
                      id="nit"
                      onChange={this.handleChange}
                      value={this.state.nit}
                      placeholder="Ingrese Nit"
                    />
                  </div>

                  <div className="col-md-4 form-group mb-3">
                    <label htmlFor="codigoEmpleado">Codigo Empleado</label>
                    <input
                      name="codigoEmpleado"
                      onChange={this.handleChange}
                      value={this.state.codigoEmpleado}
                      className="form-control "
                      id="codigoEmpleado"
                      placeholder="Ingrese Codigo Empleado"
                      type="text"
                    />
                  </div>

                  <div className="col-md-4 form-group mb-3">
                    <label htmlFor="id">Empresa</label>

                    <select
                      id="empresa"
                      className="form-control"
                      name="empresa"
                      onChange={this.handleChangeSelectEmpresa}
                    >
                      <option value="">Seleccione..</option>
                      {listEmpresas}
                    </select>
                  </div>

                  <div className="col-md-4 form-group mb-3">
                    <label htmlFor="area">Area</label>
                    {this.state.banderaArea === false ? (
                      <select
                        disabled="enabled"
                        id="area"
                        className="form-control"
                        name="area"
                      >
                        <option value="">Seleccione..</option>
                      </select>
                    ) : (
                      <select
                        id="area"
                        className="form-control"
                        name="area"
                        //  value={this.state.genero}
                        onChange={this.handleChangeSelectArea}
                      >
                        <option value="">Seleccione..</option>
                        {listAreas}
                      </select>
                    )}
                  </div>

                  <div className="col-md-4 form-group mb-3">
                    <label htmlFor="departamento">Departamento</label>
                    {this.state.banderaDepartamento === false ? (
                      <select
                        disabled="enabled"
                        id="departamento"
                        className="form-control"
                        name="departamento"

                        //  value={this.state.genero}
                      >
                        <option value="">Seleccione..</option>
                      </select>
                    ) : (
                      <select
                        id="departamento"
                        className="form-control"
                        name="departamento"
                        onChange={this.handleChangeSelectDepartamento}
                        //  value={this.state.genero}
                      >
                        <option value="">Seleccione..</option>
                        {listDepartamentos}
                      </select>
                    )}
                  </div>

                  <div className="col-md-4 form-group mb-3">
                    <label htmlFor="seccion">Seccion</label>
                    {this.state.banderaSeccion === false ? (
                      <select
                        disabled="enabled"
                        id="seccion"
                        className="form-control"
                        name="seccion"
                        //  value={this.state.genero}
                      >
                        <option value="">Seleccione..</option>
                      </select>
                    ) : (
                      <select
                        id="seccion"
                        className="form-control"
                        name="seccion"
                        onChange={this.handleChangeSelectSeccion}
                        //  value={this.state.genero}
                      >
                        <option value="">Seleccione..</option>
                        {listSeccion}
                      </select>
                    )}
                  </div>

                  <div className="col-md-4 form-group mb-3">
                    <label htmlFor="puesto">Puesto</label>
                    {this.state.banderaPuesto === false ? (
                      <select
                        id="puesto"
                        className="form-control"
                        name="puesto"
                        disabled="enabled"
                        //  value={this.state.genero}
                      >
                        <option value="">Seleccione..</option>
                      </select>
                    ) : (
                      <select
                        onChange={this.handleChangeSelectPuesto}
                        id="puesto"
                        className="form-control"
                        name="puesto"
                        //  value={this.state.genero}
                      >
                        <option value="">Seleccione..</option>
                        {listPuesto}
                      </select>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="card mb-4">
              <div className="card-body">
                <div className="card-title mb-3 form-group">
                  Información de Contacto
                </div>
                <div className="row">
                  <div className="col-md-4 form-group mb-3">
                    <label htmlFor="correo">Correo electrónico</label>
                    <input
                      name="correo"
                      type="email"
                      className="form-control "
                      id="correo"
                      onChange={this.handleChange}
                      value={this.state.correo}
                      placeholder="Ingrese el correo electrónico"
                    />
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label htmlFor="correo">Celular</label>
                    <input
                      name="celular"
                      type="text"
                      className="form-control "
                      id="celular"
                      onChange={this.handleChange}
                      value={this.state.celular}
                      placeholder="Ingrese el celular"
                    />
                  </div>
                  <div className="col-md-2 form-group mb-3">
                    <label htmlFor="genero">Género</label>
                    <select
                      id="genero"
                      className="form-control"
                      name="genero"
                      onChange={this.handleChange}
                      value={this.state.genero}
                    >
                      <option value={""}>Seleccione el género</option>
                      <option value={"M"}>Masculino</option>
                      <option value={"F"}>Femenino</option>
                    </select>
                  </div>
                  <div className="col-md-2 form-group mb-3">
                    <label htmlFor="extension">Extensión</label>
                    <input
                      name="extension"
                      type="text"
                      className="form-control "
                      id="extension"
                      onChange={this.handleChange}
                      value={this.state.extension}
                      maxLength="4"
                      placeholder="Ingrese la extension"
                    />
                  </div>
                </div>
                <br />
                <div className="d-flex justify-content-end">
                  <Button type="submit" variant="primary">
                    AGREGAR EMPLEADO
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
        <NotificationContainer />
      </div>
    );
  }
}
export default EmpleadosAdd;
