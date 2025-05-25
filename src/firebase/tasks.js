import { db } from "./config";
import { ref, push, set, get, update, remove, child } from "firebase/database";

export const taskRef = ref(db, "todo/tasks");

export async function addTask(task) {
  const newRef = push(taskRef);
  await set(newRef, task);
}

export async function updateTask(id, updates) {
  const taskItemRef = child(taskRef, id);
  await update(taskItemRef, updates);
}

export async function deleteTask(id) {
  const taskItemRef = child(taskRef, id);
  await remove(taskItemRef);
}
