import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Terms() {
  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <ScrollView>
        <Text style={{ fontSize: 22, fontWeight: "bold", color: "white" }}>
          Terms & Conditions
        </Text>

        <Text style={{ marginTop: 15, color: "white" }}>
          Welcome to this workout tracking app. By using this app, you agree to
          the following terms.
        </Text>

        <Text style={{ marginTop: 15, color: "white" }}>
          This app allows you to log workouts and optionally back up your data
          to the cloud using your account. The app is provided "as is" without
          any guarantees of accuracy, reliability, or availability.
        </Text>

        <Text style={{ marginTop: 15, color: "white" }}>
          You are responsible for your data. While the app offers a backup
          feature, we cannot guarantee that your data can always be recovered.
        </Text>

        <Text style={{ marginTop: 15, color: "white" }}>
          You agree not to misuse the app, attempt to break its functionality,
          or use it for any unlawful purpose.
        </Text>

        <Text style={{ marginTop: 15, color: "white" }}>
          We may update or modify the app at any time without prior notice.
        </Text>

        <Text style={{ marginTop: 15, color: "white" }}>
          By continuing to use this app, you agree to these terms.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
