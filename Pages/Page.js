import React from 'react';
import { View, Text, Stylesheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default class Page extends react.Component {
    render() {
        return (
            <View style={styles.container}>
                <SafeAreaView style={{flex: 1}}>
                    <TouchableOpacity style={{alignItems: "flex-end", margin: 16}}
                    onPress={this.props.navigation.openDrawer}
                    >
                        <FontAwesome5 name="bars" size={24} color="#161924"/>
                    </TouchableOpacity>
                    <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                        <text styles={styles.text}>{this.props.name} Page</text>
                    </View>
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    text: {
        color: "#161924",
        fontsize: 20,
        fontweight: 500
    }
})