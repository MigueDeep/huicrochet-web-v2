import PouchDB from "pouchdb";

const databases: Record<string, PouchDB.Database> = {};

export const getDatabase = (dbName: string) => {
  if (!databases[dbName]) {
    databases[dbName] = new PouchDB(dbName);
  }
  return databases[dbName];
};
