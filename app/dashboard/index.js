import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';  // Import context to access user data
import { useRouter } from 'expo-router';          // Import router for navigation
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

export default function DashboardIndex() {
    const { user } = useAuth(); 
    const router = useRouter(); 

    useEffect(() => {
        if (user) {
            if (user.role === 1) {
                router.replace('/dashboard/admin');  
            } else if (user.role === 2) {
                router.replace('/dashboard/sales');  
            } else if (user.role === 3) {
                router.replace('/dashboard/user');  
            } else {
                router.replace('/dashboard/default');  
            }
        }
    }, [user, router]);  

    if (!user) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#008aff" />
                <Text style={styles.loadingText}>Please wait...</Text>
            </View>
        );
    }

    return null;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0', // Soft background color for the loading state
    },
    loadingText: {
        marginTop: 20,
        fontSize: 18,
        color: '#008aff', // Matching the color of the loading spinner
        fontWeight: '600',
    },
});