import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import WorkflowCard from "../components/WorkflowCard";
import { bgColor } from "../components/Colors";
import { apiLink } from "../components/ApiConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const App = ({ navigation }) => {
  const [workflows, setWorkflows] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const token = await AsyncStorage.getItem("Token");
        const url = `${apiLink}api/ListWorkflow?jwtToken=${token}`;

        console.log(url);

        fetch(url)
          .then((response) => response.json())
          .then((data) => setWorkflows(data))
          .catch((error) => console.error(error));
      };

      fetchData();

      return () => {
        setWorkflows([]);
      };
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={styles.pageContainer}>
      {workflows.map((post, index) => (
        <WorkflowCard
          key={index}
          navigation={navigation}
          route={{ params: { wfId: post.wfId } }}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: bgColor,
  },
});

export default App;
