import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
  ScrollView,
  useColorScheme,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Styles } from "@/constants/Styles";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  rating: number;
  completedTrades: number;
  joinedDate: string;
  notifications: {
    tradeUpdates: boolean;
    priceAlerts: boolean;
    securityAlerts: boolean;
  };
}

const mockProfile: UserProfile = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 234 567 8900",
  rating: 4.8,
  completedTrades: 25,
  joinedDate: "2024-01-15",
  notifications: {
    tradeUpdates: true,
    priceAlerts: false,
    securityAlerts: true,
  },
};

export default function ProfileScreen() {
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          // TODO: Implement logout
        },
      },
    ]);
  };
  const theme = useColorScheme() ?? "light";
  return (
    <ThemedView style={Styles.container}>
      <ThemedView style={styles.header}>
        <View style={styles.avatarContainer}>
          <FontAwesome
            name="user-circle-o"
            size={80}
            color={theme == "light" ? "#007AFF" : "white"}
          />
        </View>
        <ThemedText style={styles.name}>{mockProfile.name}</ThemedText>
        <View style={styles.ratingContainer}>
          <FontAwesome name="star" size={16} color="#FFD700" />
          <ThemedText style={styles.rating}>{mockProfile.rating}</ThemedText>
        </View>
        <Text style={styles.stats}>
          {mockProfile.completedTrades} completed trades
        </Text>
      </ThemedView>
      <ScrollView>
        <ThemedText style={styles.section}>
          <ThemedText style={styles.sectionTitle}>
            Account Information
          </ThemedText>
          <View style={styles.infoRow}>
            <FontAwesome name="envelope" size={20} color="#666" />
            <Text style={styles.infoText}>{mockProfile.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <FontAwesome name="phone" size={20} color="#666" />
            <Text style={styles.infoText}>{mockProfile.phone}</Text>
          </View>
          <View style={styles.infoRow}>
            <FontAwesome name="calendar" size={20} color="#666" />
            <Text style={styles.infoText}>
              Member since {mockProfile.joinedDate}
            </Text>
          </View>
        </ThemedText>

        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Notifications</ThemedText>
          <View style={styles.settingRow}>
            <ThemedText style={styles.settingLabel}>Trade Updates</ThemedText>
            <Switch
              value={mockProfile.notifications.tradeUpdates}
              onValueChange={() => {}}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={
                mockProfile.notifications.tradeUpdates ? "#007AFF" : "#f4f3f4"
              }
            />
          </View>
          <View style={styles.settingRow}>
            <ThemedText style={styles.settingLabel}>Price Alerts</ThemedText>
            <Switch
              value={mockProfile.notifications.priceAlerts}
              onValueChange={() => {}}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={
                mockProfile.notifications.priceAlerts ? "#007AFF" : "#f4f3f4"
              }
            />
          </View>
          <View style={styles.settingRow}>
            <ThemedText style={styles.settingLabel}>Security Alerts</ThemedText>
            <Switch
              value={mockProfile.notifications.securityAlerts}
              onValueChange={() => {}}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={
                mockProfile.notifications.securityAlerts ? "#007AFF" : "#f4f3f4"
              }
            />
          </View>
        </ThemedView>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Security</ThemedText>
          <TouchableOpacity style={styles.menuItem}>
            <ThemedText style={styles.menuText}>Change Password</ThemedText>
            <FontAwesome name="chevron-right" size={16} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <ThemedText style={styles.menuText}>
              Two-Factor Authentication
            </ThemedText>
            <FontAwesome name="chevron-right" size={16} color="#666" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    // backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  avatarContainer: {
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  rating: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "500",
  },
  stats: {
    color: "#666",
    fontSize: 14,
  },
  section: {
    // backgroundColor: "#fff",
    borderBottomWidth: 1,
    padding: 15,
    paddingBottom: 20,
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  infoText: {
    marginLeft: 15,
    fontSize: 16,
    color: "#333",
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  settingLabel: {
    fontSize: 14,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuText: {
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
    margin: 15,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
