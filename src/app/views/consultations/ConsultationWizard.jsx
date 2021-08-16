import React, { Component } from "react";
import { Breadcrumb } from "@gull";
import StepWizard from "react-step-wizard";
import { NotificationContainer } from "react-notifications";

import ConsultationWizardNav from "./ConsultationWizardNav";
import ConsultationSymptoms from "./ConsultationSymptoms";
import ConsultationSpecialty from "./ConsultationSpecialty";
import ConsultationDiagnosis from "./ConsultationDiagnosis";
import ConsultationExam from "./ConsultationExam";

class ConsultationWizard extends Component {
  state = {};
  render() {
    return (
      <div>
        <Breadcrumb routeSegments={[{ name: "Detalle Consulta" }]}></Breadcrumb>
        <div className="row">
          <div className="col-md-12">
            <StepWizard
              nav={<ConsultationWizardNav />}
              initialStep={1}
              isHashEnabled={true}
            >
              <ConsultationSymptoms
                hashkey={"first"}
                idConsultation={this.props.match.params.id}
              ></ConsultationSymptoms>
              <ConsultationSpecialty
                hashkey={"second"}
                idConsultation={this.props.match.params.id}
              ></ConsultationSpecialty>
              <ConsultationDiagnosis
                hashkey={"third"}
                idConsultation={this.props.match.params.id}
              ></ConsultationDiagnosis>
              <ConsultationExam
                hashkey={"fourth"}
                idConsultation={this.props.match.params.id}
                idEmployee={this.props.match.params.idemployee}
                history={this.props.history}
              ></ConsultationExam>
            </StepWizard>
          </div>
        </div>
        <NotificationContainer />
      </div>
    );
  }
}

export default ConsultationWizard;
