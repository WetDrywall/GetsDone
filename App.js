import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { Dimensions, Text } from 'react-native';

import AssignedWorkflowsPage from './pages/AssignedWorkflowsPage';
import CreateNewWorkflowPage from './pages/CreateNewWorkflowPage';
import AccountPage from './pages/AccountPage';

import SideBar from './components/SideBar';
import { fgColor, headerTitleColor } from './components//Colors';

const Drawer = createDrawerNavigator();

export default function App() {
 return (
   <NavigationContainer>
     <Drawer.Navigator drawerContent={props => <SideBar {...props} drawerWidth={Dimensions.get("window").width * 0.75} />}>
       <Drawer.Screen
          name="My Workflows"
          component={AssignedWorkflowsPage}
          options={{
            drawerIcon: () => <Feather name="archive" size={16} color={fgColor} />,
            drawerLabel: ({ focused }) => <Text style={{ color: focused ? '#4d79ff' : fgColor }}>My Workflows</Text>,
            headerTintColor: fgColor,
            headerStyle: {
              backgroundColor: headerTitleColor
            }
          }}
       />
       <Drawer.Screen
          name="Create Workflow"
          component={CreateNewWorkflowPage}
          options={{
            drawerIcon: () => <Feather name="edit" size={16} color={fgColor} />,
            drawerLabel: ({ focused }) => <Text style={{ color: focused ? '#4d79ff' : fgColor }}>Create Workflow</Text>,
            headerTintColor: fgColor,
            headerStyle: {
              backgroundColor: headerTitleColor
            }
          }}
          />
       <Drawer.Screen
          name="Account"
          component={AccountPage}
          options={{
            drawerIcon: () => <Feather name="user" size={16} color={fgColor} />,
            drawerLabel: ({ focused }) => <Text style={{ color: focused ? '#4d79ff' : fgColor }}>Account</Text>,
            headerTintColor: fgColor,
            headerStyle: {
              backgroundColor: headerTitleColor
            }
        }}
          />
     </Drawer.Navigator>
   </NavigationContainer>
 );
}