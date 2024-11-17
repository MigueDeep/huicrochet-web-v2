import { Divider } from "@nextui-org/react";
import Layout from "../../components/common/Layout";
import { useState } from "react";

import { EditItemProduct } from "../../components/products/edit/EditItemProduct";
import { EditSelectProductBase } from "../../components/products/edit/EditSelectProductBase";
import { Product } from "../../components/products/create/ProductBaseGrid";

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
