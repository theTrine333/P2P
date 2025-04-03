import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { ThemedView } from "./ThemedView";

const Splash = () => {
  return (
    <ThemedView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ActivityIndicator size="large" color="#0000ff" />
    </ThemedView>
  );
};

export default Splash;
