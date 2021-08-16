import React, { Component } from "react";
import Http from "../../../api/Https";
import { Breadcrumb } from "@gull";
import SimpleCard from "@gull/components/cards/SimpleCard";
import Chart from "react-apexcharts";
import { Row, Col } from "react-bootstrap";

import ReactEcharts from "echarts-for-react";

class Dashboard1 extends Component {
  state = {
    ingresoDiarios: "",
    ingresoSemanales: "",
    ingresoMensualesuno: "",
    ingresoMensualesdos: "",
    ingresoMensualestres: "",
    ingresoMensualescuatro: "",
    ingresoMensualescinco: "",
    ingresoMensualesseis: "",
    ingresoMensualessiente: "",
    ingresoMensualesocho: "",
    ingresoMensualesnueve: "",
    ingresoMensualesdiez: "",
    ingresoMensualesonce: "",
    ingresoMensualesdoce: "",
    temperatura: "",
    sintomas: "",
    valueMoto: "",
    valueVehiculo: "",
    valuePie: "",
    valueVisita: "",
  };

  componentDidMount() {
    this.listIngresosDiarios();
    this.listIngresosSemanales();
    this.listIngresosMensuales();
    this.listTemperatura();
    this.listSintomas();
    this.listTipoIngreso();
  }

  listTipoIngreso = () => {
    this.TipoIngreso().then((res) => {
      let cantidadMoto;
      let cantidadVehiculo;
      let cantidadPie;
      let cantidadVisita;
      res.forEach((element) => {
        if (element.tipoIngreso === "Moto") {
          cantidadMoto = element.cantidad;
        }

        if (element.tipoIngreso === "Carro") {
          cantidadVehiculo = element.cantidad;
        }

        if (element.tipoIngreso === "Pie") {
          cantidadPie = element.cantidad;
        }

        if (element.tipoIngreso === "Visita") {
          cantidadVisita = element.cantidad;
        }
      });

      this.setState({
        valueMoto: cantidadMoto,
        valueVehiculo: cantidadVehiculo,
        valuePie: cantidadPie,
        valueVisita: cantidadVisita,
      });
    });
  };

  listIngresosDiarios = () => {
    this.IngresosDiarios().then((res) => {
      let cantidadEmpleado;
      let cantidadVisita;
      let total;

      res.forEach((element) => {
        if (element.tipoIngreso === "Empleado") {
          cantidadEmpleado = element.cantidad;
        }

        if (element.tipoIngreso === "Visita") {
          cantidadVisita = element.cantidad;
        }
      });
      total = cantidadEmpleado + cantidadVisita;
      this.setState({
        ingresoDiarios: total,
      });
    });
  };

  listIngresosSemanales = () => {
    this.IngresosSemanales().then((res) => {
      let cantidadEmpleado;
      let cantidadVisita;
      let total;

      res.forEach((element) => {
        if (element.tipoIngreso === "Empleado") {
          cantidadEmpleado = element.cantidad;
        }

        if (element.tipoIngreso === "Visita") {
          cantidadVisita = element.cantidad;
        }
      });

      total = cantidadEmpleado + cantidadVisita;
      this.setState({
        ingresoSemanales: total,
      });
    });
  };

  listIngresosMensuales = () => {
    this.IngresosMensuales().then((res) => {
      let array = [];
      array[0] =
        array[1] =
        array[2] =
        array[3] =
        array[4] =
        array[5] =
        array[6] =
        array[7] =
        array[8] =
        array[9] =
        array[10] =
        array[11] =
        array[12] =
          0;
      res.forEach((element) => {
        array[element.mesIngreso] = element.cantidad;
      });
      let uno = array[1];
      let dos = array[2];
      let tres = array[3];
      let cuatro = array[4];
      let cinco = array[5];
      let seis = array[6];
      let siete = array[7];
      let ocho = array[8];
      let nueve = array[9];
      let diez = array[10];
      let once = array[11];
      let doce = array[12];
      this.setState({
        ingresoMensualesuno: uno,
        ingresoMensualesdos: dos,
        ingresoMensualestres: tres,
        ingresoMensualescuatro: cuatro,
        ingresoMensualescinco: cinco,
        ingresoMensualesseis: seis,
        ingresoMensualessiete: siete,
        ingresoMensualesocho: ocho,
        ingresoMensualesnueve: nueve,
        ingresoMensualesdiez: diez,
        ingresoMensualesonce: once,
        ingresoMensualesdoce: doce,
      });
    });
  };

  listTemperatura = () => {
    this.temperatura().then((res) => {
      let cantidadEmpleado;
      let cantidadVisita;
      let total;

      res.forEach((element) => {
        if (element.tipoIngreso === "Empleado") {
          cantidadEmpleado = element.cantidad;
        }

        if (element.tipoIngreso === "Visita") {
          cantidadVisita = element.cantidad;
        }
      });

      total = cantidadEmpleado + cantidadVisita;

      this.setState({
        temperatura: total,
      });
    });
  };

