import React from "react";
import { Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import DigiLogo from "../components/generic/DigiLogo";
import CustomButton from "../components/generic/CustomButton";
import { VIEWS } from "../lib/views";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        p: 4,
      }}
    >
      <DigiLogo className="mb-8" />
      <Typography
        variant="h1"
        sx={{ fontWeight: "bold", color: "#202124", mb: 2 }}
      >
        404
      </Typography>
      <Typography variant="h5" sx={{ color: "#666", mb: 4 }}>
        ¡Ups! La página que buscas no existe.
      </Typography>
      <CustomButton
        className="mt-4 max-w-md"
        onClick={goHome}
        to={VIEWS.home}
        as={Link}
      >
        Volver al Inicio
      </CustomButton>
    </Box>
  );
};

export default NotFoundPage;
