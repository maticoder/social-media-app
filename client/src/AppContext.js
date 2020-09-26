import React, { useState, createContext } from "react";

export const AppContext = createContext();

export const AppProvider = (props) => {
    const [loading, setLoading] = useState(false);

    return (
        <AppContext.Provider
            value={{
                loading,
                setLoading,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};
