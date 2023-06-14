import React, {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createUser, redirectUser } from "../services/User";
import "./Register.scss"
import axios from "axios";


const Register = () => {

  const [nameuser, setNameUser] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  useEffect(() => {
   

    redirectUser(navigate);
  }, []);
  
  
    
    const {
      register,
      handleSubmit,
      formState: { errors },
      getValues
    } = useForm();


    const onSubmit = async () => {
      const values = getValues();
      const payload = {
        user: nameuser,
        password: password
      };
  
      try {
        const response = await axios.post("https://backend-pizza-production.up.railway.app/usuarios/", payload);
        console.log(response.data);
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    };
  




    return (

        <div className="register">
      <img
        src="https://hungryforhalaal.co.za/wp-content/uploads/2021/05/Pizza-Spots-Cape-Town-Hungry-for-Halaal.jpg"
        alt="Pizza"
      />
      <div className="formRegister"></div>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="input">
          <input
            type="text"
            {...register("name", { required: true })}
            className={errors.name ? "input--error" : ""}
            placeholder="Nombre"
            value={nameuser}
            onChange={(e) => setNameUser(e.target.value)}
          />
        </div>

        <div className="input">
          <input
            type="email"
            {...register("email", { required: true })}
            className={errors.email ? "input--error" : ""}
            placeholder="Email"
          />
        </div>
        <div className="input">
          <input
            type="password"
            {...register("password", { required: true })}
            className={errors.password ? "input--error" : ""}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Registrarse</button>
      </form>
    </div>

    )
}

export default Register