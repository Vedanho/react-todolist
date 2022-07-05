import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../features/applicationSlice";
import "./SignForm.css";

const SignForm = () => {
  const dispatch = useDispatch();

  const [login, setLogin] = useState();
  const [password, setPassword] = useState();

  const signingUp = useSelector((state) => state.auth.signingUp);    //Ключ авторизации
  const error = useSelector((state) => state.auth.error);           //Ключ ошибки
  const success = useSelector((state) => state.auth.success);      //Ключ успешной регистрации

  const handleChangeLogin = (e) => {
    setLogin(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    if (login !== "" && password !== "") {
    dispatch(createUser({ login, password })) //Передача логина и пароля в reducer
    } else if (login === "" || password === "") {
      error = "Логин или пароль не должны быть пустыми!"
    }
  };

  const handleForm = (e) => {
    e.preventDefault();//Для блокировки формы
  };

  return (
    <div className="main">
      {success ? ( //Если пользователь зарегистрировался, то появится спец окошко
        <div className="success">
          Вы успешно зарегистрировались! <br /> Перейдите на страницу авторизации,
          чтобы войти в аккаунт.
        </div>
      ) : (
        <>
          <div className="error">{error}</div>
          <>
            <Form onSubmit={handleForm} className="authForm">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={login}
                  onChange={handleChangeLogin}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handleChangePassword}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                onClick={handleSubmit}
                disabled={signingUp}
                className="authButton"
              >
                Зарегистрироваться
              </Button>
            </Form>
          </>
        </>
      )}
    </div>
  );
};

export default SignForm;
