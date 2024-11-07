// context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    // Function to handle login
    const login = async (userData, receivedToken) => {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 3); // Set token expiration to 3 days from now

        // Save token and expiration date in AsyncStorage
        await AsyncStorage.setItem(
            'authToken',
            JSON.stringify({ token: receivedToken, expiry: expiryDate.toISOString() })
        );

        setUser(userData); // Store user data in state
        setToken(receivedToken); // Store token in state
    };

    // Function to handle logout
    const logout = async () => {
        setUser(null);
        setToken(null);
        await AsyncStorage.removeItem('authToken');
    };

    // Fetch token from storage on app load and check if it has expired
    const initializeAuth = async () => {
        const storedAuth = await AsyncStorage.getItem('authToken');
        if (storedAuth) {
            const parsedAuth = JSON.parse(storedAuth);
            const { token, expiry } = parsedAuth;
            const currentDate = new Date();
            const expiryDate = new Date(expiry);

            // Check if the token has expired
            if (currentDate > expiryDate) {
                await AsyncStorage.removeItem('authToken');
                setUser(null);
                setToken(null);
            } else {
                setToken(token); // Set the token if not expired
                // Optionally, fetch user data from the backend if needed
            }
        }
    };

    useEffect(() => {
        initializeAuth();
    }, []); // Initialize auth on app load

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
