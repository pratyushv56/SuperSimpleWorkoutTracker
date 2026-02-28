import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Spacer from "../components/Spacer";
import { commonStyles } from "../styles/commonStyles";

const workoutScreen = () => {
  const today = new Date().toISOString().split("T")[0];
  const { workoutName } = useLocalSearchParams();

  const [Log, setLog] = useState([]);

  const [enteredWeight, setenteredWeight] = useState("");
  const [enteredReps, setenteredReps] = useState("");

  const logSet = async () => {
    const storedSet = await AsyncStorage.getItem("workoutLogsMaster");
    const storedSetParsed = storedSet ? JSON.parse(storedSet) : {};
    storedSetParsed[workoutName] = storedSetParsed[workoutName]
      ? storedSetParsed[workoutName]
      : {};
    storedSetParsed[workoutName][today] =
      storedSetParsed[workoutName][today] || []; //does the same thing as the ternary operator above

    storedSetParsed[workoutName][today].push([enteredWeight, enteredReps]);

    await AsyncStorage.setItem(
      "workoutLogsMaster",
      JSON.stringify(storedSetParsed),
    );
    setLog((oldlog) => [...oldlog, [enteredWeight, enteredReps]]);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setenteredWeight("");
    setenteredReps("");
  };

  const deleteSet = async (indexToDelete) => {
    const stored = await AsyncStorage.getItem("workoutLogsMaster");
    const parsed = stored ? JSON.parse(stored) : {};

    const updatedSets =
      parsed[workoutName]?.[today]?.filter(
        (_, index) => index !== indexToDelete,
      ) || [];

    if (parsed[workoutName]) {
      parsed[workoutName][today] = updatedSets;
    }

    await AsyncStorage.setItem("workoutLogsMaster", JSON.stringify(parsed));

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    setLog((prev) => prev.filter((_, index) => index !== indexToDelete));
  };

  useEffect(() => {
    const loadTodaySets = async () => {
      const today = new Date().toISOString().split("T")[0];

      const stored = await AsyncStorage.getItem("workoutLogsMaster");
      const exerciseLogs = stored ? JSON.parse(stored) : {};

      const todaySets = exerciseLogs[workoutName]?.[today] || [];

      setLog(todaySets);
    };

    loadTodaySets();
  }, [workoutName]);

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", backgroundColor: "#533831" }}
    >
      <Spacer h={40} />
      <Text style={commonStyles.fonts}>{workoutName}</Text>
      <Spacer h={40} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TextInput
          placeholder="Weight"
          value={enteredWeight}
          onChangeText={setenteredWeight}
          style={{
            padding: "2%",
            backgroundColor: "grey",
            width: "35%",
            borderRadius: 10,
            marginRight: 5,
          }}
        />
        <TextInput
          placeholder="Reps"
          value={enteredReps}
          onChangeText={setenteredReps}
          style={{
            padding: "2%",
            backgroundColor: "grey",
            width: "35%",
            borderRadius: 10,
            marginLeft: 5,
          }}
        />
      </View>
      <Spacer h={20} />
      <Pressable
        style={{
          borderRadius: 10,
          height: 30,
          justifyContent: "center",
          alignItems: "center",
          width: "30%",
          backgroundColor: "#EEA727",
        }}
        onPress={logSet}
      >
        <Text style={{ color: "black" }}>Add Set</Text>
      </Pressable>

      <Spacer h={50} />
      <Text>Log</Text>
      <Spacer h={15} />
      <View
        style={{
          flex: 1,
          backgroundColor: "#0d5717",
          width: "80%",
          borderRadius: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingInline: 30,
            paddingVertical: 5,
          }}
        >
          <Text style={{ color: "white" }}>Weight</Text>
          <Text style={{ color: "white" }}>Reps</Text>
          <Ionicons name="barbell-outline" size={20} />
        </View>

        <FlatList
          data={Log}
          renderItem={({ item, index }) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingInline: 30,
                paddingVertical: 5,
                backgroundColor: "green",
              }}
            >
              <Text style={{ color: "white" }}> {item[0]}</Text>
              <Text style={{ color: "white", paddingLeft: 4 }}> {item[1]}</Text>
              <Pressable
                onPress={() => {
                  deleteSet(index);
                }}
                style={{ color: "red", alignSelf: "flex-end" }}
              >
                <Ionicons name="trash-outline" size={20} color="red" />
              </Pressable>
            </View>
          )}
        />
      </View>
      <View>
        <Text>end</Text>
      </View>
    </SafeAreaView>
  );
};

export default workoutScreen;
