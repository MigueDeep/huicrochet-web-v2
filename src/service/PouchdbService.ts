import { getDatabase } from "../config/Pouchdb";

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
  db.sync(remoteUrl, {
    live: true, // Sincronización en tiempo real
    retry: true, // Reintenta en caso de errores
  })
    .on("change", (info) => {
      console.log(`Change detected in ${dbName}:`, info);
    })
    .on("paused", () => {
      console.log(`Sync paused for ${dbName}`);
    })
    .on("active", () => {
      console.log(`Sync resumed for ${dbName}`);
    })
    .on("error", (err) => {
      console.error(`Sync error in ${dbName}:`, err);
    });
};
