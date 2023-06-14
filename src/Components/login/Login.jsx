import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AppContext } from "../routes/AppRouters";
import { useNavigate, Link } from "react-router-dom";
import { redirectUser, userFind } from "../services/User";
// import { userFind } from '../../services/GetApi';
// import * as Yup from "yup"
import logo from "../../assest/logo.png"
import "./Login.scss"
import { Context } from "../context/Context";
// import bg from "../../assest/bg.png"


const Login = () => {

  const { username, handleUsername } = useContext(Context);
  const navigate = useNavigate();

  const [userList, setUserList] = useState([]);
  const [contraseña, setContraseña] = useState();


  useEffect(() => {
    userFind().then((data) => {
      setUserList(data);
      console.log(userList);
    })
  }, []);

  useEffect(() => {   //aqui
    //redirect if not session
    redirectUser(navigate);
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const userLogin = () => {

    const user = userList.find(item => item.user == username);
    if (user) {
      if (user.password == contraseña) {
        navigate("/Home");
      } else {
        alert("Contraseña incorrecta")
      }

    } else {
      alert("Este nombre de usuario no exite");
    }

  };




  return (

    <div className="back">
      <img
        alt="Pizza"
        src={logo} width={180} className='logo'
      />
      <div className="description">

        <h2>Inicia sesión en tu cuenta</h2>
        <p>
          Disfruta de la mejor pizza creada para las personas amantes del
          Código.
        </p>
      </div>
      <form onSubmit={handleSubmit(userLogin)} className="form">
        <div className="input">
          <input
            type="text"
            placeholder="Nombre de usuario"
            {...register("user", { required: true })}
            value={username}
            onChange={(e) => handleUsername(e.target.value)}
          />
          {errors.email && <span>Este campo es obligatorio</span>}
        </div>

        <div className="input">
          <input
            type="password"
            placeholder="Contraseña"
            {...register("password", { required: true })}
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
          />
          {errors.password && <span>la contraseña es obligatoria</span>}
        </div>
        <button onClick={userLogin} type="submit">Iniciar sesión</button>
      </form>
      <div className="linkRegister">
        <span>Restablecer contraseña</span>
        <h5>¿No tienes una cuenta?</h5>
        <Link to="/register">
          <button className="register">
            Registrate aquí
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login