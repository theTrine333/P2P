import {
  View,
  TouchableOpacity,
  useColorScheme,
  ActivityIndicator,
  Clipboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { height, Styles, width } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "./ThemedText";
import { formatWalletAddress, getWalletBalance } from "@/utils/wallet";
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import { Toast } from "toastify-react-native";
import { ThemedView } from "./ThemedView";

interface AddressCardProps {
  id: string;
  address: string;
}

const AddressCard = ({ id, address }: AddressCardProps) => {
  const theme = useColorScheme() ?? "light";
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState("0.0");
  const fetchWalletBalance = async () => {
    try {
      setLoading(true);
      // TODO: Get wallet address from user's profile/storage
      const walletAddress = "0x41fd9cc6b252be3dd12f7cec18fcf5e50e0f7c28"; // Replace with actual wallet address
      const balance = await getWalletBalance(walletAddress);
      setBalance(balance.toString());
    } catch (error) {
      // showError("Failed to fetch wallet balance");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchWalletBalance();
  }, []);
  return (
    <TouchableOpacity
      style={[
        Styles.transactionCard,
        {
          backgroundColor:
            theme == "light" ? Colors.light.background : Colors.dark.primaryTwo,
          flexDirection: "row",
          justifyContent: "space-between",
        },
      ]}
    >
      <ThemedText style={{ alignSelf: "center" }}>
        {formatWalletAddress(address)}
      </ThemedText>
      <View style={{ flexDirection: "row", gap: 10 }}>
        {loading ? (
          <ActivityIndicator size={20} />
        ) : (
          <ThemedText
            style={{
              backgroundColor: "rgba(0,100,0,0.2)",
              paddingHorizontal: 10,
              paddingVertical: 3,
              borderRadius: 12,
              color: theme == "dark" ? "grey" : "rgba(0,100,0,1)",
              fontWeight: "bold",
            }}
          >
            {balance}
          </ThemedText>
        )}
        <TouchableOpacity
          style={{
            backgroundColor: "rgba(0,0,0,0.1)",
            padding: 5,
            borderRadius: 10,
            alignSelf: "center",
          }}
          onPress={() => {
            Clipboard.setString(address);
            Toast.success("Address copied to clipboard", "top");
          }}
        >
          <MaterialIcons
            name="content-copy"
            size={20}
            color={Colors[theme ?? "light"].text}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const ExchangeRates = () => {
  const theme = useColorScheme() ?? "light";
  return (
    <ThemedView style={{ marginBottom: 10 }}>
      <ThemedView
        style={[
          Styles.exchange,
          {
            backgroundColor:
              theme == "light" ? "rgba(240,240,240,1)" : Colors.dark.primaryTwo,
          },
        ]}
      />
      <ThemedView
        style={[
          Styles.exchange,
          {
            backgroundColor:
              theme == "light" ? "rgba(240,240,240,1)" : Colors.dark.primaryTwo,
          },
        ]}
      />
      <ThemedView
        style={{
          height: height * 0.06,
          width: width * 0.13,
          borderRadius: 1000,
          alignSelf: "center",
          position: "absolute",
          top: 223,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ThemedView
          style={{
            backgroundColor:
              theme == "light" ? "rgba(240,240,240,1)" : Colors.dark.primaryTwo,
            borderRadius: 1000,
            width: "85%",
            height: "85%",
            // elevation: 2,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Octicons
            name="arrow-switch"
            size={20}
            color={Colors[theme ?? "light"].text}
          />
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
};
export { AddressCard, ExchangeRates };
