import PouchDB from "pouchdb";
import PouchDBFind from "pouchdb-find";

PouchDB.plugin(PouchDBFind);

export const localDB = new PouchDB("huicrochet"); // Base de datos local
export const remoteDB = new PouchDB("http://localhost:5984/huicrochet"); // Base de datos remota

localDB
  .sync(remoteDB, {
    live: true,
    retry: true,
  })
  .on("change", (info) => console.log("DB Change:", info))
  .on("error", (err) => console.error("DB Sync Error:", err));
