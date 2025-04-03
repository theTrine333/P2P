import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { height, Styles } from "@/constants/Styles";
import { ThemedView } from "@/components/ThemedView";
import { ExchangeRates } from "@/components/Card";

const BuyerPage = () => {
  const [cryptoRange, setCryptoRange] = useState("");
  const [paymentDuration, setPaymentDuration] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Mpesa");
  const [buyingRate, setBuyingRate] = useState("");
  const theme = useColorScheme() ?? "light";
  const handleSubmit = () => {
    console.log({ cryptoRange, paymentDuration, paymentMethod, buyingRate });
  };

  return (
    <ScrollView
      style={[Styles.subContainer, { marginTop: 10 }]}
      showsVerticalScrollIndicator={false}
    >
      <ExchangeRates />
      <Text>Set Buying Preferences</Text>
      <TextInput
        style={Styles.input}
        placeholder="Crypto Range (e.g. 10-100 USDT)"
        value={cryptoRange}
        onChangeText={setCryptoRange}
      />
      <TextInput
        style={Styles.input}
        placeholder="Payment Duration (minutes)"
        value={paymentDuration}
        onChangeText={setPaymentDuration}
        keyboardType="numeric"
      />
      <Picker
        selectedValue={paymentMethod}
        onValueChange={(value) => setPaymentMethod(value)}
      >
        <Picker.Item label="Mpesa" value="Mpesa" />
        <Picker.Item label="Bank Transfer" value="Bank" />
      </Picker>
      <TextInput
        style={Styles.input}
        placeholder="Buying Rate per USDT"
        value={buyingRate}
        onChangeText={setBuyingRate}
        keyboardType="numeric"
      />
      <TouchableOpacity style={Styles.button} onPress={handleSubmit}>
        <Text style={Styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <View style={{ height: height * 0.1 }} />
    </ScrollView>
  );
};

export default BuyerPage;
