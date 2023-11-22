import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  FlatList,
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

const AssignmentList = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [users, setUsers] = useState([]);

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
  }, []);

  const handleCreate = () => {};

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
                <View style={styles.topBox}>
                  <Text style={styles.title}>{post.title}</Text>
                  <Text style={styles.description}>{post.description}</Text>
                  <Text style={styles.date}>Deadline: {post.deadline}</Text>
                </View>
              );
            })}
            <View style={styles.itemContainer2}>
              <ScrollView>
                {data2.map((post) => {
                  return (
                    <View style={styles.bottomBox}>
                      <Text style={styles.title}>{post.aTitle}</Text>
                      <Text style={styles.description}>
                        {post.aDescription}
                      </Text>
                      {/* <FlatList
                      data={post.atitle}
                      renderItem={({ item }) => <Text>{item.atitle}</Text>}
                      keyExtractor={(item) => item.aid}
                    />
                    <FlatList
                      data={completedAssignments}
                      renderItem={renderItem}
                      keyExtractor={(item) => item.id}
                    /> */}
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
              <Text style={styles.label}>Assigned User</Text>
              <TextInput
                style={styles.textfield}
                onChangeText={(text) => setDescription(text)}
                value={description}
                placeholder="Description"
                placeholderTextColor={placeholderColor}
                multiline={false}
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
  topBox: {
    margin: 5,
  },
  bottomBox: {
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
