import { Link } from "expo-router";
import { Image, Pressable, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../assets/Homepage.png";
import Progress from "../assets/Progress.png";
import Spacer from "../components/Spacer";

export default function Index() {
  async function handleLogin() {}

  return (
    <SafeAreaView style={pageStyle.page}>
      <Pressable
        style={{
          position: "absolute",
          top: 20,
          alignSelf: "flex-end",

          marginRight: 20,
          marginTop: 20,
          backgroundColor: "#F7A737",
          padding: 5,
          borderRadius: 10,
        }}
        onPress={async () => {
          await handleLogin();
        }}
      >
        <Text style={{ color: "white" }}>Login</Text>
      </Pressable>
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
