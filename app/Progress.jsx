import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native-web";

export default function progress() {

 useEffect(() => {
  const loadData = async () => {
    const stored = await AsyncStorage.getItem("workoutLogsMaster");
    const 
  };

  loadData();
}, []);
  return (
    <SafeAreaView>
      <View>
        <Text>Progress page</Text>
      </View>
    </SafeAreaView>
  );
}
