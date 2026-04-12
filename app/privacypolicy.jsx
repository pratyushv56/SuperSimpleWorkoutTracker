import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Privacypolicy() {
  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <ScrollView>
        <Text style={{ fontSize: 22, fontWeight: "bold", color: "white" }}>
          Privacy Policy
        </Text>

        <Text style={{ marginTop: 15, color: "white" }}>
          This app respects your privacy. We only collect and store the minimum
          data necessary to provide core functionality.
        </Text>

        <Text style={{ marginTop: 15, color: "white" }}>
          When you use the app without logging in, all your data is stored
          locally on your device.
        </Text>

        <Text style={{ marginTop: 15, color: "white" }}>
          If you choose to log in, your data may be stored securely in the cloud
          using Firebase services to enable backup and restore functionality.
        </Text>

        <Text style={{ marginTop: 15, color: "white" }}>
          We do not sell, share, or distribute your personal data to third
          parties.
        </Text>

        <Text style={{ marginTop: 15, color: "white" }}>
          Authentication (such as email and password) is handled securely by
          Firebase. We do not have access to your password.
        </Text>

        <Text style={{ marginTop: 15, color: "white" }}>
          You are responsible for keeping your account credentials secure.
        </Text>

        <Text style={{ marginTop: 15, color: "white" }}>
          This app may use third-party services (such as Firebase) which have
          their own privacy policies.
        </Text>

        <Text style={{ marginTop: 15, color: "white" }}>
          By using this app, you agree to this privacy policy.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
