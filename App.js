/*
 *  Author: Kaleb Jubar
 *  Created: 26 Oct 1985, 4:15:00 AM
 *  Last update: 4 Jul 2024, 9:15:43 AM
 *  Copyright (c) 1985 - 2024 Kaleb Jubar
 */
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ScrollView, View, Alert } from "react-native";

// imports for uuid generation
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";

// navigation
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from '@expo/vector-icons';

// toasts
import Toast from "react-native-toast-message";

import styles from "./src/styles/structure";
import Header from "./src/components/Header";
import Tasks from "./src/components/Tasks";
import Form from "./src/components/Form";
import Footer from "./src/components/Footer";
import { primaryColor } from "./src/includes/variables";

const Tab = createBottomTabNavigator();

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
                    let taskDesc;
                    const filteredTasks = newTasks.filter((task) => {
                        if (task.id === id) {
                            taskDesc = task.description;
                        } else {
                            return true;
                        }
                    });
                    // update state
                    setTasks(filteredTasks);
                    // show toast
                    Toast.show({
                        type: "success",
                        text1: "Delete Succeeded",
                        text2: `Successfully deleted "${taskDesc}".`,
                        position: "bottom",
                        bottomOffset: 120,
                    });
                }
            }
        ]);
    };

    return (
        <>
            <NavigationContainer>
                <View style={styles.container}>
                    <StatusBar style="light" />
                    
                    <Header />

                    <Tab.Navigator screenOptions={{
                        tabBarActiveTintColor: primaryColor,
                        tabBarStyle: {
                            paddingTop: 3,
                            paddingBottom: 7,
                        },
                    }}>
                        <Tab.Screen
                            name="TasksScreen"
                            options={{
                                title: "Tasks",
                                headerShown: false,
                                tabBarIcon: ({ color, size }) => (
                                    <MaterialIcons
                                        name="checklist"
                                        size={size}
                                        color={color}
                                    />
                                ),
                            }}
                        >
                            {(props) => (
                                <Tasks
                                    {...props}
                                    tasks={tasks}
                                    setCompletedCallback={setCompleted}
                                    deleteTaskCallback={deleteTask}
                                />
                            )}
                        </Tab.Screen>

                        <Tab.Screen
                            name="AddTaskScreen"
                            options={{
                                title: "Add Task",
                                tabBarIcon: ({ color, size }) => (
                                    <MaterialIcons
                                        name="playlist-add"
                                        size={size}
                                        color={color}
                                    />
                                ),
                            }}
                        >
                            {(props) => (
                                <Form
                                    {...props}
                                    addTaskCallback={addTask}
                                />
                            )}
                        </Tab.Screen>
                    </Tab.Navigator>

                    <Footer />
                </View>
            </NavigationContainer>

            <Toast />
        </>
    );
}