
import { UserNoOnlineIcon, UserOnlineIcon, UsersIcon } from "../../utils/icons";

export const UsersStats = () => {
  return (
    <>
      <div className="card" style={styles.card}>
        <div
          className="header text-wine text-semibold d-flex ml-2"
          style={styles.header}
        >
          Usuarios
        </div>
        <div className="body d-flex justify-content-start align-items-center mb-4">
          <UsersIcon />
          <div className="ml-2 d-flex flex-column">
            <div className="text-semibold">Total de usuarios</div>
            <div className="text-pink">1,000</div>
          </div>
        </div>
        <div className="body d-flex justify-content-start align-items-center mb-4">
          <UserOnlineIcon />
          <div className="ml-2 d-flex flex-column">
            <div className="text-semibold text-green">Usuarios activos</div>
            <div className="text-pink">1,000</div>
          </div>
        </div>
        <div className="body d-flex justify-content-start align-items-center mb-4">
          <UserNoOnlineIcon />
          <div className="ml-2 d-flex flex-column">
            <div className="text-semibold text-red">Usuarios inactivos</div>
            <div className="text-pink">1,000</div>
          </div>
        </div>
      </div>
    </>
  );
};

const styles = {
  card: {
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    borderRadius: 18,
    border: "none",
    padding: 20,
    margin: 10,
  },
  header: {
    display: "flex",
    justifyContent: "center",
  },
};
