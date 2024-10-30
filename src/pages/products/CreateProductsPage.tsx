import Layout from "../../components/common/Layout";
import { ProductsBase } from "../../components/products/ProductsBase";

export const CreateProductsPage = () => {
  return (
    <>
      <Layout title="Crear nuevo producto">
        <div className="">
          <ProductsBase />
        </div>
      </Layout>
    </>
  );
};
