import { View, StyleSheet, Text } from "react-native";
import CustomButton from "./Button";

const difficultOptions = [
  {
    value: 6,
    label: "Fácil",
  },
  {
    value: 10,
    label: "Médio",
  },
  {
    value: 15,
    label: "Difícil",
  },
];

export default ({ setDifficult }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Jogo da memória </Text>
      <View style={styles.buttonGroup}>
        {difficultOptions.map((diff, index) => {
          return (
            <CustomButton
              key={index}
              onPress={() => setDifficult(diff.value)}
              label={diff.label}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "lightgrey",
    height: "100%",
    marginTop: 20,
  },
  title: {
    fontSize: 36,
    textAlign: "center",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    flex: 0.8,
  },
});
