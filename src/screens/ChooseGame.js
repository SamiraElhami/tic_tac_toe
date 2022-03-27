import React, {useState, useEffect} from "react";
import {StyleSheet, Text, View, TouchableOpacity} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {Entypo} from "@expo/vector-icons";

function ChooseGame({navigation}) {
  const [backgroundCross, setBackgroundCross] = useState("yellow");
  const [backgroundCircle, setBackgroundCircle] = useState("lightgrey");
  React.useEffect(() => {
    _getData();
    const unsubscribe = navigation.addListener("tabPress", e => {
      _getData();
    });

    return unsubscribe;
  }, [navigation]);

  const _storeData = async player => {
    try {
      await AsyncStorage.setItem("@current_play", player);
    } catch (error) {
      console.log("Error store Data");
    }
  };

  const _getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@current_play");
      if (value !== null) {
        if (value == "cross") {
          setBackgroundCross("yellow");
          setBackgroundCircle("lightgrey");
        } else {
          setBackgroundCross("lightgrey");
          setBackgroundCircle("yellow");
        }
      }
    } catch (e) {
      console.log("error loading data");
    }
  };

  const chooseItemCircle = () => {
    setBackgroundCross("lightgrey");
    setBackgroundCircle("yellow");
    _storeData("circle");
  };

  const chooseItemCross = () => {
    setBackgroundCross("yellow");
    setBackgroundCircle("lightgrey");
    _storeData("cross");
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: "orange",
          fontSize: 40
        }}
      >
        Choose your play
      </Text>

      <View
        style={{
          flexDirection: "row",
          borderRadius: 10,
          height: 110,
          margin: 40
        }}
      >
        <TouchableOpacity
          style={[
            {
              width: 80,
              height: 80,
              margin: 25,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10
            },
            {backgroundColor: backgroundCross}
          ]}
          onPress={() => chooseItemCross()}
        >
          <Entypo name="cross" size={32} color="#FF3031" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            {
              width: 80,
              height: 80,
              margin: 25,
              borderRadius: 10,
              backgroundColor: "lightgrey",
              alignItems: "center",
              justifyContent: "center"
            },
            {backgroundColor: backgroundCircle}
          ]}
          onPress={() => chooseItemCircle()}
        >
          <Entypo name="circle" size={32} color="#45CE30" />
        </TouchableOpacity>
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

export default ChooseGame;
