import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import RNPickerSelect from "react-native-picker-select";
import { Dimensions } from "react-native";
import {
  fgColor,
  bgColor,
  containerColor,
  textFieldColor,
  placeholderColor,
  btnColor,
  btnIconColor,
} from "../components/Colors";
import { apiLink } from "../components/ApiConfig";
import { useFocusEffect } from "@react-navigation/native";

const CreateNewWorkflowPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [users, setUsers] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      fetch(`${apiLink}api/ListUsers?uid=0`)
        .then((response) => response.json())
        .then((data) => {
          const emails = data.map((user) => user.email);
          return emails;
        })
        .then((emails) => {
          console.log(emails); // This will log the array of emails to the console
          setUsers(emails);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      return () => {
        setUsers([]);
        setShowForm(false);
        setTitle("");
        setDescription("");
        setSelectedUser("");
      };
    }, [])
  );

  const handleCreate = () => {
    // Handle the creation of the new workflow here
    //WOwner skal vi få fra login
    //WUser skal vi få fra dropdown
    //Wfid skal være 0 hvis det er en ny,
    const apiUrl =
      `${apiLink}api/SaveWorkflow?wfid=0&title=${encodeURIComponent(
        title
      )}&desc=${encodeURIComponent(description)}&wOwner=1&wUser=` +
      selectedUser;

    console.log(apiUrl);

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // This will log the response to the console
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <View style={styles.pageContainer}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => setShowForm(!showForm)}
      >
        <Icon name="add-circle-outline" size={30} color={btnIconColor} />
      </TouchableOpacity>
      {showForm && (
        <View style={styles.formContainer}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => setTitle(text)}
            value={title}
            placeholder="Title"
            placeholderTextColor={placeholderColor}
          />
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.textfield}
            onChangeText={(text) => setDescription(text)}
            value={description}
            placeholder="Description"
            placeholderTextColor={placeholderColor}
            multiline={true}
          />
          <Text style={styles.label}>Assign User</Text>
          <TextInput
            style={styles.textfield}
            onChangeText={(text) => setSelectedUser(text)}
            value={users}
            placeholder="email"
            placeholderTextColor={placeholderColor}
            keyboardType="email-address"
            multiline={false}
          />
          <Button title="Create" onPress={handleCreate} color="#007BFF" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: bgColor,
  },
  btn: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    position: "absolute",
    bottom: 20,
    backgroundColor: btnColor,
  },
  formContainer: {
    width: Dimensions.get("window").width * 0.9,
    padding: 10,
    borderRadius: 10,
    backgroundColor: containerColor,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: fgColor,
  },
  textInput: {
    height: 40,
    borderColor: "transparent",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    padding: 5,
    color: fgColor,
    backgroundColor: textFieldColor,
  },
  textfield: {
    minHeight: 40,
    borderColor: "transparent",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    padding: 5,
    color: fgColor,
    backgroundColor: textFieldColor,
  },
  dropdown: {
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    padding: 5,
    color: fgColor,
    backgroundColor: textFieldColor,
  },
});

export default CreateNewWorkflowPage;
