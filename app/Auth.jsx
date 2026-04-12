import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "./firebase";

import Checkbox from "expo-checkbox";
import { Link, useRouter } from "expo-router";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { Alert, StyleSheet, TextInput } from "react-native";
import Spacer from "../components/Spacer";
import { loadFromCloud } from "./syncService";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);

  const signIn = async (email, password) => {
    if (!agreed) {
      Alert.alert("Please accept the Terms and Conditions");
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const user = userCredential.user;
      console.log("User signed in:", user);

      Alert.alert(
        "Restore backup?",
        "Do you want to restore your saved backup from the cloud? This will replace the data currently stored on this device.",
        [
          {
            text: "Skip",
            style: "cancel",
            onPress: () => router.replace("/"),
          },
          {
            text: "Restore",
            onPress: async () => {
              await loadFromCloud(user.uid);
              router.replace("/");
            },
          },
        ],
      );
    } catch (error) {
      console.error("Error signing in:", error);
      Alert.alert(error.message);
    }
  };

  const signUp = async (email, password) => {
    if (!agreed) {
      Alert.alert("Please accept the Terms and Conditions");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      console.log("User signed up:", user);
      router.replace("/");
    } catch (error) {
      console.error("Error signing up:", error);
      Alert.alert(error.message);
    }
  };

  const resetPassword = async (email) => {
    if (!email) {
      Alert.alert(
        "Enter email",
        "Please enter your email address to reset your password.",
      );
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Password reset email sent");
      Alert.alert(
        "Password Reset",
        "A password reset email has been sent to the entered email address.",
      );
    } catch (error) {
      console.error("Error sending password reset email:", error);
    }
  };

  return (
    <SafeAreaView style={pageStyle.page}>
      <View style={{ width: "70%" }}>
        <Text style={{ color: "grey" }}>
          Create an account to backup progress and sync across devices.
        </Text>
      </View>
      <Spacer h={20} />
      <View style={{ width: "75%", maxWidth: 400 }}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          style={{
            padding: 10,
            backgroundColor: "grey",
            borderRadius: 10,
          }}
        />
        <Spacer h={5} />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry // Hides input
          style={{
            padding: 10,
            backgroundColor: "grey",
            borderRadius: 10,
          }}
        />
        <Spacer h={15} />
        <View style={{ flexDirection: "row", gap: 8 }}>
          <Checkbox value={agreed} onValueChange={setAgreed} />
          <Text style={{ color: "white", fontSize: 12 }}>
            I agree to the{" "}
            <Link href="/Terms">
              <Text style={{ color: "orange" }}>Terms & Conditions </Text>
            </Link>
            and{" "}
            <Link href="/Privacypolicy">
              <Text style={{ color: "orange" }}>Privacy Policy</Text>
            </Link>
          </Text>
        </View>
        <Spacer h={15} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Pressable
            style={({ pressed }) => ({
              backgroundColor: "#7DA293",
              padding: 10,
              borderRadius: 10,
              opacity: pressed ? 0.8 : 1,
            })}
            onPress={() => signUp(email, password)}
          >
            <Text style={{ color: "white" }}>Sign Up</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => ({
              backgroundColor: "#7DA293",
              padding: 10,
              borderRadius: 10,
              opacity: pressed ? 0.8 : 1,
            })}
            onPress={() => signIn(email, password)}
          >
            <Text style={{ color: "white" }}>Sign In</Text>
          </Pressable>
        </View>
        <Spacer h={10} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Pressable
            onPress={() => resetPassword(email)}
            style={({ pressed }) => ({
              opacity: pressed ? 0.8 : 1,
            })}
          >
            <Text style={{ color: "orange" }}>Reset Password</Text>
          </Pressable>
        </View>
      </View>
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
