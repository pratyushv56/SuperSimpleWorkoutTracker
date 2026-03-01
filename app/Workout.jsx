import { Link } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import Logo from "../assets/Homepage.png";
import Progress from "../assets/Progress.png";
import Spacer from "../components/Spacer";

export default function Index() {
  return (
    <View style={pageStyle.page}>
      <Image
        source={Logo}
        style={{
          width: 200,
          height: 200,
        }}
      />
      <Spacer h={20} />
      <Text style={pageStyle.fonts}></Text>
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
    </View>
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
