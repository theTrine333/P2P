import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  useColorScheme,
  RefreshControl,
} from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { getWalletBalance, formatWalletAddress } from "../../utils/wallet";
import { Toast } from "toastify-react-native";
import { ThemedView } from "@/components/ThemedView";
import { Styles } from "@/constants/Styles";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { AddressCard } from "@/components/Card";
import { AddAdress } from "@/components/Modals";

interface Transaction {
  id: string;
  type: "deposit" | "withdrawal" | "trade";
  amount: number;
  date: string;
  status: "pending" | "completed" | "failed";
  description: string;
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "deposit",
    amount: 1000,
    date: "2024-03-30 14:30",
    status: "completed",
    description: "Deposit from bank transfer",
  },
  {
    id: "2",
    type: "trade",
    amount: -500,
    date: "2024-03-30 15:45",
    status: "completed",
    description: "Sold USDT to John Doe",
  },
];

const walletAddress = [
  {
    id: "1",
    address: "0x41fd9cc6b252be3dd12f7cec18fcf5e50e0f7c28",
  },
];

export default function WalletScreen() {
  const [balance, setBalance] = useState<number | null>(0.0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const theme = useColorScheme() ?? "light";

  useEffect(() => {
    fetchWalletBalance();
  }, []);

  const showError = (message: string) => {
    Toast.error(message, "top");
  };

  const fetchWalletBalance = async () => {
    try {
      // TODO: Get wallet address from user's profile/storage
      const walletAddress = "0x41fd9cc6b252be3dd12f7cec18fcf5e50e0f7c28"; // Replace with actual wallet address
      const balance = await getWalletBalance(walletAddress);
      setBalance(balance);
    } catch (error) {
      showError("Failed to fetch wallet balance");
      // console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderTransactionItem = ({ item }: { item: Transaction }) => (
    <TouchableOpacity
      style={[
        Styles.transactionCard,
        {
          backgroundColor:
            theme == "light" ? Colors.light.background : Colors.dark.primaryTwo,
        },
      ]}
    >
      <View style={Styles.transactionHeader}>
        <View style={Styles.transactionType}>
          <FontAwesome
            name={
              item.type === "deposit"
                ? "arrow-down"
                : item.type === "withdrawal"
                ? "arrow-up"
                : "exchange"
            }
            size={20}
            color={
              item.type === "deposit"
                ? "#4CAF50"
                : item.type === "withdrawal"
                ? "#F44336"
                : "#2196F3"
            }
          />
          <ThemedText style={Styles.transactionDescription}>
            {item.description}
          </ThemedText>
        </View>
        <Text
          style={[
            Styles.transactionAmount,
            {
              color:
                item.type === "deposit"
                  ? "#4CAF50"
                  : item.type === "withdrawal"
                  ? "#F44336"
                  : "#2196F3",
            },
          ]}
        >
          {item.type === "deposit" ? "+" : "-"}
          {item.amount} USDT
        </Text>
      </View>
      <View style={Styles.transactionFooter}>
        <ThemedText style={Styles.transactionDate}>{item.date}</ThemedText>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor:
                item.status === "completed"
                  ? "#E8F5E9"
                  : item.status === "pending"
                  ? "#FFF3E0"
                  : "#FFEBEE",
            },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              {
                color:
                  item.status === "completed"
                    ? "#4CAF50"
                    : item.status === "pending"
                    ? "#FF9800"
                    : "#F44336",
              },
            ]}
          >
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={Styles.container}>
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Available Balance</Text>
        {loading ? (
          <ActivityIndicator color="#fff" size="large" />
        ) : (
          <Text style={styles.balanceAmount}>{balance?.toFixed(2)} USDT</Text>
        )}
        <View style={styles.actionButtons}>
          {/* <TouchableOpacity style={styles.actionButton}>
            <FontAwesome name="arrow-up" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Send</Text>
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.actionButton}>
            {/* <FontAwesome name="arrow-down" size={20} color="#fff" /> */}
            <Text style={styles.actionButtonText}>Withdraw</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ThemedText style={styles.sectionTitle}>My wallets</ThemedText>
      {/* <FlatList
        data={mockTransactions}
        renderItem={renderTransactionItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      /> */}
      {refreshing ? (
        <></>
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                setTimeout(() => {
                  setRefreshing(false);
                }, 2000);
              }}
            />
          }
          data={walletAddress}
          renderItem={({ item }) => (
            <AddressCard address={item.address} id={item.id} />
          )}
          keyExtractor={(item) => item.address}
          contentContainerStyle={styles.listContainer}
        />
      )}

      {!modalVisible && (
        <TouchableOpacity
          style={Styles.floatingButton}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <MaterialCommunityIcons
            name="wallet-plus-outline"
            size={25}
            color={"white"}
          />
        </TouchableOpacity>
      )}

      {modalVisible && (
        <AddAdress
          visibility={true}
          onClose={() => {
            setModalVisible(false);
          }}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  balanceCard: {
    backgroundColor: "#007AFF",
    padding: 20,
    margin: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  balanceLabel: {
    color: "#fff",
    fontSize: 16,
    opacity: 0.9,
  },
  balanceAmount: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
    marginVertical: 10,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 15,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 10,
    borderRadius: 8,
    width: "45%",
    justifyContent: "center",
  },
  actionButtonText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 15,
    marginBottom: 10,
  },
  listContainer: {
    padding: 15,
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
});
