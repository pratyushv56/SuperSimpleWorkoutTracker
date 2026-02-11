import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Spacer from "../components/Spacer";

const workoutSelection = () => {
  const { sessionName } = useLocalSearchParams();

  const [showPopUp, setShowPopUp] = useState(false);

  const flipPopUpFlag = () => {
    if (showPopUp) {
      setShowPopUp(false);
    } else {
      setShowPopUp(true);
    }
  };

  const [enteredName, setenteredName] = useState("");

  const setWorkouts = async (modifiedWorkoutArray, sesname) => {
    await AsyncStorage.setItem(
      `workout-${sesname}`,
      JSON.stringify(modifiedWorkoutArray),
    );
  };

  const samplePush = ["Bench Press", "Over Head Press"];
  useEffect(() => {
    const randomInit = async (array) => {
      await setWorkouts(array, "Push");
    };
    randomInit(samplePush);
  }, []);

  const getWorkouts = async (sesname) => {
    const workoutsArray = await AsyncStorage.getItem(`workout-${sesname}`);

    if (workoutsArray) {
      return JSON.parse(workoutsArray);
    } else {
      return [];
    }
  };

  const [sessionWorkouts, setSessionWorkouts] = useState([]);

  useEffect(() => {
    const loadWorkouts = async () => {
      const array = await getWorkouts(sessionName);
      setSessionWorkouts(array);
    };
    loadWorkouts();
  }, [sessionName]);

  const router = useRouter();

  const chooseWorkout = (workoutName) => {
    router.push({
      pathname: "/workoutScreen",
      params: { workoutName },
    });
  };

  const addName = () => {
    const updatedArray = [...sessionWorkouts, enteredName];

    setSessionWorkouts(updatedArray);
    setWorkouts(updatedArray, sessionName);
    flipPopUpFlag();
  };

  return (
    <SafeAreaView style={styles.page}>
      <Text style={{ color: "white", fontSize: 20 }}>Choose a workout</Text>
      <Spacer h={20} />
      <FlatList
        style={{ width: "70%" }}
        data={sessionWorkouts}
        contentContainerStyle={{}}
        renderItem={({ item }) => (
          <Pressable
            style={{
              alignItems: "center",
              padding: 10,
              marginVertical: 5,
              justifyContent: "center",
              borderRadius: 10,
              backgroundColor: "#EEA727",
              color: "black",
            }}
            onPress={() => chooseWorkout(item)}
          >
            <Text>{item}</Text>
          </Pressable>
        )}
      />
      <Spacer h={20} />
      <Pressable
        style={{ borderRadius: 10, padding: 4, backgroundColor: "green" }}
        onPress={flipPopUpFlag}
      >
        <Text style={{ fontSize: 20, color: "white" }}>Add Workout</Text>
      </Pressable>
      <Spacer h={20} />

      {showPopUp && (
        <SafeAreaView
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
          }}
        >
          <View>
            <TextInput
              style={{ backgroundColor: "black" }}
              placeholder="Name"
              value={enteredName}
              onChangeText={setenteredName}
            ></TextInput>
            <Pressable onPress={addName}>
              <Text style={{ color: "white" }}>Add</Text>
            </Pressable>
          </View>
          <Text style={{ color: "white" }}>Popup Wow</Text>
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a021d",
    fontColor: "white",
  },

  fonts2: {
    backgroundColor: "#736281",

    border: "solid",

    borderColor: "black",
    borderRadius: 10,

    padding: 5,

    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  fonts3: {
    fontSize: 18,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
export default workoutSelection;
