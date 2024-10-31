import { View, Text, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React from 'react'

export default function SplashScreen() {
    return (
        <View style={styles.container}>
            <Text>Splash Screen</Text>
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
