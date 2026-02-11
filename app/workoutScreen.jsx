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

  const [Log, setLog] = useState([["Weight", "Reps"]]);

  const [enteredWeight, setenteredWeight] = useState(0);
  const [enteredReps, setenteredReps] = useState(0);

  const logSet = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setLog((oldlog) => [...oldlog, [enteredWeight, enteredReps]]);
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
        style={{ backgroundColor: "green", width: "80%", borderRadius: 20 }}
      >
        <FlatList
          data={Log}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingInline: 30,
                paddingVertical: 5,
              }}
            >
              <Text style={{ color: "white" }}>{item[0]}</Text>
              <Text style={{ color: "white" }}>{item[1]}</Text>
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
