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

const SignupPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");

  const signUp = () => {
    const fetchData = async () => {

      const apiUrl = `${apiLink}api/SaveUser?jwtToken=new&name=${encodeURIComponent(name)}&email=${encodeURIComponent(
        email)}&password=${encodeURIComponent(password)}`;
    
      console.log(apiUrl);
      fetch(apiUrl)
        .then((resp) => resp.json())
        .then(navigation.navigate("Login"))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    };
    console.log(password + " " + password2);
    if(password == password2){
      fetchData();
    }
  };

  return (
    <View style={styles.pageContainer}>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setName(text)}
        value={name}
        placeholder="Name"
        placeholderTextColor={placeholderColor}
        autoCapitalize="none"
      />
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
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPassword2(text)}
        value={password2}
        placeholder="Repeat password"
        placeholderTextColor={placeholderColor}
        secureTextEntry
      />
      <Button title="Sign up" onPress={signUp} />
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
});

export default SignupPage;