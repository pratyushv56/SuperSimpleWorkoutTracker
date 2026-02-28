import Entypo from "@expo/vector-icons/Entypo";
import { BlurView } from "expo-blur";
import { useContext, useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
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
  const [showCalendar, setShowCalendar] = useState(false);

  function changeDatePrev() {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() - 1);
    const newDate = date.toISOString().split("T")[0];
    setSelectedDate(newDate);
  }
  function changeDateNext() {
    const date = new Date(selectedDate);

    if (selectedDate == todayString) {
      return;
    }
    date.setDate(date.getDate() + 1);
    const newDate = date.toISOString().split("T")[0];
    setSelectedDate(newDate);
  }

  function calendarFlip() {
    if (!showCalendar) {
      setShowCalendar(true);
    } else {
      setShowCalendar(false);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            color: "white",
            fontSize: 20,
          }}
        >
          Progress
        </Text>

        <Spacer h={20} />
        <Text style={{ color: "white" }}>{selectedDate}</Text>

        <Spacer h={10} />
        <View style={{ height: "70%", width: "70%" }}>
          <FlatList
            style={{
              borderRadius: 10,
              backgroundColor: "#F5C89F",
              height: 300,
              borderRadius: 10,
            }}
            contentContainerStyle={{
              borderRadius: 10,
              padding: 20,
              gap: 5,
            }}
            data={getWorkoutsOfDate(storedWorkouts, selectedDate)}
            renderItem={({ item }) => (
              <View
                style={{
                  backgroundColor: "#D3A274",
                  padding: 10,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{ fontFamily: "Inter_400Regular", color: "white" }}
                >
                  {item.name}
                </Text>
                <Spacer h={2} />
                <View>
                  <FlatList
                    data={item.sets}
                    keyExtractor={(setItem, index) => index.toString()}
                    renderItem={({ item: setItem }) => (
                      <View
                        style={{
                          padding: 2,
                          flexDirection: "row",
                        }}
                      >
                        <Text style={{ color: "green" }}>{setItem[0]}</Text>
                        <Text style={{ color: "white" }}> x </Text>
                        <Text style={{ color: "green" }}> {setItem[1]}</Text>
                      </View>
                    )}
                  />
                </View>
              </View>
            )}
          />
          <Spacer h={5} />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Pressable onPress={changeDatePrev}>
              <Entypo name="arrow-with-circle-left" size={30} color="white" />
            </Pressable>
            <Pressable onPress={calendarFlip}>
              <Entypo name="calendar" size={30} color="white" />
            </Pressable>

            <Pressable onPress={changeDateNext}>
              <Entypo name="arrow-with-circle-right" size={30} color="white" />
            </Pressable>
          </View>
        </View>
      </View>
      {showCalendar && (
        <>
          <Pressable
            onPress={() => setShowCalendar(false)}
            style={{
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
                position: "absolute",
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
              }}
            />
          </Pressable>

          <View
            style={{
              position: "absolute",
              alignSelf: "center",
              top: 110,
            }}
          >
            <Calendar
              style={{
                width: 300,
                height: 300,
                borderRadius: 10,
              }}
              onDayPress={(day) => {
                setShowCalendar(false);
                setSelectedDate(day.dateString);
              }}
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  selectedColor: "green",
                },
              }}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
