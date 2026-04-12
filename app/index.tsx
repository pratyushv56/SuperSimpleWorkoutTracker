import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../assets/Homepage.png";
import Progress from "../assets/Progress.png";
import Spacer from "../components/Spacer";
import { useAuth } from "./authContext";
import { saveToCloud } from "./syncService";

export default function Index() {
  const { user, uid } = useAuth();

  const signedIn = !!user; // Convert user to a boolean (true if user exists, false if null or undefined)

  console.log("User in Index:", user);
  console.log("UID in Index on home page:", uid);

  async function cloudSync() {
    if (!uid) {
      console.error("No UID found.");
      return;
    }

    try {
      const workoutLogsMaster = await AsyncStorage.getItem("workoutLogsMaster");
      const sessions = await AsyncStorage.getItem("sessions");
      const allWorkouts = await AsyncStorage.getItem("allWorkouts");

      const allKeys = await AsyncStorage.getAllKeys();

      const sessionWorkoutKeys = allKeys.filter((key) =>
        key.startsWith("workout-"),
      );

      const sessionWorkoutPairs =
        await AsyncStorage.multiGet(sessionWorkoutKeys);

      // 🔥 convert to object
      const sessionWorkouts = {};

      sessionWorkoutPairs.forEach(([key, value]) => {
        sessionWorkouts[key] = value;
      });

      // 🔥 ONE payload
      const payload = {
        workoutLogsMaster,
        sessions,
        allWorkouts,
        sessionWorkouts,
      };

      await saveToCloud(uid, payload);

      console.log("All data synced successfully!");
    } catch (error) {
      console.error("Error syncing:", error);
    }
  }

  return (
    <SafeAreaView style={pageStyle.page}>
      {!signedIn && (
        <View
          style={{
            position: "absolute",
            top: 25,
            right: 15,
            padding: 6,

            paddingInline: 12,
            backgroundColor: "#7DA293",
            borderRadius: 10,
          }}
        >
          <Link href="/Auth">
            <Text style={{ color: "white" }}>Login</Text>
          </Link>
        </View>
      )}

      {signedIn && (
        <View
          style={{
            position: "absolute",
            top: 25,
            right: 15,
            padding: 6,
            paddingInline: 12,
            backgroundColor: "#7DA293",
            borderRadius: 10,
          }}
        >
          <Pressable
            onPress={() => {
              cloudSync();
            }}
          >
            <AntDesign name="cloud-sync" size={24} color="black" />
          </Pressable>
        </View>
      )}
      <Image
        source={Logo}
        style={{
          width: 200,
          height: 200,
        }}
      />
      <Spacer h={20} />
      <Text style={pageStyle.fonts}>Let's Get Started!</Text>
      <Spacer h={10} />

      <Link href="/Week">
        <Text style={{ color: "yellow", fontSize: 18 }}>click here</Text>
      </Link>
      <Spacer h={10} />
      <Spacer h={35} />
      <Link href="/Progress">
        <Text style={{ color: "yellow", fontSize: 18 }}>
          Check progress{" "}
          <Image source={Progress} style={{ width: 30, height: 30 }} />
        </Text>
      </Link>
    </SafeAreaView>
  );
}

const pageStyle = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  fonts: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
