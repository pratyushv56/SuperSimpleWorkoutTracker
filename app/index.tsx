import { Link } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../assets/Homepage.png";
import Progress from "../assets/Progress.png";
import Spacer from "../components/Spacer";
import { useAuth } from "./authContext";

export default function Index() {
  const { user, uid } = useAuth();

  const signedIn = !!user; // Convert user to a boolean (true if user exists, false if null or undefined)

  console.log("User in Index:", user);
  console.log("UID in Index on home page:", uid);

  return (
    <SafeAreaView style={pageStyle.page}>
      {!signedIn && (
        <View
          style={{
            position: "absolute",
            top: 25,
            right: 15,
            padding: 6,

            paddingInline: 12,
            backgroundColor: "#7DA293",
            borderRadius: 10,
          }}
        >
          <Link href="/Auth">
            <Text style={{ color: "white" }}>Login</Text>
          </Link>
        </View>
      )}
      <Image
        source={Logo}
        style={{
          width: 200,
          height: 200,
        }}
      />
      <Spacer h={20} />
      <Text style={pageStyle.fonts}>Let's Get Started!</Text>
      <Spacer h={10} />

      <Link href="/Week">
        <Text style={{ color: "yellow", fontSize: 18 }}>click here</Text>
      </Link>
      <Spacer h={10} />
      <Spacer h={35} />
      <Link href="/Progress">
        <Text style={{ color: "yellow", fontSize: 18 }}>
          Check progress{" "}
          <Image source={Progress} style={{ width: 30, height: 30 }} />
        </Text>
      </Link>
    </SafeAreaView>
  );
}

const pageStyle = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  fonts: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
