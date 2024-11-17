import { Divider } from "@nextui-org/react";
import Layout from "../../components/common/Layout";

import { EditItemProduct } from "../../components/products/edit/EditItemProduct";
import { EditSelectProductBase } from "../../components/products/edit/EditSelectProductBase";

export const EditProductPage = () => {
 
  return (
    <Layout title="Editar">
      <EditSelectProductBase
        
      />
      <Divider />
      <EditItemProduct />
    </Layout>
  );
};
