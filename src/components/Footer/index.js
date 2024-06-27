/*
 *  Author: Kaleb Jubar
 *  Created: 31 May 2024, 2:45:58 PM
 *  Last update: 31 May 2024, 2:52:17 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { Text, View } from "react-native";
import styles from "./styles";
import { author } from "../../includes/variables";

export default function Footer() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Copyright &copy; 2024 {author}</Text>
        </View>
    );
}