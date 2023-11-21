import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import WorkflowCard from "../components/WorkflowCard";
import { bgColor } from "../components/Colors";

const App = ({ navigation }) => {
  return (
    <ScrollView style={styles.pageContainer}>
      <WorkflowCard
        navigation={navigation}
        title="Title"
        description="Description"
        deadline="Deadline"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: bgColor,
  },
});

export default App;
