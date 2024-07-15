/*
 *  Author: Kaleb Jubar
 *  Created: 29 May 2024, 5:26:40 PM
 *  Last update: 15 Jul 2024, 10:46:50 AM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { View, ScrollView, Text } from "react-native";
import { useSelector } from "react-redux";

import Task from "./Task";
import styles from "./styles";

export default function Tasks() {
    const tasks = useSelector((state) => state.task.tasks);

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
                    />
                )}
            </>
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.contentContainer}>
            {renderTasks()}
        </ScrollView>
    );
}