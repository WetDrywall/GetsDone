import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { Dimensions } from 'react-native';

import AssignedWorkflowsPage from './pages/AssignedWorkflowsPage';
import CreateNewWorkflowPage from './pages/CreateNewWorkflowPage';
import AccountPage from './pages/AccountPage';

import SideBar from './components/SideBar';

const Drawer = createDrawerNavigator();

export default function App() {
 return (
   <NavigationContainer>
     <Drawer.Navigator drawerContent={props => <SideBar {...props} drawerWidth={Dimensions.get("window").width * 0.75} />}>
       <Drawer.Screen name="My Workflows" component={AssignedWorkflowsPage} options={{drawerIcon: ({ tintColor }) => <Feather name="archive" size={16} color={tintColor} />}} />
       <Drawer.Screen name="Create Workflow" component={CreateNewWorkflowPage} options={{drawerIcon: ({ tintColor }) => <Feather name="edit" size={16} color={tintColor} />}} />
       <Drawer.Screen name="Account" component={AccountPage} options={{drawerIcon: ({ tintColor }) => <Feather name="user" size={16} color={tintColor} />}} />
     </Drawer.Navigator>
   </NavigationContainer>
 );
}