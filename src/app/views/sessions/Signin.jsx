import React from "react";
import { useFirebaseApp } from "reactfire";
import { useFormik } from "formik";
import "firebase/auth";
import swal from "sweetalert2";

const Signin = (props) => {
  const firebase = useFirebaseApp();

  const login = async (values) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(
        values.email + "@nuestrodiario.com.gt",
        values.password
      )
      .then((userCredential) => {
        var user = userCredential.user;
        if (userCredential.operationType === "signIn") {
          let user_auth = {
            username: values.email,
            email: user.email,
            token: user.refreshToken,
          };
          props.history.push("/home");
          localStorage.setItem("user_auth", JSON.stringify(user_auth));
        }
      })
      .catch((error) => {
        var errorCode = error.code;
        // var errorMessage = error.message;
        if (errorCode) {
          swal.fire({
            icon: "error",
            title: "Error",
            text: "¡Usuario o contraseña incorrecta!",
            footer: "Vuelve a intentar de nuevo",
            timer: 3000,
          });
        }
      });
  };

  // const logout = async (event) => {
  //   event.preventDefault();
  //   const res = await firebase.auth().signOut();
  //   console.log(res);
  // };

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Requerido";
    }

    if (!values.password) {
      errors.password = "Requerido";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      login(values);
    },
  });
  return (
    <div
      className="auth-layout-wrap"
      style={{
        backgroundImage: "url(/assets/images/portadaBlue.jpg)",
      }}
    >
      <div className="auth-content">
        <div
          className="card o-hidden"
          style={{ width: "500px", margin: "10%" }}
        >
          <div className="row">
            <div className="col-md-12">
              <div className="p-4">
                <div className="auth-logo text-center mb-4">
                  <img src="/assets/images/ndd-logo.png" alt="" />
                </div>
                <h1 className="mb-3 text-18">Inicio de Sesión</h1>
                <form onSubmit={formik.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">Usuario</label>
                    <input
                      className="form-control form-control-rounded position-relative"
                      type="text"
                      name="email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                    {formik.errors.email ? (
                      <div className="text-danger">{formik.errors.email}</div>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                      className="form-control form-control-rounded"
                      type="password"
                      name="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    {formik.errors.password ? (
                      <div className="text-danger">
                        {formik.errors.password}
                      </div>
                    ) : null}
                  </div>
                  <button
                    className="btn btn-rounded btn-info btn-block mt-2"
                    type="submit"
                  >
                    Iniciar Sesión
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
