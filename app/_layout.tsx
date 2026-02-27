import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import { useEffect } from "react";
import WorkoutContext from "./WorkoutProvider";

export default function RootLayout() {
  useEffect(() => {
    const initialize = async () => {
      const initFlag = await AsyncStorage.getItem("appInitialized");
      if (initFlag) {
        return;
      } else {
        const pushArray = [
          "Barbell Bench Press",
          "Incline Dumbbell Press",
          "Overhead Press",
          "Lateral Raise",
          "Triceps Pushdown",
        ];

        const pullArray = [
          "Pull-Ups",
          "Lat Pulldown",
          "Barbell Row",
          "Seated Cable Row",
          "Barbell Curl",
        ];

        const legsArray = [
          "Barbell Squat",
          "Leg Press",
          "Romanian Deadlift",
          "Leg Curl",
          "Standing Calf Raise",
        ];

        const upperArray = [
          "Barbell Bench Press",
          "Pull-Ups",
          "Barbell Row",
          "Overhead Press",
          "Barbell Curl",
        ];

        const lowerArray = [
          "Barbell Squat",
          "Romanian Deadlift",
          "Leg Press",
          "Leg Curl",
          "Standing Calf Raise",
        ];

        const sessionsArray = ["Push", "Pull", "Legs", "Upper", "Lower"];

        await AsyncStorage.setItem("sessions", JSON.stringify(sessionsArray));

        await AsyncStorage.setItem("workout-Push", JSON.stringify(pushArray));
        await AsyncStorage.setItem("workout-Pull", JSON.stringify(pullArray));
        await AsyncStorage.setItem("workout-Legs", JSON.stringify(legsArray));
        await AsyncStorage.setItem("workout-Upper", JSON.stringify(upperArray));
        await AsyncStorage.setItem("workout-Lower", JSON.stringify(lowerArray));

        await AsyncStorage.setItem("appInitialized", "true");
      }
    };

    initialize();
  }, []);

  return (
    <WorkoutContext>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#1a021d" },
          animation: "ios_from_right",
        }}
      />
    </WorkoutContext>
  );
}
