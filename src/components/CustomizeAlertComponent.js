import React from "react";
import {Modal, View, Text, TouchableOpacity} from "react-native";

const CustomizeAlertComponent = ({
  visibility,
  displayMsg,
  dismissAlert,
  dismissReplay
}) => (
  <Modal
    onRequestClose={() => null}
    animationType="fade"
    transparent={true}
    visible={visibility}
  >
    <View
      style={{
        flex: 1,
        backgroundColor: "rgba(52, 52, 52, 0.8)",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "darksalmon",
          height: 250,
          width: "90%",
          borderWidth: 1,
          borderColor: "tomato",
          borderRadius: 7,
          elevation: 10
        }}
      >
        <Text
          style={{
            color: "greenyellow",
            fontSize: 20,
            position: "absolute",
            top: 0,
            marginTop: 20
          }}
        >
          {displayMsg}
        </Text>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => dismissAlert()}
          style={{
            width: "40%",
            height: "40%",
            borderRadius: 0,
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            backgroundColor: "limegreen",
            borderColor: "#ddd",
            borderBottomWidth: 0,
            borderRadius: 30,
            left: 0,
            bottom: 0,
            margin: 10
          }}
        >
          <Text style={{color: "white", margin: 15, fontSize: 20}}>
            continue
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => dismissReplay()}
          style={{
            width: "40%",
            height: "40%",
            borderRadius: 0,
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            backgroundColor: "tomato",
            borderColor: "#ddd",
            borderBottomWidth: 0,
            borderRadius: 30,
            right: 0,
            bottom: 0,
            margin: 10,

          }}
        >
          <Text style={{color: "white", margin: 15, fontSize: 20}}>Replay</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export default CustomizeAlertComponent;
