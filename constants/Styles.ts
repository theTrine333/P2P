import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "./Colors";
export const { width, height } = Dimensions.get("window");
export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  subContainer: { padding: 20 },
  bottomModal: {
    padding: 20,
    width: width,
    position: "absolute",
    bottom: 0,
    minHeight: height * 0.2,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  exchange: {
    elevation: 2,
    // borderWidth: 1,
    // borderColor: "white",
    marginTop: 10,
    height: height * 0.3,
    borderRadius: 16,
  },
  input: {
    borderBottomWidth: 1,
    padding: 10,
    borderColor: "lightgrey",
    marginVertical: 10,
  },
  floatingButton: {
    elevation: 2,
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: Colors.blue,
    borderRadius: 1000,
    padding: 15,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    marginTop: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  transactionCard: {
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
    elevation: 1,
  },
  transactionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  transactionType: {
    flexDirection: "row",
    alignItems: "center",
  },
  transactionDescription: {
    marginLeft: 10,
    fontSize: 13,
    fontWeight: "500",
  },
  transactionAmount: {
    fontSize: 12,
    fontWeight: "bold",
  },
  transactionFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  transactionDate: {
    color: "grey",
    fontSize: 14,
  },
});
