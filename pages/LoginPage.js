import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import {
  bgColor,
  fgColor,
  placeholderColor,
  textFieldColor,
} from "../components/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiLink } from "../components/ApiConfig";

const LoginPage = ({ navigation, handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    // Handle the login logic here
    const apiUrl = `${apiLink}api/UserLogin?email=${encodeURIComponent(
      email
    )}&password=${encodeURIComponent(password)}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // This will log the response to the console
        if (data[0].uId != null && data[0].uId > 0) {
          console.log("smidt i asyncstorage");
          AsyncStorage.setItem("UId", JSON.stringify(data[0].uId));
          handleLogin(data[0].uId);
          navigation.navigate("My Workflows");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  //  Hent UId fra AsyncStorage
  //  AsyncStorage.getItem('UId').then((value) => {
  //   const UId = JSON.parse(value);
  //   console.log(UId);
  // });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="Email"
        placeholderTextColor={placeholderColor}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        value={password}
        placeholder="Password"
        placeholderTextColor={placeholderColor}
        secureTextEntry
      />
      <Button title="Login" onPress={login} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: bgColor,
  },
  input: {
    height: 40,
    borderColor: "transparent",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    color: fgColor,
    backgroundColor: textFieldColor,
  },
});

export default LoginPage;
