/*
 *  Author: Kaleb Jubar
 *  Created: 15 Jul 2024, 10:13:54 AM
 *  Last update: 15 Jul 2024, 11:36:15 AM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { createSlice } from "@reduxjs/toolkit";

import Toast from "react-native-toast-message";

import "react-native-get-random-values";
import { v4 as uuid } from "uuid";

import db from "../db/firebase";

const taskSlice = createSlice({
    name: "task",
    initialState: {
        // TODO: pull list of tasks when first loading here
        tasks: [],
    },
    reducers: {
        addTask: (state, action) => {
            const task = action.payload;
            
            // generate a random UUID for this task
            task.id = uuid();
    
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

            // TODO: figure out how to use async with redux
            //       walkthrough video probably demonstrates
            // add task to database
            // db.addTask(task).then((docRef) => {
            //     // add task to state
            //     task.id = docRef.id;
            //     state.tasks.push(task);

            //     // show a toast
            //     Toast.show({
            //         type: "success",
            //         text1: "Add Succeeded",
            //         text2: `Successfully added "${task.description}" to the list!`,
            //         position: "bottom",
            //         bottomOffset: 120,
            //     });
            // });
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
            
            // make change in database
            db.setTaskCompleted(id, completed);
        },

        deleteTask: (state, action) => {
            const id = action.payload;

            // filter list to delete task with matching ID
            // save description for toast
            let deletedDesc = "";
            state.tasks = state.tasks.filter((task) => {
                if (task.id === id) {
                    deletedDesc = task.description;
                }
                return task.id !== id
            });

            // delete from database
            db.deleteTask(id);

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