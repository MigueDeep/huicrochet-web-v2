import Layout from "../../components/common/Layout";
import { BestSellingProducts } from "../../components/dashboard/BestSellingProducts";
import CardStats from "../../components/dashboard/CardStats";
import Incomes from "../../components/dashboard/Incomes";
import { LastSales } from "../../components/dashboard/LastSales";
import { UsersStats } from "../../components/dashboard/UsersStats";
import Views from "../../components/dashboard/Views";
import { ViewsDateStats } from "../../components/dashboard/ViewsDateStats";

const DashboardPage = () => {
  return (
    <>
      <Layout title="Dashboard">
        <div className="container-fluid" style={{ width: "100%" }}>
          <Views />
          <div className="row">
            <div className="col-12 col-md-8">
              <BestSellingProducts />
            </div>
            <div className="col-12 col-md-4">
              <div className="row">
                <div className="col-12">
                  <UsersStats />
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <ViewsDateStats />
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <LastSales />
          </div>
          <Incomes />
        </div>
      </Layout>
    </>
  );
};

export default DashboardPage;
