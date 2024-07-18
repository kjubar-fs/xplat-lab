/*
 *  Author: Kaleb Jubar
 *  Created: 18 Jul 2024, 9:31:10 AM
 *  Last update: 18 Jul 2024, 10:02:07 AM
 *  Copyright (c) 2024 Kaleb Jubar
 */

// functions for performing both DB updates and state updates together
// allows one location for all calls and easy switching of cloud DB

import db from "./firebase";

/**
 * Get the list of tasks from the database.
 * @returns an array of task objects, or null if failed
 */
export async function getTasks() {
    const tasks = await db.getTasks();
    return tasks;
}

export async function addTask(task) {

}

export async function setTaskCompleted(id, completed) {

}

export async function deleteTask(id) {

}