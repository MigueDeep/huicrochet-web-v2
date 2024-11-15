import { useState } from "react";
import { ButtonGroup, Tooltip } from "@nextui-org/react";
import Layout from "../../components/common/Layout";
import { Button, IconButton } from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import ListIcon from "@mui/icons-material/List";
import { ProductsGrid } from "../../components/products/ProductsGrid";
import { ProductsTable } from "../../components/products/ProductsTable";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

export const ProductsPage = () => {
  const [view, setView] = useState("table");
  const navigate = useNavigate();
  const onCreateProduct = () => {
    navigate("/products/create");
  };
  return (
    <Layout title="Productos">
      <div className="flex justify-end">
        <Button
          startIcon={<AddIcon />}
          onClick={onCreateProduct}
          variant="contained"
          color="primary"
        >
          Crear producto
        </Button>
      </div>
      <div className="text-end">
        <ButtonGroup variant="bordered" aria-label="Basic button group">
          <Tooltip content="Vista de lista">
            <IconButton onClick={() => setView("table")}>
              <ListIcon color={view === "table" ? "info" : "inherit"} />
            </IconButton>
          </Tooltip>
          <Tooltip content="Vista de cuadicula">
            <IconButton onClick={() => setView("grid")}>
              <GridViewIcon color={view === "grid" ? "info" : "inherit"} />
            </IconButton>
          </Tooltip>
        </ButtonGroup>
      </div>
      <div className="">
        {view === "grid" ? <ProductsGrid /> : <ProductsTable />}
      </div>
    </Layout>
  );
};
