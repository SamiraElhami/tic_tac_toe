import React, {useState, useEffect} from "react";
import {StyleSheet, Text, View, TouchableOpacity} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";

function Score({navigation}) {
  const [winsNum, setWinNum] = useState("0");
  const [loseNum, setLoseNum] = useState("0");
  const [drawNum, setDrawNum] = useState("0");
  React.useEffect(() => {
    _getData();
    const unsubscribe = navigation.addListener("tabPress", e => {
      _getData();
    });

    return unsubscribe;
  }, [navigation]);

  const _getData = async () => {
    try {
      const winValue = await AsyncStorage.getItem("@win");
      const loseValue = await AsyncStorage.getItem("@lose");
      const drawValue = await AsyncStorage.getItem("@draw");
      if (winValue !== null) {
        setWinNum(winValue);
      }
      if (loseValue !== null) {
        setLoseNum(loseValue);
      }
      if (drawValue !== null) {
        setDrawNum(drawValue);
      }
    } catch (e) {
      console.log("error loading data");
    }
  };

  return (
    <View style={styles.container}>
      <LottieView
        style={{flex: 5, height: "50%", width: "50%"}}
        source={require("../images/scoreboard.json")}
        autoPlay
        loop
      />
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          backgroundColor: "limegreen",
          alignContent: "center",
          justifyContent: "space-evenly",
          borderRadius: 10,
          marginBottom: 10
        }}
      >
        <Text
          style={{
            margin: 25,
            marginRight: 60,
            alignItems: "center",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 20,
            borderRadius: 5
          }}
        >
          Wins:
        </Text>

        <Text
          style={{
            margin: 25,

            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            borderRadius: 5
          }}
        >
          {winsNum}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          backgroundColor: "tomato",
          borderRadius: 10,
          margin: 10
        }}
      >
        <Text
          style={{
            margin: 25,
            marginRight: 60,
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            borderRadius: 5
          }}
        >
          Lose:
        </Text>

        <Text
          style={{
            margin: 25,
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            borderRadius: 5
          }}
        >
          {loseNum}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "yellow",
          marginBottom: 100,
          borderRadius: 10,
          margin: 10
        }}
      >
        <Text
          style={{
            margin: 25,
            marginRight: 60,
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            borderRadius: 5
          }}
        >
          Draw:
        </Text>

        <Text
          style={{
            margin: 25,

            fontSize: 20,

            alignItems: "center",
            justifyContent: "center",
            borderRadius: 5
          }}
        >
          {drawNum}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "beige",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center"
  }
});

export default Score;
