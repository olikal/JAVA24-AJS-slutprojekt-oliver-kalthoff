import { db } from "./config";
import { ref, push, set, get } from "firebase/database";

export const membersRef = ref(db, "todo/members");

export async function addMember(member) {
  const newRef = push(membersRef);
  await set(newRef, member);
}
