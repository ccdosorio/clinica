import React from "react";
import SimpleCard from "@gull/components/cards/SimpleCard";
import { format } from "date-fns";

const PrescriptionInternalList = ({ prescriptions, title }) => {
  return (
    <div className="col-lg-6 mb-3">
      <SimpleCard title={title} className="mb-4">
        {prescriptions.length === 0 ? (
          <p className="text-muted">No hay recetas creadas</p>
        ) : (
          <>
            {prescriptions.map((item, ind) => (
              <div
                key={ind}
                className="d-flex flex-column border-bottom flex-sm-row align-items-sm-center mb-3"
              >
                <div className="flex-grow-1">
                  <h5>
                    <b>{item.descripcion}</b>
                  </h5>
                  <p className="m-0 text-small text-muted">
                    Cantidad: {item.cantidad}
                  </p>
                  <p className="m-0 text-small text-muted">Días: {item.dias}</p>
                  <p className="m-0 text-small text-muted">
                    Diagnóstico: {item.diagnostico}
                  </p>
                  <p>
                    Fecha Consulta:{" "}
                    {format(
                      new Date(
                        item.fechaConsulta ? item.fechaConsulta : new Date()
                      ).getTime(),
                      "dd MMM, yyyy"
                    )}
                  </p>
                  <p>Enfermedad: {item.enfermedad}</p>
                  <p>Artículo: {item.articulo}</p>
                </div>
              </div>
            ))}
          </>
        )}
      </SimpleCard>
    </div>
  );
};

export default PrescriptionInternalList;
