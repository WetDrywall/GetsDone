import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import {
  fgColor,
  bgColor,
  btnColor,
  containerColor,
} from "../components/Colors";

const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);

const url = `${apiLink}/api/ListWorkflow?wfid=1&uid=1`;

useEffect(() => {
  fetch(url)
    .then((resp) => resp.json())
    .then((json) => setData(json))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
}, []);

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

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("My Workflows")}>
        <Feather name="corner-up-left" size={30} color={btnColor} />
      </TouchableOpacity>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        data.map((post) => {
          return (
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
        })
      )}
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: bgColor,
  },
  topBox: {
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: fgColor,
  },
  description: {
    fontSize: 16,
    color: fgColor,
  },
  assignedUser: {
    fontSize: 16,
    color: fgColor,
  },
  deadline: {
    fontSize: 16,
    fontWeight: "bold",
    color: fgColor,
  },
});

export default AssignmentList;
