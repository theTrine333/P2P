import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import SellerPage from "../trade";
import BuyerPage from "../trade/buy";
import { ThemedView } from "@/components/ThemedView";
import { Styles } from "@/constants/Styles";

interface Trade {
  id: string;
  type: "buyer" | "seller";
  amount: number;
  price: number;
  user: string;
  rating: number;
  paymentMethods: string[];
}

// Mock data for available trades
const mockTrades: Trade[] = [
  {
    id: "1",
    type: "buyer",
    amount: 1000,
    price: 1.05,
    user: "John Doe",
    rating: 4.8,
    paymentMethods: ["Bank Transfer", "PayPal"],
  },
  {
    id: "2",
    type: "seller",
    amount: 500,
    price: 1.02,
    user: "Jane Smith",
    rating: 4.9,
    paymentMethods: ["Bank Transfer", "Cash"],
  },
];

export default function HomeScreen() {
  const [userType, setUserType] = useState<"buyer" | "seller">("buyer");

  const renderTradeItem = ({ item }: { item: Trade }) => (
    <TouchableOpacity
      style={styles.tradeCard}
      onPress={() => {
        Alert.alert(
          "Trade Details",
          `Amount: ${item.amount} USDT\nPrice: $${item.price}\nSeller: ${item.user}`
        );
      }}
    >
      <View style={styles.tradeHeader}>
        <Text style={styles.tradeType}>
          {item.type === "buyer" ? "Buy USDT" : "Sell USDT"}
        </Text>
        <View style={styles.ratingContainer}>
          <FontAwesome name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{item.rating}</Text>
        </View>
      </View>

      <View style={styles.tradeDetails}>
        <Text style={styles.amount}>{item.amount} USDT</Text>
        <Text style={styles.price}>${item.price}/USDT</Text>
      </View>

      <View style={styles.paymentMethods}>
        {item.paymentMethods.map((method: string, index: number) => (
          <View key={index} style={styles.paymentMethod}>
            <Text style={styles.paymentMethodText}>{method}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={Styles.container}>
      <ThemedView style={styles.header}>
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
            Buy USDT
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
            Sell USDT
          </Text>
        </TouchableOpacity>
      </ThemedView>

      {userType === "buyer" ? <BuyerPage /> : <SellerPage />}
      {/* <FlatList
        data={mockTrades.filter((trade) => trade.type === userType)}
        renderItem={renderTradeItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      /> */}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    padding: 15,
    // backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  userTypeButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    backgroundColor: "#f5f5f5",
  },
  userTypeButtonActive: {
    backgroundColor: "#007AFF",
  },
  userTypeText: {
    textAlign: "center",
    fontSize: 16,
    color: "#000",
  },
  userTypeTextActive: {
    color: "#fff",
  },
  listContainer: {
    padding: 15,
  },
  tradeCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  tradeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  tradeType: {
    fontSize: 18,
    fontWeight: "bold",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    marginLeft: 5,
    fontSize: 16,
  },
  tradeDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  amount: {
    fontSize: 16,
    color: "#666",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
  },
  paymentMethods: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  paymentMethod: {
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  paymentMethodText: {
    fontSize: 14,
    color: "#666",
  },
});
