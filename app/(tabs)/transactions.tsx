import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  useColorScheme,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { ThemedView } from "@/components/ThemedView";
import { Styles } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";

interface Trade {
  id: string;
  type: "buy" | "sell";
  amount: number;
  price: number;
  user: string;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  paymentMethod: string;
  date: string;
}

const mockTrades: Trade[] = [
  {
    id: "1",
    type: "buy",
    amount: 1000,
    price: 1.05,
    user: "John Doe",
    status: "in_progress",
    paymentMethod: "Bank Transfer",
    date: "2024-03-30 14:30",
  },
  {
    id: "2",
    type: "sell",
    amount: 500,
    price: 1.02,
    user: "Jane Smith",
    status: "pending",
    paymentMethod: "PayPal",
    date: "2024-03-30 15:45",
  },
];

export default function TransactionsScreen() {
  const theme = useColorScheme() ?? "light";
  const renderTradeItem = ({ item }: { item: Trade }) => (
    <TouchableOpacity
      style={[
        styles.tradeCard,
        { backgroundColor: theme == "light" ? "" : Colors.dark.primary1 },
      ]}
      onPress={() => {
        Alert.alert(
          "Trade Details",
          `Type: ${item.type === "buy" ? "Buying" : "Selling"} USDT\n` +
            `Amount: ${item.amount} USDT\n` +
            `Price: $${item.price}/USDT\n` +
            `Counterparty: ${item.user}\n` +
            `Payment Method: ${item.paymentMethod}\n` +
            `Status: ${item.status.replace("_", " ")}`
        );
      }}
    >
      <View style={styles.tradeHeader}>
        <View style={styles.tradeType}>
          <FontAwesome
            name={item.type === "buy" ? "arrow-down" : "arrow-up"}
            size={20}
            color={item.type === "buy" ? "#4CAF50" : "#F44336"}
          />
          <ThemedText style={styles.tradeTypeText}>
            {item.type === "buy" ? "Buying" : "Selling"} USDT
          </ThemedText>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status).bg },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              { color: getStatusColor(item.status).text },
            ]}
          >
            {item.status.replace("_", " ")}
          </Text>
        </View>
      </View>

      <View style={styles.tradeDetails}>
        <View style={styles.detailRow}>
          <ThemedText style={styles.detailLabel}>Amount</ThemedText>
          <ThemedText style={styles.detailValue}>{item.amount} USDT</ThemedText>
        </View>
        <View style={styles.detailRow}>
          <ThemedText style={styles.detailLabel}>Price</ThemedText>
          <ThemedText style={styles.detailValue}>${item.price}/USDT</ThemedText>
        </View>
        <View style={styles.detailRow}>
          <ThemedText style={styles.detailLabel}>Counterparty</ThemedText>
          <ThemedText style={styles.detailValue}>{item.user}</ThemedText>
        </View>
        <View style={styles.detailRow}>
          <ThemedText style={styles.detailLabel}>Payment Method</ThemedText>
          <ThemedText style={styles.detailValue}>
            {item.paymentMethod}
          </ThemedText>
        </View>
      </View>

      <View style={styles.tradeFooter}>
        <Text style={styles.dateText}>{item.date}</Text>
        {item.status === "in_progress" && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => Alert.alert("Action", "Mark as completed")}
          >
            <Text style={styles.actionButtonText}>Mark as Completed</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  const getStatusColor = (status: Trade["status"]) => {
    switch (status) {
      case "pending":
        return { bg: "#FFF3E0", text: "#FF9800" };
      case "in_progress":
        return { bg: "#E3F2FD", text: "#2196F3" };
      case "completed":
        return { bg: "#E8F5E9", text: "#4CAF50" };
      case "cancelled":
        return { bg: "#FFEBEE", text: "#F44336" };
      default:
        return { bg: "#F5F5F5", text: "#9E9E9E" };
    }
  };

  return (
    <ThemedView style={Styles.container}>
      <FlatList
        data={mockTrades}
        renderItem={renderTradeItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  listContainer: {
    padding: 15,
  },
  tradeCard: {
    // backgroundColor: "#fff",
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
    marginBottom: 15,
  },
  tradeType: {
    flexDirection: "row",
    alignItems: "center",
  },
  tradeTypeText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  tradeDetails: {
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "500",
  },
  tradeFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 15,
  },
  dateText: {
    color: "#666",
    fontSize: 14,
  },
  actionButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
});
