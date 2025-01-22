import React, { createContext, useContext, useState } from 'react';

export interface AuthData {
    address?: string | null;
    balance?: string | null;
    chainID?: number | null;
    name?: string | null;
    isAdmin?: boolean;
}

export interface AuthContextType {
    authData: AuthData;
    setAuthData: (data: AuthData) => void;
}

const AuthContext = createContext<AuthContextType>({
    authData: {
        address: null,
        balance: null,
        chainID: null,
        name: null,
        isAdmin: false
    },
    setAuthData: () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [authData, setAuthData] = useState<AuthData>({
        address: '', // 允许为 null
        balance: '', // 允许为 null
        chainID: -1, // 允许为 null
        name: '', // 允许为 null
        isAdmin: false,
    });

    const updateAuthData = (data: AuthData) => {
        setAuthData(data);
    };

    return (
        <AuthContext.Provider value={{ authData, setAuthData: updateAuthData }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};