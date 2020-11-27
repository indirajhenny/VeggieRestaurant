import { auth } from "../services/firebase";

export function signup(email, password) {
  return auth().createUserWithEmailAndPassword(email, password);
}
// login
export function signin(email, password) {
  return auth().signInWithEmailAndPassword(email, password);
}
// logout
export function signout() {
  return auth().signOut();
}
