import React from 'react';
import { createAppContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';

import {
  AccountPage,
  AssignedWorkflowsPage,
  CreateNewWorkflowPage,
  WorkflowAssignmentsPage
} from './pages';

import SideBar from './components/SideBar';

const DrawerNavigator = createDrawerNavigator(
  {
    AccountPage,
    AssignedWorkflowsPage,
    CreateNewWorkflowPage,
    WorkflowAssignmentsPage
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);

export default createAppContainer(DrawerNavigator);
