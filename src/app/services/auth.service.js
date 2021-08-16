import Http from "../api/Https";

class AuthService {
  login = async (usuario, password) => {
    const res = await Http.post("login", { usuario, password });
    return res;
  };

  logout() {
    localStorage.removeItem("user_auth");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user_auth"));
  }
}

export default new AuthService();
