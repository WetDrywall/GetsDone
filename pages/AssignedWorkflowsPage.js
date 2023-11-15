import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import WorkflowCard from '../components/WorkflowCard';
import { bgColor } from '../components/Colors';

const App = () => {
    const deadline = new Date(Date.now());
    const formattedDeadline = deadline.toLocaleDateString("en-GB", { day: 'numeric', month: 'numeric', year: 'numeric' });

    return (
        <ScrollView style={styles.container}>
            <WorkflowCard
                title="Test Title 1"
                description="Lorem ipsum dolor sit amet, clita appetere convenire ierfecto consequuntur eu. Veri assum veniam sit ne, usu albucius dissentias ne. Dicunt ponderum mnesarchum no ius, probatus perpetua pro ut. Eu legimus pertinacia accommodare mea, cu explicari complectitur sit."
                deadline={formattedDeadline}
            />
            <WorkflowCard
                title="Test Title 2"
                description="Lorem ipsum dolor sit amet, clita appetere convenire id quo, sea ea nihil laudem detraxit. Est perfecto consequuntur eu. Veri assum veniam sit ne, usu albucius dissentias ne. Dicunt ponderum mnesarchum no ius, probatus perpetua pro ut. Eu legimus pertinacia accommodare mea, cu explicari complectitur sit."
                deadline={formattedDeadline}
            />
            <WorkflowCard
                title="Test Title 3"
                description="Lorem ipsum dolor sit amet, c Eu legimus pertinacia accommodare mea, cu explicari complectitur sit."
                deadline={formattedDeadline}
            />
            <WorkflowCard
                title="Test Title 4"
                description="Lorem ipsum dolor sit amet, c Eu legimus pertinacia accommodare mea, cu explicari complectitur sit."
                deadline={formattedDeadline}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: bgColor
    },
});

export default App;
