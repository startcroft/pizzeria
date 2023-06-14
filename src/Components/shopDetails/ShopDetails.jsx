import React, { useContext, useEffect, useState } from 'react'
import "./shopDetails.scss";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getPizzas } from '../../services/GetApi';
import { Context } from '../context/Context';
import axios from "axios";

const ShopDetails = () => {

  const { count } = useContext(Context);

  const [pizzaList, setPizzaList] = useState([]);
  const [choosedPizza, setChoosedPizza] = useState();
  const [foundPizza, setFoundPizza] = useState();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm();
  const handleGoBack = () => {
    navigate(-1)
  }

  const getFromStorage = () => {

    const pizzaId = sessionStorage.getItem("detailsParams") ? JSON.parse(sessionStorage.getItem("detailsParams")) : {};
    setChoosedPizza(pizzaId);
  }

  useEffect(() => {
    getPizzas().then((data) => {
      setPizzaList(data);
    });
  }, []);

  useEffect(() => {
    getFromStorage();
  }, []);

  useEffect(() => {
    if (choosedPizza && pizzaList.length > 0) {
      const Pizza = pizzaList.find(item => item.id == choosedPizza);
      setFoundPizza(Pizza);
      console.log(foundPizza);
    }
  }, [choosedPizza, pizzaList]);

  // const onSubmit =  () => {
  //   navigate("/confirmationShop");
  // }
  const ValidateTarjeta = (value) => {
    if (value.length < 8) {
      return "El numero debería contener al menos 8 caracteres";
    } else if (value.length > 16) {
      return "El numero debe contener menos de 16 de caracteres";
    } else {
      return true;
    }
  };
  const ValidateFecha = (value) => {
    if (value.length < 4) {
      return "El numero debe contener exactamente 4 caracteres";
    } else {
      return true;
    }
  };
  const ValidateCvv = (value) => {
    if (value.length < 3) {
      return "El numero debe contener exactamente 3 caracteres";
    } else {
      return true;
    }
  };

  const onSubmit = async () => {
    const values = getValues();
    const payload = {
      pizza: foundPizza.name,
      cantidad: count,
      precio: count * foundPizza.precio,
      nombre: values.nombre,
      tarjeta: values.tarjeta,
      fecha: values.fecha,
      cvv: values.cvv,
      direccion: values.direccion,
    };

    try {
      const response = await axios.post("https://backend-pizza-production.up.railway.app/compras/", payload);
      console.log(response.data);
      navigate("/confirmationShop");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="contenedor__todo">
        <div className="boton__salir">
          <button onClick={handleGoBack} className="boton__salir__pago" >
            <img src="https://cdn-icons-png.flaticon.com/512/3502/3502452.png" alt="" className="boton__atras" />
          </button>
          <h2>Carrito de compras</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="containerformulario">

          {foundPizza ? (
            <div className="card__compra">
              <img src={foundPizza.image[0].photo} alt="pizza" className="imagen__shop" />
              <div className="contenedor__shop">
                <div className="name__shop">{foundPizza.name}</div>
                <div className="cantidad__shop">x {count}</div>
              </div>
              <div>
                <div className="price__shop">$  {foundPizza.precio * count}</div>
              </div>
            </div>
          ) : (
            <div className="loading">Loading...</div>
          )}
          <h2 className='title__shop'>Informacion de pago</h2>
          <label>
            Nombre completo
            <input
              className="form-control"
              type="text"
              placeholder="Ingresa tu nombre"
              {...register("nombre", {
                required: true
              })}
            />
            {errors.nombre && (
              <span>El campo es obligatorio</span>
            )}
          </label>

          <label>
            Numero de tarjeta
            <input
              className="form-control"
              type="number"
              placeholder="1234 1234 1234 1234"
              {...register("tarjeta", {
                required: true,
                validate: ValidateTarjeta,
              })}
            />
            {errors.tarjeta && (
              <span>El numero ingresado no pertenece a ninguna tarjeta</span>
            )}
          </label>

          <div className="contenedor__fecha">
            <div>
              <label>
                Fecha de vencimiento
                <input
                  className="form-control-fecha"
                  type="number"
                  placeholder="MMYY"
                  {...register("fecha", {
                    required: true,
                    validate: ValidateFecha,
                  })}
                />
                {errors.fecha && <span>la fecha ingresada es invalida</span>}
              </label>
            </div>
            <div>
              <label>
                CVV
                <input
                  className="form-control-cvv"
                  type="password"
                  placeholder="CVV"
                  {...register("cvv", {
                    required: true,
                    validate: ValidateCvv,
                  })}
                />
                {errors.cvv && <span>El codigo ingresado es incorrecto</span>}
              </label>
            </div>
          </div>
          <label>
            Direccion
            <input
              className="form-control"
              type="street-address"
              placeholder="Direccion"

            />

          </label>

          <button type="submit" className="boton__form">
            Pagar ahora
          </button>
        </form>
      </div>
    </>
  )
}

export default ShopDetails