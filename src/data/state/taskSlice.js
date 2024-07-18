/*
 *  Author: Kaleb Jubar
 *  Created: 15 Jul 2024, 10:13:54 AM
 *  Last update: 18 Jul 2024, 11:43:54 AM
 *  Copyright (c) 2024 Kaleb Jubar
 */
// Redux
import { createSlice } from "@reduxjs/toolkit";

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
        },

        deleteTask: (state, action) => {
            const id = action.payload;

            // filter list to delete task with matching ID
            state.tasks = state.tasks.filter((task) => task.id !== id);
        },
    },
});

export const { setTasks, addTask, setTaskCompleted, deleteTask } = taskSlice.actions;

export default taskSlice.reducer;