import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  Box,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { HomeIcon, PomodoroIcon, TaskIcon, LogoutIcon } from "../generic/Icons";
import PropTypes from "prop-types";
import { useAuth } from "../../context/AuthContext";

const Sidebar = ({ horizontalOrientation }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const items = [
    { icon: <HomeIcon width={40} height={40} />, text: "Home", path: "/" },
    { icon: <TaskIcon width={30} height={30} />, text: "Task", path: "/tasks" },
    {
      icon: <PomodoroIcon width={30} height={30} />,
      text: "Pomo",
      path: "/pomodoro",
    },
    {
      icon: <LogoutIcon width={30} height={30} />,
      text: "Logout",
      action: () => setLogoutModalOpen(true),
    },
  ];

  return (
    <>
      <Drawer
        variant="permanent"
        anchor={horizontalOrientation ? "bottom" : "left"}
        PaperProps={{
          style: {
            width: horizontalOrientation ? "100%" : "80px",
            height: horizontalOrientation ? "80px" : "100%",
            overflow: "hidden",
            display: "flex",
            flexDirection: horizontalOrientation ? "row" : "column",
            alignItems: "center",
            justifyContent: horizontalOrientation ? "center" : "flex-start",
            backgroundColor: "#fff",
          },
        }}
      >
        <List
          style={{
            width: "100%",
            display: "flex",
            flexDirection: horizontalOrientation ? "row" : "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {items.map((item, index) => {
            const isSelected = location.pathname === item.path;

            return (
              <ListItem
                button
                key={index}
                onClick={item.path ? () => navigate(item.path) : item.action}
                sx={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: horizontalOrientation ? "100%" : "100px",
                  textAlign: "center",
                  backgroundColor: isSelected ? "#e7e7e7" : "transparent",
                  color: "#202124",
                  cursor: "pointer",
                }}
              >
                <ListItemIcon
                  style={{
                    justifyContent: "center",
                    color: "#202124",
                    alignItems: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  style={{
                    fontSize: "11px",
                    textAlign: "center",
                    whiteSpace: "nowrap",
                    display: "contents",
                  }}
                />
              </ListItem>
            );
          })}
        </List>
      </Drawer>

      {/* Modal de confirmación de logout */}
      <Modal
        open={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        aria-labelledby="logout-modal-title"
        aria-describedby="logout-modal-description"
      >
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            backgroundColor: "#fff",
            padding: "16px",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Typography
            id="logout-modal-title"
            variant="h6"
            component="h2"
            style={{ marginBottom: "16px" }}
          >
            Confirmación de logout
          </Typography>
          <Typography
            id="logout-modal-description"
            style={{ marginBottom: "24px" }}
          >
            Estás seguro de que deseas cerrar sesión?
          </Typography>
          <Box style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                logout();
                setLogoutModalOpen(false);
              }}
            >
              Sí
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setLogoutModalOpen(false)}
            >
              No
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

Sidebar.propTypes = {
  horizontalOrientation: PropTypes.bool,
};

export default Sidebar;
