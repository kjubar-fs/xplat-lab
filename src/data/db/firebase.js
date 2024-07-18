/*
 *  Author: Kaleb Jubar
 *  Created: 15 Jul 2024, 9:59:47 AM
 *  Last update: 18 Jul 2024, 9:59:32 AM
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
     * @returns true if successful, false if not
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
                return false;
            }
        } catch(err) {
            return false;
        }     
    }

    /**
     * Add a new task to the database.
     * @param {any} task an object representing the task to add,
     *                   should have description and completed fields
     * @returns the ID of the created task, or null if failed
     */
    async addTask(task) {
        // check if db is available
        if (!this.isAvailable) {
            return null;
        }

        // add the doc and return the ID
        try {
            const docRef = await addDoc(collection(this.db, TASKS_COLL), task);
            return docRef.id;
        } catch(err) {
            return null;
        }
    }

    /**
     * Update a tasks's completed status.
     * @param {string} id ID of task to update
     * @param {boolean} completed completed value to set
     * @returns true if successful, false if not
     */
    async setTaskCompleted(id, completed) {
        // check if db is available
        if (!this.isAvailable) {
            return false;
        }
        
        try {
            // update the doc in the collection
            await updateDoc(
                doc(this.db, TASKS_COLL, id),
                { completed }
            );
            return true;
        } catch(err) {
            return false;
        }
    }

    /**
     * Delete a task.
     * @param {string} id ID of task to delete
     * @returns true if successful, false if not
     */
    async deleteTask(id) {
        // check if db is available
        if (!this.isAvailable) {
            return false;
        }
        
        try {
            // delete the doc
            await deleteDoc(doc(this.db, TASKS_COLL, id));
            return true;
        } catch(err) {
            return false;
        }
    }

    /**
     * Get the list of tasks from the database.
     * @returns the list of tasks, or null if failed
     */
    async getTasks() {
        // check if db is available
        if (!this.isAvailable) {
            return null;
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
            return null;
        }
    }
}

const db = new FirebaseDatabase();
db.open();

export default db;