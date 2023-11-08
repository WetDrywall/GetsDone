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
