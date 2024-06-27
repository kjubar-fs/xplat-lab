/*
 *  Author: Kaleb Jubar
 *  Created: 29 May 2024, 5:26:26 PM
 *  Last update: 3 Jun 2024, 3:55:38 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { View, Text } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

import styles from "./styles";
import { appName } from "../../includes/variables";

export default function Header() {
    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <MaterialIcons name="checklist" size={40} color="white" />
                <Text style={styles.title}>{appName}</Text>
            </View>
        </View>
    );
}