import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const WorkflowCard = ({ title, description, deadline }) => {
    const handlePress = () => {
        // Handle the click event here
    };

    return (
        <TouchableOpacity style={styles.card} onPress={handlePress}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description} numberOfLines={5}>
                {description?.substring(0, 195)}...
            </Text>
            <Text style={styles.date}>{deadline}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        width: Dimensions.get('window').width * 0.95,
        maxHeight: 200,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        margin: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
    },
    date: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
    },
});

export default WorkflowCard;
