import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
  SafeAreaView,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { bgColor } from "./Colors";

export default Sidebar = (props) => (
  <SafeAreaView style={{ flex: 1 }} backgroundColor={bgColor}>
    <ScrollView>
      <ImageBackground
        source={require("../assets/Banner.png")}
        style={{
          width: undefined,
          padding: 16,
          paddingTop: 48,
        }}
      >
        <Image
          source={require("../assets/Default_Profile_Picture.png")}
          style={styles.profile}
        />
        <Text style={styles.name}></Text>
      </ImageBackground>

      <View style={styles.container}>
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      </View>
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#FFF",
  },
  name: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "800",
    marginVertical: 8,
  },
});
