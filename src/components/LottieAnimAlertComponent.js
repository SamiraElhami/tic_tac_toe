import React from "react";
import {Modal, View, Text, TouchableOpacity} from "react-native";
import LottieView from "lottie-react-native";

const LottieAnimAlertComponent = ({
  displayMode,
  displayMsg,
  visibility,
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
         backgroundColor: 'rgba(52, 52, 52, 0.8)',
         alignItems: 'center',
         justifyContent: 'center',
       }}>
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'darksalmon',
        height: 400,
        width: '90%',
        borderWidth: 1,
        borderColor: 'tomato',
        borderRadius: 7,
        elevation: 10,
      }}>
      <Text
        style={{
          color: "greenyellow",
          fontSize: 45,
          position: "absolute",
          top: 0,
          marginTop: 30
        }}
      >
        {displayMsg}
      </Text>
      {displayMode == "winner" ? (
        <LottieView
          style={{flex: 5}}
          source={require("../images/winner.json")}
          autoPlay
          loop
        />
      ) : (
        <LottieView
          style={{flex: 5}}
          source={require("../images/lost.json")}
          autoPlay
          loop
        />
      )}
      <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => dismissAlert()}
              style={{
                width: '95%',
                borderRadius: 0,
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                backgroundColor: 'tomato',
                borderColor: '#ddd',
                borderBottomWidth: 0,
                borderRadius: 5,
                bottom: 0,
                marginBottom: 10,
              }}>
              <Text style={{color: 'white', margin: 15, fontSize:20}}>Replay</Text>
            </TouchableOpacity>
    </View>
    </View>
  </Modal>
);

export default LottieAnimAlertComponent;
