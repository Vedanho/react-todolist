import "./App.css";
import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import SigninPage from "./components/pages/SigninPage";
import SignupPage from "./components/pages/SignupPage";
import { useSelector } from "react-redux";

function App() {
  const token = useSelector((state) => state.auth.token);

  if (!token) { //Если нет токена, то вывести на страницу рег-ии и авт-ии
    return (
      <div className="App">
        <div className="lynks">
          <NavLink to="/"className={({ isActive }) =>  isActive ? "Auth_Active" : "Disactive" } >
            Авторизация
          </NavLink>
          <NavLink to="/SignupPage" className={({ isActive }) => isActive ? "Regist_Active" : "Disactive" }>
            Регистрация
          </NavLink>
        </div>
        <Routes>
          <Route path="/" element={<SigninPage />} />
          <Route path="/SignupPage" element={<SignupPage />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/SigninPage" element={<Navigate replace to="/" />} />
        <Route path="/SignupPage" element={<Navigate replace to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
