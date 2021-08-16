import React, { Component } from "react";
import { Breadcrumb } from "@gull";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import swal from "sweetalert2";
import esLocale from "@fullcalendar/core/locales/es";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import Https from "../../api/Https";

import shortid from "shortid";
import CalendarEventDialog from "./CalendarEventDialog";

class AppCalendar extends Component {
  calendarComponentRef = React.createRef();
  externalEventRef = React.createRef();

  state = {
    eventDialogOpen: false,
    calendarEvents: [],
    detail_actividad: {},
    eventActividad: {},
    newEventInput: "",
    deleteEventOnDrop: true,
    externalEvents: [],
    employees: [],
  };

  toggleWeekends = () => {
    this.setState({
      calendarWeekends: !this.state.calendarWeekends,
    });
  };

  getEmployees = async () => {
    let options = { select: true };
    const res = await Https.post("empleado/all", options);
    this.setState({ employees: res });
  };

  getAppointments = async () => {
    let body = { flag: "GET" };
    const res = await Https.post("calendar", body);

    if (this.state) this.setState({ calendarEvents: res });

    if (this.state.calendarEvents !== "") {
      this.refreshFullCalendar(this.state.calendarEvents);
      this.setState({ eventDialogOpen: false });
    } else {
      swal.fire({
        title: "Información!",
        text: "No tienes ninguna cita",
        showConfirmButton: false,
        icon: "info",
        timer: 3000,
      });
    }
  };

  handleDateClick = (arg) => {
    this.setState({
      eventDialogOpen: true,
      eventActividad: {
        idemployee: "",
        title: "",
        idclinic: "",
        iddoctor: "",
        start: arg.date,
        color: "",
      },
    });
  };

  handleExternalEventDrop = (event) => {
    let {
      date: start,
      allDay,
      draggedEl: {
        innerText: title,
        classList: { value: classNames },
      },
    } = event;

    this.handleEventDialogSubmit({
      start,
      title,
      allDay,
      idemployee: null,
      idclinic: null,
      iddoctor: null,
      start_time: "",
      end_time: "",
      classNames: classNames.concat(" text-white"),
      color: "#0146bb",
    });

    let { externalEvents = [], deleteEventOnDrop } = this.state;

    if (!deleteEventOnDrop) return;

    this.setState({
      externalEvents: externalEvents.filter((item) => !item.title.match(title)),
    });
  };

  handleDeleteEvent = async (id) => {
    let body = { idcalendar: id, flag: "DELETE" };
    const res = await Https.post("calendar", body);
    if (res.code === 200) {
      NotificationManager.error(res.message, res.status);
      const res2 = await Https.post("calendar", { flag: "GET" });
      await this.setState({
        calendarEvents: res2,
        eventDialogOpen: false,
      });
      await this.refreshFullCalendar(this.state.calendarEvents);
    }
  };

  toggleEventDialog = () => {
    this.setState({ eventDialogOpen: !this.state.eventDialogOpen });
  };

  handleEventDialogSubmit = async (values) => {
    if (values.id) {
      let body = { ...values, flag: "EDIT" };
      const res = await Https.post("calendar ", body);
      if (res.code === 200) {
        NotificationManager.success(res.message, res.status);
        const res2 = await Https.post("calendar", { flag: "GET" });
        await this.setState({
          calendarEvents: res2,
          eventDialogOpen: false,
        });
        await this.refreshFullCalendar(this.state.calendarEvents);
      }
    } else {
      let body = { ...values, flag: "POST" };
      const res = await Https.post("calendar ", body);
      if (res.code === 200) {
        NotificationManager.success(res.message, res.status);
        const res2 = await Https.post("calendar", { flag: "GET" });
        await this.setState({ calendarEvents: res2, eventDialogOpen: false });
        await this.refreshFullCalendar(this.state.calendarEvents);
      }
    }
  };

