import { Divider } from "@nextui-org/react";
import Layout from "../../components/common/Layout";
import { useState } from "react";
import { Product } from "../../components/products/ProductBaseGrid";
import { EditSelectProductBase } from "../../components/products/EditSelectProductBase";
import { EditItemProduct } from "./EditItemProduct";

export const EditProductPage = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <Layout title="Editar">
      <EditSelectProductBase onSelectProduct={setSelectedProduct} />
      <Divider />
      <EditItemProduct selectedProduct={selectedProduct} />
    </Layout>
  );
};
