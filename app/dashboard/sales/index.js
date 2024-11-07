import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useAuth } from "../../context/AuthContext"; // Importing AuthContext
import { useRouter } from "expo-router";
import CustomBottomNavBar from '../../components/CustomBottomNavBar/CustomBottomNavBar';
import Header from '../../components/Header/Header';

export default function SalesDashboard() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user?.role !== 2) {
            router.replace("/login"); // Redirect if not sales
        }
    }, [user, router]); // Only run when user changes

    if (user?.role !== 2) {
        return null; // Render nothing if the user is not a sales user
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
                <Text>Sales Dashboard</Text>
                <CustomBottomNavBar onHomePress={onHomePress}
                    onHospitalPress={onHospitalPress}
                    onPatientPress={onPatientPress}
                    showSalesOptions={1} />
            </View>
        </>
    );
}
