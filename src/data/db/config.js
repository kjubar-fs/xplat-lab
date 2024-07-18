/*
 *  Author: Kaleb Jubar
 *  Created: 17 Jul 2024, 9:27:19 AM
 *  Last update: 17 Jul 2024, 9:28:33 AM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { initializeApp } from "firebase/app";

// setup Firebase app connection
const firebaseConfig = {
    apiKey: "AIzaSyBcl8VpfroNRJyu474UhntUoBDTBJnh0jo",
    authDomain: "info6129-1207020.firebaseapp.com",
    projectId: "info6129-1207020",
    storageBucket: "info6129-1207020.appspot.com",
    messagingSenderId: "37397126242",
    appId: "1:37397126242:web:7802eaff31ea5695c4853b"
};

export default initializeApp(firebaseConfig);