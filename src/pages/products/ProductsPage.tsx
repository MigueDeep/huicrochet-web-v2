import { ButtonGroup, Tooltip } from "@nextui-org/react";
import Layout from "../../components/common/Layout";
import { IconButton } from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import ListIcon from "@mui/icons-material/List";
import { ProductsGrid } from "../../components/products/ProductsGrid";
export const ProductsPage = () => {
  return (
    <Layout title="Productos">
      <div className="text-end">
        <ButtonGroup variant="bordered" aria-label="Basic button group">
          <Tooltip content="Vista de cuadrícula">
            <IconButton>
              <GridViewIcon color="info" />
            </IconButton>
          </Tooltip>
          <Tooltip content="Vista de lista">
            <IconButton>
              <ListIcon />
            </IconButton>
          </Tooltip>
        </ButtonGroup>
      </div>
      <div className="">
        <ProductsGrid />
      </div>
    </Layout>
  );
};
