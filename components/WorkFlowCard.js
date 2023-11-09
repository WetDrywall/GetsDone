import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import WorkFlowPage from '../pages/WorkflowPage';
import { useNavigation } from '@react-navigation/native';

const WorkflowCard = ({ title, description, deadline }) => {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate(WorkFlowPage);
    };

    return (
        <TouchableOpacity style={styles.card} onPress={handlePress}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description} numberOfLines={3}>
                {description?.substring(0, 120)}...
            </Text>
            <Text style={styles.date}>{deadline}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        width: Dimensions.get('window').width * 0.95,
        height: 150,
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
        flex: 1,
    },
    date: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default WorkflowCard;
