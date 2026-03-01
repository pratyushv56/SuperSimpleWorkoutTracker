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

import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

import { Alert } from "react-native";
const Week = () => {
  const [workouts, setWorkouts] = useState([]);
  const [enteredName, setEnteredName] = useState("");

  const [showPopUp, setShowPopUp] = useState(false);

  const [showDeletePopUp, setShowDeletePopUp] = useState(false);

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
    if (
      sessionWorkouts.some(
        (item) => item.toLowerCase() === enteredName.toLowerCase(),
      )
    ) {
      Alert.alert("Workout Already Exists");
      return;
    }
    if (!enteredName.trim()) {
      setShowPopUp(false);
      return;
    }
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

  function deleteItem(name) {
    const modifiedWorkouts = workouts.filter((item) => item !== name);

    setWorkouts(modifiedWorkouts);
    setWorkoutsStorage(modifiedWorkouts);
  }

  function flipDeletePopUpFlag() {
    setShowDeletePopUp(!showDeletePopUp);
  }

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
            <Text style={{ fontWeight: "bold" }}>{item}</Text>
          </Pressable>
        )}
      />

      <Pressable
        onPress={flipPopUpFlag}
        style={{ borderRadius: 10, padding: 4, backgroundColor: "green" }}
      >
        <Text style={{ fontSize: 20, color: "white" }}>Add Session</Text>
      </Pressable>

      <Spacer h={20} />
      <Pressable
        onPress={flipDeletePopUpFlag}
        style={{ borderRadius: 10, padding: 4, backgroundColor: "#771840" }}
      >
        <Text style={{ fontSize: 20, color: "white" }}>Delete Session</Text>
      </Pressable>
      <Spacer h={20} />

      {showDeletePopUp && (
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
          <Pressable
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "rgba(0,0,0,0.6)",
            }}
            onPress={() => setShowDeletePopUp(false)}
          />
          <View
            style={{
              width: "80%",
              backgroundColor: "black",
              padding: 20,
              borderRadius: 12,
            }}
          >
            <FlatList
              data={workouts}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: 12,
                    marginVertical: 6,
                    borderRadius: 10,
                    backgroundColor: "#EEA727",
                  }}
                  onPress={() => {
                    deleteItem(item);
                    setShowDeletePopUp(false);
                  }}
                >
                  <Text style={{ color: "black" }}>{item}</Text>

                  <AntDesign name="delete" size={20} color="red" />
                </Pressable>
              )}
            />
          </View>
        </SafeAreaView>
      )}
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
          <Pressable
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "rgba(0,0,0,0.6)",
            }}
            onPress={() => setShowPopUp(false)}
          />
          <View
            style={{
              padding: 10,
              width: "60%",
              backgroundColor: "#444449",
              borderRadius: 5,
            }}
          >
            <TextInput
              style={{
                borderRadius: 5,
                backgroundColor: "gray",
              }}
              placeholder="Name"
              value={enteredName}
              onChangeText={setEnteredName}
            ></TextInput>
            <Spacer h={10} />
            <Pressable
              onPress={addName}
              style={{ backgroundColor: "orange", borderRadius: 5 }}
            >
              <Text style={{ color: "black", padding: 5 }}>Add</Text>
            </Pressable>
          </View>
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
