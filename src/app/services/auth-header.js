export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user_auth"));

  if (user && user.token) {
    return { authorization: user.token };
  } else {
    return {};
  }
}
