import { useContext, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Spacer from "../components/Spacer";
import { WorkoutContext } from "./WorkoutProvider";
function getWorkoutsOfDate(master, date) {
  let list = [];
  for (const w in master) {
    if (master[w][date] != null) {
      list.push({ name: w, sets: master[w][date] });
    }
  }
  return list;
}

export default function Progress() {
  const { storedWorkouts, reload } = useContext(WorkoutContext);

  useEffect(() => {
    reload();
  }, []); //reloading or refreshing the context from async storage

  const todayString = new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(todayString);

  return (
    <SafeAreaView>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "white" }}>Progress page</Text>
        <Spacer h={20} />
        <FlatList
          contentContainerStyle={{
            borderRadius: 10,
            padding: 20,
            width: "80%",
            backgroundColor: "#533831",
          }}
          data={getWorkoutsOfDate(storedWorkouts, selectedDate)}
          renderItem={({ item }) => (
            <View>
              <Text style={{ color: "white" }}>{JSON.stringify(item)}</Text>
              <View></View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
