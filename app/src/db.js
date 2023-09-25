import fs from "node:fs/promises";
const DB_PATH = new URL("../db.json", import.meta.url).pathname;

export const getDB = async () => {
  const db = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(db);
};

export const saveDB = async (db) => {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
  return db;
};

export const insertDB = async (task) => {
  let db = await getDB();
  let { tasks } = db;
  tasks= [...tasks, task];
  db = { ...db, tasks };
  await saveDB(db);
  return task;
};
