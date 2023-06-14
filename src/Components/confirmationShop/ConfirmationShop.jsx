import React from "react";
import "./ConfirmationShop.scss";
import Gif from "../../assest/animation_500_litbrmxp.gif";
import { useNavigate } from "react-router-dom";


const ConfirmationShop = () => {
    const navigate = useNavigate();
    const onSubmit = (e) => {
        e.preventDefault(); 
        navigate("/Home");
      };
  return (
    <>
      <form onSubmit={onSubmit} className="contenedor__procesado">
        <div>
          <img src={Gif} alt="" className="prueba" />
        </div>

        <p className="titulo__procesado">Tú pedido esta en proceso</p>
        <p className="subtitulo">
          Seras notificado cuando llegue el repartidor
        </p>
        <button type="submit" className="boton__procesado">
          Aceptar
        </button>
      </form>
    </>
  );
};

export default ConfirmationShop;
