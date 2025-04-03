import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  ActivityIndicator,
  Clipboard,
} from "react-native";
import React, { useState } from "react";
import { ThemedView } from "./ThemedView";
import { Styles } from "@/constants/Styles";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "./ThemedText";

interface ModalProps {
  visibility: boolean;
  onClose: any;
}

const AddAdress = ({ visibility, onClose }: ModalProps) => {
  const theme = useColorScheme() ?? "light";
  const [addr, setAddr] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <Modal transparent animationType="slide" onRequestClose={onClose}>
      <ThemedView style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
        <ThemedView style={Styles.bottomModal}>
          <ThemedView
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderBottomWidth: 1,
              paddingBottom: 10,
              marginBottom: 10,
            }}
          >
            <ThemedText type="subtitle">Add wallet address</ThemedText>
            <TouchableOpacity
              onPress={onClose}
              hitSlop={20}
              style={{
                alignSelf: "center",
                borderRadius: 100,
                padding: 5,
                backgroundColor: Colors[theme ?? "light"].clear,
              }}
            >
              <Ionicons name="close-circle-outline" size={20} />
            </TouchableOpacity>
          </ThemedView>

          <ThemedView
            style={{
              flexDirection: "row",
              width: "100%",
              borderWidth: 1,
              borderColor: Colors[theme ?? "light"].clear,
              borderRadius: 8,
              justifyContent: "space-between",
            }}
          >
            <TextInput
              style={[
                Styles.input,
                {
                  marginVertical: 0,
                  width: "87%",
                  color: Colors[theme ?? "light"].text,
                  borderBottomWidth: 0,
                },
              ]}
              value={addr}
              numberOfLines={1}
              onChangeText={setAddr}
              placeholder="0x41fd...c28"
              placeholderTextColor={Colors[theme ?? "light"].clear}
            />
            <TouchableOpacity
              onPress={async () => {
                let text = await Clipboard.getString();
                setAddr(text);
              }}
              hitSlop={20}
              style={{
                alignSelf: "center",
                padding: 10,
                borderTopRightRadius: 8,
                borderBottomRightRadius: 8,
                backgroundColor: Colors[theme ?? "light"].clear,
              }}
            >
              <FontAwesome6 name="paste" size={20} />
            </TouchableOpacity>
          </ThemedView>
          {/* Save button */}
          <TouchableOpacity
            onPress={() => {
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
              }, 3000);
              onClose();
            }}
            disabled={loading}
            style={{
              opacity: loading ? 0.5 : 1,
              backgroundColor: Colors.blue,
              marginVertical: 10,
              padding: 10,
              alignItems: "center",
              borderRadius: 8,
            }}
          >
            {loading ? (
              <ActivityIndicator color={"white"} size={22} />
            ) : (
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                Save
              </Text>
            )}
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </Modal>
  );
};

export { AddAdress };
