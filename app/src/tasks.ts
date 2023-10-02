import { getDB, saveDB, insertDB } from "./db";
import { Task } from "./types";

// add a new task
// a POST method
// we should receive a task of this form:
// {id: number, task: string, completed: boolean}

export const newTask = async (task: Task) => {
  await insertDB(task);
  return task;
};
