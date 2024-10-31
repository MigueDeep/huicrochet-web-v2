import Layout from "../../components/common/Layout";
import { SelectProductBase } from "../../components/products/SelectProductBase";

export const CreateProductsPage = () => {
  return (
    <>
      <Layout title="Crear nuevo producto">
        <div className="">
          <SelectProductBase />
        </div>
      </Layout>
    </>
  );
};
