import LottieView from "lottie-react-native";
import { useContext, useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Spacer from "../components/Spacer";
import { WorkoutContext } from "./WorkoutProvider";

import { BlurView } from "expo-blur";

export default function PRPage() {
  const [prObject, setprObject] = useState(null);

  const [workoutName, setWorkoutName] = useState("");

  const { storedWorkouts, reload } = useContext(WorkoutContext);

  const [changeWorkoutScreenFlag, setChangeWorkoutScreenFlag] = useState(false);

  useEffect(() => {
    reload();
  }, []);

  const workouts = storedWorkouts;
  const workoutList = Object.keys(workouts);

  useEffect(() => {
    if (workoutName == "" && workoutList.length > 0) {
      setWorkoutName(workoutList[0]);
    }
  }, [storedWorkouts]);

  async function getPR() {
    let stored = storedWorkouts;

    console.log(stored);

    if (!stored) {
      return null;
    }

    const w = workoutName;

    if (!stored[w]) {
      return null;
    }
    let prVolume = 0;
    let prWeight = 0;
    let prWeightDate;
    let prVolumeDate;
    let prVolumeReps = 0;
    let prVolumeWeight = 0;
    let prWeightReps = 0;

    for (let d in stored[w]) {
      const dateSets = stored[w][d];

      for (const s of dateSets) {
        const weight = Number(s[0]);
        const reps = Number(s[1]);
        const volume = weight * reps;

        if (prWeight < weight) {
          prWeightReps = reps;
          prWeight = weight;
          prWeightDate = d;
        }
        if (prVolume < volume) {
          prVolume = volume;
          prVolumeDate = d;
          prVolumeWeight = weight;
          prVolumeReps = reps;
        }
      }
    }
    return {
      volumePR: { prVolumeDate, prVolume, prVolumeWeight, prVolumeReps },
      weightPR: { prWeightDate, prWeight, prWeightReps },
    };
  }

  useEffect(() => {
    const prGetter = async () => {
      const pr = await getPR();

      setprObject(pr);
    };
    prGetter();
  }, [workoutName]);

  console.log("storedWorkouts:", storedWorkouts);

  function flipChangeWorkoutScreenFlag() {
    setChangeWorkoutScreenFlag(!changeWorkoutScreenFlag);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {prObject ? (
          <>
            <Pressable
              onPress={flipChangeWorkoutScreenFlag}
              style={{ backgroundColor: "grey", borderRadius: 10 }}
            >
              <Text style={{ color: "white", fontSize: 18, padding: 8 }}>
                Change Workout
              </Text>
            </Pressable>
            <Spacer h={50} />
            <Text style={{ color: "white", fontSize: 24 }}>{workoutName}</Text>
            <Spacer h={20} />
            <Text style={{ color: "white", fontSize: 36 }}>
              PR Weight: {prObject.weightPR.prWeight} x{" "}
              {prObject.weightPR.prWeightReps}
            </Text>

            <Text style={{ color: "#aaa" }}>
              On {prObject.weightPR.prWeightDate}
            </Text>
            <Spacer h={10} />

            <Text style={{ color: "white", fontSize: 40 }}>
              PR Set: {prObject.volumePR.prVolumeWeight} x{" "}
              {prObject.volumePR.prVolumeReps}
            </Text>

            <Text style={{ color: "#aaa" }}>
              On {prObject.volumePR.prVolumeDate}
            </Text>

            <LottieView
              source={require("../assets/fire.json")}
              autoPlay
              loop
              style={{
                width: 300,
                height: 300,
              }}
            />
          </>
        ) : (
          <Text style={{ color: "white" }}>Loading...</Text>
        )}
      </View>

      {changeWorkoutScreenFlag && (
        <View
          style={{
            flex: 1,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <Pressable
            onPress={() => setChangeWorkoutScreenFlag(false)}
            style={{
              flex: 1,
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          >
            <BlurView
              intensity={50}
              experimentalBlurMethod="dimezisBlurView"
              tint="dark"
              style={{
                flex: 1,
                position: "absolute",
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
              }}
            />
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",

                position: "absolute",
                top: 200,
                bottom: 200,
                right: 0,
                left: 0,
              }}
            >
              <FlatList
                keyExtractor={(item) => item}
                style={{}}
                contentContainerStyle={{
                  padding: 30,
                  gap: 20,
                  backgroundColor: "black",
                  borderRadius: 10,
                }}
                data={workoutList}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => {
                      setWorkoutName(item);
                      setChangeWorkoutScreenFlag(false);
                    }}
                    style={{
                      backgroundColor: "orange",
                      padding: 6,
                      borderRadius: 5,
                    }}
                  >
                    <Text style={{ color: "black" }}>{item}</Text>
                  </Pressable>
                )}
              />
            </View>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}
