/*
 *  Author: Kaleb Jubar
 *  Created: 18 Jul 2024, 9:31:10 AM
 *  Last update: 18 Jul 2024, 11:20:10 AM
 *  Copyright (c) 2024 Kaleb Jubar
 */

// functions for performing both DB updates and state updates together
// allows one location for all calls and easy switching of cloud DB

// database
import db from "./firebase";

// store
import {
    addTask as addToStore,
    setTaskCompleted as setCompleted,
    deleteTask as remove
} from "../state/taskSlice";

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

    return true;
}

/**
 * Update the completed status of a task.
 * @param {string} id ID of task to update
 * @param {boolean} completed completed status for task
 * @param {Dispatch<UnknownAction>} dispatch dispatch provider to update store
 * @returns true if successful, false if not
 */
export async function setTaskCompleted(id, completed, dispatch) {
    // assume update will complete and update store first
    dispatch(setCompleted({ id, completed }));

    // run db update
    const success = await db.updateTask(id, { completed });

    // revert store if db update failed
    if (!success) {
        dispatch(setCompleted(id, !completed));
        return false;
    }

    return true;
}

/**
 * Delete a task.
 * @param {string} id ID of task to delete
 * @param {Dispatch<UnknownAction>} dispatch dispatch provider to update store
 * @returns true if successful, false if not
 */
export async function deleteTask(id, dispatch) {
    // attempt delete from db first
    const success = await db.deleteTask(id);
    if (!success) {
        return false;
    }

    // delete from store
    dispatch(remove(id));

    return true;
}