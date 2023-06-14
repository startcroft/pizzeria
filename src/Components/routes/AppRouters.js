import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import ContextProvider from "../context/Context";
import Home from "../home/Home";
import Login from "../login/Login"
import Register from "../register/Register"
import { createContext, useState } from "react";


import SearchsPizzas from "../searchs/SearchsPizzas";
import CardsDetails from "../cardsDetails/CardsDetails"
import ShopDetails from "../shopDetails/ShopDetails";
import ConfirmationShop from "../confirmationShop/ConfirmationShop";

export const AppContext = createContext({});


const AppRouters = () => {

  const [usuario, setUsuario] = useState({});

  return (
    <div>

    <AppContext.Provider
      value={{
        usuario,
        setUsuario,
      }}
      >

      <BrowserRouter>
        <ContextProvider>
          <Routes>
              
          <Route path='/' index element={<Login />} />
          <Route path={"/register"} element={<Register />}/>
            
          
          <Route path="shopDetails" element={<ShopDetails />} />
          <Route path="pizzasDetails" element={<CardsDetails />} />
          <Route path="confirmationShop" element={<ConfirmationShop />} />
            <Route path={"/"} element={<Layout />}>
              <Route path={"/Home"} index element={<Home />} />
              
              <Route path="searchPizzas" element={<SearchsPizzas />} />
             

            </Route>
          </Routes>
        </ContextProvider>
      </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
};

export default AppRouters;