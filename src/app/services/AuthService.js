import { Store } from "../redux/Store";

export const signin = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        userId: "1",
        Name: "TI",
        email: "romeo.munoz@nuestrodiario.com.gt",
        age: 25,
      });
    }, 1000);
  });
};

export const signup = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        userId: "1",
        Name: "TI",
        email: "romeo.munoz@nuestrodiario.com.gt",
        age: 25,
      });
    }, 1000);
  });
};

export const signout = () => {
  console.log("Log out successfule");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
};

let authenticated = true;

export const getAuthStatus = () => authenticated;

Store.subscribe((state) => {
  if (state) authenticated = state.auth.isUserLoggedIn;
});
