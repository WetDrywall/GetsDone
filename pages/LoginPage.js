import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { bgColor, fgColor, placeholderColor, textFieldColor } from '../components/Colors';

const LoginPage = () => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');

 const handleLogin = () => {
   // Handle the login logic here
 };

 return (
   <View style={styles.container}>
     <TextInput
       style={styles.input}
       onChangeText={text => setEmail(text)}
       value={email}
       placeholder="Email"
       placeholderTextColor={placeholderColor}
       keyboardType="email-address"
       autoCapitalize="none"
     />
     <TextInput
       style={styles.input}
       onChangeText={text => setPassword(text)}
       value={password}
       placeholder="Password"
       placeholderTextColor={placeholderColor}
       secureTextEntry
     />
     <Button
       title="Login"
       onPress={handleLogin}
     />
   </View>
 );
};

const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   padding: 20,
   backgroundColor: bgColor
 },
 input: {
   height: 40,
   borderColor: 'transparent',
   borderWidth: 1,
   marginBottom: 20,
   padding: 10,
   color: fgColor,
   backgroundColor: textFieldColor
 },
});

export default LoginPage;
