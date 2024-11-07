import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Button, TextInput } from 'react-native';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/Header/Header';
import { useRouter } from 'expo-router';

export default function HospitalList() {
    const { user, token } = useAuth();
    const router = useRouter();

    const [hospitals, setHospitals] = useState([]); // Store fetched hospital data
    const [filteredHospitals, setFilteredHospitals] = useState([]); // Store filtered hospital data based on search
    const [loading, setLoading] = useState(true); // Track loading state
    const [error, setError] = useState(null); // Track error state
    const [searchQuery, setSearchQuery] = useState(''); // Track search query

    useEffect(() => {
        // Fetch hospital data
        axios
            .get(`https://api.medscred.com/api/v1/hospitals/get-hospitals`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setHospitals(response.data.data); // Set fetched data to the state
                setFilteredHospitals(response.data.data); // Initially show all hospitals
                setLoading(false); // Set loading to false after data is fetched
                
            })
            .catch((err) => {
                setError('Something went wrong while fetching data!'); // Set error message
                setLoading(false); // Set loading to false if error occurs
            });
    }, []); // Run the effect only once when the component mounts

    // Function to handle search input changes
    const handleSearch = (query) => {
        setSearchQuery(query); // Update the search query

        // Filter hospitals based on the query
        const filtered = hospitals.filter((hospital) =>
            hospital.first_name?.toLowerCase().includes(query.toLowerCase()) ||
            hospital.city?.toLowerCase().includes(query.toLowerCase()) ||
            hospital.state?.toLowerCase().includes(query.toLowerCase()) ||
            String(hospital.id)?.includes(query) // Convert ID to string safely
        );

        setFilteredHospitals(filtered); // Set the filtered hospitals to the state
    };

    const handleAddHospitalClick = () => {
        router.push('/screens/hospitals/AddHospitals');
    };

    // Render each hospital item
    const renderHospitalItem = ({ item }) => {
        return (
            <View style={styles.card}>
                <Text style={styles.hospitalName}>{item.first_name}</Text>
                <Text style={styles.hospitalDetails}>
                    Hospital Type: {item.account_type}
                </Text>
                <Text style={styles.hospitalDetails}>
                    Email: {item.email}
                </Text>
                <Text style={styles.hospitalDetails}>
                    Phone Number: {item.phone_number}
                </Text>
                <Text style={styles.hospitalDetails}>
                    Location: {item.city}, {item.state}
                </Text>
                <Text style={styles.hospitalDetails}>Pincode: {item.pin_code}</Text>
            </View>
        );
    };

    // If the data is still loading, show a loading indicator
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4f46e5" />
                <Text>Loading...</Text>
            </View>
        );
    }

    // If there's an error, show an error message
    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorMessage}>{error}</Text>
            </View>
        );
    }

    return (
        <>
            <Header />
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by ID, Name, or Location"
                    value={searchQuery}
                    onChangeText={handleSearch} // Call handleSearch function on text change
                />
            </View>

            <View style={styles.rowContainer}>
                <Text style={styles.totalCountText}>
                    Total Hospitals: {filteredHospitals.length}
                </Text>
                <Button
                    title="Add Hospital"
                    onPress={handleAddHospitalClick} // Navigate to AddHospital screen
                />
            </View>

            {/* Hospital List */}
            <FlatList
                data={filteredHospitals}
                renderItem={renderHospitalItem}
                keyExtractor={(item) => item.id}
                key={(item) => item.id}
                contentContainerStyle={styles.listContainer}
            />
        </>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 15,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // For Android shadow effect
    },
    hospitalName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    hospitalDetails: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8d7da',
        padding: 20,
    },
    errorMessage: {
        fontSize: 16,
        color: '#721c24',
        textAlign: 'center',
    },
    searchContainer: {
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    searchInput: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 16,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Space between total count and button
        alignItems: 'center', // Align vertically in the center
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    totalCountText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    buttonContainer: {
        marginBottom: 16, // Space between button and list
        paddingHorizontal: 16,
    },
});
