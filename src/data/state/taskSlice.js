/*
 *  Author: Kaleb Jubar
 *  Created: 15 Jul 2024, 10:13:54 AM
 *  Last update: 18 Jul 2024, 10:09:27 AM
 *  Copyright (c) 2024 Kaleb Jubar
 */
// Redux
import { createSlice } from "@reduxjs/toolkit";

// toasts
import Toast from "react-native-toast-message";

const taskSlice = createSlice({
    name: "task",
    initialState: {
        tasks: [],
    },
    reducers: {
        setTasks: (state, action) => {
            // set tasks in state
            state.tasks = action.payload;
        },

        addTask: (state, action) => {
            // add task to state
            state.tasks.push(action.payload);
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
            // db.setTaskCompleted(id, completed);
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
            // db.deleteTask(id);

            // show toast
            Toast.show({
                type: "success",
                text1: "Delete Succeeded",
                text2: `Successfully deleted "${deletedDesc}".`,
            });
        },
    },
});

export const { setTasks, addTask, setTaskCompleted, deleteTask } = taskSlice.actions;

export default taskSlice.reducer;