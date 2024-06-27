/*
 *  Author: Kaleb Jubar
 *  Created: 26 Oct 1985, 4:15:00 AM
 *  Last update: 5 Jun 2024, 12:40:07 PM
 *  Copyright (c) 1985 - 2024 Kaleb Jubar
 */
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ScrollView, View, Alert } from "react-native";

// imports for uuid generation
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";

import styles from "./src/styles/structure";
import Header from "./src/components/Header";
import Tasks from "./src/components/Tasks";
import Form from "./src/components/Form";
import Footer from "./src/components/Footer";

export default function App() {
    // create state for task list with a few default tasks
    const [tasks, setTasks] = useState([]);

    /**
     * Add a new task to the task list with a randomly-generated ID.
     * @param {string} description task description
     * @param {boolean} completed whether or not the task is completed
     */
    const addTask = (description, completed) => {
        const task = {
            description,
            completed
        }
        // generate a random UUID for this task
        task.id = uuid();

        // create a new task list and update state
        const newTasks = [...tasks, task];
        setTasks(newTasks);
    };

    /**
     * Update the completed value of the task matching the given ID.
     * @param {string} id UUID of the task to update
     * @param {boolean} completed value to set the completed flag to
     */
    const setCompleted = (id, completed) => {
        // copy the tasks list first
        const newTasks = tasks.slice();
        // find the matching task and update it's completed value
        for (task of newTasks) {
            if (task.id === id) {
                task.completed = completed;
                setTasks(newTasks);
                return;     // early return for optimization
            }
        }
    };

    /**
     * Delete the specified task from the list.
     * @param {string} id UUID of the task to delete
     */
    const deleteTask = (id) => {
        // show the user an alert to confirm if they want to delete
        Alert.alert("Delete Task?", "Are you sure you want to delete this task?", [
            {
                // no button does nothing
                text: "No",
                style: "cancel"
            },
            {
                // yes button deletes the task
                text: "Yes",
                onPress: () => {
                    // copy task list
                    const newTasks = tasks.slice();
                    // filter out selected task
                    const filteredTasks = newTasks.filter((task) => task.id !== id);
                    // update state
                    setTasks(filteredTasks);
                }
            }
        ]);
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            
            <Header />
            
            <ScrollView
                // ScrollView actually has two nested containers, the content container
                // and the outer container
                // style applies to the outer and content applies to the inner
                // to center the blank task list message, we have to set flex on the
                // content container
                // however, this breaks scrolling on the list when we have tasks,
                // so we move that style to the outer container when tasks isn't empty
                contentContainerStyle={tasks.length === 0 ? styles.list : null}
                style={tasks.length !== 0 ? styles.list : null}
            >
                <Tasks
                    tasks={tasks}
                    setCompletedCallback={setCompleted}
                    deleteTaskCallback={deleteTask}
                />
            </ScrollView>

            <View style={styles.form}>
                <Form addTaskCallback={addTask} />
            </View>

            <Footer />
        </View>
    );
}