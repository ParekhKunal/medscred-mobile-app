// app/index.js
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
    const [fadeAnim] = useState(new Animated.Value(0));  // For fade-in effect
    const router = useRouter();

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
        }).start();

        setTimeout(() => {
            router.push('/login');
        }, 5000);
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Animated.View style={[styles.splashContent, { opacity: fadeAnim }]}>
                <Image
                    source={require('../assets/logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0A74DA',
    },
    splashContent: {
        flex: 1,
        justifyContent: 'center', // Centers the logo
        alignItems: 'center',
        width: '100%',
    },
    logo: {
        width: 250,
        height: 250,
        marginBottom: 20,
    },
});
