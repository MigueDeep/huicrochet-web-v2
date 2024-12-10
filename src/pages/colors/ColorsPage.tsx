import ColorsTable from "../../components/colors/ColorsTable";
import Layout from "../../components/common/Layout";

const ColorsPage = () => {
  return (  
    <Layout title="Colores">
      <div className="container">
        <ColorsTable />
      </div>
    </Layout>
  );
};

export default ColorsPage;

  