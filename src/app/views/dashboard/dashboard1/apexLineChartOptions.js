
import Http from "../../../api/Https";
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

 
    let dataIngresos=""
 Http.get(`ingreso/mensuales`).then((res) => {

  res.forEach((element) => {
    array[element.mesIngreso]=element.cantidad;
  
  });
   //dataIngresos=array[1]+','+array[2]+','+array[3]+','+array[4]+','+array[5]+','+array[6]+','+array[7]+','+array[8]+','+array[9]+','+array[10]+','+array[11]+','+array[12];
 
 dataIngresos=array[1]+','+array[2]+','+array[3]+','+array[4]+','+array[5]+','+array[6]+','+array[7]+','+array[8]+','+array[9]+','+array[10]+','+array[11]+','+array[12];


});


console.log("------------>",dataIngresos)



export const options1 = {
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
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 44, 50, 600],
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
