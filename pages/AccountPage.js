import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { bgColor, fgColor, placeholderColor, textFieldColor} from "../components/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiLink } from "../components/ApiConfig";
import "core-js/stable/atob";

const AccountPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const saveChanges = () => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem("Token");
      const apiUrl = `${apiLink}api/SaveUser?jwtToken=${token}&name=${encodeURIComponent(name)}&email=${encodeURIComponent(
        email)}&password=${encodeURIComponent(password)}`;
      fetch(apiUrl)
        .then((resp) => resp.json())
        .then(navigation.navigate("My Workflows"))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    };

    if(password == password2){
      fetchData();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem("Token");
      const url = `${apiLink}api/ListUsers?jwtToken=${token}`;
   
      console.log(url);
   
      fetch(url)
        .then((resp) => resp.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    };
   
    fetchData();
   }, []);

  return (
    <View style={styles.pageContainer}>
        {loading ? (
        <Text>Loading...</Text>
      ) : (
        data.map((post) => {
          return (
            <View>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => setName(text)}
                  value={name.length > 0 ? name : post.name}
                  placeholderTextColor={placeholderColor}
                  autoCapitalize="none"
                />
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => setEmail(text)}
                  value={email.length > 0 ? email : post.email}
                  placeholderTextColor={placeholderColor}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                  placeholder="New password"
                  placeholderTextColor={placeholderColor}
                  secureTextEntry
                />
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => setPassword2(text)}
                  value={password2}
                  placeholder="Repeat new Password"
                  placeholderTextColor={placeholderColor}
                  secureTextEntry
                />
                <Button title="Save changes" onPress={saveChanges} />
            </View>
          );
        })
      )}
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
  }
});

export default AccountPage;