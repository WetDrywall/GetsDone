import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import { Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import {
  fgColor,
  bgColor,
  btnColor,
  btnIconColor,
  containerColor,
  textFieldColor,
  placeholderColor,
} from "../components/Colors";
import { apiLink } from "../components/ApiConfig";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import CheckBox from "expo-checkbox";

const AssignmentList = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [checkboxStates, setCheckboxStates] = useState([]);

  const url = `${apiLink}api/ListWorkflow?wfid=1&uid=1`;
  const url2 = `${apiLink}api/ListWorkflowAssignment?wfid=1&aid>0`;

  useEffect(() => {
    fetch(url)
      .then((resp) => resp.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetch(url2)
      .then((resp) => resp.json())
      .then((json) => setData2(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));

    setCheckboxStates(new Array(data2.length).fill(false));
  }, []);

  const handleCreate = () => {
    const apiUrl = `${apiLink}api/SaveWorkflowAssignment?wfid=1&title=${encodeURIComponent(
      title
    )}&desc=${encodeURIComponent(
      description
    )}&wOwner=1&assignmentNumber=0&completed=false`;

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

  const handleChange = (index) => {
    setCheckboxStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  return (
    <View style={styles.pageContainer}>
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("My Workflows")}>
          <Feather name="corner-down-left" size={30} color={btnColor} />
        </TouchableOpacity>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <>
            {data.map((post) => {
              return (
                <View style={styles.hiddenWorkflowBox}>
                  <Text style={styles.title}>{post.title}</Text>
                  <Text style={styles.description}>{post.description}</Text>
                  <Text style={styles.date}>Deadline: {post.deadline}</Text>
                </View>
              );
            })}
            <View style={styles.itemContainer2}>
              <ScrollView>
                {data2.map((post, index) => {
                  return (
                    <View style={styles.assignmentBox}>
                      <CheckBox
                        value={checkboxStates[index]}
                        onValueChange={() => handleChange(index)}
                      />
                      <Text style={styles.title}>{post.aTitle}</Text>
                      <Text style={styles.description}>
                        {post.aDescription}
                      </Text>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </>
        )}
        <View>
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
              <Button title="Create" onPress={handleCreate} color="#007BFF" />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: bgColor,
  },
  itemContainer: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: containerColor,
  },
  itemContainer2: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: bgColor,
    marginTop: 10,
  },
  hiddenWorkflowBox: {
    margin: 5,
  },
  assignmentBox: {
    backgroundColor: containerColor,
    borderRadius: 10,
    padding: 10,
    margin: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  assignedUser: {
    fontSize: 16,
    color: fgColor,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: fgColor,
  },
  description: {
    fontSize: 16,
    color: fgColor,
  },
  date: {
    fontSize: 16,
    fontWeight: "bold",
    color: fgColor,
  },
  btn: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
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
});

export default AssignmentList;
