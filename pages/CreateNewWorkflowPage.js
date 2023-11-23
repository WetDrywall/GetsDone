import React, { useState, useEffect } from "react";
import {
 View,
 Text,
 StyleSheet,
 TouchableOpacity,
 TextInput,
 Button,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Dimensions } from "react-native";
import {
 fgColor,
 bgColor,
 containerColor,
 textFieldColor,
 placeholderColor,
 btnColor,
 btnIconColor,
} from "../components/Colors";
import { apiLink } from "../components/ApiConfig";
import { useFocusEffect } from "@react-navigation/native";
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from "@react-native-async-storage/async-storage";

const CreateNewWorkflowPage = ({ navigation}) => {
 const [showForm, setShowForm] = useState(false);
 const [title, setTitle] = useState("");
 const [description, setDescription] = useState("");
 const [selectedUser, setSelectedUser] = useState("");
 const [selectedDate, setSelectedDate] = useState(new Date());
 const [showDatePicker, setShowDatePicker] = useState(false);
 const [users, setUsers] = useState([]);

 useFocusEffect(
   React.useCallback(() => {
     return () => {
       setUsers([]);
       setShowForm(false);
       setTitle("");
       setDescription("");
       setSelectedUser("");
     };
   }, [])
 );

 const handleCreate = () => {
   // Handle the creation of the new workflow here
   //WOwner skal vi få fra login
   //WUser skal vi få fra dropdown
   //Wfid skal være 0 hvis det er en ny,
   
     const fetchData = async () => {
      const token = await AsyncStorage.getItem("Token");
      const apiUrl = `${apiLink}api/SaveWorkflow?wfid=0&title=${encodeURIComponent(title
      )}&desc=${encodeURIComponent(description)}&jwtToken=${token}&wUser=${selectedUser}&deadline=${selectedDate.toISOString()}`;

      console.log(apiUrl);

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          console.log(data); // This will log the response to the console
          navigation.navigate("My Workflows");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

      fetchData();
 };

 return (
   <View style={styles.pageContainer}>
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
         <Text style={styles.label}>Assign User</Text>
         <TextInput
           style={styles.textfield}
           onChangeText={(text) => setSelectedUser(text)}
           value={users}
           placeholder="email"
           placeholderTextColor={placeholderColor}
           keyboardType="email-address"
           multiline={false}
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
 );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: bgColor,
  },
  btn: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    position: "absolute",
    bottom: 20,
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
  dropdown: {
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    padding: 5,
    color: fgColor,
    backgroundColor: textFieldColor,
  },
});

export default CreateNewWorkflowPage;
