/*
 *  Author: Kaleb Jubar
 *  Created: 18 Jul 2024, 9:36:33 AM
 *  Last update: 18 Jul 2024, 10:05:15 AM
 *  Copyright (c) 2024 Kaleb Jubar
 */
// splash screen
import * as SplashScreen from "expo-splash-screen";

// hooks
import { useEffect } from "react";
import { useDispatch } from "react-redux";

// database
import { getTasks } from "../../data/db";
import { setTasks } from "../../data/state/taskSlice";

// toasts
import Toast from "react-native-toast-message";

/*
 *  Author: Kaleb Jubar
 *  Created: 18 Jul 2024, 9:36:33 AM
 *  Last update: 18 Jul 2024, 9:38:57 AM
 *  Copyright (c) 2024 Kaleb Jubar
 */
export default function DataLoader() {
    const dispatch = useDispatch();

    // use a mount effect to load the task list and set it in the store
    useEffect(() => {
        (async () => {
            const tasks = await getTasks();
            await SplashScreen.hideAsync();
            if (!tasks) {
                // show an error toast if we failed to load
                Toast.show({
                    type: "error",
                    text1: "Task List Loading Failed",
                    text2: `Could not load the task list, try again later.`,
                })
                return;
            }

            dispatch(setTasks(tasks));
        })();
    }, []);
}