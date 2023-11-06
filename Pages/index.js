import React from 'react';
import Page from './Page';

export const AccountPage = ({navigation}) => <Page navigation={navigation} name="Account" />
export const AssignedWorkflowsPage = ({navigation}) => <Page navigation={navigation} name="AssignedWorkflows" />
export const CreateNewWorkflowPage = ({navigation}) => <Page navigation={navigation} name="CreateNewWorkflow" />
export const WorkflowAssignmentsPage = ({navigation}) => <Page navigation={navigation} name="WorkflowAssignments" />