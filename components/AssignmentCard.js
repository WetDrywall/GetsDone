import { useFocusEffect } from "@react-navigation/native";
import CheckBox from "expo-checkbox";
import { apiLink } from "../components/ApiConfig";
import { fgColor, containerColor } from "./Colors";
import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";

const AssignmentCard = ({ route }) => {
  const wfId = route.params.wfId;
  const aId = route.params.aId;
  const [assignments, setAssignment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkboxStates, setCheckboxStates] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const url = `${apiLink}api/ListWorkflowAssignment?wfid=${wfId}&aid=${aId}`;

      fetch(url)
        .then((resp) => resp.json())
        .then((data) => setAssignment(data))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));

      setCheckboxStates(new Array(assignments.length).fill(false));

      return () => {
        setAssignment([]);
        setLoading(true);
        setCheckboxStates([]);
      };
    }, [wfId, aId])
  );

  const handleChange = (index) => {
    setCheckboxStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });

    const apiUrl = `${apiLink}api/SaveWorkflowAssignment?wfid=${wfId}&assignmentNumber=${aId}&completed=true`;

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
    <View>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        assignments.map((post, index) => {
          return (
            <View style={styles.assignmentBox} key={index}>
              <CheckBox
                style={styles.checkbox}
                value={checkboxStates[index]}
                onValueChange={() => handleChange(index)}
              />
              <Text style={styles.title}>{post.aTitle}</Text>
              <Text style={styles.description}>{post.aDescription}</Text>
              <Text style={styles.date}>Deadline: {post.deadline}</Text>
            </View>
          );
        })
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
  checkbox: {
    alignSelf: "flex-end",
  },
});

export default AssignmentCard;
