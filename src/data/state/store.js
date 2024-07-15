/*
 *  Author: Kaleb Jubar
 *  Created: 15 Jul 2024, 10:12:04 AM
 *  Last update: 15 Jul 2024, 10:20:02 AM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { configureStore } from "@reduxjs/toolkit";

import taskReducer from "./taskSlice";

export const store = configureStore({
    reducer: {
        task: taskReducer,
    },
});