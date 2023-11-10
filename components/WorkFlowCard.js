import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import React, { useState } from 'react';

const WorkflowCard = ({ title, description, deadline }) => {
 const [height] = useState(new Animated.Value(150));

 const handlePress = () => {
    console.log(height._value);
   Animated.timing(height, {
     toValue: height._value === 150 ? 500 : 150,
     duration: 300,
     useNativeDriver: false
   }).start();
 };

 return (
   <Animated.View style={[styles.card, { height }]} onPress={handlePress}>
     <Text style={styles.title}>{title}</Text>
     <Text style={styles.description} numberOfLines={3}>
       {description?.substring(0, 120)}...
     </Text>
     <Text style={styles.date}>{deadline}</Text>
   </Animated.View>
 );
};

const styles = StyleSheet.create({
    card: {
        width: Dimensions.get('window').width * 0.95,
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
