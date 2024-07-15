/*
 *  Author: Kaleb Jubar
 *  Created: 15 Jul 2024, 9:59:47 AM
 *  Last update: 15 Jul 2024, 11:20:01 AM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { initializeApp } from "firebase/app";
import {
    getFirestore, collection, doc,
    addDoc, updateDoc, deleteDoc
} from "firebase/firestore";

// setup Firebase app connection
const firebaseConfig = {
    apiKey: "AIzaSyBcl8VpfroNRJyu474UhntUoBDTBJnh0jo",
    authDomain: "info6129-1207020.firebaseapp.com",
    projectId: "info6129-1207020",
    storageBucket: "info6129-1207020.appspot.com",
    messagingSenderId: "37397126242",
    appId: "1:37397126242:web:7802eaff31ea5695c4853b"
};

const app = initializeApp(firebaseConfig);

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
}

const db = new FirebaseDatabase();
db.open();

export default db;