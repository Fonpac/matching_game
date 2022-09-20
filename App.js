import { useState } from "react";
import { View, Text } from "react-native";
import Difficult from "./components/Difficult";
import Game from "./components/Game";

const App = () => {
  const [difficult, setDifficult] = useState(0);
  const [matches, setMatches] = useState([]);

  return (
    <View>
      {difficult == 0 ? (
        <Difficult setDifficult={(value) => setDifficult(value)} />
      ) : (
        <Game
          difficult={difficult}
          matches={matches}
          onRestart={() => setDifficult(0)}
          onFinish={(newMatches) => {
            setMatches(newMatches);
          }}
        />
      )}
    </View>
  );
};

export default App;
