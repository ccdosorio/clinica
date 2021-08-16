import React, { Fragment } from "react";

const Footer = () => {
  return (
    <Fragment>
      <div className="flex-grow-1"></div>
      <div className="app-footer">
        <div className="row">
          <div className="col-md-9">
            <p>
              <strong>Ingreso ND</strong>
            </p>
            <p>
              Sistema para administrar todos los empleados de Nuestro Diario
            </p>
          </div>
        </div>
        <div className="footer-bottom border-top pt-3 d-flex flex-column flex-sm-row align-items-center">
          {/* <a
            id="buy-gull"
            className="btn btn-primary text-white btn-rounded"
            href="https://themeforest.net/user/mh_rafi"
            target="_blank"
            rel="noopener noreferrer"
          >
            Buy Gull React
          </a> */}
          <span className="flex-grow-1"></span>
          <div className="d-flex align-items-center">
            <img className="logo" src="/assets/images/ndd-logo.png" alt="" />
            <div>
              <p className="m-0">&copy; 2021 Diarios Modernos S.A</p>
              <p className="m-0">Todos los derechos reservados</p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Footer;
