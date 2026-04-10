import { onAuthStateChanged } from "firebase/auth"; //broadcasts auth state changes. Can detect auth changes globally
import { auth } from "./firebase";

export const listenToAuth = (callback) => {
  return onAuthStateChanged(auth, callback);
};
