import { syncWithServer } from "../service/PouchdbService";

export const initializeSync = () => {
  const syncConfigs = [
    {
      dbName: "users",
      remoteUrl: "http://34.203.104.87:8080/api-crochet/users",
    },
    {
      dbName: "products",
      remoteUrl: "http://34.203.104.87:8080/api-crochet/products",
    },
  ];

  syncConfigs.forEach(({ dbName, remoteUrl }) => syncWithServer(dbName, remoteUrl));
};
