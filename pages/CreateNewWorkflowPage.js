import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';

const CreateNewWorkflowPage = () => {
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedUser, setSelectedUser] = useState('user1');

    const users = ['user1', 'user2', 'user3'];

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.box} onPress={() => setShowForm(!showForm)}>
                <Icon name="add-circle-outline" size={30} color="#000" />
            </TouchableOpacity>
            {showForm && (
                <View>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setTitle(text)}
                        value={title}
                        placeholder="Title"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setDescription(text)}
                        value={description}
                        placeholder="Description"
                    />
                    <RNPickerSelect
                        onValueChange={(value) => setSelectedUser(value)}
                        items={users.map(user => ({ label: user, value: user }))}
                        style={pickerSelectStyles}
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
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        padding: 5,
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        height: 40,
        margin: 10,
    },
});

export default CreateNewWorkflowPage;
