import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import {
  fgColor,
  bgColor,
  btnColor,
  containerColor,
} from "../components/Colors";
import { apiLink } from "../components/ApiConfig";
import { ScrollView } from "react-native-gesture-handler";

const AssignmentList = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <View style={styles.pageContainer}>
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("My Workflows")}>
          <Feather name="corner-up-left" size={30} color={btnColor} />
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
});

export default AssignmentList;
