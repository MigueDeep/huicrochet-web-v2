import { getDatabase } from "../config/Pouchdb";
import PouchDB from "pouchdb";


export const saveDocument = async (dbName: string, doc: any) => {
  const db = getDatabase(dbName);
  try {
    const response = await db.put({ ...doc, _id: doc.id || new Date().toISOString() });
    return response;
  } catch (error) {
    console.error("Error saving document:", error);
    throw error;
  }
};

export const getAllDocuments = async (dbName: string) => {
  const db = getDatabase(dbName);
  try {
    const result = await db.allDocs({ include_docs: true });
    return result.rows.map((row) => row.doc);
  } catch (error) {
    console.error("Error fetching documents:", error);
    throw error;
  }
};

export const deleteDocument = async (dbName: string, docId: string, rev: string) => {
  const db = getDatabase(dbName);
  try {
    const response = await db.remove(docId, rev);
    return response;
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error;
  }
};

/**
 * Sincroniza la base de datos local con el servidor remoto.
 */
export const syncWithServer = (dbName: string, remoteUrl: string) => {
    const db = getDatabase(dbName);
    const remoteDb = new PouchDB(remoteUrl);

    db.sync(remoteDb, { live: true, retry: true })
        .on("change", (info) => console.log(`[Sync] Changes for ${dbName}:`, info))
        .on("error", (err) => console.error(`[Sync] Error for ${dbName}:`, err));
};

