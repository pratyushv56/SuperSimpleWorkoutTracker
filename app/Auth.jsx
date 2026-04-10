import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "./firebase";

import { useRouter } from "expo-router";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { Alert, StyleSheet, TextInput } from "react-native";
import Spacer from "../components/Spacer";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const user = userCredential.user;
      console.log("User signed in:", user);
      router.replace("/");
    } catch (error) {
      console.error("Error signing in:", error);
      Alert.alert(error.message);
    }
  };

  const signUp = async (email, password) => {
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
        <Spacer h={20} />
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
