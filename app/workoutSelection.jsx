import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
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
  const [showDeletePopUp, setShowDeletePopUp] = useState(false);

  const [allWorkouts, setAllWorkouts] = useState([]);

  const [suggestions, setSuggestions] = useState([]);

  const flipDeletePopUpFlag = () => {
    setShowDeletePopUp(!showDeletePopUp);
  };

  const flipPopUpFlag = () => {
    if (showPopUp) {
      setShowPopUp(false);
    } else {
      setShowPopUp(true);
    }
  };

  function getSuggestions(prefix) {
    if (!prefix.trim()) {
      setSuggestions([]); //if user types something then backspaces it till nothing left...need to update suggestions to nothing
      return;
    }
    let list = [];
    for (const w of allWorkouts) {
      if (w.toLowerCase().startsWith(prefix.toLowerCase())) {
        list.push(w);
      }
    }
    setSuggestions(list);
  }

  function deleteItem(name) {
    const modifiedArray = sessionWorkouts.filter((item) => item !== name);

    setSessionWorkouts(modifiedArray);
    setWorkouts(modifiedArray, sessionName);
  }

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

      const allWorkoutsArray = await AsyncStorage.getItem("allWorkouts");
      setAllWorkouts(allWorkoutsArray ? JSON.parse(allWorkoutsArray) : []);
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

  const addName = async () => {
    const trimmed = enteredName.trim();
    if (
      sessionWorkouts.some(
        (item) => item.toLowerCase() === trimmed.toLowerCase(),
      )
    ) {
      Alert.alert("Workout Already Exists");
      return;
    }
    if (!enteredName.trim()) {
      setShowPopUp(false);
      return;
    }
    const updatedArray = [...sessionWorkouts, trimmed];

    setSessionWorkouts(updatedArray);
    await setWorkouts(updatedArray, sessionName);

    const updatedAll = allWorkouts.some(
      (w) => w.toLowerCase() === trimmed.toLowerCase(),
    )
      ? allWorkouts
      : [...allWorkouts, trimmed];

    setAllWorkouts(updatedAll);
    await AsyncStorage.setItem("allWorkouts", JSON.stringify(updatedAll));

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
            <Text style={{ fontWeight: "bold" }}>{item}</Text>
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

      <Pressable
        style={{ borderRadius: 10, padding: 4, backgroundColor: "#771840" }}
        onPress={flipDeletePopUpFlag}
      >
        <Text style={{ fontSize: 20, color: "white" }}>Delete Workout</Text>
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
          <View
            style={{
              width: "80%",
              backgroundColor: "black",
              padding: 20,
              borderRadius: 12,
            }}
          >
            <FlatList
              data={sessionWorkouts}
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
              onChangeText={(text) => {
                getSuggestions(text);
                setenteredName(text);
              }}
            ></TextInput>
            <Spacer h={10} />
            <Pressable
              onPress={addName}
              style={{ backgroundColor: "orange", borderRadius: 5 }}
            >
              <Text style={{ color: "black", padding: 5 }}>Add</Text>
            </Pressable>
            <Spacer h={2} />
            <View>
              <FlatList
                style={{ maxHeight: 100 }}
                keyExtractor={(item) => item}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{}}
                data={suggestions}
                renderItem={({ item }) => (
                  <View style={{ padding: 5 }}>
                    <Pressable
                      style={({ pressed }) => [
                        {
                          borderRadius: 5,
                          backgroundColor: pressed ? "#3a2a00" : "#2c2c31",
                          opacity: pressed ? 0.85 : 1,
                          borderLeftColor: "#EEA727",
                          elevation: pressed ? 10 : 4,
                        },
                      ]}
                      onPress={() => {
                        setenteredName(item);

                        setSuggestions([]);
                      }}
                    >
                      <Text
                        style={{ color: "white", fontSize: 14, padding: 4 }}
                      >
                        {item}
                      </Text>
                    </Pressable>
                  </View>
                )}
              />
            </View>
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
export default workoutSelection;
