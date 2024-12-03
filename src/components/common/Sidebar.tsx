import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import {
  CategoriasIcon,
  CerrarSesionIcon,
  DashboardIcon,
  PedidosIcon,
  ProductosIcon,
  UsuariosIcon,
  ColorIcon,
  CategoryIcon,
  HiloICon,
  BaseProductIcon,
} from "../../utils/icons";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const drawerWidth = 240;

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [openProductos, setOpenProductos] = useState(false);
  const [openCatalogos, setOpenCatalogos] = useState(false);

  useEffect(() => {
    // Abrir el collapse correspondiente si la ruta coincide con una de sus subrutas
    setOpenProductos(location.pathname.startsWith("/products"));
    setOpenCatalogos(location.pathname.startsWith("/categories") || location.pathname.startsWith("/colors"));
  }, [location.pathname]);

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    {
      text: "Productos",
      icon: <ProductosIcon />,
      children: [
        { text: "Producto base", path: "/products/base", icon: <BaseProductIcon /> },
        { text: "Productos", path: "/products", icon: <HiloICon /> },
      ],
    },
    {
      text: "Catálogos",
      icon: <CategoriasIcon />,
      children: [
        { text: "Categorías", path: "/categories", icon: <CategoryIcon /> },
        { text: "Colores", path: "/colors", icon: <ColorIcon /> },
      ],
    },
    { text: "Usuarios", icon: <UsuariosIcon />, path: "/users" },
    { text: "Ordenes", icon: <PedidosIcon />, path: "/orders" },
  ];

  const navigateTo = (path: string) => navigate(path);

  const handleProductosClick = () => {
    setOpenProductos(!openProductos);
  };

  const handleCatalogosClick = () => {
    setOpenCatalogos(!openCatalogos);
  };

  const closeSession = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    window.location.href = "/login";
  };

  return (
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
          justifyContent: "space-between",
        },
      }}
      variant="permanent"
      anchor="left"
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
          <p className="text-semibold">Menú</p>
          <List>
            {menuItems.map((item) => (
              <div key={item.text}>
                {item.children ? (
                  <>
                    <ListItem disablePadding>
                      <ListItemButton
                        onClick={
                          item.text === "Productos"
                            ? handleProductosClick
                            : handleCatalogosClick
                        }
                      >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                        {(
                          item.text === "Productos"
                            ? openProductos
                            : openCatalogos
                        ) ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        )}
                      </ListItemButton>
                    </ListItem>
                    <Collapse
                      in={
                        item.text === "Productos"
                          ? openProductos
                          : openCatalogos
                      }
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" disablePadding>
                        {item.children.map((child) => (
                          <ListItem
                            key={child.text}
                            disablePadding
                            sx={{ pl: 4 }}
                          >
                            <ListItemButton
                              sx={{
                                backgroundColor:
                                  location.pathname === child.path
                                    ? "#F294A5"
                                    : "inherit",
                                "&:hover": {
                                  backgroundColor:
                                    location.pathname === child.path
                                      ? "#F294A5"
                                      : "#69464B",
                                },
                              }}
                              onClick={() => navigateTo(child.path)}
                            >
                              <ListItemIcon>{child.icon}</ListItemIcon>
                              <ListItemText primary={child.text} />
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>
                  </>
                ) : (
                  <ListItem disablePadding>
                    <ListItemButton
                      sx={{
                        backgroundColor:
                          location.pathname === item.path
                            ? "#F294A5"
                            : "inherit",
                        "&:hover": {
                          backgroundColor:
                            location.pathname === item.path
                              ? "#F294A5"
                              : "#69464B",
                        },
                      }}
                      onClick={() => navigateTo(item.path)}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                  </ListItem>
                )}
              </div>
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
              <ListItemText primary="Cerrar sesión" onClick={closeSession} />
            </ListItemButton>
          </ListItem>
        </List>
      </div>
    </Drawer>
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
