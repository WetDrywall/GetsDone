import React, { useState, useEffect } from "react";
import Navigator from "./components/Navigator";
import AsyncStorage from '@react-native-async-storage/async-storage';

const clearAsyncStorage = async () => {
 try {
   await AsyncStorage.clear();
   console.log('AsyncStorage cleared');
 } catch (error) {
   console.error('Error clearing AsyncStorage', error);
 }
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
 
  const handleLogin = (value) => {
    if (value !== null) {
      console.log(value + " is logged in");
      setIsLoggedIn(true);
    }
  }
 
  useEffect(() => {
    clearAsyncStorage();
    console.log('Component has mounted');
  }, []);
 
  return <Navigator isLoggedIn={isLoggedIn} handleLogin={handleLogin} />;
 }
 