import { Container, Paper } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

const LoginPageContainer = ({ children, sx = {} }) => {
  return (
    <Paper
      className="!background-gradient"
      sx={{
        p: { xs: 0, sm: 2 },
        boxShadow: "none",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          ...sx,
        }}
      >
        {children}
      </Container>
    </Paper>
  );
};

LoginPageContainer.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
};

export default LoginPageContainer;
