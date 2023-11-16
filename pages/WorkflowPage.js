import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const AssignmentList = ({ navigation, route }) => {
  const { title, description, deadline } = route.params;

  const activeAssignments = [
    // Add active assignments here
  ];

  const inactiveAssignments = [
    // Add inactive out assignments here
  ];

  const finishedAssignments = [
    // Add finished assignments here
  ];

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.assignedUser}>
        Assigned User: {item.assignedUser}
      </Text>
      <Text style={styles.deadline}>Deadline: {item.deadline}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("My Workflows")}>
        <Feather name="corner-up-left" size={30} color="black" />
      </TouchableOpacity>
      <View style={styles.topBox}>
        <Text style={styles.title}>Title</Text>
      </View>
      <View style={styles.bottomBox}>
        <FlatList
          data={activeAssignments}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <FlatList
          data={inactiveAssignments}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <FlatList
          data={finishedAssignments}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  topBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    margin: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  bottomBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    margin: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
  },
  assignedUser: {
    fontSize: 16,
    color: "grey",
  },
  deadline: {
    fontSize: 16,
    fontWeight: "bold",
    color: "grey",
  },
  item: {
    marginBottom: 10,
  },
});

export default AssignmentList;
