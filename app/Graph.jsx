import { BlurView } from "expo-blur";
import { useContext, useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { VictoryArea, VictoryAxis, VictoryChart } from "victory-native";
import { WorkoutContext } from "./WorkoutProvider";
export default function Graph() {
  const [selectedWorkout, setSelectedWorkout] = useState("");
  const [showWorkoutScreen, setShowWorkoutScreen] = useState(false);

  const [selectedGraphData, setSelectedGraphData] = useState([]);

  const workoutSet = new Set();

  const storedObject = useContext(WorkoutContext);

  console.log(storedObject);

  for (const date in storedObject) {
    const dateWorkouts = storedObject[date];

    for (const workout in dateWorkouts) {
      workoutSet.add(workout);
    }
  }

  const workoutList = Array.from(workoutSet);
  console.log(workoutList);

  useEffect(() => {
    if (workoutList.length > 0) {
      setSelectedWorkout(workoutList[0]);
    }
  }, [workoutList]);

  function changeRange() {}
  //extracting graph points

  function extractGraphData() {
    if (!selectedWorkout) return;

    const graphData = [];

    const workouts = storedObject.storedWorkouts;

    const workoutHistory = workouts[selectedWorkout];

    if (!workoutHistory) return;

    for (const date in workoutHistory) {
      const sets = workoutHistory[date];

      let dateVolume = 0;

      for (const item of sets) {
        dateVolume += Number(item[0]) * Number(item[1]);
      }
      console.log("Selected:", selectedWorkout);
      console.log("Workout history:", workoutHistory);
      console.log("Keys:", Object.keys(workoutHistory || {}));
      graphData.push({
        x: new Date(date),
        y: dateVolume,
      });
    }

    graphData.sort((a, b) => a.x - b.x);

    setSelectedGraphData(graphData);
  }

  useEffect(() => {
    if (selectedWorkout) {
      extractGraphData();
    }
  }, [selectedWorkout, storedObject]); // extract graph data every time the selected workout change or if the underlying storage changes

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#533831",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <View style={{ height: 300 }}>
        {selectedGraphData.length > 0 && (
          <VictoryChart scale={{ x: "time" }} domainPadding={{ x: 20, y: 20 }}>
            <VictoryAxis fixLabelOverlap />
            <VictoryAxis dependentAxis />
            <VictoryArea
              data={selectedGraphData}
              interpolation="monotoneX"
              style={{
                data: {
                  fill: "rgba(238, 167, 39, 0.3)",
                  stroke: "#EEA727",
                  strokeWidth: 2,
                },
              }}
            />
          </VictoryChart>
        )}
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Pressable
          onPress={changeRange}
          style={{ backgroundColor: "orange", borderRadius: 5, padding: 5 }}
        >
          <Text>Change Range</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setShowWorkoutScreen(true);
          }}
          style={{ backgroundColor: "orange", borderRadius: 5, padding: 5 }}
        >
          <Text>Change Workout</Text>
        </Pressable>
      </View>

      <Text>{selectedWorkout}</Text>
      <Text>{JSON.stringify(selectedGraphData)}</Text>

      {showWorkoutScreen && (
        <>
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
              onPress={() => setShowWorkoutScreen(false)}
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
                        setSelectedWorkout(item);
                        setShowWorkoutScreen(false);
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
        </>
      )}
    </SafeAreaView>
  );
}
