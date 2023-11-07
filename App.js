// import React, { Component } from 'react';
// import { createAppContainer } from '@react-navigation/native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { Dimensions } from 'react-native';
// import { Feather } from '@expo/vector-icons';

// import {
//   AccountPage,
//   AssignedWorkflowsPage,
//   CreateNewWorkflowPage,
//   WorkflowAssignmentsPage
// } from './pages';

// import SideBar from './components/SideBar';

// const DrawerNavigator = createDrawerNavigator({
//   AccountPage,
//   AssignedWorkflowsPage,
//   CreateNewWorkflowPage,
//   WorkflowAssignmentsPage
// },
// {
//   contentComponent: props => <SideBar {...props} />
// });

// export default createAppContainer(DrawerNavigator);

import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import AccountPage from './pages/AccountPage';
import AssignedWorkflowsPage from './pages/AssignedWorkflowsPage';
import CreateNewWorkflowPage from './pages/CreateNewWorkflowPage';
import WorkflowAssignmentsPage from './pages/WorkflowAssignmentsPage';

import SideBar from './components/SideBar';

const Drawer = createDrawerNavigator();

export default function App() {
 return (
   <NavigationContainer>
     <Drawer.Navigator drawerContent={props => <SideBar {...props} />}>
       <Drawer.Screen name="Account" component={AccountPage} />
       <Drawer.Screen name="AssignedWorkflows" component={AssignedWorkflowsPage} />
       <Drawer.Screen name="CreateNewWorkflow" component={CreateNewWorkflowPage} />
       <Drawer.Screen name="WorkflowAssignments" component={WorkflowAssignmentsPage} />
     </Drawer.Navigator>
   </NavigationContainer>
 );
}
