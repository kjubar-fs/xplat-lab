/*
 *  Author: Kaleb Jubar
 *  Created: 15 Jul 2024, 9:59:47 AM
 *  Last update: 17 Jul 2024, 9:28:43 AM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import {
    getFirestore, collection, doc,
    addDoc, updateDoc, deleteDoc, getDocs
} from "firebase/firestore";

import app from "./config";

const TASKS_COLL = "tasks";

class FirebaseDatabase {
    /**
     * Create a new Firebase DB.
     */
    constructor() {
        this.db = null;
        this.isAvailable = false;
    }

    /**
     * Opens the Firestore database.
     * @returns a Promise indicating if the operation succeeded
     */
    async open() {
        try {
            // initialize db
            const db = getFirestore(app);
            if (db) {
                this.db = db;
                this.isAvailable = true;
                return true;
            } else {
                throw new Error("Database is not available");
            }
        } catch(err) {
            throw new Error(`Error opening database: ${err}`)
        }     
    }

    /**
     * Add a new task to the database.
     * @param {any} task an object representing the task to add,
     *                   should have description and completed fields
     * @returns a Promise containing the ID of the created task
     */
    async addTask(task) {
        // check if db is available
        if (!this.isAvailable) {
            throw new Error("Error: database has not been opened!");
        }

        // add the doc and return the ID
        try {
            const docRef = await addDoc(collection(this.db, TASKS_COLL), task);
            return docRef.id;
        } catch(err) {
            throw new Error(`Error adding task: ${err}`);
        }
    }

    /**
     * Update a tasks's completed status.
     * @param {string} id ID of task to update
     * @param {boolean} completed completed value to set
     * @returns a Promise indicating if the operation succeeded
     */
    async setTaskCompleted(id, completed) {
        // check if db is available
        if (!this.isAvailable) {
            throw new Error("Error: database has not been opened!");
        }
        
        try {
            // update the doc in the collection
            await updateDoc(
                doc(this.db, TASKS_COLL, id),
                { completed }
            );
            return true;
        } catch(err) {
            throw new Error(`Error updating task status: ${err}`);
        }
    }

    /**
     * Delete a task.
     * @param {string} id ID of task to delete
     * @returns a Promise indicating if the operation succeeded
     */
    async deleteTask(id) {
        // check if db is available
        if (!this.isAvailable) {
            throw new Error("Error: database has not been opened!");
        }
        
        try {
            // delete the doc
            await deleteDoc(doc(this.db, TASKS_COLL, id));
            return true;
        } catch(err) {
            throw new Error(`Error deleting task: ${err}`);
        }
    }

    /**
     * Get the list of tasks from the database.
     * @returns a Promise containing the list of tasks
     */
    async getTasks() {
        // check if db is available
        if (!this.isAvailable) {
            throw new Error("Error: database has not been opened!");
        }
        
        try {
            // get all documents in the collection
            const snapshot = await getDocs(collection(this.db, TASKS_COLL))
            const results = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                data.id = doc.id;
                results.push(data);
            });
            return results;
        } catch(err) {
            throw new Error(`Error getting task list: ${err}`);
        }
    }
}

const db = new FirebaseDatabase();
db.open();

export default db;