  handleEventClick = async (data) => {
    let {
      event: { id, start, title, allDay, classNames },
    } = data;

    let body = { idcalendar: data.event._def.publicId, flag: "GET_BY" };
    const res = await Https.post("calendar", body);
    if (res.length > 0) {
      let idEmployee, nameEmployee, idClinic, idDoctor;
      if ((res[0].empleado === null) & (res[0].idempleado === null)) {
        idEmployee = nameEmployee = "";
      } else {
        idEmployee = res[0].idempleado;
        nameEmployee = res[0].empleado;
      }

      if (res[0].idclinica === null) idClinic = idDoctor = "";
      else idClinic = res[0].idclinica;

      if (res[0].idmedico === null) idDoctor = "";
      else idDoctor = res[0].idmedico;

      this.setState({
        eventDialogOpen: true,
        eventActividad: {
          id,
          title,
          idclinic: idClinic,
          iddoctor: idDoctor,
          start,
          allDay,
          classNames,
          color: res[0].color_css,
          start_time: res[0].hora_inicio,
          end_time: res[0].hora_fin,
          employee: nameEmployee,
          idemployee: idEmployee,
        },
      });
    }
  };

  handleChange = (event) => {
    let title = event.target.value;

    if (event.key === "Enter") {
      title = title.trim();
      if (title !== "") {
        this.setState({
          externalEvents: [...this.state.externalEvents, { title }],
          newEventInput: "",
        });
      }
    } else {
      this.setState({ newEventInput: title });
    }
  };

  refreshFullCalendar = (eventList = []) => {
    this.setState({
      calendarEvents: eventList.map((e) => ({
        titulo: e.titulo,
        start: e.fecha,
        end: e.fecha,
        title: e.titulo,
        id: e.idcalendario,
        classNames: ["text-white"],
        color: e.color_css,
        allDay: e.fecha,
      })),
    });
  };

  componentDidMount() {
    this.getEmployees();
    this.getAppointments();

    let draggableEl = this.externalEventRef.current;
    new Draggable(draggableEl, {
      itemSelector: ".fc-event",
      eventData: function (eventEl) {
        let title = eventEl.innerText;
        let id = shortid.generate();
        let classNames = eventEl.classList.value + " text-white";
        return { title, id, classNames, create: false };
      },
    });
  }

  render() {
    let {
      calendarEvents,
      calendarWeekends,
      eventDialogOpen,
      eventActividad,
      newEventInput,
      deleteEventOnDrop,
      externalEvents = [],
    } = this.state;

    return (
      <div>
        <Breadcrumb
          routeSegments={[
            { name: "Inicio", path: "/dashboard/v2" },
            { name: "Citas" },
          ]}
        ></Breadcrumb>

        <div className="row">
          <div className="col-md-3">
            <div className="card mb-4">
              <div className="card-body">
                <div className="create_event_wrap">
                  <div className="form-group">
                    <label htmlFor="newEvent"> Crear nueva cita</label>
                    <input
                      id="add-cita"
                      type="text"
                      name="newEvent"
                      className="form-control"
                      placeholder="Ingrese el titulo de la cita"
                      value={newEventInput}
                      onChange={this.handleChange}
                      onKeyUp={this.handleChange}
                    />
                  </div>

                  <ul
                    className="list-group"
                    id="external-events"
                    ref={this.externalEventRef}
                  >
                    {externalEvents.map((event, ind) => (
                      <li
                        key={ind}
                        style={{ backgroundColor: "#f5f5f5", color: "#000000" }}
                        className="list-group-item  fc-event"
                      >
                        {event.title}
                      </li>
                    ))}
                  </ul>
                  <p>
                    <label className="checkbox checkbox-primary">
                      <input
                        type="checkbox"
                        name="agree"
                        value={deleteEventOnDrop}
                        checked={deleteEventOnDrop}
                        onChange={(e) =>
                          this.setState({ deleteEventOnDrop: e.target.checked })
                        }
                      />
                    </label>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="card mb-4 o-hidden" id="calendar">
              <div className="card-body">
                <FullCalendar
                  defaultView="dayGridMonth"
                  header={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,listWeek",
                  }}
                  locale={esLocale}
                  themeSystem="bootstrap"
                  displayEventTime={false}
                  droppable={true}
                  eventLimit={true}
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  ref={this.calendarComponentRef}
                  weekends={calendarWeekends}
                  events={calendarEvents}
                  dateClick={this.handleDateClick}
                  eventClick={this.handleEventClick}
                  drop={this.handleExternalEventDrop}
                />
              </div>
            </div>
          </div>
        </div>
        <CalendarEventDialog
          open={eventDialogOpen}
          closeDialog={this.toggleEventDialog}
          handleSubmit={this.handleEventDialogSubmit}
          initialValues={eventActividad}
          handleDeleteEvent={this.handleDeleteEvent}
          employees={this.state.employees}
        ></CalendarEventDialog>
        <NotificationContainer />
      </div>
    );
  }
}

export default AppCalendar;
