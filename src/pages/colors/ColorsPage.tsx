import ColorsTable from "../../components/colors/ColorsTable";
import Layout from "../../components/common/Layout";

const ColorsPage = () => {
  return (
    <Layout title="Colores">
      <div style={styles.container}>
        <div className="row mt-4">
          <ColorsTable />
        </div>
      </div>
    </Layout>
  );
};

export default ColorsPage;

const styles = {
  container: {
    padding: "1rem",
  }
};
