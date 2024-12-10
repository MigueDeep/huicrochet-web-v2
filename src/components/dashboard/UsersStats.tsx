import { useEffect, useState } from "react";
import { UserNoOnlineIcon, UserOnlineIcon, UsersIcon } from "../../utils/icons";
import { DashboardService } from "../../service/DashboardService";

export const UsersStats = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [inactiveUsers, setInactiveUsers] = useState(0);

  const fetchUsersStats = async () => {
    try {
      const response = await DashboardService.getAllCountUsers();
      if (response?.data) {
        setTotalUsers(response.data);
      } else {
        throw new Error("No se encontraron datos.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUsersLogged = async () => {
    try {
      const response = await DashboardService.getAllUsersLogged();
      if (response?.data) {
        setActiveUsers(response.data);
      } else {
        throw new Error("No se encontraron datos.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUsersLoggedOut = async () => {
    try {
      const response = await DashboardService.getAllUsersLoggedOut();
      if (response?.data) {
        setInactiveUsers(response.data);
      } else {
        throw new Error("No se encontraron datos.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const coutUsersnotLogged = totalUsers - activeUsers;

  useEffect(() => {
    fetchUsersStats();
    fetchUsersLogged();
    coutUsersnotLogged;
  }, []);

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
            <div className="text-pink">{totalUsers}</div>
          </div>
        </div>
        <div className="body d-flex justify-content-start align-items-center mb-4">
          <UserOnlineIcon />
          <div className="ml-2 d-flex flex-column">
            <div className="text-semibold text-green">Usuarios activos</div>
            <div className="text-pink">{activeUsers}</div>
          </div>
        </div>
        <div className="body d-flex justify-content-start align-items-center mb-4">
          <UserNoOnlineIcon />
          <div className="ml-2 d-flex flex-column">
            <div className="text-semibold text-red">Usuarios inactivos</div>
            <div className="text-pink">{coutUsersnotLogged}</div>
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
