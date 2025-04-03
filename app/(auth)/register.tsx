import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";
import { Toast } from "toastify-react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { ThemedView } from "@/components/ThemedView";

export default function RegisterScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState<"buyer" | "seller">("buyer");
  const [walletAddress, setWalletAddress] = useState("");

  const showError = (message: string) => {
    Toast.error(message, "top");
  };

  const handleRegister = async () => {
    if (!isLoaded) {
      showError("Please wait while we initialize...");
      return;
    }

    try {
      if (!email || !password || !confirmPassword || !walletAddress) {
        showError("Please fill in all fields");
        return;
      }

      if (password !== confirmPassword) {
        showError("Passwords do not match");
        return;
      }

      // Validate wallet address format (basic check)
      if (!walletAddress.startsWith("0x") || walletAddress.length !== 42) {
        showError("Please enter a valid Ethereum wallet address");
        return;
      }

      // Start the sign-up process
      await signUp.create({
        emailAddress: email,
        password,
      });

      // Send verification email
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set the user type and wallet address as public metadata
      await signUp.update({
        publicMetadata: {
          userType,
          walletAddress,
        },
      });

      // Set the user session active
      await setActive({ session: signUp.createdSessionId });

      // Navigate to main app
      router.replace("/(tabs)");
    } catch (error: any) {
      showError(error.message || "Failed to register. Please try again.");
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Ethereum Wallet Address (0x...)"
        value={walletAddress}
        onChangeText={setWalletAddress}
        autoCapitalize="none"
      />

      <View style={styles.userTypeContainer}>
        <TouchableOpacity
          style={[
            styles.userTypeButton,
            userType === "buyer" && styles.userTypeButtonActive,
          ]}
          onPress={() => setUserType("buyer")}
        >
          <Text
            style={[
              styles.userTypeText,
              userType === "buyer" && styles.userTypeTextActive,
            ]}
          >
            Buyer
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.userTypeButton,
            userType === "seller" && styles.userTypeButtonActive,
          ]}
          onPress={() => setUserType("seller")}
        >
          <Text
            style={[
              styles.userTypeText,
              userType === "seller" && styles.userTypeTextActive,
            ]}
          >
            Seller
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  userTypeContainer: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 10,
  },
  userTypeButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  userTypeButtonActive: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  userTypeText: {
    textAlign: "center",
    fontSize: 16,
    color: "#000",
  },
  userTypeTextActive: {
    color: "#fff",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  linkText: {
    color: "#007AFF",
    textAlign: "center",
    fontSize: 16,
  },
});
