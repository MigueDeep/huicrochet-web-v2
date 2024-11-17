import { Divider } from "@nextui-org/react";
import Layout from "../../components/common/Layout";
import { SelectProductBase } from "../../components/products/create/SelectProductBase";
import { CreateItemProduct } from "../../components/products/create/CreateItemProduct";
import { useState } from "react";
import { Product } from "../../components/products/create/ProductBaseGrid";

export const CreateProductsPage = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <Layout title="Crear nuevo producto">
      <SelectProductBase onSelectProduct={setSelectedProduct} />
      <Divider />
      <CreateItemProduct selectedProduct={selectedProduct} />
    </Layout>
  );
};
