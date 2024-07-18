/*
 *  Author: Kaleb Jubar
 *  Created: 18 Jul 2024, 9:31:10 AM
 *  Last update: 18 Jul 2024, 10:32:28 AM
 *  Copyright (c) 2024 Kaleb Jubar
 */

// functions for performing both DB updates and state updates together
// allows one location for all calls and easy switching of cloud DB

// toasts
import Toast from "react-native-toast-message";

// database
import db from "./firebase";
import { addTask as addToStore } from "../state/taskSlice";

/**
 * Get the list of tasks from the database.
 * @returns an array of task objects, or null if failed
 */
export async function getTasks() {
    const tasks = await db.getTasks();
    return tasks;
}

/**
 * Add a new task to the database and store.
 * @param {object} task task object with description and completed fields
 * @param {Dispatch<UnknownAction>} dispatch dispatch provider to update store
 * @returns true if successful, false if not
 */
export async function addTask(task, dispatch) {
    // add task and get created ID
    const id = await db.addTask(task);
    if (!id) {
        return false;
    }

    // add task to store
    task.id = id;
    dispatch(addToStore(task));

    // show a toast
    Toast.show({
        type: "success",
        text1: "Add Succeeded",
        text2: `Successfully added "${task.description}" to the list!`,
    });

    return true;
}

export async function setTaskCompleted(id, completed) {

}

export async function deleteTask(id) {

}