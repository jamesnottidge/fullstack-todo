import { getDB, saveDB, insertDB } from "./db";
import { Task } from "./types";

// add a new task
// a POST method
// we should receive a task of this form:
// {id: number, task: string, completed: boolean}


export const getTasks = async () => {
    const db = await getDB();
    return db.tasks;
}

export const newTask = async (task: Task) => {
  await insertDB(task);
  const tasks = await getTasks();
  return tasks;
};

export const editTask = async (task: Task) => {
    let db = await getDB();
    let { tasks } = db;
    tasks = tasks.map((t) => {
        if (t.id === task.id) {
        t = task;
        return task;
        }
        return t;
    });
    db = { ...db, tasks };
    await saveDB(db);
    return tasks;
}

export const deleteTask = async (task: Task) => {
    let db = await getDB();
    let { tasks } = db;
    tasks = tasks.filter((t) => t.id !== task.id);
    db = { ...db, tasks };
    await saveDB(db);
    return tasks;
};