import { createContext } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const WorkoutContext = createContext(null);

function WorkoutProvider({ children }) {
  const [storedWorkouts, setStoredWorkouts] = useState(null);

  useEffect(() => {
    const getter = async () => {
      const stored = await AsyncStorage.getItem("workoutLogsMaster");
      setStoredWorkouts(stored ? JSON.parse(stored) : {});
    };
    getter();
  }, []);
  return (
    <WorkoutContext.Provider value={storedWorkouts}>
      {children}
    </WorkoutContext.Provider>
  );
}
export { WorkoutContext };
export default WorkoutProvider;
