import { createContext } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const WorkoutContext = createContext({});

function WorkoutProvider({ children }) {
  const [storedWorkouts, setStoredWorkouts] = useState({});

  useEffect(() => {
    const getter = async () => {
      const stored = await AsyncStorage.getItem("workoutLogsMaster");
      setStoredWorkouts(stored ? JSON.parse(stored) : {});
    };
    getter();
  }, []);

  async function reload() {
    const stored = await AsyncStorage.getItem("workoutLogsMaster");
    setStoredWorkouts(stored ? JSON.parse(stored) : {});
  }

  return (
    <WorkoutContext.Provider value={{ storedWorkouts, reload }}>
      {children}
    </WorkoutContext.Provider>
  );
}

export { WorkoutContext };
export default WorkoutProvider;
