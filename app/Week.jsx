import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Spacer from "../components/Spacer";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

const Week = () => {
  const [workouts, setWorkouts] = useState([]);
  const [enteredName, setEnteredName] = useState("");

  const [showPopUp, setShowPopUp] = useState(false);

  const flipPopUpFlag = () => {
    if (showPopUp) {
      setShowPopUp(false);
    } else {
      setShowPopUp(true);
    }
  };

  useEffect(() => {
    const fetchSessions = async () => {
      const fetchedArray = await AsyncStorage.getItem("sessions");
      console.log(fetchedArray);

      if (fetchedArray) {
        setWorkouts(JSON.parse(fetchedArray));
      } else {
        setWorkouts([]);
      }
    };
    fetchSessions();
  }, []);

  const setWorkoutsStorage = async (modifiedSessionsArray) => {
    await AsyncStorage.setItem(
      "sessions",
      JSON.stringify(modifiedSessionsArray),
    );
  };

  const router = useRouter();

  const addName = () => {
    const updatedArray = [...workouts, enteredName];
    setWorkouts(updatedArray);
    setWorkoutsStorage(updatedArray);

    flipPopUpFlag();
  };

  const chooseWorkout = (sessionName) => {
    router.push({
      pathname: "/workoutSelection",
      params: { sessionName },
    });
  };

  return (
    <SafeAreaView style={styles.page}>
      <Text style={{ color: "white", fontSize: 20 }}>Choose a Session</Text>
      <Spacer h={10} />
      <FlatList
        style={{ width: "70%" }}
        data={workouts}
        contentContainerStyle={{}}
        renderItem={({ item }) => (
          <Pressable
            style={{
              flex: 1,
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
        onPress={flipPopUpFlag}
        style={{ borderRadius: 10, padding: 4, backgroundColor: "green" }}
      >
        <Text style={{ fontSize: 20, color: "white" }}>Add Session</Text>
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
              style={{ borderRadius: 5, backgroundColor: "gray" }}
              placeholder="Name"
              value={enteredName}
              onChangeText={setEnteredName}
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
export default Week;
