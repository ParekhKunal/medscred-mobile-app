import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../../context/AuthContext'; // Import Auth context
import { useRouter, Link } from 'expo-router'; // Import router to handle redirects
import HospitalForm from '../../components/HospitalForm/HospitalForm';
import CustomBottomNavBar from '../../components/CustomBottomNavBar/CustomBottomNavBar';
import HospitalList from '../../screens/hospitals/HospitalList';
import Header from '../../components/Header/Header';

export default function AdminDashboard() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user?.role !== 1) {
            router.replace('/login');  // Redirect to login if not an admin
        }
    }, [user, router]);

    if (user?.role !== 1) {
        return null;  // Do not render if the user is not an admin
    }

    const onHomePress = () => {
        console.log('Home Pressed');
    };

    const onHospitalPress = () => {
        console.log('Hospital Pressed');
        router.push('/screens/hospitals/HospitalList')
    };

    const onPatientPress = () => {
        console.log('Patient Pressed');
    };

    return (
        <>
            <Header />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Admin Dashboard {user.name}</Text>
                <CustomBottomNavBar
                    onHomePress={onHomePress}
                    onHospitalPress={onHospitalPress}
                    onPatientPress={onPatientPress}
                    showAdminOptions={1}
                />
            </View>
        </>
    );
}

