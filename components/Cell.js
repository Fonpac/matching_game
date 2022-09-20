import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default ({ id, value, clicked, matched, handleClick }) => {
  return (
    <TouchableOpacity style={styles.cell} onPress={() => handleClick(id)}>
      <Text style={styles.text}>{clicked || matched ? value : ""}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cell: {
    backgroundColor: "#305080",
    height: 48,
    borderRadius: 10,
    width: 40,
    margin: 16,
  },
  text: {
    marginTop: 12,
    height: "100%",
    color: "#f0f0f0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    alignContent: "center",
  },
});
