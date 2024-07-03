/*
 *  Author: Kaleb Jubar
 *  Created: 29 May 2024, 5:26:40 PM
 *  Last update: 3 Jul 2024, 12:34:34 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { View, ScrollView, Text } from "react-native";

import Task from "./Task";
import styles from "./styles";

export default function Tasks({ tasks, setCompletedCallback, deleteTaskCallback }) {
    /**
     * Generate the content for the task list based on the passed value.
     * @returns a JSX element to render inside the list
     */
    const renderTasks = () => {
        // if the list is empty, render a message
        if (tasks.length === 0) {
            return (
                <>
                    <View style={styles.emptyMsgContainer}>
                        <Text style={styles.emptyMsg}>Add some tasks to get started!</Text>
                    </View>
                </>
            );
        }

        // otherwise, render a Task component for each task
        return (
            <>
                {tasks.map((task) =>
                    <Task
                        key={task.id}
                        id={task.id}
                        description={task.description}
                        completed={task.completed}
                        setCompleted={setCompletedCallback}
                        deleteTask={deleteTaskCallback}
                    />
                )}
            </>
        );
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
        >
            {renderTasks()}
        </ScrollView>
    );
}