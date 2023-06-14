import { Box, ChakraProvider, Flex, Image, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { GiOpenBook } from "react-icons/gi";
import FooterFondo from "../../assest/footer.png";
import { RiShoppingBasket2Line } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router";

const Footer = () => {
  const [activePage, setActivePage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchClick = () => {
    setActivePage("buscar");
    navigate("/searchPizzas");
  };

  const handleBookClick = () => {
    setActivePage("home");
    navigate("/Home");
  };

  const handlePurchasesClick = () => {
    setActivePage("shopDetails");
    navigate("/shopDetails");
  };
  return (
    <ChakraProvider>
      <Box width="100%" height="70px" marginTop="20px"  style={{position: "sticky", zIndex: "50", bottom: "5px"}}>
        <Image src={FooterFondo} alt="FooterFondo" width="100%" />
        <Flex
          alignItems="center"
          justifyContent="space-between"
          position="relative"
          top="-110"
          padding="22px"
          paddingTop="2px"
        >
          <Stack
            direction="row"
            alignItems="center"
            _hover={{ cursor: "pointer" }}
            onClick={handleBookClick}
          >
            <GiOpenBook />

            {/* <Image
              alt="Book"
              boxSize={21}
              maxW={20}
              style={{
                filter:
                  location.pathname === "/home" ? "brightness(0.8)" : "none",
                fill: location.pathname === "/Home" ? "#FF2153" : "gray",
              }}
            /> */}

            <h3
              style={{
                color: activePage === "home" ? "#FF2153" : "gray",
                fontWeight: "bold",
                color: location.pathname === "/Home" ? "#FF2153" : "gray",
              }}
            >
              Home
            </h3>
          </Stack>

          <Box 
          style={{ left: "-25px"}}
            position="relative"
            w={75}
            h={75}
            borderRadius="50%"
            bg="white"
            top="-53"
            boxShadow="0px 9px 5px rgba(0, 0, 0, 0.2)"
          >
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
            >
              <Stack
                direction="row"
                alignItems="center"
                _hover={{ cursor: "pointer" }}
                onClick={handlePurchasesClick}
              >
                <RiShoppingBasket2Line fontSize="1.8rem" color="gray" />
              </Stack>
            </Box>
          </Box>

          <Stack
            direction="row"
            alignItems="center"
            _hover={{ cursor: "pointer" }}
            onClick={handleSearchClick}
            boxSize={24}
            maxW={21}
            style={{
              filter:
                location.pathname === "/home" ? "brightness(0.8)" : "none",
              fill: location.pathname === "/Home" ? "#42252c" : "gray",
            }}
          >
            <RiSearchLine style={{ position: "absolute", right: "90px"}}/>

            <h3
              style={{
                position: "absolute",
                right: "15px",
                color: activePage === "buscar" ? "#FF2153" : "gray",
                fontWeight: "bold",
                color:
                  location.pathname === "/searchPizzas" ? "#FF2153" : "gray",
              }}
            >
              Buscar
            </h3>
          </Stack>
        </Flex>
      </Box>
    </ChakraProvider>
  );
};

export default Footer;