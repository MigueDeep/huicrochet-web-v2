import { localDB } from "../config/Pouchdb";

interface DBRecord {
  _id: string;
  [key: string]: any;
}

const DatabaseService = {
  add: async (doc: DBRecord) => {
    try {
      const response = await localDB.put(doc);
      console.log("Document added:", response);
      return response;
    } catch (error) {
      console.error("Error adding document:", error);
    }
  },

  getAll: async () => {
    try {
      const response = await localDB.allDocs({ include_docs: true });
      return response.rows.map((row) => row.doc);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  },

  remove: async (id: string, rev: string) => {
    try {
      const response = await localDB.remove(id, rev);
      console.log("Document removed:", response);
      return response;
    } catch (error) {
      console.error("Error removing document:", error);
    }
  },

  getById: async (id: string) => {
    try {
      const doc = await localDB.get(id);
      return doc;
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  },
};

export default DatabaseService;
