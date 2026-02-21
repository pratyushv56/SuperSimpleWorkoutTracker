import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useLocalSearchParams } from "expo-router";
import LottieView from "lottie-react-native";
import { useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Spacer from "../components/Spacer";
import { commonStyles } from "../styles/commonStyles";

const workoutScreen = () => {
  const { workoutName } = useLocalSearchParams();

  const [Log, setLog] = useState([]);

  const [enteredWeight, setenteredWeight] = useState(0);
  const [enteredReps, setenteredReps] = useState(0);

  const logSet = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setLog((oldlog) => [...oldlog, [enteredWeight, enteredReps]]);
  };

  const deleteSet = (indexToDelete) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setLog((prev) => prev.filter((_, index) => index !== indexToDelete));
  };

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", backgroundColor: "#1a021d" }}
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
        <LottieView></LottieView>
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
