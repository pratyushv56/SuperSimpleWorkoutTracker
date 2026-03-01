import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import { useEffect } from "react";
import WorkoutContext from "./WorkoutProvider";

import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import { useFonts } from "expo-font";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

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

  useEffect(() => {
    const initialize = async () => {
      const allWorkouts = await AsyncStorage.getItem("allWorkouts");

      const initFlag = await AsyncStorage.getItem("appInitialized");
      if (!initFlag) {
        const workoutsUnion = [
          ...new Set([
            ...pushArray,
            ...pullArray,
            ...legsArray,
            ...lowerArray,
            ...upperArray,
          ]),
        ];

        const sessionsArray = ["Push", "Pull", "Legs", "Upper", "Lower"];

        await AsyncStorage.setItem(
          "allWorkouts",
          JSON.stringify(workoutsUnion),
        );

        await AsyncStorage.setItem("sessions", JSON.stringify(sessionsArray));

        await AsyncStorage.setItem("workout-Push", JSON.stringify(pushArray));
        await AsyncStorage.setItem("workout-Pull", JSON.stringify(pullArray));
        await AsyncStorage.setItem("workout-Legs", JSON.stringify(legsArray));
        await AsyncStorage.setItem("workout-Upper", JSON.stringify(upperArray));
        await AsyncStorage.setItem("workout-Lower", JSON.stringify(lowerArray));

        await AsyncStorage.setItem("appInitialized", "true");
      }

      if (!allWorkouts) {
        const workoutsUnion = [
          ...new Set([
            ...pushArray,
            ...pullArray,
            ...legsArray,
            ...lowerArray,
            ...upperArray,
          ]),
        ];
        await AsyncStorage.setItem(
          "allWorkouts",
          JSON.stringify(workoutsUnion),
        );
      }
    };

    initialize();
  }, []);

  return (
    <WorkoutContext>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "black" },
          animation: "ios_from_right",
        }}
      />
    </WorkoutContext>
  );
}
