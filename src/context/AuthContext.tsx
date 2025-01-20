import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
    address: string | null; // 允许为 null
    balance: number | null; // 允许为 null
    chainID: number | null; // 允许为 null
    name: string | null; // 允许为 null
    isAdmin: boolean;
    setAuthData: (data: AuthData) => void;
}

interface AuthData {
    address: string | null;
    balance: number | null;
    chainID: number | null;
    name: string | null;
    isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [authData, setAuthData] = useState<AuthData>({
        address: null, // 允许为 null
        balance: null, // 允许为 null
        chainID: null, // 允许为 null
        name: null, // 允许为 null
        isAdmin: false,
    });

    const updateAuthData = (data: AuthData) => {
        setAuthData(data);
    };

    return (
        <AuthContext.Provider value={{ ...authData, setAuthData: updateAuthData }}>
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