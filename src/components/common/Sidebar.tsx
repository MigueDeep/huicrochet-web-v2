import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  CategoriasIcon,
  CerrarSesionIcon,
  DashboardIcon,
  PedidosIcon,
  ProductosIcon,
  UsuariosIcon,
} from "../../utils/icons";

const drawerWidth = 240;
const Sidebar = () => {
  const location = useLocation();
  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Productos", icon: <ProductosIcon />, path: "/productos" },
    { text: "Categorías", icon: <CategoriasIcon />, path: "/categorias" },
    { text: "Usuarios", icon: <UsuariosIcon />, path: "/users" },
    { text: "Ordenes", icon: <PedidosIcon />, path: "/orders" },
  ];

  const navigate = useNavigate();
  const navigateTo = (path: string) => navigate(path);

  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#402F2F",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between", // Distribuye el contenido entre el inicio y el fin
          },
        }}
        variant="permanent"
        anchor="left"
        color="warning"
      >
        <div>
          <div style={styles.logo}>
            <img
              className="logo_image"
              src="/logo.png"
              alt="logo"
              style={{ marginRight: "8px" }}
            />
            <p style={{ fontSize: "20px", margin: 0 }}>HUICROCHET</p>
          </div>
          <Divider />
          <div className="container">
            <p className="text-semibold ">Menú</p>
            <List>
              {menuItems.map((item) => (
                <ListItem key={item.text} disablePadding sx={{ marginBottom: "10px" }}>
                  <ListItemButton
                    sx={{
                      backgroundColor:
                        location.pathname === item.path ? "#F294A5" : "inherit",
                      "&:hover": {
                        backgroundColor:
                          location.pathname === item.path ? "#F294A5" : "#69464B", // Color más oscuro para hover
                      },
                    }}
                    onClick={() => navigateTo(item.path)}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>

          </div>
        </div>
        <div>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <CerrarSesionIcon />
                </ListItemIcon>
                <ListItemText primary="Cerrar sesión" />
              </ListItemButton>
            </ListItem>
          </List>
        </div>
      </Drawer>
    </>
  );
};

const styles = {
  logo: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "16px",
  },
};

export default Sidebar;
