/*
 *  Author: Kaleb Jubar
 *  Created: 15 Jul 2024, 10:13:54 AM
 *  Last update: 15 Jul 2024, 10:48:31 AM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { createSlice } from "@reduxjs/toolkit";

import Toast from "react-native-toast-message";

import "react-native-get-random-values";
import { v4 as uuid } from "uuid";

const taskSlice = createSlice({
    name: "task",
    initialState: {
        tasks: [],
    },
    reducers: {
        addTask: (state, action) => {
            const task = action.payload;
            
            // generate a random UUID for this task
            task.id = uuid();

            console.log(task);
    
            // add task to state
            state.tasks.push(task);

            // show a toast
            Toast.show({
                type: "success",
                text1: "Add Succeeded",
                text2: `Successfully added "${task.description}" to the list!`,
                position: "bottom",
                bottomOffset: 120,
            });
        },

        setTaskCompleted: (state, action) => {
            const { id, completed } = action.payload;

            // find the task with matching ID and update its status
            for (task of state.tasks) {
                if (task.id === id) {
                    task.completed = completed;
                    return;     // early return for optimization
                }
            }
        },

        deleteTask: (state, action) => {
            // filter list to delete task with matching ID
            // save description for toast
            let deletedDesc = "";
            state.tasks = state.tasks.filter((task) => {
                if (task.id === action.payload) {
                    deletedDesc = task.description;
                }
                return task.id !== action.payload
            });

            // show toast
            Toast.show({
                type: "success",
                text1: "Delete Succeeded",
                text2: `Successfully deleted "${deletedDesc}".`,
                position: "bottom",
                bottomOffset: 120,
            });
        },
    },
});

export const { addTask, setTaskCompleted, deleteTask } = taskSlice.actions;

export default taskSlice.reducer;