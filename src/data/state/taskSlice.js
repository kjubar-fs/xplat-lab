/*
 *  Author: Kaleb Jubar
 *  Created: 15 Jul 2024, 10:13:54 AM
 *  Last update: 15 Jul 2024, 10:19:31 AM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
    name: "task",
    initialState: {
        tasks: [],
    },
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload);
        },

        setTaskCompleted: (state, action) => {
            const { id, completed } = action.payload;
            state.tasks = state.tasks.map((task) => {
                if (task.id === id) {
                    task.completed = completed;
                }
            });
        },

        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter((task) => (
                task.id !== action.payload
            ));
        },
    },
});

export const { addTask, setTaskCompleted, deleteTask } = taskSlice.actions;

export default taskSlice.reducer;