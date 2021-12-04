import React, { useState } from "react";
import { Text, View, TextInput, Alert, TouchableOpacity, StyleSheet, Image } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebaseConfig';

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();

export default function Register({ navigation }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  //await firebase.auth().signInWithEmailAndPassword(email, password)
  const createNewUser = async () => {
    try {
      if (email !== '' && password !== '') {
        let response = await createUserWithEmailAndPassword(auth, email, password);
        if (response) {
          Alert.alert('User Created Succesfully');
          navigation.goBack()
        } else {
          Alert.alert('Credentials Cannot Be Empty');
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles2.container}>
      <Image
        style={styles2.loginImage}
        source={require('../assets/logo.png')}
      />
      <Text style={styles2.title}>Please type in your credentials</Text>
      <View style={styles2.inputView}>
        <TextInput
          style={styles2.textInput}
          value={email}
          placeholder="email"
          onChangeText={(email) => setEmail(email)}
          style={styles2.registerInput}
        />
      </View>
      <View style={styles2.inputView}>
        <TextInput
          style={styles2.textInput}
          value={password}
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          style={styles2.registerInput}
        />
      </View>
      <TouchableOpacity onPress={createNewUser} style={styles2.registerBtn}>
        <Text>Create user</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: 'serif',
    fontSize: 20,
    marginBottom: 30,
  },
  registerBtn: {
    width: "40%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "rgb(116, 144, 147)",
  },
  inputView: {
    backgroundColor: "#fff",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: 'black',
  },
  textInput: {
    height: 50,
    flex: 1,
    padding: 10,
    textAlign: 'center'
  },
  loginImage: {
    width: "55%",
    height: "35%",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -20,
    marginBottom: 5,
    backgroundColor: "transparent",
  },
  registerInput: {
    height: 50,
    flex: 1,
    padding: 10,
  }
});