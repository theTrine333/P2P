import { View, Text } from "react-native";
import React, { useState } from "react";
import { TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Styles } from "@/constants/Styles";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
const SellerPage = () => {
  const [sellingRange, setSellingRange] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Mpesa");
  const [sellingRate, setSellingRate] = useState("");

  const handleSubmit = () => {
    console.log({ sellingRange, paymentMethod, sellingRate });
  };

  return (
    <ThemedView style={Styles.subContainer}>
      <ThemedText>Set Selling Preferences</ThemedText>
      <TextInput
        style={Styles.input}
        placeholder="Crypto Range (e.g. 10-100 USDT)"
        value={sellingRange}
        onChangeText={setSellingRange}
      />
      <Picker
        onValueChange={(value) => setPaymentMethod(value as string)}
        selectedValue={paymentMethod}
      >
        <Picker.Item label="Mpesa" value="Mpesa" />
        <Picker.Item label="Bank Transfer" value="Bank" />
      </Picker>
      <TextInput
        style={Styles.input}
        placeholder="Selling Rate per USDT"
        value={sellingRate}
        onChangeText={setSellingRate}
        keyboardType="numeric"
      />
      <TouchableOpacity style={Styles.button} onPress={handleSubmit}>
        <Text style={Styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ThemedView>
  );
};

export default SellerPage;
