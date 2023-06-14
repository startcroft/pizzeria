import React, { useContext, useEffect, useState } from 'react'
import "./CardsDetails.scss"
import { BsChevronLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { getPizzas } from '../../services/GetApi';
import { Context } from '../context/Context';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import 'swiper/swiper-bundle.css';

const CardsDetails = () => {

  const [pizzaList, setPizzaList] = useState([]);

  const { count, handleLess, handlePlus, } = useContext(Context);
  const [choosedPizza, setChoosedPizza] = useState();
  const [foundPizza, setFoundPizza] = useState();


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

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1)
  }

  const handleNavigateShop = () => {
    navigate(`/shopDetails`);

  };

  return (
    <div className="body">

      <div className="main">
        {foundPizza ? (
          <section className="main__header">
            <div onClick={handleGoBack} className="main__goBack">
              <span><BsChevronLeft className='icon' /></span>Todas las pizzas

            </div>
            <Swiper
              className="SlideDetails"
              modules={[Pagination, Autoplay]}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false
              }}
              pagination={{
                el: ".pagination",
                clickable: true,
              }}
              slidesPerView={1}
              breakpoints={{
                "@0.00": {
                  slidesPerView: 1,
                  spaceBetween: 28,
                },

              }}
            >
              {foundPizza.image?.map((element) => (
                <SwiperSlide className="carrouseldetails">
                  <img src={element.photo} alt="photo" />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="pagination" />
          </section>
        ) : (
          <div className="loading">Loading...</div>
        )}

        {foundPizza ? (
          <div className="main__contentContainer">
            <section className="main__info container">
              <h1>{foundPizza.name}</h1>
              <div className="main__chips">
                <button className="main__chips1"> {foundPizza.precio} </button>
                <button className="main__chips2">⭐  {foundPizza.reviews}</button>
              </div>
              <h3>Descripción</h3>
              <p>
                {foundPizza.descripcion}
              </p>
            </section>
            <section className="main__reviews container">
              <h4>{foundPizza.opinions}</h4>
            </section>
          </div>
        ) : (
          <div className="loading">Loading...</div>
        )}
      </div>
      <div className="buySection">
        <div className="buySection__container container">
          <div className="buySection__counter">
            <button onClick={handleLess}>-</button>
            <span>{count}</span>
            <button onClick={handlePlus}>+</button>
          </div>
          <button className="buySection__cartButton">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABJklEQVRIie2UMVLDMBBF9zOcIQVpoYMiNTAcD07DFQIToMBQQgMtLkKZ9I8CMSMrayIc2QNMfqPxSvufdi3JbKvfKGAEPLCqChiVAIyBS2DhQHK1CB7jXKiAx28MG9WFLlRr1isHPAkJNbC3Ydfq4DVJ53ecnKMwTiXVXcGS3szsOnwe5oD3w/jaFRrpJYwHBbz+i4DbzhcnX7MvniIwQxQoSWb+4RpEMfhmAN7MjQJXPf7facxKW/3UstNjMzvtGHO9d5PJZy9D0p2ZWXz+cmNt3mnFLriQGhXntrqE2iuWNDez9x6gc0kNX+8e99HuFc/0cJl9tvssDgAnFr1yP4lFnmvBXsXexc+NuZ5eq6uW5E10n7UKuACWBV6rJXDeQyFb/QF9ALYLHHR5OwtgAAAAAElFTkSuQmCC"
              alt="cart icon"
            />
          </button>
          <button onClick={
        handleNavigateShop} className="buySection__buyButton">Pagar</button>
        </div>
      </div>
    </div>


  )
}

export default CardsDetails