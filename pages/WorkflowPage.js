import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import { Dimensions } from "react-native";
import React, { useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import AssignmentCard from "../components/AssignmentCard";
import DateTimePicker from '@react-native-community/datetimepicker';

const AssignmentList = ({ navigation, route }) => {
  const wfId = route.params.wfId;
  const [data, setData] = useState([]);
  const [assignments, setAssignment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const token = await AsyncStorage.getItem("Token");
        const url = `${apiLink}api/ListWorkflow?wfid=${wfId}&jwtToken=${token}`;

        fetch(url)
          .then((resp) => resp.json())
          .then((json) => setData(json))
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));
      };

      fetchData();

      const url2 = `${apiLink}api/ListWorkflowAssignment?wfid=${wfId}&aid=0`;

      fetch(url2)
        .then((resp) => resp.json())
        .then((data) => setAssignment(data))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));

      return () => {
        setData([]);
        setAssignment([]);
        setLoading(true);
        setShowForm(false);
        setTitle("");
        setDescription("");
      };
    }, [wfId])
  );

  const handleCreate = () => {
    const apiUrl = `${apiLink}api/SaveWorkflowAssignment?wfid=${wfId}&aid=0&title=${encodeURIComponent(
      title
    )}&desc=${encodeURIComponent(
      description
    )}&wOwner=1&assignmentNumber=0&completed=false&deadline=${selectedDate.toISOString()}`;

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
                {assignments.map((post, index) => (
                  <AssignmentCard
                    key={index}
                    navigation={navigation}
                    route={{
                      params: {
                        wfId: post.wfId,
                        aId: post.aId,
                        completed: post.completed,
                      },
                    }}
                  />
                ))}
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
              {showDatePicker && (
                <DateTimePicker
                  value={selectedDate}
                  onChange={(event, date) => {
                    if (date) {
                      setSelectedDate(date);
                      setShowDatePicker(false);
                    }
                  }}
                />
              )}
              <Button title="Show Date Picker" onPress={() => setShowDatePicker(true)} />
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
    marginTop: 10,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: btnColor,
    alignSelf: "center",
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
