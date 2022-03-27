import React from "react";
import {Modal, View, Text, TouchableOpacity} from "react-native";

const WelcomeDialogComponent = ({
  visibility,
  displayMsg,
  dismissAlert
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
          height: 500,
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
            fontSize: 40,
            position: "absolute",
            top: 0,
            marginTop: 30
          }}
        >
          {displayMsg}
        </Text>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => dismissAlert()}
          style={{
            width: "43%",
            height: "32%",
            borderRadius: 0,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "limegreen",
            borderColor: "#ddd",
            borderBottomWidth: 0,
            borderRadius: 100
          }}
        >
          <Text style={{color: "white", margin: 15, fontSize: 20}}>
            Start
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export default WelcomeDialogComponent;
