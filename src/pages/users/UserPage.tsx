import Layout from "../../components/common/Layout";
import UsersTable from "../../components/users/UsersTable";

const UserPage = () => {
  return (
    <Layout title="Usuarios">
      <div className="row">
        <UsersTable />
      </div>
    </Layout>
  );
};

export default UserPage;
