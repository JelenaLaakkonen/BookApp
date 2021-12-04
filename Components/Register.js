import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useRef, useEffect } from "react";
import { Text, View, Button, TextInput, Alert, TouchableOpacity, StyleSheet } from "react-native";
import styles from "./Styles.js";

 export default function Register({ navigation }) {
  const [newuser, setNewUser] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const createNewUser = () => {
    console.log("add user");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Please type in your credentials</Text>
      <View style={styles2.inputView}>
      <TextInput
        value={newuser}
        placeholder="email"
        onChangeText={(email) => setEmail(email)}
        style={styles2.registerInput}
      />
      </View>
      <View style={styles2.inputView}>
      <TextInput
        value={password}
        placeholder="password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
        style={styles2.registerInput}
      />
      </View>
      <TouchableOpacity onPress={createNewUser} style={styles2.loginBtn}>
        <Text>Create user</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles2 = StyleSheet.create({
    loginBtn: {
      width: "30%",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20,
      marginBottom: 20,
      backgroundColor: "rgb(116, 144, 147)",
    },
    inputView: {
      backgroundColor: "#fff",
      borderRadius: 30,
      width: "70%",
      height: 45,
      marginBottom: 10,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: 'black',
    },
    registerInput: {
      height: 50,
      flex: 1,
      padding: 10,
    }
  });