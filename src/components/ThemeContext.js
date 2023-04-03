import React from "react";
import { createContext, useContext, useState } from "react";

export const ThemeContext = createContext();

const Theme = () => {
    const [theme, setTheme] = useState("dark");
    
    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };
    
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <div className={theme}>
            <h1>Theme</h1>
            <p>Toggle the theme</p>
            <button onClick={toggleTheme}>Toggle</button>
        </div>
        </ThemeContext.Provider>
    );
    };

    const ThemeProvider = (props) => {
        const [theme, setTheme] = useState("light");

        return (
            <ThemeContext.Provider value={{ theme, setTheme }}>
                {props.children}
            </ThemeContext.Provider>
        );
    }

    const Header = () => {
        const { theme } = useContext(ThemeContext);

        return (
            <header className={theme === "light" ? "light-theme" : "dark-theme"}>
                <h1>Header</h1>
                <ThemeToggle />
            </header>
        );
    }

    const ThemeToggle = () => {
        const { theme, setTheme } = useContext(ThemeContext);

        return (
            <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                Toggle
            </button>
        );
    }

    export { Theme, ThemeProvider, Header, ThemeToggle}