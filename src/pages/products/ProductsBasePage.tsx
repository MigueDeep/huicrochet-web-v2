import Layout from "../../components/common/Layout";
import { ProductsBase } from "../../components/products/table/ProductsBase";

export const ProductsBasePage = () => {
  return (
    <Layout title="Productos base">
      <div className="">
        <ProductsBase />
      </div>
    </Layout>
  );
};
