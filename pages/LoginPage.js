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
import "core-js/stable/atob";
import { jwtDecode } from "jwt-decode";

const LoginPage = ({ navigation, handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = () => {
    navigation.navigate("Signup");
  };

  const login = () => {
    // Handle the login logic here
    const apiUrl = `${apiLink}api/UserLogin?email=${encodeURIComponent(
      email
    )}&password=${encodeURIComponent(password)}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const decoded = jwtDecode(data);

        var uid =
          decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];

        if (uid != null && uid > 0) {
          console.log("smidt i asyncstorage");
          // AsyncStorage.setItem("UId", uid);
          AsyncStorage.setItem("Token", data)
            .then(() => {
              AsyncStorage.getItem("Token")
                .then((value) => {
                  console.log(value);
                })
                .catch((error) => {
                  console.error(error);
                });
            })
            .catch((error) => {
              console.error(error);
            });

          // AsyncStorage.setItem("Token", data);
          // console.log(data);
          // console.log(AsyncStorage.getItem("Token"));
          handleLogin(data);
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
    <View style={styles.pageContainer}>
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
      <Button title="Login" style={styles.btn} onPress={login} />
      <Button title="Signup" style={styles.btn} onPress={signup} />
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
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
  btn: {
    margin: 5,
  },
});

export default LoginPage;
