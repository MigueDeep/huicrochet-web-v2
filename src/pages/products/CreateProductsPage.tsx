import { Divider } from "@nextui-org/react";
import Layout from "../../components/common/Layout";
import { SelectProductBase } from "../../components/products/SelectProductBase";
import { ProductBaseInfo } from "../../components/products/ProductBaseInfo";

export const CreateProductsPage = () => {
  return (
    <>
      <Layout title="Crear nuevo producto">
        <SelectProductBase />
        <Divider />
        <ProductBaseInfo />
      </Layout>
    </>
  );
};
