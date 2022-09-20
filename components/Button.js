import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default ({ onPress, label }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    backgroundColor: "#305080",
    height: 48,
    borderRadius: 10,
    width: "100%",
  },
  buttonText: {
    padding: 15,
    height: "100%",
    color: "#f0f0f0",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
