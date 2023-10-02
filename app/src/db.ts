import * as fs from "node:fs/promises";
import { Database, Task } from "./types";
const DB_PATH = new URL("../db.json", import.meta.url).pathname;

export const getDB = async () => {
  const db: Database = JSON.parse(await fs.readFile(DB_PATH, "utf-8"));
  return db;
};

export const saveDB = async (db: Database) => {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
  return db;
};

export const insertDB = async (task : Task) => {
  let db: Database = await getDB();
  let { tasks } = db;
  tasks = [...tasks, task];
  db = { ...db, tasks };
  await saveDB(db);
  return task;
};
