import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export const saveToCloud = async (uid, data) => {
  try {
    await setDoc(
      doc(db, "users", uid),
      {
        ...data,
        updatedAt: Date.now(),
      },
      { merge: true },
    );
  } catch (e) {
    console.error("Error saving to cloud:", e);
  }
};

export const loadFromCloud = async (uid) => {
  const snap = await getDoc(doc(db, "users", uid));
  if (snap.exists()) {
    console.log("DOWNLOADED FROM CLOUD _ ", snap.data());

    const { workoutLogsMaster } = snap.data();
    const { sessions } = snap.data();
    const { sessionWorkouts } = snap.data();
    const { allWorkouts } = snap.data();

    if (workoutLogsMaster) {
      await AsyncStorage.setItem("workoutLogsMaster", workoutLogsMaster);
    }
    if (sessions) {
      await AsyncStorage.setItem("sessions", sessions);
    }
    if (allWorkouts) {
      await AsyncStorage.setItem("allWorkouts", allWorkouts);
    }

    if (sessionWorkouts) {
      await AsyncStorage.multiSet(Object.entries(sessionWorkouts));
    }
  }
};
