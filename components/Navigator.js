import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { Dimensions, Text } from "react-native";

import AssignedWorkflowsPage from "../pages/AssignedWorkflowsPage";
import CreateNewWorkflowPage from "../pages/CreateNewWorkflowPage";
import AccountPage from "../pages/AccountPage";
import LoginPage from "../pages/LoginPage";
import WorkflowPage from "../pages/WorkflowPage";

import SideBar from "./SideBar";
import { fgColor, headerTitleColor } from "./Colors";

const Drawer = createDrawerNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Login"
        drawerContent={(props) => (
          <SideBar
            {...props}
            drawerWidth={Dimensions.get("window").width * 0.75}
          />
        )}
      >
        <Drawer.Screen
          name="My Workflows"
          component={AssignedWorkflowsPage}
          options={{
            drawerIcon: () => (
              <Feather name="archive" size={16} color={fgColor} />
            ),
            drawerLabel: ({ focused }) => (
              <Text style={{ color: focused ? "#4d79ff" : fgColor }}>
                My Workflows
              </Text>
            ),
            headerTintColor: fgColor,
            headerStyle: {
              backgroundColor: headerTitleColor,
            },
          }}
        />
        <Drawer.Screen
          name="Create Workflow"
          component={CreateNewWorkflowPage}
          options={{
            drawerIcon: () => <Feather name="edit" size={16} color={fgColor} />,
            drawerLabel: ({ focused }) => (
              <Text style={{ color: focused ? "#4d79ff" : fgColor }}>
                Create Workflow
              </Text>
            ),
            headerTintColor: fgColor,
            headerStyle: {
              backgroundColor: headerTitleColor,
            },
          }}
        />
        <Drawer.Screen
          name="Account"
          component={AccountPage}
          options={{
            drawerIcon: () => <Feather name="user" size={16} color={fgColor} />,
            drawerLabel: ({ focused }) => (
              <Text style={{ color: focused ? "#4d79ff" : fgColor }}>
                Account
              </Text>
            ),
            headerTintColor: fgColor,
            headerStyle: {
              backgroundColor: headerTitleColor,
            },
          }}
        />
        <Drawer.Screen
          name="Login"
          component={LoginPage}
          options={{
            drawerIcon: () => (
              <Feather name="log-in" size={16} color={fgColor} />
            ),
            drawerLabel: ({ focused }) => (
              <Text style={{ color: focused ? "#4d79ff" : fgColor }}>
                Login
              </Text>
            ),
            headerTintColor: fgColor,
            headerStyle: {
              backgroundColor: headerTitleColor,
            },
          }}
        />

        <Drawer.Screen
          name="Workflow"
          component={WorkflowPage}
          options={{
            drawerItemStyle: { display: "none" },
            headerTintColor: fgColor,
            headerStyle: {
              backgroundColor: headerTitleColor,
            },
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
