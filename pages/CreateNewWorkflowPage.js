import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';
import { Dimensions } from 'react-native';

const CreateNewWorkflowPage = () => {
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedUser, setSelectedUser] = useState('');

    const users = ['Kevin@gmail.com', 'TeisDenSeje@gmail.com', 'Test@gmail.com'];

    const handleCreate = () => {
        // Handle the creation of the new workflow here
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.box} onPress={() => setShowForm(!showForm)}>
                <Icon name="add-circle-outline" size={30} color="#000" />
            </TouchableOpacity>
            {showForm && (
                <View style={styles.formContainer}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={text => setTitle(text)}
                        value={title}
                        placeholder="Title"
                    />
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.descriptionInput}
                        onChangeText={text => setDescription(text)}
                        value={description}
                        placeholder="Description"
                        multiline={true}
                    />
                    <Text style={styles.label}>Assigned User</Text>
                    <RNPickerSelect
                        onValueChange={(value) => setSelectedUser(value)}
                        items={users.map(user => ({ label: user, value: user }))}
                        style={pickerSelectStyles}
                    />
                    <Button
                        title="Create"
                        onPress={handleCreate}
                        color="#007BFF"
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        width: 50,
        height: 50,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        position: 'absolute',
        bottom: 20,
    },
    formContainer: {
        width: Dimensions.get('window').width * 0.8,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 5,
    },
    descriptionInput: {
        minHeight: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 5,
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        height: 40,
        marginBottom: 10,
    },
});

export default CreateNewWorkflowPage;
