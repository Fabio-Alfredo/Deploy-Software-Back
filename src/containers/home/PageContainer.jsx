import { Container, Paper, Toolbar, useMediaQuery } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";

const PageContainer = ({ children, sx = {} }) => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Paper
      sx={{
        p: { xs: 0, sm: 2 },
        boxShadow: "none",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#fff",
      }}
    >
      <Sidebar horizontalOrientation={isMobile} />

      <Container
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          paddingLeft: { xs: isMobile ? 4 : 14 },
          paddingBottom: { xs: isMobile ? 14 : 0 },
          ...sx,
        }}
      >
        <Toolbar />
        {children}
      </Container>
    </Paper>
  );
};

PageContainer.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
};

export default PageContainer;
