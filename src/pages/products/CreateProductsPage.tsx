import { Divider } from "@nextui-org/react";
import Layout from "../../components/common/Layout";
import { SelectProductBase } from "../../components/products/SelectProductBase";
import { CreateItemProduct } from "../../components/products/CreateItemProduct";
import { useState } from "react";
import { Product } from "../../components/products/ProductBaseGrid";

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
