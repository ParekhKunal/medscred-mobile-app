import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import HospitalForm from '../../components/HospitalForm/HospitalForm';
import Header from '../../components/Header/Header';

export default function AddHospitals() {
    return (
        <SafeAreaView style={styles.container}>
            <Header title="Home"
            />
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <HospitalForm />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 16,
    },
});
