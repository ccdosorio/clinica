import React from "react";
import "@date-io/date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";
import {
  Modal,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Col,
  Card,
  Button,
} from "react-bootstrap";
import { Formik } from "formik";
import DatePicker from "react-datepicker";
import { CirclePicker } from "react-color";
import * as yup from "yup";
import Select from "react-select";

const CalendarEventDialog = ({
  open,
  initialValues,
  handleSubmit,
  handleDeleteEvent,
  closeDialog,
  employees,
}) => {
  const [inputIdEmployee, setInputIdEmployee] = React.useState(null);

  const handleIdEmployee = (value) => {
    setInputIdEmployee(value.value);
  };

  const handleFormSubmit = (values) => {
    let appointmentData, startTime, endTime, colorCss, id_employee;
    let id_clinic, id_doctor;

    if (values.start_time === undefined) startTime = new Date();
    else startTime = values.start_time;

    if (values.end_time === undefined) endTime = new Date();
    else endTime = values.end_time;

    if (values.color === "") colorCss = "#0146bb";
    else colorCss = values.color;

    if (values.idclinic === "") id_clinic = null;
    else id_clinic = values.idclinic;

    if (values.iddoctor === "") id_doctor = null;
    else id_doctor = values.iddoctor;

    if (inputIdEmployee !== "") id_employee = inputIdEmployee;
    else id_employee = values.idemployee;

    appointmentData = {
      ...values,
      color: colorCss,
      idemployee: id_employee,
      idclinic: id_clinic,
      iddoctor: id_doctor,
      start_time: startTime,
      end_time: endTime,
    };

    handleSubmit(appointmentData);
  };

  return (
    <Modal
      show={open}
      centered={true}
      size="lg"
      className="d-flex justify-content-center mx-auto"
      style={{ maxWidth: "700px" }}
      onHide={closeDialog}
    >
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
        validationSchema={eventSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setSubmitting,
          setFieldValue,
        }) => {
          return (
            <Card>
              {values.id ? (
                <Card.Header
                  className="text-white d-flex flex-wrap justify-content-between align-items-center"
                  style={{ backgroundColor: values.color }}
                >
                  <h4 className="m-0 text-white">Cita</h4>
                  <i
                    className="i-Close-Window cursor-pointer text-18"
                    onClick={closeDialog}
                  ></i>
                </Card.Header>
              ) : (
                <Card.Header className="bg-primary text-white d-flex flex-wrap justify-content-between align-items-center">
                  <h4 className="m-0 text-white">Cita</h4>
                  <i
                    className="i-Close-Window cursor-pointer text-18"
                    onClick={closeDialog}
                  ></i>
                </Card.Header>
              )}
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Form.Row>
                      <FormGroup as={Col}>
                        <FormLabel>Titulo</FormLabel>
                        <FormControl
                          type="text"
                          name="title"
                          className="mb-3"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.title}
                          isInvalid={errors.title && touched.title}
                        />
                      </FormGroup>
                    </Form.Row>

                    <Form.Row>
                      <FormGroup as={Col}>
                        <FormLabel>Empleado</FormLabel>
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          name="idemployee"
                          options={employees}
                          onChange={handleIdEmployee}
                          onBlur={handleBlur}
                          defaultValue={{
                            label: values.employee,
                            value: values.idemployee,
                          }}
                        />
                      </FormGroup>
                      <FormGroup as={Col}>
                        <FormLabel>Doctor</FormLabel>
                        <select
                          id="iddoctor"
                          className="form-control"
                          name="iddoctor"
                          value={values.iddoctor}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <option value="">Selecciona</option>
                          <option value="1">Alfonso Ramírez</option>
                        </select>
                      </FormGroup>
                      <FormGroup as={Col}>
                        <FormLabel>Clínica</FormLabel>
                        <select
                          id="idclinic"
                          className="form-control"
                          name="idclinic"
                          value={values.idclinic}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <option value="">Selecciona</option>
                          <option value="1">Clinica Interna</option>
                          <option value="2">Clinica Externa</option>
                        </select>
                      </FormGroup>
                    </Form.Row>

                    <Form.Row>
                      <FormGroup as={Col}>
                        <FormLabel>Fecha</FormLabel>
                        <DatePicker
                          className="form-control mb-1"
                          selected={
                            values.start ? new Date(values.start) : new Date()
                          }
                          onChange={(date) => setFieldValue("start", date)}
                        />
                      </FormGroup>
                      <FormGroup as={Col}>
                        <FormLabel>Hora Inicio</FormLabel>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <TimePicker
                            className="form-control mb-1"
                            value={values.start_time}
                            onChange={(start_time) =>
                              setFieldValue("start_time", start_time)
                            }
                          />
                        </MuiPickersUtilsProvider>
                      </FormGroup>

                      <FormGroup as={Col}>
                        <FormLabel>Hora Final</FormLabel>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <TimePicker
                            className="form-control mb-1"
                            value={values.end_time}
                            onChange={(end_time) =>
                              setFieldValue("end_time", end_time)
                            }
                          />
                        </MuiPickersUtilsProvider>
                      </FormGroup>
                    </Form.Row>
                  </FormGroup>

                  <p>
                    <label className="checkbox checkbox-primary">
                      <span>Dar color a mi cita</span>
                      <span className="checkmark"></span>
                    </label>
                  </p>
                  <CirclePicker
                    className="w-100 mb-4"
                    color={values.color}
                    onChangeComplete={({ hex }) => setFieldValue("color", hex)}
                  />
                  <div className="d-flex justify-content-between">
                    <Button type="submit" variant="primary">
                      Guardar
                    </Button>
                    <Button
                      type="button"
                      variant="danger"
                      onClick={() =>
                        handleDeleteEvent(values.id, values.idusuario)
                      }
                    >
                      <i className="i-Delete-File"> </i>
                      Eliminar
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          );
        }}
      </Formik>
    </Modal>
  );
};

const eventSchema = yup.object().shape({
  title: yup.string().required("es requerido"),
});

export default CalendarEventDialog;
