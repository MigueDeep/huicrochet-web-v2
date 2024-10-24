import Layout from "../../components/common/Layout";
import OrdersTable from "../../components/orders/OrderTable";

const OrdersPage = () => {
  return (
    <>
      <Layout title="Ordenes">
        <div style={styles.container}>
          <div className="row">
            <OrdersTable />
          </div>
        </div>
      </Layout>
    </>

  );
};

export default OrdersPage;

const styles = {
  container: {
    padding: "1rem",
  }
};
