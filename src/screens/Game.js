import React, {useRef, useEffect, useState} from "react";
import {AppState, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";
import {MaterialIcons, Entypo} from "@expo/vector-icons";

import LottieAnimAlertComponent from "../components/LottieAnimAlertComponent";
import CustomizeAlertComponent from "../components/CustomizeAlertComponent";
import WelcomeDialogComponent from "../components/WelcomeDialogComponent";

var board = ["", "", "", "", "", "", "", "", ""];

function Game({navigation}) {
  const [isCross, setIsCross] = useState();
  const [userGame, setUserGame] = useState("");
  const [cpuGame, setCpuGame] = useState("");
  const [playerText, setPlayerText] = useState("It's your turn!");
  const [isDisplayWinner, setIsDisplayWinner] = useState(false);
  const [winnerMessage, setWinnerMessage] = useState("");
  const [displayWinner, setDisplayWinner] = useState("");
  const [displayResetDialog, setDisplayResetDialog] = useState(false);
  const [displayDialogMsg, setDisplayDialogMsg] = useState("");
  const [displayWelcomeDialog, setDisplayWelcomeDialog] = useState(false);
  const [displayWelcomeMsg, setDisplayWelcomeMsg] = useState(
    "Welcome to \nTic tac toe"
  );

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  React.useEffect(() => {
    initData();
    const unsubscribe = navigation.addListener("tabPress", e => {
      initData();
    });
    const subscription = AppState.addEventListener("change", nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        _getBoard();
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      if (appState.current == "active") {
        _getBoard();
      }
      if (appState.current == "background") {
        _saveBoard();
      }
    });

    return () => {
      subscription.remove();
      unsubscribe;
    };
  }, [navigation]);

  const countEmpty = () => {
    const countTypes = board.filter(item => item === "");
    return countTypes.length;
  };

  const _storeData = async (variable, player) => {
    try {
      await AsyncStorage.setItem(variable, player);
    } catch (error) {
      console.log("Error store Data");
    }
  };

  const _saveBoard = async () => {
    try {
      const boardStr = JSON.stringify(board);
      await AsyncStorage.setItem("@board", boardStr);
    } catch (error) {
      console.log(error);
    }
  };

  const _getBoard = async () => {
    try {
      await AsyncStorage.getItem("@board")
        .then(req => JSON.parse(req))
        .then(json => { 
          if (json !== null) {
            if (JSON.stringify(board) != JSON.stringify(json)) {
              board = json;
              setDisplayResetDialog(true);
              setDisplayWelcomeDialog(false);
              setDisplayDialogMsg(
                "Welcome Back.\nYou have an open session. Do you want to continue?"
              );
            } else if (countEmpty() == 9) {
              setDisplayWelcomeDialog(true);
            }
          } else {
            setDisplayWelcomeDialog(true);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const saveScore = async variable => {
    try {
      const value = await AsyncStorage.getItem(variable);
      if (value !== null) {
        var n = Number(value) + 1;
        _storeData(variable, n.toString());
      } else {
        _storeData(variable, "1");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const initData = async () => {
    const value = await AsyncStorage.getItem("@current_play");
    if (value !== null) {
      if (value != userGame) {
        resetGame();
        if (value == "cross") {
          setIsCross(true);
          setUserGame("cross");
          setCpuGame("circle");
        } else {
          setIsCross(false);
          setUserGame("circle");
          setCpuGame("cross");
        }
      }
    } else {
      setIsCross(true);
      setUserGame("cross");
      setCpuGame("circle");
    }
  };

  const drawItem = number => {
    if (board[number] == "" && winGame() == "") {
      board[number] = userGame;
      setPlayerText("It's CPU turn!");
      setTimeout(() => {
        if (countEmpty() > 1) {
          while (true) {
            var RandomNumber = Math.floor(Math.random() * 8) + 1;
            if (board[RandomNumber] == "") {
              board[RandomNumber] = cpuGame;
              break;
            }
          }
        }
        setIsCross(!isCross);
        setPlayerText("It's your turn!");
        if (winGame() == userGame) {
          setIsDisplayWinner(true);
          setWinnerMessage("You Won!");
          setDisplayWinner("winner");
          setDisplayResetDialog(false);
          setDisplayDialogMsg("");
          saveScore("@win");
        } else if (winGame() == cpuGame) {
          setIsDisplayWinner(true);
          setWinnerMessage("You Lost!");
          setDisplayWinner("Loser");
          setDisplayResetDialog(false);
          setDisplayDialogMsg("");
          saveScore("@lose");
        } else if (countEmpty() <= 1) {
          setIsDisplayWinner(true);
          setWinnerMessage("Draw!");
          setDisplayWinner("Loser");
          setDisplayResetDialog(false);
          setDisplayDialogMsg("");
          saveScore("@draw");
        }
      }, 500);
    }
  };

  const resetGame = () => {
    setIsCross(true);
    setIsDisplayWinner(false);
    setPlayerText("It's your turn!");
    setWinnerMessage("");
    setDisplayWinner("");
    setDisplayResetDialog(false);
    setDisplayDialogMsg("");
    setDisplayWelcomeDialog(false);
    board = ["", "", "", "", "", "", "", "", ""];
  };

  const continueGame = () => {
    setDisplayResetDialog(false);
    setDisplayDialogMsg("");
    setDisplayWelcomeDialog(false);
  };

  const chooseItemColor = number => {
    if (board[number] == "cross") return "#FF3031";
    else if (board[number] == "circle") return "#45CE30";

    return "#74B9FF";
  };

  const winGame = () => {
    if (board[0] != "" && board[0] == board[1] && board[1] == board[2]) {
      return board[0];
    } else if (board[3] != "" && board[3] == board[4] && board[4] == board[5]) {
      return board[3];
    } else if (board[6] != "" && board[6] == board[7] && board[7] == board[8]) {
      return board[6];
    } else if (board[0] != "" && board[0] == board[3] && board[3] == board[6]) {
      return board[0];
    } else if (board[1] != "" && board[1] == board[4] && board[4] == board[7]) {
      return board[1];
    } else if (board[2] != "" && board[2] == board[5] && board[5] == board[8]) {
      return board[2];
    } else if (board[0] != "" && board[0] == board[4] && board[4] == board[8]) {
      return board[0];
    } else if (board[2] != "" && board[2] == board[4] && board[4] == board[6]) {
      return board[2];
    } else {
      return "";
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          height: 110,
          alignContent: "space-between",
          justifyContent: "flex-end",
          marginTop: 40
        }}
      >
        <Text
          style={{
            color: "#01CBC6",
            fontSize: 40,
            position: "absolute",
            left: 0,
            marginLeft: 30
          }}
        >
          Tic Tac Toe
        </Text>
        <TouchableOpacity
          style={{
            alignItems: "center",
            marginLeft: 10,
            marginRight: 30,
            flexDirection: "row",
            justifyContent: "center",
            backgroundColor: "black",
            width: 60,
            height: 60,
            borderRadius: 20
          }}
          onPress={() => {
            setDisplayDialogMsg("");
            setDisplayResetDialog(true);
          }}
        >
          <Entypo name="controller-paus" size={30} color="lightgrey" />
        </TouchableOpacity>
      </View>
      <View style={{alignItems: "center"}}>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "yellow",
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            height: 110,
            marginTop: 40
          }}
        >
          <TouchableOpacity
            style={{
              width: 80,
              height: 80,
              margin: 25,
              marginBottom: 5,
              marginRight: 5,
              backgroundColor: "lightgrey",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5
            }}
            onPress={() => drawItem(0)}
          >
            <Entypo name={board[0]} size={32} color={chooseItemColor(0)} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: 80,
              height: 80,
              margin: 25,
              marginRight: 5,
              marginBottom: 5,
              marginLeft: 5,
              backgroundColor: "lightgrey",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5
            }}
            onPress={() => drawItem(1)}
          >
            <Entypo name={board[1]} size={32} color={chooseItemColor(1)} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: 80,
              height: 80,
              margin: 25,
              marginLeft: 5,
              marginBottom: 5,
              backgroundColor: "lightgrey",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5
            }}
            onPress={() => drawItem(2)}
          >
            <Entypo name={board[2]} size={32} color={chooseItemColor(2)} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            backgroundColor: "yellow"
          }}
        >
          <TouchableOpacity
            style={{
              width: 80,
              height: 80,
              margin: 25,
              marginRight: 5,
              backgroundColor: "lightgrey",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5
            }}
            onPress={() => drawItem(3)}
          >
            <Entypo name={board[3]} size={32} color={chooseItemColor(3)} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: 80,
              height: 80,
              margin: 25,
              marginRight: 5,
              marginLeft: 5,
              backgroundColor: "lightgrey",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5
            }}
            onPress={() => drawItem(4)}
          >
            <Entypo name={board[4]} size={32} color={chooseItemColor(4)} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: 80,
              height: 80,
              margin: 25,
              marginLeft: 5,
              backgroundColor: "lightgrey",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5
            }}
            onPress={() => drawItem(5)}
          >
            <Entypo name={board[5]} size={32} color={chooseItemColor(5)} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            backgroundColor: "yellow",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10
          }}
        >
          <TouchableOpacity
            style={{
              width: 80,
              height: 80,
              margin: 25,
              marginTop: 5,
              marginRight: 5,
              backgroundColor: "lightgrey",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5
            }}
            onPress={() => drawItem(6)}
          >
            <Entypo name={board[6]} size={32} color={chooseItemColor(6)} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: 80,
              height: 80,
              margin: 25,
              marginTop: 5,
              marginRight: 5,
              marginLeft: 5,
              backgroundColor: "lightgrey",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5
            }}
            onPress={() => drawItem(7)}
          >
            <Entypo name={board[7]} size={32} color={chooseItemColor(7)} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: 80,
              height: 80,
              margin: 25,
              marginTop: 5,
              marginLeft: 5,
              backgroundColor: "lightgrey",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5
            }}
            onPress={() => drawItem(8)}
          >
            <Entypo name={board[8]} size={32} color={chooseItemColor(8)} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{alignItems: "center"}}>
        <Text
          style={{
            color: "orange",
            fontSize: 30,
            marginTop: 30
          }}
        >
          {playerText}
        </Text>
      </View>
      <View style={{alignItems: "center"}}>
        <LottieAnimAlertComponent
          visibility={isDisplayWinner}
          displayMode={displayWinner}
          displayMsg={winnerMessage}
          dismissAlert={resetGame}
        />
        <CustomizeAlertComponent
          visibility={displayResetDialog}
          displayMsg={displayDialogMsg}
          dismissAlert={continueGame}
          dismissReplay={resetGame}
        />
        <WelcomeDialogComponent
          visibility={displayWelcomeDialog}
          displayMsg={displayWelcomeMsg}
          dismissAlert={continueGame}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "beige"
  }
});

export default Game;
