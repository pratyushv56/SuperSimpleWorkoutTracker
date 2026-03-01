import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";
import { useLocalSearchParams } from "expo-router";
import LottieView from "lottie-react-native";
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

  const [prObject, setprObject] = useState(null);

  const [showPR, setShowPR] = useState(false);

  const [animationFlag, setAnimationFlag] = useState(false);

  const logSet = async () => {
    if (!enteredWeight || !enteredReps) return; //empty entries not allowed
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

    const pr = await getPR();

    if (
      !prObject || //i.e when prObject is null(no logs for this workout)--this condition should also trigger animation
      pr.weightPR.prWeight > prObject?.weightPR?.prWeight ||
      pr.volumePR.prVolume > prObject?.volumePR?.prVolume //if new pr calculation greater than before trigger animationt
    ) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setAnimationFlag(true);
    }
    setprObject(pr); //update prObject state
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

    const pr = await getPR();
    setprObject(pr);
  };

  useEffect(() => {
    const loadTodaySets = async () => {
      const today = new Date().toISOString().split("T")[0];

      const stored = await AsyncStorage.getItem("workoutLogsMaster");
      const exerciseLogs = stored ? JSON.parse(stored) : {};

      const todaySets = exerciseLogs[workoutName]?.[today] || [];

      setLog(todaySets);

      const pr = await getPR(); //loads pr from the getPR function
      setprObject(pr);
    };

    loadTodaySets();
  }, [workoutName]);

  async function getPR() {
    let stored = await AsyncStorage.getItem("workoutLogsMaster");

    if (!stored) {
      return null;
    }

    stored = JSON.parse(stored);

    const w = workoutName;

    if (!stored[w]) {
      return null;
    }
    let prVolume = 0;
    let prWeight = 0;
    let prWeightDate;
    let prVolumeDate;
    let prVolumeWeight = 0;
    let prWeightReps = 0;
    let prVolumeReps = 0;
    for (let d in stored[w]) {
      const dateSets = stored[w][d];

      for (const s of dateSets) {
        const weight = Number(s[0]);
        const reps = Number(s[1]);
        const volume = weight * reps;

        if (prWeight < weight) {
          prWeight = weight;
          prWeightDate = d;
          prWeightReps = reps;
        }
        if (prVolume < volume) {
          prVolumeWeight = weight;
          prVolumeReps = reps;
          prVolume = volume;
          prVolumeDate = d;
        }
      }
    }
    return {
      volumePR: { prVolumeDate, prVolume, prVolumeReps, prVolumeWeight },
      weightPR: { prWeightDate, prWeight, prWeightReps },
    };
  }

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <Spacer h={40} />
      <Text style={commonStyles.fonts}>{workoutName}</Text>
      <View
        style={{
          width: "95%",

          justifyContent: "space-evenly",
          alignItems: "flex-end",
          gap: 10,
        }}
      >
        <Pressable
          style={{
            backgroundColor: "red",
            borderRadius: 20,
          }}
          onPress={() => {
            setShowPR(!showPR);
          }}
        >
          <Text style={{ padding: 10, color: "white" }}>PR</Text>
        </Pressable>
      </View>
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

      {showPR && prObject && (
        <View style={{ flex: 1 }}>
          <Text style={{ color: "white", fontSize: 30 }}>
            PR Weight: {prObject.weightPR.prWeight} x
            {prObject.weightPR.prWeightReps}
          </Text>
          <Text style={{ color: "#aaa" }}>
            On {prObject.weightPR.prWeightDate}
          </Text>
          <Spacer h={10} />
          <Text style={{ color: "white", fontSize: 30 }}>
            PR Set: {prObject.volumePR.prVolumeWeight} x{" "}
            {prObject.volumePR.prVolumeReps}
          </Text>
          <Text style={{ color: "#aaa" }}>
            On {prObject.volumePR.prVolumeDate}
          </Text>
        </View>
      )}

      {animationFlag && (
        <>
          <LottieView
            source={require("../assets/confetti.json")}
            autoPlay
            loop={false}
            style={{
              flex: 1,
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}
            onAnimationFinish={() => setAnimationFlag(false)}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default workoutScreen;
