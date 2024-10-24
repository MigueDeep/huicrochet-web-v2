import React from "react";
import Layout from "../../components/common/Layout";
import CategoriesTable from "../../components/categories/CategoriesTable";
const CategoriesPage = () => {
  return (
    <>
      <Layout title="Categorías">
        <CategoriesTable />
      </Layout>
    </>
  );
};

export default CategoriesPage;
