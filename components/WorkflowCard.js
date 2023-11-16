import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { fgColor, containerColor } from "./Colors";
import { apiLink } from "./ApiConfig";

const WorkflowCard = ({ navigation }) => {
  const handlePress = () => {
    navigation.navigate("Workflow");
  };
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

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        data.map((post) => {
          return (
            <View>
              <Text style={styles.title}>{post.title}</Text>
              <Text style={styles.description} numberOfLines={3}>
                {post.description.substring(0, 120)}...
              </Text>
              <Text style={styles.date}>{deadline}</Text>
            </View>
          );
        })
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get("window").width * 0.95,
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
    marginBottom: 10,
    color: fgColor,
  },
  description: {
    fontSize: 16,
    flex: 1,
    color: fgColor,
  },
  date: {
    fontSize: 16,
    fontWeight: "bold",
    color: fgColor,
  },
});

export default WorkflowCard;
