import { Divider } from "@nextui-org/react";
import Layout from "../../components/common/Layout";
import { SelectProductBase } from "../../components/products/SelectProductBase";
import { CreateItemProduct } from "../../components/products/CreateItemProduct";

export const CreateProductsPage = () => {
  return (
    <>
      <Layout title="Crear nuevo producto">
        <SelectProductBase />
        <Divider />
        <CreateItemProduct />
      </Layout>
    </>
  );
};
