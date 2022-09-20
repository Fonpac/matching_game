import { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Cell from "./Cell";
import CustomButton from "./Button";

const options = [
  "🍔",
  "🐱‍👤",
  "🐱‍👓",
  "👀",
  "🎂",
  "🤷‍♂️",
  "🎶",
  "🐱‍🐉",
  "🐱‍🏍",
  "🎁",
  "🐱‍🚀",
  "👺",
  "💀",
  "👾",
  "🥵",
  "🙊",
  "🐳",
];
const defaultScore = 20;

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const Game = ({ difficult, matches, onRestart, onFinish }) => {
  const [board, setBoard] = useState([]);
  const [score, setScore] = useState(defaultScore);
  const [won, setWin] = useState(false);
  const [lost, setLose] = useState(false);

  const handleClick = (id) => {
    let newBoard = board.slice();
    let found = newBoard.find((p) => p.id == id);
    let clickedPieces = newBoard
      .filter((p) => !p.matched)
      .filter((p) => p.clicked).length;
    if (clickedPieces < 2) {
      found.clicked = true;
    } else {
      newBoard.forEach((p) => (p.clicked = false));
    }

    handleScore(
      found.value,
      newBoard.filter((p) => !p.matched).filter((p) => p.clicked).length,
      newBoard
    );
  };

  const handleScore = (label, clickedPieces, newBoard) => {
    if (clickedPieces == 2) {
      if (newBoard.filter((p) => p.clicked && p.value == label).length == 2) {
        newBoard.forEach((p) => {
          if (p.value == label) {
            p.matched = true;
          }
        });
        setScore((score) => score + 20);
      } else {
        setScore((score) => score - 5);
        setTimeout(() => {
          newBoard.forEach((p) => (p.clicked = false));
          setBoard(newBoard);
          checkWinCondition();
        }, 1000);
      }
    }
    setBoard(newBoard);
    checkWinCondition();
  };

  const checkWinCondition = () => {
    let temp = [...matches];
    if (board.length == board.filter((b) => b.matched).length) {
      setWin(true);
      temp.push({
        condition: "Vitória",
        score: score + 20,
      });
    }
    if (score <= 0) {
      setLose(true);
      temp.push({
        condition: "Derrota",
      });
    }
    onFinish(temp);
  };

  const restart = () => {
    setBoard([]);
    setScore(defaultScore);
    setWin(false);
    setLose(false);
    onRestart();
  };

  if (board.length == 0) {
    for (let i = 0; i <= difficult; i++) {
      board.push(
        ...[
          {
            id: board.length + 1,
            value: options[i],
            clicked: false,
            matched: false,
          },
          {
            id: board.length + 2,
            value: options[i],
            clicked: false,
            matched: false,
          },
        ]
      );
    }

    shuffle(board);
  }

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.scoreBoard}>
          <Text>{!lost ? `Pontuação: ${score}` : ""}</Text>
        </View>
        {won || lost ? (
          <View style={styles.winMessage}>
            <Text>{won ? "Parabéns você ganhou" : ""}</Text>
            <Text>{lost ? "Parabéns você perdeu" : ""}</Text>
          </View>
        ) : (
          <Text></Text>
        )}
        <View style={styles.cellSection}>
          {!won && !lost ? (
            board.map(({ id, value, clicked, matched }, index) => (
              <Cell
                key={index}
                id={id}
                value={value}
                clicked={clicked}
                matched={matched}
                handleClick={handleClick}
              />
            ))
          ) : (
            <Text></Text>
          )}
        </View>
        {won || lost ? (
          <View>
            <CustomButton
              onPress={() => restart()}
              label={"Tentar novamente"}
            />
            <Text style={styles.matchHistory}>Partidas:</Text>
            {matches.map((match, index) => {
              return (
                <Text key={index}>
                  {index + 1}: {match.condition ? match.condition : ""}
                  {match.score ? ` | Pontuação: ${match.score}` : ""}
                </Text>
              );
            })}
          </View>
        ) : (
          <Text></Text>
        )}
      </View>
      {!won && !lost ? (
        <View style={styles.retryButton}>
          <CustomButton onPress={() => restart()} label="Começar denovo" />
        </View>
      ) : (
        <Text></Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "lightgrey",
    height: "100%",
    width: "100%",
  },
  scoreBoard: {
    marginBottom: 16,
  },
  winMessage: {
    fontSize: 24,
  },
  cellSection: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  matchHistory: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  retryButton: {
    position: "absolute",
    bottom: 10,
    padding: 16,
    width: "100%",
  },
});

export default Game;