  listSintomas = () => {
    this.sintomas().then((res) => {
      this.setState({
        sintomas: res,
      });
    });
  };

  TipoIngreso = async () => {
    const res = await Http.get(`ingreso/tipo`);

    return res;
  };

  IngresosDiarios = async () => {
    const res = await Http.get(`ingreso/diarios`);

    return res;
  };

  IngresosSemanales = async () => {
    const res = await Http.get(`ingreso/semanales`);

    return res;
  };

  IngresosMensuales = async () => {
    const res = await Http.get(`ingreso/mensuales`);

    return res;
  };

  temperatura = async () => {
    const res = await Http.get(`ingreso/temperatura`);

    return res;
  };

  sintomas = async () => {
    const res = await Http.get(`ingreso/sintoma`);

    return res[0].cantidad;
  };

  render() {
    let options1 = {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: true,
        },
      },
      tooltip: {
        enabled: true,
        shared: true,
        followCursor: false,
        intersect: false,
        inverseOrder: false,
        custom: undefined,
        fillSeriesColor: false,
        theme: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      series: [
        {
          name: "Ingresos",
          data: [
            this.state.ingresoMensualesuno,
            this.state.ingresoMensualesdos,
            this.state.ingresoMensualestres,
            this.state.ingresoMensualescuatro,
            this.state.ingresoMensualescinco,
            this.state.ingresoMensualesseis,
            this.state.ingresoMensualessiete,
            this.state.ingresoMensualesocho,
            this.state.ingresoMensualesnueve,
            this.state.ingresoMensualesdiez,
            this.state.ingresoMensualesonce,
            this.state.ingresoMensualesdoce,
          ],
        },
      ],

      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [
          "Ene",
          "Feb",
          "Mar",
          "Abr",
          "May",
          "Jun",
          "Jul",
          "Ago",
          "Sep",
          "Oct",
          "Nov",
          "Dic",
        ],
      },
    };

    let echartBasicDoughnutOption = {
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      color: ["#db0d0d", "#38b811", "#0818c9", "#08c9b9"],
      tooltip: {
        show: false,
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)",
      },
      xAxis: [
        {
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
      ],
      yAxis: [
        {
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
      ],

      series: [
        {
          name: "Sessions",
          type: "pie",
          radius: ["50%", "85%"],
          center: ["50%", "50%"],
          avoidLabelOverlap: false,
          hoverOffset: 5,
          label: {
            normal: {
              show: false,
              position: "center",
              textStyle: {
                fontSize: "13",
                fontWeight: "normal",
              },
              formatter: "{a}",
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "15",
                fontWeight: "bold",
              },
              formatter: "{b} \n{c} ({d}%)",
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
          data: [
            { value: this.state.valueVehiculo, name: "En Vehículo" },
            { value: this.state.valueMoto, name: "En Moto" },
            { value: this.state.valuePie, name: "A Pie" },
            { value: this.state.valueVisita, name: "Visitas" },
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };

    return (
      <div>
        <Breadcrumb routeSegments={[{ name: "Inicio" }]}></Breadcrumb>
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="card card-icon-bg card-icon-bg-primary o-hidden mb-4">
              <div className="card-body text-center">
                <i className="i-Business-Man"></i>
                <div className="content">
                  <p>ingresos (diarios)</p>
                  <p className="lead text-primary text-24 mb-2 text-capitalize">
                    {this.state.ingresoDiarios}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="card card-icon-bg card-icon-bg-primary o-hidden mb-4">
              <div className="card-body text-center">
                <i className="i-Business-Mens"></i>
                <div className="content">
                  <p>ingresos (semanales)</p>
                  <p className="lead text-primary text-24 mb-2 text-capitalize">
                    {this.state.ingresoSemanales}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="card card-icon-bg card-icon-bg-primary o-hidden mb-4">
              <div className="card-body text-center">
                <i className="i-Temperature1"></i>
                <div className="content">
                  <p>mayores a 37 grados</p>
                  <p className="lead text-primary text-24 mb-2 text-capitalize">
                    {this.state.temperatura}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="card card-icon-bg card-icon-bg-primary o-hidden mb-4">
              <div className="card-body text-center">
                <i className="i-Stethoscope"></i>
                <div className="content">
                  <p>sintomas covid</p>
                  <p className="lead text-primary text-24 mb-2 text-capitalize">
                    {this.state.sintomas}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Row>
          <Col lg={6} md={6} sm={12} xs={12} className="mb-4">
            <SimpleCard className="h-100" title="Ingresos Mensuales">
              <Chart
                options={options1}
                series={options1.series}
                type={options1.chart.type}
              />
            </SimpleCard>
          </Col>

          <Col lg={6} md={6} sm={12} xs={12} className="mb-4">
            <SimpleCard title="Tipos de Ingresos">
              <ReactEcharts
                style={{ height: "280px" }}
                option={echartBasicDoughnutOption}
              />
            </SimpleCard>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard1;
