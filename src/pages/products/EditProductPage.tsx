import { Divider } from "@nextui-org/react";
import Layout from "../../components/common/Layout";
import { SelectProductBase } from "../../components/products/SelectProductBase";
import { CreateItemProduct } from "../../components/products/CreateItemProduct";

export const EditProductPage = () => {
  return (
    <>
      <Layout title="Editar producto">
        <SelectProductBase />
        <Divider />
        <CreateItemProduct />
      </Layout>
    </>
  );
};
